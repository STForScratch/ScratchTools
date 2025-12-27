// Thank you to WorldLanguages, ErrorGamer2000, and apple502j

function injectRedux() {
  window.__steRedux = {};

  class ReDucks {
    static compose(...composeArgs) {
      if (composeArgs.length === 0) return (...args) => args;
      return (...args) => {
        const composeArgsReverse = composeArgs.slice(0).reverse();
        let result = composeArgsReverse.shift()(...args);
        for (const fn of composeArgsReverse) {
          result = fn(result);
        }
        return result;
      };
    }

    static applyMiddleware(...middlewares) {
      return (createStore) =>
        (...createStoreArgs) => {
          const store = createStore(...createStoreArgs);
          let { dispatch } = store;
          const api = {
            getState: store.getState,
            dispatch: (action) => dispatch(action),
          };
          const initialized = middlewares.map((middleware) => middleware(api));
          dispatch = ReDucks.compose(...initialized)(store.dispatch);
          return Object.assign({}, store, { dispatch });
        };
    }
  }

  let newerCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  function compose(...args) {
    const steRedux = window.__steRedux;
    const reduxTarget = (steRedux.target = new EventTarget());
    steRedux.state = {};
    steRedux.dispatch = () => {};

    function middleware({ getState, dispatch }) {
      steRedux.dispatch = dispatch;
      steRedux.state = getState();
      return (next) => (action) => {
        const nextReturn = next(action);
        const ev = new CustomEvent("statechanged", {
          detail: {
            prev: steRedux.state,
            next: (steRedux.state = getState()),
            action,
          },
        });
        reduxTarget.dispatchEvent(ev);
        return nextReturn;
      };
    }
    args.splice(1, 0, ReDucks.applyMiddleware(middleware));
    return newerCompose
      ? newerCompose.apply(this, args)
      : ReDucks.compose.apply(this, args);
  }

  try {
    Object.defineProperty(window, "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__", {
      get: () => compose,
      set: (v) => {
        newerCompose = v;
      },
    });
  } catch (err) {
    window.__steRedux = __scratchAddonsRedux;
  }
}

if (!(document.documentElement instanceof SVGElement)) {
  immediatelyRunFunctionInMainWorld(injectRedux);
}
