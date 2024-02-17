export default async function ({ feature, console }) {
    let filterWords = feature.settings.get("filter-words");
    let blur = feature.settings.get("blur");
    let WordList = filterWords.split(',').filter(item => item !== "");

    ScratchTools.waitForElements("div.thumbnail.project", filter);

    feature.settings.addEventListener("changed", function({ key, value }) {
        switch (key) {
            case "filter-words":
                filterWords = value.toString();
                WordList = filterWords.split(',').filter(item => item !== "");
                break;
            case "blur":
                blur = value;
                break;
            default:
                break;
        }
        document.querySelectorAll('.thumbnail.project').forEach(filter);
    });

    async function filter(element) {
        let title = element.querySelector('.thumbnail-title a').getAttribute('title').toLowerCase();
        if (WordList.some(item => title.includes(item.toLowerCase()))) {
            if (blur) {
                element.classList.add('filter-blur');
                element.classList.remove('filter-hide');
            } else {
                element.classList.add('filter-hide');
                element.classList.remove('filter-blur');
            }
        } else {
            element.classList.remove('filter-blur');
            element.classList.remove('filter-hide');
        }
    };
}
