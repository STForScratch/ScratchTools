ScratchTools.waitForElements('.ReactModalPortal', function(el) {
    if (el.querySelector('[aria-label="New Variable"]')) {
        document.querySelector('input[value="local"]').click()
    }
}, 'default local', false)