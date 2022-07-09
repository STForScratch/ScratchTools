//Chooses a random project type
const projectType = ["Parallax", "Animation", "Clicker", "Platformer", "Blockshade", "Noteblock", "RPG", "Tutorial"];
const random = Math.floor(Math.random() * projectType.length);
console.log(random, projectType[random]);

//Chooses a random project feature
const projectFeature = ["Economy", "Multiplayer", "Market", "Collectibles", "Achievements", "Hidden Secrets"];
const random2 = Math.floor(Math.random() * projectFeature.length);
console.log(random2, projectFeature[random2]);

//Chooses a random project constraint
const projectConstraint = ["Sprites", "Days", "Hour(s)", "Clones"];
const random3 = Math.floor(Math.random() * projectConstraint.length);
console.log(random3, projectConstraint[random3]);

//Chooses a random project constraint amount
const projectConstraintAmount = ["1", "2", "3", "4", "5"];
const random4 = Math.floor(Math.random() * projectConstraintAmount.length);
console.log(random4, projectConstraintAmount[random4]);

var idea = "Make a(n) " + projectType[random] + " project with " + projectFeature[random2] + " in less than " + projectConstraintAmount[random4] + " " + projectConstraint[random3] + "!"
alert(idea)
