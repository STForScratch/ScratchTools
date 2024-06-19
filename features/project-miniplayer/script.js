export default async function ({ feature, console }) {
    const miniplayerElement = document.createElement('div');
    miniplayerElement.className = 'ste-project-miniplayer';
    document.body.appendChild(miniplayerElement);
    await ScratchTools.waitForElement("div.guiPlayer")
    const guiPlayer = document.getElementsByClassName("guiPlayer")[0]
    const projectHeader = document.querySelector('.description-block');
    const title = projectHeader.closest('.flex-row.project-notes');

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

    window.addEventListener('scroll', () => {
        if (window.scrollY > 700) {
            miniplayerElement.style.display = 'block';
            miniplayerElement.appendChild(guiPlayer);
        } else {
            miniplayerElement.style.display = 'none';
            title.insertAdjacentElement('beforebegin', guiPlayer);

        }
    });

    feature.settings.addEventListener("changed", function({ key, value }) {
        updateSetting(key, value)
    })
}
