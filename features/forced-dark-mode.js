// Forced Dark Mode
// By JaydenDev, 2022, MIT license
// Forces dark mode on all scratch pages (forums and editor)
// incompatible with other dark mode features

// credit to: n/a
// https://stackoverflow.com/questions/15505225/inject-css-stylesheet-as-string-using-javascript
function addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
}

addStyle(`
    * {
        background-color: invert(100%);
    }
`)

document.body.style.filter = 'invert(1)'
