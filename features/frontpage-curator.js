if (window.location.href == "https://scratch.mit.edu/"){
    text = document.getElementsByClassName("inner mod-splash")[1].firstChild.firstChild.firstChild;
    Name =  text.innerText.split(" ")[3]
    text.innerHTML = `Projects Curated by <a href='https://scratch.mit.edu/users/${Name}/'>${Name}</a>`
};
