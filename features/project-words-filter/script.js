let filterWords;
let wordList;
let filterType;

function filterControl(wordList) {
    let newElement = document.createElement('div');
    newElement.classList.add("filter-controls")
    let tags = ``;
    if (wordList)
        wordList.forEach((word,i) => { tags += `<a><li class="filter-word-tag" wordTag_index="${i}"><span>${word}</span></li></a>` });
    newElement.innerHTML = `
        filter
        <div class="sub-nav categories">
            ${tags}
            <div>
                <a><li class="filter-word-tag add-word"><span>+</span></li></a>
                <input class="input" type="text" name="add-filter-word" id="project-words-filter-i0"></input>
            </div>
        </div>
        <form class="sort-mode" novalidate="">
            <div class="select">
                <div class="form-group row">
                    <label></label>
                    <div>
                        <select class="form-control" name="filter" id="project-words-filter-s0">
                            <option value="filter${filterType===1?' selected':''}">Filter</option>
                            <option value="blur"${filterType===2?' selected':''}>Blur</option>
                            <option value="off"${filterType===0?' selected':''}>Off</option>
                        </select>
                    </div>
                </div>
            </div>
        </form>
        `
    //document.getElementById('project-words-filter-s0').options[filterType-1].selected = true;
    var sortElement = document.querySelector('div.sort-controls');
    let oldElement = document.querySelector('div.filter-controls');
    if (oldElement === null)
        sortElement.parentNode.insertBefore(newElement, sortElement.nextSibling);
    else
        oldElement.parentNode.replaceChild(newElement, oldElement);

    document.getElementById('project-words-filter-s0').addEventListener('change', function(e) {
        var selectedValue = e.target.value;
        switch (selectedValue) {
            case 'off':filterType=0;break;
            case 'filter':filterType=1;break;
            case 'blur':filterType=2;break;
            default:break;
        }
        document.querySelectorAll('.thumbnail.project').forEach(filter);
    });
    document.getElementById('project-words-filter-i0').addEventListener('keydown', (e) => {
        if ( e.key == "Enter" ) {
            addWordTag()
            filterControl(wordList)
            document.querySelectorAll('.thumbnail.project').forEach(filter);
        }
    });
    document.querySelectorAll('a li.filter-word-tag').forEach((wordTag) => {
        wordTag.addEventListener('click', function(e) {
            if (wordTag.classList.contains('add-word')) {
                addWordTag()
            } else {
                let span = e.target.querySelector('span');
                let wordTagIndex = Number(wordTag.getAttribute('wordTag_index'));
                console.log(wordTagIndex)
                wordList.splice(wordTagIndex, 1);
            }
            filterControl(wordList)
            document.querySelectorAll('.thumbnail.project').forEach(filter);
        });
    });

    function addWordTag() {
        var inputElement = document.getElementById('project-words-filter-i0')
        if (inputElement.value.trim() === '') return inputElement.value = '';
        wordList.push(inputElement.value)
        inputElement.value = '';
        
    }
}

async function filter(element) {
    let title = element.querySelector('.thumbnail-title a').getAttribute('title').toLowerCase();
    if (wordList.some(item => title.includes(item.toLowerCase()))&&filterType!==0) {
        switch (filterType) {
            case 1:
                element.classList.add('filter-hide');
                element.classList.remove('filter-blur');
                break;

            case 2:
                element.classList.add('filter-blur');
                element.classList.remove('filter-hide');
                break;
        
            default:
                break;
        }
    } else {
        element.classList.remove('filter-blur');
        element.classList.remove('filter-hide');
    }
};

export default async function ({ feature, console }) {
    filterWords = feature.settings.get("filter-words");
    wordList = filterWords.split(',').filter(item => item !== "");
    filterType = feature.settings.get("blur")===true?2:1
    
    filterControl(wordList)

    ScratchTools.waitForElements("div.thumbnail.project", filter);

    feature.settings.addEventListener("changed", function({ key, value }) {
        switch (key) {
            case "filter-words":
                filterWords = value.toString();
                wordList = filterWords.split(',').filter(item => item !== "");
                filterControl(wordList)
                break;
            case "blur":
                switch (value) {
                    case false:filterType=1;break;
                    case true:filterType=2;break;
                    default:break;
                }
                document.getElementById('project-words-filter-s0').options[filterType-1].selected = true;
                break;
            default:
                break;
        }
        document.querySelectorAll('.thumbnail.project').forEach(filter);
    });
}
