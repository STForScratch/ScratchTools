if (window.location.href.includes('https://scratch.mit.edu/ideas')) {
var div = document.createElement('div')
div.className = 'tips-getting-started scratchtools generator'
div.innerHTML = '<div class="inner"><section class="flex-row tips-info-section tips-left"><div class="ideas-image"></div><div><h2><span>Idea Generator</span></h2><p><span>If you need project ideas, use the ScratchTools idea generator!</span></p><a><button class="button ideas-button"><img src="https://scratch.mit.edu/static/assets/b433ee02a13fa2a12f7f7059f1f6729a.svg"><span>Generate</span></button></a></div></section></div>'
if (document.querySelector('div.scratchtools.generator') === null) {
document.querySelector('div#view').firstChild.prepend(div)
document.querySelector('div#view').prepend(document.querySelector('div.banner-wrapper'))
document.querySelector('div.scratchtools.generator').onclick = function() {
//Chooses a random project type
const projectTheme = ["a Space", "an Underground", "an Airplane", "a Superhero", "an Ocean", "an Island", "a Spaceship", "a Miniature"];
const random0 = Math.floor(Math.random() * projectTheme.length);
console.log(random0, projectTheme[random0]);

const projectType = ["Parallax", "Animation", "Clicker", "Platformer", "Blockshade", "Noteblock", "RPG", "Tutorial"];
const random = Math.floor(Math.random() * projectType.length);
console.log(random, projectType[random]);

//Chooses a random project feature
const projectFeature = ["an Economy", "Multiplayer", "a Market", "Collectibles", "Achievements", "Hidden Secrets"];
const random2 = Math.floor(Math.random() * projectFeature.length);
console.log(random2, projectFeature[random2]);

//Chooses a random project constraint
const projectConstraint = ["Sprites", "Days", "Hour(s)", "Clones"];
const random3 = Math.floor(Math.random() * projectConstraint.length);
console.log(random3, projectConstraint[random3]);

//Chooses a random project constraint amount
const projectConstraintAmount = ["6", "2", "3", "4", "5"];
const random4 = Math.floor(Math.random() * projectConstraintAmount.length);
console.log(random4, projectConstraintAmount[random4]);

var idea = `Idea: Make ${projectTheme[random0]} ${projectType[random]} that has ${projectFeature[random2]}! Maybe even try to make it in just ${projectConstraintAmount[random4]} ${projectConstraint[random3]}!`
alert(idea)
}
}
}
