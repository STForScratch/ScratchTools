function gEBI(id) {
    return document.getElementById(id);
}
const section = {
    1: gEBI("section_1"),
    2: gEBI("section_2"),
    3: gEBI("section_3"),
    4: gEBI("section_4")
}

async function start() {

    section[1].classList.add("hidden");
    section[2].classList.remove("hidden");



}
async function theme() {
    section[2].classList.add("hidden");
    section[3].classList.remove("hidden");

    const light = gEBI("light");
    const dark = gEBI("dark");

    const themes = {
        light: {
            enabled: true,
            element: gEBI("light")
        },
        dark: {
            enabled: false,
            element: gEBI("dark")
        },
        purple: {
            enabled: false,
            element: gEBI("purple")
        }
    }

    async function changeTheme(theme) {
        const themePreviewImg = gEBI("theme-preview");
        themePreviewImg.src = `/onboarding/themes/${theme}.svg`;
        themes[theme].element.classList.remove("theme-noselect");
        themes[theme].element.classList.add("theme-select");
        for (const themeName in themes) {
            if (themeName !== theme) {
                themes[themeName].element.classList.remove("theme-select");
                themes[themeName].element.classList.add("theme-noselect");
            }
        }

        await chrome.storage.sync.set({ theme: theme });
    }

    const themePreviewImg = gEBI("theme-preview");
    themes.light.element.onclick = async function () {
        await changeTheme("light");
    };
    themes.dark.element.onclick = async function () {
        await changeTheme("dark");
    };
    themes.purple.element.onclick = async function () {
        await changeTheme("purple");
    }

}

async function end() {
    section[3].classList.add("hidden");
    section[4].classList.remove("hidden");
}
const button = gEBI("end_button");
button.addEventListener("click", ()=>{window.location.href = "https://scratch.mit.edu";})

//check if verison-name manifest contains "beta" if change text
if (chrome.runtime.getManifest().version_name.includes("beta")) {
    gEBI("end_title").textContent = "Thanks for trying out the beta!"
    gEBI("end_text").textContent = `If you find any bugs, just open up the full settings page, click on the "Additional
    Settings" button, and click "Report a Bug".`
}









document.querySelector("button[data-function=start]").onclick = start;


document.querySelector("button[data-function=theme]").onclick = theme;

document.querySelector("button[data-function=end]").onclick = end;