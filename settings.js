function stuff() {
    el = document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(3)')
var clone = el.cloneNode(true);
document.querySelector('#content > div.cols > div.col-4 > div > div > ul').appendChild(clone);
document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(4) > a').textContent = 'Get a Logo'
document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(4) > a').href = 'https://scratch.mit.edu/users/-Asolo-/'
document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(4)').className = ''
}
function stuff2() {
    el = document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(3)')
var clone = el.cloneNode(true);
document.querySelector('#content > div.cols > div.col-4 > div > div > ul').appendChild(clone);
document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(5) > a').textContent = 'Get an Intro'
document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(5) > a').href = 'https://scratch.mit.edu/users/-savior-/'
document.querySelector('#content > div.cols > div.col-4 > div > div > ul > li:nth-child(5)').className = 'last'
}
stuff()
stuff2()