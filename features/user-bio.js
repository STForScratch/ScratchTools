if (window.location.href.includes("/users/")) {
  replacealllinks();
}

function replacealllinks() {
  addOnClick();
  const highlightedItems = document.querySelectorAll("a");

  highlightedItems.forEach(function (item) {
    if (item.parentNode.className === "name") {
      replaceuserlinks(item);
    }
  });

  async function replacelinks(item) {
    // Storing response
    const response = await fetch(
      `https://api.${item.href.replace("https://", "")}`
    );

    // Storing data in form of JSON
    var data = await response.json();
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
