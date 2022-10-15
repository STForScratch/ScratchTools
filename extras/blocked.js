function getBlocked() {
  document.querySelector(".blocked").style.display = null;
  chrome.storage.sync.get("block", function (obj) {
    var all = [];
    obj.block.forEach(function (el) {
      if (el !== "") {
        all.push(el);
      }
    });
    console.log(all);
    all.forEach(function (username, i) {
      if (username !== "") {
        var a = document.createElement("span");
        a.textContent = username;
        a.onclick = function () {
          chrome.tabs.create({
            url: `https://scratch.mit.edu/users/${username}/`,
          });
        };
        document.querySelector("div.blocked").appendChild(a);
        a.style.cursor = "pointer";
        a.style.fontFamily = "'Space Grotesk', sans-serif";
        if (i !== all.length - 1) {
          var a = document.createElement("span");
          a.textContent = ", ";
          a.style.marginRight = "2px";
          document.querySelector("div.blocked").appendChild(a);
          a.style.fontSize = "150%";
          a.style.fontFamily = "'Space Grotesk', sans-serif";
        }
      }
    });
    var a = document.createElement("span");
    a.textContent = ".";
    a.style.marginRight = "2px";
    document.querySelector("div.blocked").appendChild(a);
    a.style.fontSize = "150%";
    a.style.fontFamily = "'Space Grotesk', sans-serif";
  });
}

chrome.storage.sync.get("features", function (obj) {
  if (obj.features.includes("block-messages")) {
    getBlocked();
  }
});
