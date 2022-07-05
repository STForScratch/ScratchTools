function cleanUp() {
    var titles = []
    document.querySelectorAll('div.thumbnail.project').forEach(function(el) {
        var title = el.querySelector('div.thumbnail-title').firstChild.textContent.toLowerCase()
        if (title.includes("part ")) {
            console.log(title)
            el.remove()
        }
        if (title.includes("#trending")) {
            console.log(title)
            el.remove()
        }
        if (title.includes("speedrun platformer")) {
            console.log(title)
            el.remove()
        }
if (title.includes("cave platformer")) {
            console.log(title)
            el.remove()
        }
if (title.includes("dark platformer")) {
            console.log(title)
            el.remove()
        }
if (title.includes("jungle platformer")) {
            console.log(title)
            el.remove()
        }
if (title.includes("platformer 1")) {
            console.log(title)
            el.remove()
        }
if (title.includes("platformer 2")) {
            console.log(title)
            el.remove()
        }
if (title.includes("platformer 3")) {
            console.log(title)
            el.remove()
        }
if (title.includes("dark") && title.includes("platformer")) {
            console.log(title)
            el.remove()
}
if (title.includes("generic") && title.includes("platformer")) {
            console.log(title)
            el.remove()
}
if (title.includes("jungle") && title.includes("platformer")) {
            console.log(title)
            el.remove()
}
if (title.includes("night") && title.includes("platformer")) {
            console.log(title)
            el.remove()
}
        if (countInstances(title, "#") > 3) {
            console.log(title)
            el.remove()
        }
        titles.forEach(function(el2) {
            if (similarity(el2, title) > 0.5) {
                if (el !== undefined && el !== null) {
                    console.log(title)
                    el.remove()
                }
            }
        })
        titles.push(title)
    })

    function countInstances(string, word) {
        return string.split(word).length - 1;
    }

    function editDistance(s1, s2) {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();

        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    function similarity(s1, s2) {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    }
    if (window.location.href.includes('https://scratch.mit.edu/explore/')) {
        setTimeout(cleanUp, 200)
    }
}
if (window.location.href.includes('https://scratch.mit.edu/explore/')) {
    cleanUp()
}
