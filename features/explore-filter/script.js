const filterDefault = `{
    "title": {},
    "author": {},
    "period": {}
}`
let options = [
    {
        icon: "title-icon",
        id: "title"
    },{
        icon: "user-icon",
        id: "author"
    },{
        icon: "calendar-icon",
        id: "period"
    }
]
let page;
let filterData;
let apiCache = {};

async function filterProject(url, element) {
    let data = apiCache[url]
    if (!data) {
        data = await (await fetch(`${url.replace('scratch.mit.edu','api.scratch.mit.edu')}`)).json();
        apiCache[url] = data;
    }
    if (data.code === "NotFound") {element.classList.add('ste-filter-hide'); return}
    if (
        filterData.period.shareStart && filterData.period.shareStart > data.history.shared.split('T')[0]
        || filterData.period.shareEnd && filterData.period.shareEnd < data.history.shared.split('T')[0]
        || filterData.period.updateStart && filterData.period.updateStart > data.history.modified.split('T')[0]
        || filterData.period.updateEnd && filterData.period.updateEnd < data.history.modified.split('T')[0]
        || filterData.title.including && !filterData.title.including.every(text => data.title.includes(text))
        || filterData.title.excluding && filterData.title.excluding.some(text => data.title.includes(text))
        || filterData.author.including && !filterData.author.including.some(text => data.author.username.includes(text))
        || filterData.author.excluding && filterData.author.excluding.some(text => data.author.username.includes(text))
    ) element.classList.add('ste-filter-hide')
    else if (element.classList.contains('ste-filter-hide')) element.classList.remove('ste-filter-hide')
}

async function filterStudio(url, element) {
    let data = apiCache[url]
    if (!data) {
        data = await (await fetch(`${url.replace('scratch.mit.edu','api.scratch.mit.edu')}`)).json();
        apiCache[url] = data;
    }
    if (
        filterData.period.shareStart && filterData.period.shareStart > data.history.created.split('T')[0]
        || filterData.period.shareEnd && filterData.period.shareEnd < data.history.created.split('T')[0]
        || filterData.period.updateStart && filterData.period.updateStart > data.history.modified.split('T')[0]
        || filterData.period.updateEnd && filterData.period.updateEnd < data.history.modified.split('T')[0]
        || filterData.title.including && !filterData.title.including.every(text => data.title.includes(text))
        || filterData.title.excluding && filterData.title.excluding.some(text => data.title.includes(text))
    ) element.classList.add('ste-filter-hide')
    else if (element.classList.contains('ste-filter-hide')) element.classList.remove('ste-filter-hide')
}

async function filter() {
    switch (page[1]) {
        case 'search':
        case 'explore':{
            if (page[2]==="projects")
                document.querySelectorAll('.thumbnail.project').forEach(element => {
                    let link = element.querySelector("a.thumbnail-image")
                    filterProject(link.href, element)
                });
            else if (page[2]==="studios")
                document.querySelectorAll('.thumbnail.gallery').forEach(element => {
                    let link = element.querySelector("a.thumbnail-image")
                    filterStudio(link.href, element)
                });
            break;
        }
        case 'studios':{
            document.querySelectorAll('.studio-project-tile').forEach(element => {
                let link = element.querySelector("a.studio-project-title")
                filterProject(link.href, element)
            });
            break;
        }
        default:
            break;
    }
}

