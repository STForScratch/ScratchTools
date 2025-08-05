export default async function ({ feature, console }) {
    let observerEnabled = false;

    const miniplayerElement = document.createElement('div');
    miniplayerElement.className = 'ste-project-miniplayer';
    document.body.appendChild(miniplayerElement);

    await ScratchTools.waitForElements("div.guiPlayer", function(element) {
        if (observerEnabled === false) createObserver(element)
    });
    function createObserver(guiPlayer) {
        const projectHeader = document.querySelector('.description-block');
        const title = projectHeader.closest('.flex-row.project-notes');

        const callback = (entries, observer) => {
            const editorPlayer =  document.querySelector(".gui_stage-and-target-wrapper_Qg4hA .stage-wrapper_stage-wrapper_odn2t");
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    miniplayerElement.style.display = 'none';
                    title.insertAdjacentElement('beforebegin', guiPlayer);
                } else if (editorPlayer) {
                    miniplayerElement.style.display = 'none';
                    observerObject.disconnect()
                    observerEnabled = false;
                } else {
                    miniplayerElement.style.display = 'block';
                    miniplayerElement.appendChild(guiPlayer);
                }
            });
        };
        const observerObject = new IntersectionObserver(callback);
        const targetArea = document.querySelector("div.preview .inner .project-notes")
        observerObject.observe(targetArea);
        observerEnabled = true;
    }

    function updateSetting (key, value) {
        switch (key) {
            case 'position-right':{
                if (value===true) {
                    miniplayerElement.style.right = '0'
                    miniplayerElement.style.left = ''
                } else {
                    miniplayerElement.style.right = ''
                    miniplayerElement.style.left = '0'
                }
                break;
            }
            case 'position-bottom':{
                if (value===true) {
                    miniplayerElement.style.bottom = '0'
                    miniplayerElement.style.top = ''
                } else {
                    miniplayerElement.style.bottom = ''
                    miniplayerElement.style.top = '0'
                }
                break;
            }
            case 'opacity': {
                if (!value) {
                    miniplayerElement.style.opacity = 1
                } else if (value<=90) {
                    miniplayerElement.style.opacity = 1-value/100
                } else {
                    miniplayerElement.style.opacity = 0.1
                }
                break;
            }
        
            default:
                break;
        }
    }

    updateSetting('position-right', await feature.settings.get("position-right"));
    updateSetting('position-bottom', await feature.settings.get("position-bottom"));
    updateSetting('opacity', await feature.settings.get("opacity"));

    feature.settings.addEventListener("changed", function({ key, value }) {
        updateSetting(key, value)
    })
}
