var defaultToLocal = true
ScratchTools.waitForElements('.ReactModalPortal', function(el) {
    if (el.querySelector('[class^="prompt_variable-name-text-input_"]')) {
        if (defaultToLocal) {
            document.querySelectorAll('[name="variableScopeOption"]')[1].click()
        }
    }
}, 'default local', false)

ScratchTools.setDisable('default-to-local', function() {
    defaultToLocal = false
})