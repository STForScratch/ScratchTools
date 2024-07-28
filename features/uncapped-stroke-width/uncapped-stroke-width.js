export default async function ({ feature, console }) {
  const MAX_STROKE_WIDTH = Number.POSITIVE_INFINITY;

  const modifyReducer = () => {
    const originalReducer =
      Scratch.vm.store.getState().scratchPaint.strokeWidth;
    const CHANGE_STROKE_WIDTH =
      "scratch-paint/stroke-width/CHANGE_STROKE_WIDTH";

    const newReducer = (state = originalReducer, action) => {
      switch (action.type) {
        case CHANGE_STROKE_WIDTH:
          if (isNaN(action.strokeWidth)) {
            console.warn(`Invalid brush size: ${action.strokeWidth}`);
            return state;
          }

          return Math.max(0, action.strokeWidth);
        default:
          return originalReducer(state, action);
      }
    };

    Scratch.vm.store.replaceReducer({
      ...Scratch.vm.store.getState(),
      scratchPaint: {
        ...Scratch.vm.store.getState().scratchPaint,
        strokeWidth: newReducer,
      },
    });
  };
  ScratchTools.waitForElements('[class^="paint-editor_top-align-row"]', () => {
    if (Scratch.vm && Scratch.vm.store) {
      modifyReducer();
    } else {
      console.warn("Scratch VM or store not found.");
    }
  });
}
