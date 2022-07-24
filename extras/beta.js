if (chrome.runtime.getManifest().version_name.toLowerCase().includes('beta')) {
    var style = document.createElement('style')
    style.innerHTML = `
    input:checked+.slider {
    background-color: #6f00ff;
    float: right;
}
input:focus+.slider {
    box-shadow: 0 0 1px #6f00ff;
    float: right;
}
.featureTitle {
    color: #6f00ff;
}

.title.type.active {
    color: #6f00ff;
}

a:hover, a:visited, a:link, a:active {
      text-decoration: none;
      color: #6f00ff;
    }
    
    .navbar2 {
    background-color: #6f00ff;
    }
    `
    document.body.appendChild(style)
    if (document.querySelector('h2.title') !== null) {
        document.querySelector('h2.title').innerHTML = `ScratchTools Settings <span style="color: #6f00ff">Beta</span>`
    }
    if (document.querySelector('div.span') !-- null) {
        document.querySelector('div.span').textContent = 'ScratchTools Beta '   
    }
}
