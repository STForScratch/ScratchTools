if (window.location.href.startsWith('https://scratch.mit.edu/projects/') && window.location.href.includes('/editor')) {
    function checkForNavForLeopard() {
        if (document.querySelector('div.scratchtoolsLeopard') === null) {
            if (document.querySelector('.menu-bar_main-menu_3wjWH') !== null) {
                waitForNavForLeopard.disconnect()
                var outerDiv = document.createElement('div')
                outerDiv.className = 'menu-bar_menu-bar-item_oLDa- scratchtoolsLeopard'
                var outerSpan = document.createElement('span')
                outerSpan.className = 'button_outlined-button_1bS__ menu-bar_menu-bar-button_3IDN0 community-button_community-button_2Lo_g'
                outerSpan.role = 'button'
                var img = document.createElement('img')
                img.draggable = false
                img.src = 'https://leopardjs.com/_next/static/media/leopard-logo.ade6f814.svg'
                img.className = 'community-button_community-button-icon_1IFvv button_icon_77d8G'
                outerSpan.appendChild(img)
                var innerDiv = document.createElement('div')
                innerDiv.className = 'button_content_3jdgj'
                var innerSpan = document.createElement('span')
                innerSpan.style.color = 'white'
                innerSpan.textContent = 'Open as Javascript'
                innerDiv.appendChild(innerSpan)
                outerSpan.appendChild(innerDiv)
                outerDiv.appendChild(outerSpan)
                outerSpan.addEventListener('click', async function() {
                    if (confirm("Are you sure? Make sure you save your project first!")) {
                        outerDiv.remove()
                        alert("Loading project... (it may take a minute)")
                    var response = await fetch(`https://scratchtools.app/leopard/${window.location.href.toLowerCase().replace('https://scratch.mit.edu/projects/', '').replaceAll('/', '').replace('editor', '')}/`)
                    var data = await response.json()
                    if (data.url !== undefined) {
                        window.location.href = data.url
                    }
                }
                })
                document.querySelector('.menu-bar_main-menu_3wjWH').appendChild(outerDiv)
            }
        }
    }
    var waitForNavForLeopard = new MutationObserver(checkForNavForLeopard);
    waitForNavForLeopard.observe(document.querySelector('body'), {attributes: true,childList: true,subtree: true});
}