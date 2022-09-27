ScratchTools.waitForElements('.ReactModalPortal', function(el) {
    if (el.querySelector('[class^="prompt_variable-name-text-input_"]')) {
        document.querySelectorAll('[name="variableScopeOption"]')[1].click()
    }
}, 'default local', false)