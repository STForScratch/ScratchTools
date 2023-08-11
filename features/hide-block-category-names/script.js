var hideBlockCategoryNames = new Feature({ id: "hide-block-category-names" })

ScratchTools.setDisable("hide-block-category-names", function() {})

if (ScratchTools.Storage.displayAsCircle) {
    document.body.classList.add("st-category-circle")
} else {
    document.body.classList.remove("st-category-circle")
}

hideBlockCategoryNames.settings.addEventListener("changed", function({key: name, value}) {
    console.log(name)
    console.log(value)
    if (name === "displayAsCircle") {
        if (value) {
            document.body.classList.add("st-category-circle")
        } else {
            document.body.classList.remove("st-category-circle")
        }
    }
})