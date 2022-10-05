// get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
// get cookie
if (window.location.href.includes("https://scratch.mit.edu/users/")) {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }
  setTimeout(() => {
    replacealllinks();
  }, 50);
  setTimeout(() => {
    addOnClick();
  }, 50);
  about();
  str = window.location.href;
  if (getCookie("ST Features").includes("round")) {
    document.querySelector(
      "#profile-avatar > div > a > img"
    ).style.borderRadius = "10%";
    document.querySelector("#profile-avatar > div > a > img").style.border =
      "0px";
    var elementExists = document.querySelector("#featured-project > img");
    if (elementExists !== null) {
      document.querySelector("#featured-project > img").style.borderRadius =
        "20px";
    }
  }

  // check if special
  const help = [
    "rgantzos",
    "lisa_wolfgang",
    "--Explosion--",
    "GarboMuffin",
    "Xancan",
    "-Jensen-",
    "-Intensify-",
    "-OutroCoder-",
    "JoePotatoScratch",
  ];
  const bb = ["JoePotatoScratch"];
  if (
    bb.includes(
      document.querySelector("#profile-data > div.box-head > div > h2")
        .textContent
    )
  ) {
    var logo = document.createElement("img");
    logo.style.marginRight = "200px";
    logo.src =
      "https://scratchtools-bug-bounty.rgantzos.repl.co/transparent%20logo.png";
    logo.style.marginTop = "15px";
    logo.style.width = "125px";
    logo.style.float = "right";
    logo.title = "This user is part of the ScratchTools Bug Bounty.";
    document.querySelector("#profile-data > div.box-head").prepend(logo);
  }
  if (
    help.includes(
      document.querySelector("#profile-data > div.box-head > div > h2")
        .textContent
    )
  ) {
    document.querySelector(
      "#profile-data > div.box-head > div > p > span.group"
    ).textContent = `${
      document.querySelector(
        "#profile-data > div.box-head > div > p > span.group"
      ).textContent
    } | ScratchTools`;
    document.querySelector(
      "#profile-data > div.box-head > div > h2"
    ).textContent = `*${
      document.querySelector("#profile-data > div.box-head > div > h2")
        .textContent
    }`;
  }
  // replace links in comments
  function replacealllinks() {
    addOnClick();
    const highlightedItems = document.querySelectorAll("a");

    highlightedItems.forEach(function (item) {
      if (item.parentNode.className === "content") {
        if (getCookie("ST Features").includes("show-profile-titles")) {
          replacelinks(item);
        }
      }

      if (item.parentNode.className === "name") {
        if (getCookie("ST Features").includes("hover-over-user")) {
          replaceuserlinks(item);
        }
      }
    });

    async function replacelinks(item) {
      // Storing response
      const response = await fetch(
        `https://api.${item.href.replace("https://", "")}`
      );

      // Storing data in form of JSON
      var data = await response.json();
      console.log(data);
      if (data.hasOwnProperty("title")) {
        var stuff = data["title"];
        item.textContent = stuff;
      }
    }

    async function replaceuserlinks(item) {
      // Storing response
      const response5 = await fetch(
        `https://api.${item.href.replace("https://", "")}`
      );

      // Storing data in form of JSON
      var data = await response5.json();
      console.log(data);
      if (data.hasOwnProperty("profile")) {
        var stuff = data["profile"]["bio"];
        item.title = stuff;
      }
    }
  }
  function addOnClick() {
    var elementExists = document.querySelector(
      "#comments > div:nth-child(3) > ul > div"
    );
    if (elementExists !== null) {
      var thebutton = document.querySelector(
        "#comments > div:nth-child(3) > ul > div"
      );
    } else {
      var thebutton = document.querySelector(
        "#comments > div:nth-child(2) > ul > div"
      );
    }
    thebutton.onclick = function () {
      setTimeout(() => {
        replacealllinks();
      }, 50);
    };
  }
  // done replacing

  var apple = str.split("https://scratch.mit.edu/users/")[1];
  var apple2 = apple.split("/")[0];
  getapi3(`https://api.scratch.mit.edu/users/${apple2}/`, apple2);
  var elementExists = document.querySelector(
    "div.template-feature-off.comments-off"
  );
  if (elementExists !== null) {
    document.querySelector(
      "div.template-feature-off.comments-off"
    ).textContent = "This user has chosen to turn off their profile comments.";
  }
  async function getapi3(url, user) {
    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    var country = data["profile"]["country"];
    console.log(country);
    getapi2(
      `https://api.scratch.mit.edu/users/${user}/messages/count/`,
      country
    );
    getapi20(`https://api.scratch.mit.edu/users/${user}/`);
  }
  // Calling that async function

  async function getapi2(url, a) {
    if (getCookie("ST Features").includes("message-count")) {
      // Storing response
      const response = await fetch(url);

      // Storing data in form of JSON
      var data = await response.json();
      console.log(data);
      var stuff = data["count"];
      document.querySelector(
        ".location"
      ).textContent = `${a} | ${stuff} Messages`;
    }
  }

  async function getapi20(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    var stuff = data["history"]["joined"];
    var year = stuff.split("-")[0];
    var month = stuff.split("-")[1].split("-")[0];
    var day = stuff.split("-")[2].split("T")[0];
    document.querySelector(
      "#profile-data > div.box-head > div > p > span:nth-child(2)"
    ).title = `${month}/${day}/${year}`;
  }
  // Calling that async function

  function about() {
    if (getCookie("hideabout?") === "yes") {
      document
        .querySelector("#topnav > div > div > ul.site-nav > li.last")
        .remove();
    }
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }
  }

  function feature() {}

  // add full title to profile projects

  replacealllinks2();
  function replacealllinks2() {
    if (getCookie("ST Features").includes("full-title")) {
      const highlightedItems2 = document.querySelectorAll("a");

      highlightedItems2.forEach(function (item) {
        if (item.href.includes("https://scratch.mit.edu/projects/")) {
          if (item.parentNode.className === "title") {
            console.log("hi");
            replacelinks2(item);
          }
        }
      });
    }
  }
  async function replacelinks2(item) {
    // Storing response
    const response = await fetch(
      `https://api.${item.href.replace("https://", "")}`
    );

    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (data.hasOwnProperty("title")) {
      var stuff = data["title"];
      item.title = `${stuff} by @${data["author"]["username"]}`;
    }
  }
}
