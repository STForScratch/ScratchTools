if (window.location.href.includes("https://scratch.mit.edu/ideas")) {
  var div = document.createElement("div");
  div.className = "tips-getting-started scratchtools generator";
  div.innerHTML =
    '<div class="inner"><section class="flex-row tips-info-section tips-left"><div class="ideas-image"></div><div><h2><span>Idea Generator</span></h2><p><span>If you need project ideas, use the ScratchTools idea generator!</span></p><a><button class="button ideas-button"><span>Generate</span></button></a></div></section></div>';
  if (document.querySelector("div.scratchtools.generator") === null) {
    document.querySelector("main#view").firstChild.prepend(div);
    document
      .querySelector("main#view")
      .prepend(document.querySelector("div.banner-wrapper"));
    document.querySelector("div.scratchtools.generator").onclick = function () {
      generateIdea();
    };
  }
}

function generateIdea() {
  //Chooses a random project type
  var projectTheme = [
    "a Space",
    "an Underground",
    "an Airplane",
    "a Superhero",
    "an Ocean",
    "an Island",
    "a Spaceship",
    "a Miniature",
    "a Super Huge",
    "an Above the Clouds",
    "a Volcano",
    "a Mountain",
    "a Desert",
  ];
  var random0 = Math.floor(Math.random() * projectTheme.length);

  var projectType = [
    "Parallax",
    "Animation",
    "Clicker",
    "Platformer",
    "Blockshade",
    "Noteblock",
    "RPG",
    "Tutorial",
  ];
  var random = Math.floor(Math.random() * projectType.length);

  //Chooses a random project feature
  var projectFeature = [
    "an Economy",
    "Multiplayer",
    "a Market",
    "Collectibles",
    "Achievements",
    "Hidden Secrets",
    "Coins you can Earn",
    "Enemies you must Befriend",
    "an Environment you must hide in",
    "Food you must Eat",
  ];
  var random2 = Math.floor(Math.random() * projectFeature.length);

  //Chooses a random project constraint
  var projectConstraint = ["Sprites", "Days", "Hour(s)", "Clones"];
  var random3 = Math.floor(Math.random() * projectConstraint.length);

  //Chooses a random project constraint amount
  var projectConstraintAmount = ["6", "2", "3", "4", "5"];
  var random4 = Math.floor(Math.random() * projectConstraintAmount.length);

  var idea = `Make ${projectTheme[random0]} ${projectType[random]} that has ${projectFeature[random2]}! Maybe even try to make it in just ${projectConstraintAmount[random4]} ${projectConstraint[random3]}!`;
  ScratchTools.modals.create({
    title: "Idea",
    description:
      idea,
  });
}
