function roundProfile() {
    document.querySelectorAll('img').forEach(function(el) {
        if (el.src !== undefined) {
            if (el.src.includes('scratch.mit.edu/get_image/user/')) {
                el.style.borderRadius = '50%'
            }
        }
    })
    window.setTimeout(roundProfile, 80)
}

roundProfile()
