if (window.location.href.startsWith('https://scratch.mit.edu/cloudmonitor/')) {
var projectId = window.location.href.replace('https://scratch.mit.edu/cloudmonitor/', '').replaceAll('/', '')
    async function getAllCloudUsers() {
        async function getAll() {
            var found = false
            var offset = 0
            while (!found) {
                var response = await fetch('https://clouddata.scratch.mit.edu/logs?projectid='+projectId+'&limit=100&offset='+offset.toString())
                var data = await response.json()
                offset = offset+100
                if (data.length > 0) {
                data.forEach(function(el) {
                    if (!found) {
                        if ((el.timestamp+10000) > Date.now()) {
                            if (!currentlyOnline.includes(el.user)) {
                                currentlyOnline.push(el.user)
                            }
                        } else {
                            found = true
                        }
                    }
                })
            } else {
            found = true
                }
            }
            if (document.querySelector('.scratchtoolsOnline') !== null) {
                document.querySelector('.scratchtoolsOnline').remove()
            }
            if (currentlyOnline.length !== 0) {
            var content = document.querySelector('#content')
            var box = document.createElement('div')
            box.className = 'box scratchtoolsOnline'
            var boxHead = document.createElement('div')
            boxHead.className = 'box-head'
            var boxContent = document.createElement('div')
            boxContent.className = 'box-content'
            box.appendChild(boxHead)
            box.appendChild(boxContent)
            var h4 = document.createElement('h4')
            h4.textContent = 'Online Scratchers'
            boxHead.appendChild(h4)
            boxContent.style.padding = '1rem'
            currentlyOnline.forEach(function(el) {
                var a = document.createElement('a')
                a.href = `https://scratch.mit.edu/users/${el}/`
                var span = document.createElement('span')
                span.textContent = el
                a.appendChild(span)
                boxContent.appendChild(a)
                span.style.marginLeft = '0.5rem'
                span.style.display = 'inline-block'
            })
            content.prepend(box)
        }
    }
        var currentlyOnline = []
            getAll()
        }
        getAllCloudUsers()
        setInterval(getAllCloudUsers, 10000)
    }