export default async function ({ feature, console }) {
    const styleSheet = document.createElement('style');
    styleSheet.appendChild(document.createTextNode(``));
    document.head.appendChild(styleSheet);
    async function filterStyleSheet(filterType) {
        switch (filterType) {
            case 'hide':
                styleSheet.textContent = `
                    .ste-filter-hide {
                        display: none
                    }
                `
                break;
            case 'blur':
                styleSheet.textContent = `
                    .ste-filter-hide {
                        filter: blur(5px);
                        opacity: 0.6;
                        transition: all 0.3s 0s ease;
                    }
                    .ste-filter-hide:hover {
                        filter: none;
                        opacity: 1;
                    }
                `
                break;
        
            default:
                break;
        }
    }

    filterStyleSheet(feature.settings.get("filter-operation"));
    feature.settings.addEventListener("changed", function({ key, value }) {
        if (key == "filter-operation") filterStyleSheet(value)
    })

    page = window.location.pathname.split('/');
    if (feature.settings.get("keep-settings")===true) filterData = await ScratchTools.storage.get("project-filter");
    if (!filterData) filterData = JSON.parse(filterDefault);
    else switch (page[1]) {
        case 'search':
        case 'explore':{
            if (page[2]==="projects")
                ScratchTools.waitForElements(".thumbnail.project", element => {
                    let link = element.querySelector("a.thumbnail-image");
                    filterProject(link.href, element);
                });
            else if (page[2]==="studios") {
                ScratchTools.waitForElements('.thumbnail.gallery', element => {
                    let link = element.querySelector("a.thumbnail-image")
                    filterStudio(link.href, element)
                });
                options = [
                    {
                        icon: "title-icon",
                        id: "title"
                    },{
                        icon: "calendar-icon",
                        id: "period"
                    }
                ]
            }
            break;
        }

        case 'studios':{
            ScratchTools.waitForElements(".studio-project-tile", element => {
                let link = element.querySelector("a.studio-project-title");
                filterProject(link.href, element);
            });
            break;
        }

        default:
            break;
    }

    const filterButton = document.createElement("div");
    filterButton.classList.add('ste-filter-button');
    const filterIcon = document.createElement("img");
    filterIcon.src = feature.self.getResource("filter-icon");
    const filterText = document.createElement("p");
    filterText.textContent = feature.msg("filter");
    filterButton.appendChild(filterIcon);
    filterButton.appendChild(filterText);

    function optionButtonClick(id, button) {
        function createDetails(label) {
            const details = document.createElement('details');
            details.classList.add("ste-project-filter-details");
            details.setAttribute('open', 'open');
            const summary = document.createElement('summary');
            summary.textContent = `${feature.msg(label)}`;
            details.appendChild(summary);
            return details;
        }

        function createTextTag(id, type) {
            const content = document.createElement("div");
            const tags = document.createElement("div");
            tags.style.margin = "0"
            function addTag(text) {
                const tag = document.createElement("span");
                tag.classList.add("ste-filter-text")
                tag.textContent = text;
                tag.addEventListener("click", function () {
                    filterData[id][type] = filterData[id][type].filter(function(tagText) {
                        return tagText !== text;
                    });
                    tag.remove()
                    if (filterData[id][type].length == 0) {
                        delete filterData[id][type]
                    }
                    if (Object.keys(filterData[id]).length == 0) {
                        if (button.classList.contains('active')) button.classList.remove('active')
                    }
                    filter();
                })
                tags.appendChild(tag)
            }
            if (filterData[id][type]?.length>=0) filterData[id][type].forEach(addTag);

            const addButton = document.createElement("button");
            addButton.style.cssText = "min-width: 40px !important;"
            addButton.textContent = "+";
            addButton.addEventListener("click", function () {
                if (!input.value) return;
                if (!filterData[id][type]) filterData[id][type]=[]
                filterData[id][type].push(input.value);
                addTag(input.value)
                input.value = '';
                filter();
                button.classList.add('active');
            });
            const input = document.createElement("input");

            content.appendChild(tags);
            content.appendChild(addButton);
            content.appendChild(input);
            return content;
        }

        switch (id) {
            case 'reset':{
                filterData = JSON.parse(filterDefault);
                document.querySelectorAll(".ste-filter-bar .ste-filter-button.active").forEach(element => {
                    element.classList.remove("active");
                });
                filter();
                break;
            }

            case 'title':{
                const includingDetails = createDetails("including");
                const includingTextTag = createTextTag("title", "including");
                includingDetails.appendChild(includingTextTag);
                const excludingDetails = createDetails("excluding");
                const excludingTextTag = createTextTag("title", "excluding");
                excludingDetails.appendChild(excludingTextTag);
                let modal = ScratchTools.modals.create({
                    title: `${feature.msg("title")}`,
                    components: [
                        {
                            type: "html",
                            content: includingDetails
                        },
                        {
                            type: "html",
                            content: excludingDetails
                        }
                    ]
                });
                break;
            }

            case 'author':{
                const includingDetails = createDetails("including");
                const includingTextTag = createTextTag("author", "including");
                includingDetails.appendChild(includingTextTag);
                const excludingDetails = createDetails("excluding");
                const excludingTextTag = createTextTag("author", "excluding");
                excludingDetails.appendChild(excludingTextTag);
                let modal = ScratchTools.modals.create({
                    title: `${feature.msg("author")}`,
                    components: [
                        {
                            type: "html",
                            content: includingDetails
                        },
                        {
                            type: "html",
                            content: excludingDetails
                        }
                    ]
                });
                break;
            }

            case 'period':{
                function createInput(id, label) {
                    const content = document.createElement("div");
                    content.textContent = feature.msg(label);
                    const input = document.createElement("input");
                    input.type = "date";
                    input.style.margin = "0 10px";
                    if (filterData.period[id]) input.value = filterData.period[id];
                    input.addEventListener("change", function () {
                        if (input.value) {
                            filterData["period"][id] = input.value;
                            button.classList.add('active');
                        }
                        else if (filterData.period[id]) delete filterData.period[id];
                        filter()
                    });
                    const resetButton = document.createElement("button");
                    resetButton.textContent = feature.msg("reset");
                    resetButton.addEventListener("click", function () {
                        input.value = ''
                        if (filterData.period[id]) delete filterData.period[id];
                        if (Object.keys(filterData["period"]).length == 0) { if (button.classList.contains('active')) button.classList.remove('active') }
                        filter()
                    });
                    content.appendChild(input);
                    content.appendChild(resetButton);
                    return content;
                }

                const shareStart = createInput("shareStart", "startDate");
                const shareEnd = createInput("shareEnd", "endDate");
                const updateStart = createInput("updateStart", "startDate");
                const updateEnd = createInput("updateEnd", "endDate");
                
                const shareDetails = createDetails("sharedDate");
                shareDetails.appendChild(shareStart);
                shareDetails.appendChild(shareEnd);
                
                const updateDetails = createDetails("updateDate");
                updateDetails.appendChild(updateStart);
                updateDetails.appendChild(updateEnd);
    
                ScratchTools.modals.create({
                    title: `${feature.msg("period")}`,
                    components: [
                        {
                            type: "html",
                            content: shareDetails,
                        },
                        {
                            type: "html",
                            content: updateDetails,
                        }
                    ]
                });
                break;
            }
    
            default:
                break;
        }
    }

    const controlBar = document.createElement("div");
    controlBar.classList.add('ste-filter-bar');
    if (JSON.stringify(filterData)===filterDefault) controlBar.style.display = 'none';
    else filterButton.classList.add('active');
    const filterSettings = document.createElement("div");
    filterSettings.classList.add('ste-filter-settings');
    options.forEach(option => {
        const icon = document.createElement("img");
        icon.src = feature.self.getResource(option.icon);

        const text = document.createElement("p");
        text.textContent = feature.msg(option.id);

        const button = document.createElement("div");
        button.classList.add('ste-filter-button');
        if (filterData[option.id]) if (Object.keys(filterData[option.id]).length !== 0) button.classList.add('active');
        button.appendChild(icon);
        button.appendChild(text);

        button.addEventListener("click", function() {
            optionButtonClick(option.id, button);
        })

        filterSettings.appendChild(button);
    });
    const resetButton = document.createElement("div");
    resetButton.style.marginLeft = "20px"
    resetButton.classList.add('ste-filter-button');
    const resetButtonText = document.createElement("p");
    resetButtonText.textContent = feature.msg("reset");
    resetButtonText.classList.add('ste-reset');
    resetButton.appendChild(resetButtonText);
    resetButton.addEventListener("click", function() {
        optionButtonClick("reset", resetButton);
    })
    filterSettings.appendChild(resetButton);

    controlBar.appendChild(filterSettings);

    filterButton.addEventListener("click", function() {
        if (controlBar.style.display=='none') {
            controlBar.style.display = 'flex';
            filterButton.classList.add('active');
        } else {
            controlBar.style.display = 'none';
            if (filterButton.classList.contains('active')) filterButton.classList.remove('active');
        }
    })


    switch (page[1]) {
        case 'search':
        case 'explore':{
            const sortElement = await ScratchTools.waitForElement("div.sort-controls");
            const sortForm = await ScratchTools.waitForElement("form.sort-mode");
            controlBar.appendChild(sortForm);
            sortElement.after(controlBar);

            sortElement.appendChild(filterButton);
            break;
        }

        case 'studios':{
            async function setFilterControl() {
                const tabTitle = document.querySelector(".studio-header-container h2");
                const headerContainer = document.querySelector(".studio-header-container");
                headerContainer.after(controlBar);
                tabTitle.after(filterButton);
            }
            await ScratchTools.waitForElement(".studio-project-tile");
            if (/^[0-9]+$/.test(window.location.pathname.replace('/studios/','').replaceAll('/',''))) setFilterControl();
            const buttons = document.querySelectorAll(".studio-tab-nav .nav_link");
            buttons.forEach(button => {
                if (/^[0-9]+$/.test(button.href.replace('https://scratch.mit.edu/studios/','')))
                button.addEventListener("click", async function() {
                    await ScratchTools.waitForElement(".studio-project-tile");
                    setFilterControl();
                })
            });
            break;
        }

        default:
            break;
    }

    window.addEventListener("beforeunload", async function (event) {
        if (feature.settings.get("keep-settings")===true && JSON.stringify(filterData) !== JSON.stringify(await ScratchTools.storage.get("project-filter"))) await ScratchTools.storage.set({ key:"project-filter", value:filterData})
    });
}
