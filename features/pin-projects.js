if (window.location.href.startsWith('https://scratch.mit.edu/mystuff')) {
    chrome.storage.sync.get("pinned", async function(obj) {
        if (obj !== undefined && obj !== null && obj.pinned !== undefined && obj.pinned !== null) {

            var box = addBox(obj.pinned.title + " • Pinned Project", obj.pinned.id, 'You pinned this project as part of the "Pin Projects to My Stuff" ScratchTools feature. Now, you can access it with just the click of a button.')
            box.className = 'box scratchtools'
            var a = document.createElement('a')
            a.className = 'button small grey'
            a.onclick = async function() {
                if (confirm("Are you sure you want to unpin this project?")) {
                    await chrome.storage.sync.set({
                        "pinned": undefined
                    })
                    document.querySelector('div.box.scratchtools').remove()
                    alert('Unpinned project.')
                }
            }
            a.innerHTML = `<span class="text">Unpin</span>`
            a.style.position = 'absolute'
            a.style.right = '15px'
            a.style.top = '6px'
            box.firstChild.appendChild(a)
            if (document.querySelector('div.box.scratchtools') === null) {
                document.querySelector('div.container#content').prepend(box)
            }

            function addBox(title, id, instructions) {
                var a = document.createElement('a')
                a.href = `https://scratch.mit.edu/projects/${id}/`
                var box = document.createElement('div')
                box.className = 'box'
                var boxHead = document.createElement('div')
                boxHead.className = 'box-head'
                var boxTitle = document.createElement('h4')
                boxTitle.textContent = title
                box.appendChild(boxHead)
                a.appendChild(boxTitle)
                boxHead.appendChild(a)
                var boxContent = document.createElement('div')
                boxContent.className = 'box-content'
                boxContent.style.padding = '2vw'
                box.appendChild(boxContent)
                var p = document.createElement('p')
                p.style.width = '500px'
                p.textContent = instructions
                boxContent.appendChild(p)
                boxTitle.style.color = '#1aa0d8'
                var thumbnail = document.createElement('img')
                thumbnail.style.display = 'inline-block'
                thumbnail.src = `https://cdn2.scratch.mit.edu/get_image/project/${id}_480x360.png`
                thumbnail.className = 'lazy image'
                thumbnail.style.display = 'block'
                boxContent.appendChild(thumbnail)
                thumbnail.style.width = '300px'
                p.style.textAlign = 'left'
                p.style.float = 'left'
                boxContent.style.height = '250px'
                boxContent.style.overflowY = 'hidden'
                thumbnail.style.textAlign = 'right'
                thumbnail.style.float = 'right'
                return box
            }
        }
    })
}
if (window.location.href.startsWith('https://scratch.mit.edu/projects/')) {
    var page = document.querySelector('div.page');
    if (document.querySelector("#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions") !== null) {
        if (document.querySelector('button.button.action-button.scratchtoolspin') === null) {
            var btn = document.createElement('button')
            btn.textContent = 'Pin'
            btn.className = 'button action-button scratchtoolspin'
            btn.onclick = async function() {
                if (confirm("Are you sure you want to pin this project?")) {
                    await chrome.storage.sync.set({
                        "pinned": {
                            "id": window.location.href.replace('https://scratch.mit.edu/projects/', '').replaceAll('/', ''),
                            "title": document.querySelector('input.inplace-input').value
                        }
                    })
                    alert('Set pinned project.')
                }
            }
            if (document.querySelector('input.inplace-input') !== null) {
                document.querySelector("div.flex-row.action-buttons").appendChild(btn)
            }
        }
    } else {
        var configure = {
            attributes: true,
            childList: true,
            subtree: true
        };
        var getSpot = function(mutationList, observer) {
            // Use traditional 'for loops' for IE 11
            for (const mutation of mutationList) {
                if (document.querySelector("#view > div > div.inner > div:nth-child(3) > div.flex-row.subactions") !== null) {
                    observer.disconnect()
                    if (document.querySelector('button.button.action-button.scratchtoolspin') === null) {
                        var btn = document.createElement('button')
                        btn.textContent = 'Pin'
                        btn.className = 'button action-button scratchtoolspin'
                        btn.onclick = async function() {
                            if (confirm("Are you sure you want to pin this project?")) {
                                await chrome.storage.sync.set({
                                    "pinned": {
                                        "id": window.location.href.replace('https://scratch.mit.edu/projects/', '').replaceAll('/', ''),
                                        "title": document.querySelector('input.inplace-input').value
                                    }
                                })
                                alert('Set pinned project.')
                            }
                        }
                        if (document.querySelector('input.inplace-input') !== null) {
                            document.querySelector("div.flex-row.action-buttons").appendChild(btn)
                        }
                    }
                }
            }
        };
        var observer = new MutationObserver(getSpot);
        observer.observe(page, configure);
    }
}
