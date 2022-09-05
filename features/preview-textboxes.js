if (window.location.href.startsWith('https://scratch.mit.edu/users/')) {
    ScratchTools.waitForElements('#status', profileTextboxes, 'preview textboxes profile', false)
    function profileTextboxes() {
        if (document.querySelector('.scratchtoolPreview') === null) {
    var label = document.createElement('span')
label.textContent = 'Edit Mode'
var input = document.createElement('input')
input.type = 'checkbox'
label.style.fontSize = '1rem'
label.style.fontWeight = '200'
label.style.marginTop = '-0.125rem'
input.style.marginLeft = '5px'
input.style.marginRight = '5px'
input.checked = true
document.querySelector('#user-details').querySelector('h3').appendChild(input)
document.querySelector('#user-details').querySelector('h3').appendChild(label)

var style = document.createElement('style')
style.textContent = `
    .scratchtoolPreview {
        display: none;
    }
`
document.body.appendChild(style)
style.className = 'hidePreview'
var bio = document.createElement('div')
bio.id = 'bio-readonly'
bio.className = 'read-only scratchtoolPreview'
var content = document.querySelector('#bio').querySelector('textarea').value
bio.innerHTML = `<div class="viewport" style="overflow: auto;">
                  <p class="overview" style="white-space: pre-wrap;"></p>
                </div>`
bio.querySelector('.overview').textContent = content
document.querySelector('#user-details').insertBefore(bio, document.querySelector('#bio'));

var status2 = document.createElement('div')
status2.id = 'status-readonly'
status2.className = 'read-only scratchtoolPreview'
status2.innerHTML = `<div class="viewport" style="overflow: auto;">
                  <p class="overview" style="white-space: pre-wrap;"></p>
                </div>`
                var content = document.querySelector('#status').querySelector('textarea').value
status2.querySelector('.overview').textContent = content
document.querySelector('#user-details').insertBefore(status2, document.querySelector('#status'));

input.addEventListener('click', function() {
    if (document.querySelector('.hidePreview')) {
        document.querySelector('.hidePreview').remove()
        var content = document.querySelector('#status').querySelector('textarea').value
status2.querySelector('.overview').textContent = content
var content = document.querySelector('#bio').querySelector('textarea').value
bio.querySelector('.overview').textContent = content
    var style = document.createElement('style')
style.textContent = `
    .scratchtoolPreview {
        display: block;
    }

    #bio, #status {
        display: none;
    }
`
document.body.appendChild(style)
    style.className = 'showPreview'
    } else if (document.querySelector('.showPreview')) {
        document.querySelector('.showPreview').remove()
    var style = document.createElement('style')
style.textContent = `
    .scratchtoolPreview {
        display: none;
    }

    #bio, #status {
        display: block;
    }
`
document.body.appendChild(style)
    style.className = 'hidePreview'
    }
})
        }
}
}