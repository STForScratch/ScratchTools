var btn =
  document.querySelector(".searchbaricon") || document.querySelector(".sticon");
var clicks = 0;
btn.addEventListener("click", function () {
  clicks = clicks + 1;
  if (clicks > 4) {
    document.querySelector(".easterEgg").textContent = `
    .feature {
      display: none !important;
    }

    .eastereggFeature {
      display: inline-block !important;
    }`;
  }
});

chrome.storage.sync.get("mode", async function (obj) {
  if (obj.mode !== undefined) {
    if (obj.mode === "light") {
      var link = document.createElement("link");
      link.href = "/extras/lightmode.css";
      link.rel = "stylesheet";
      link.className = "light";
      document.querySelector("html").appendChild(link);
      if (document.querySelector(".modeSwitch") !== null) {
        document.querySelector(".modeSwitch").src = "/extras/night.png";
      }
    }
  } else {
    var style = document.createElement("style");
    style.innerHTML = `
        body {
            transition: background-color .3s, color .3s;
        }
        
        .span {
            transition: background-color .3s;
        }
        
        input, .searchbar, button {
            transition: background-color .3s, color .3s;
        }
        
        .new, .recommended, .featured, .beta, .easter {
            transition: color .3s;
        }
        
        .slider {
            transition: background-color .3s;
        }
        
        .slider:before {
            transition: color .3s;
        }
        
        .creditNames {
            transition: color .3s;
        }
        
        .navbar {
            transition: background-color .3s, color .3s;
        }
        
        .message {
            transition: color .3s;
        }`;
    document.body.appendChild(style);
  }
});

if (document.querySelector(".modeSwitch") !== null) {
  document.querySelector(".modeSwitch").onclick = function () {
    if (document.querySelector("link.light") === null) {
      chrome.storage.sync.set({ mode: "light" });
      document.querySelector(".modeSwitch").src = "/extras/night.png";
      var link = document.createElement("link");
      link.href = "/extras/lightmode.css";
      link.rel = "stylesheet";
      link.className = "light";
      document.querySelector("html").appendChild(link);
    } else {
      chrome.storage.sync.set({ mode: "dark" });
      document.querySelector(".modeSwitch").src = "/extras/day.png";
      document.querySelector("link.light").remove();
    }
  };
}

if (document.querySelector(".message") !== null) {
  document.querySelector(".message").onclick = function () {
    chrome.tabs.create({
      active: true,
      url: "https://scratchtools.app/discord",
    });
  };
}

let easterEggClicks = 0;
if (document.querySelector(".easteregg") !== null) {
  document.querySelector(".easteregg").onclick = function () {
    easterEggClicks = easterEggClicks + 1;
    if (easterEggClicks === 5) {
      var style = document.createElement("style");
      if (document.querySelector(".navbar") === null) {
        var display = "block";
      } else {
        var display = "inline-block";
      }
      style.innerHTML = `
                .easter.tag {
                    display: inline-block;
                }

                .eastereggFeature {
                    display: ${display};
                }
            `;
      document.querySelector("html").appendChild(style);
    }
    if (easterEggClicks > 9) {
      document.querySelector("div.span").textContent =
        easterEggClicks.toString();
      document.querySelector(".navbar2").style.transition = "height .3s";
      document.querySelector(".navbar2").style.height = "500px";
      document.body.style.overflow = "hidden";
      document.body.style.transition = "height .3s";
      var s = document.querySelector(".easteregg").style;
      s.transition =
        "position .3s, height .3s, width .3s, left .3s, right .3s, top .3s, bottom .3s";
      s.position = "fixed";
      s.left = "40vw";
      s.top = "40%";
      s.width = "20vw";
      s.height = "20vw";
      function removeSettings() {
        document.querySelector("center").remove();
      }
      setTimeout(removeSettings, 300);
      var style = document.createElement("style");
      style.innerHTML = `
            .easteregg:hover {
                width: 30vw !important;
                height: 30vw !important;
                left: 35vw !important;
                top: 30%;
            }`;
      document.body.appendChild(style);
    }
  };
}

async function doStuff() {
  const response = await fetch("https://scratchtools.app/warning/");
  const data = await response.json();
  if (data["title"] !== " ") {
    console.log(data["color"]);
    var div = document.createElement("div");
    var title = data["title"];
    var title2 = document.createElement("h3");
    title2.style.color = color;
    title2.textContent = title;
    var description = data["description"];
    var description2 = document.createElement("p");
    description2.textContent = description;
    var color = data["color"];
    div.style.padding = "5px";
    div.style.margin = "0px";
    div.style.borderRadius = "10px";
    div.style.border = `2px solid ${color}`;
    div.appendChild(title2);
    div.appendChild(description2);
    if (data["button"] !== " ") {
      var button = document.createElement("button");
      button.addEventListener("click", openIndex);
      button.style.border = "0px";
      button.style.padding = "7px";
      button.style.borderRadius = "5px";
      button.style.backgroundColor = "#ff9f00";
      button.style.color = "white";

      function openIndex() {
        chrome.tabs.create({
          active: true,
          url: data["url"],
        });
      }
      button.textContent = data["button"];
      div.appendChild(button);
    }
    document.body.prepend(div);
  }
}
//doStuff()
function leaderboard() {
  chrome.tabs.create({
    active: true,
    url: "/extras/leaderboard.html",
  });
}

//document.querySelector('h3.leaderboard').onclick = function() {
//leaderboard()
//}

function again() {
  var abc = document.querySelector("center");
  var def = document.createElement("button");
  def.onclick = function () {
    chrome.tabs.create({
      active: true,
      url: "https://scratchtools.app/",
    });
  };
  def.textContent = "Website";
  def.style.border = "0px";
  def.style.padding = "7px";
  def.style.borderRadius = "5px";
  def.style.backgroundColor = "#ff9f00";
  def.style.color = "white";
  def.style.margin = "10px";
  abc.appendChild(def);

  var abc = document.querySelector("center");
  var def = document.createElement("button");
  def.onclick = function () {
    chrome.tabs.create({
      active: true,
      url: "https://discord.gg/B8be27p5Cn",
    });
  };
  def.textContent = "Discord";
  def.title = "Ages 13 and over!!";
  def.style.border = "0px";
  def.style.padding = "7px";
  def.style.borderRadius = "5px";
  def.style.backgroundColor = "#ff9f00";
  def.style.color = "white";
  def.style.margin = "10px";
  abc.appendChild(def);
}
//again()

document.querySelectorAll("h2.title.type").forEach(function (el) {
  el.onclick = function () {
    document.querySelectorAll("h2.title.type").forEach(function (elem) {
      elem.className = "title type";
    });
    el.className = "title type active";
    document.body.className = el.id;
    getFeaturesBySearch(document.querySelector("input").value);
  };
});

document
  .querySelector(".searchbarbutton")
  .addEventListener("click", function () {
    if (document.querySelector(".searchbar").value === "") {
      deleteAll();
      getFeatures();
    } else {
      getFeaturesBySearch(document.querySelector(".searchbar").value);
    }
  });

function createFeature(
  name,
  description,
  id,
  credits,
  def,
  tags,
  urls,
  type,
  options,
  enabled
) {
  if (
    document.body.className !== undefined &&
    document.body.className !== null &&
    document.body.className !== ""
  ) {
    console.log("passed checkpoint a");
    if (
      type.includes(document.body.className) ||
      document.body.className === "all"
    ) {
      console.log("passed checkpoint b");
      continueCreateFeature(
        name,
        description,
        id,
        credits,
        def,
        tags,
        urls,
        options,
        enabled
      );
    }
  } else {
    console.log("missed checkpoint a, continued anyway");
    continueCreateFeature(
      name,
      description,
      id,
      credits,
      def,
      tags,
      urls,
      options,
      enabled
    );
  }
  async function continueCreateFeature(
    name,
    description,
    id,
    credits,
    def,
    tags,
    urls,
    options,
    enabled
  ) {
    if (document.querySelector("div.enabled")) {
      while (document.querySelector("div.enabled").firstChild) {
        document.querySelector("div.enabled").firstChild.remove();
      }
    }
    var div23 = document.createElement("div");
    var item = div23;
    item.style.textAlign = "left";
    item.style.margin = "10px";
    //item.style.border = '2px solid #8e9091'
    item.style.padding = "5px";
    item.style.borderRadius = "7px";
    var h23 = document.createElement("h3");
    h23.textContent = name;
    h23.style.fontSize = "1.5em";
    h23.className = "featureTitle";
    var label23 = document.createElement("label");
    label23.className = "switch";
    var switch23 = document.createElement("input");
    switch23.type = "checkbox";
    switch23.id = id;
    await chrome.storage.sync.get("features", async function (obj) {
      if (obj["features"] !== undefined) {
        if (obj["features"].includes(switch23.id)) {
          switch23.checked = true;
        } else {
          switch23.checked = false;
        }
      } else {
        await chrome.storage.sync.set({
          features: "ok",
        });
        switch23.checked = false;
      }
    });
    console.log(getCookie("ST Features"));
    switch23.addEventListener("click", async function () {
      var response = await fetch("/features/features.json");
      var features = await response.json();
      await chrome.storage.sync.get("features", async function (obj) {
        console.log(obj["features"]);
        if (obj["features"].includes(switch23.id)) {
          console.log("false");
          await chrome.storage.sync.set({
            features: obj["features"].replaceAll(switch23.id, ""),
          });
          switch23.checked = false;
          features.forEach(function (el) {
            if (el.file === switch23.id) {
              if (el.dynamic) {
                chrome.tabs.query({}, function (tabs) {
                  for (var i = 0; i < tabs.length; i++) {
                    try {
                      chrome.scripting.executeScript({
                        args: [el.file],
                        target: { tabId: tabs[i].id },
                        func: disableFeature,
                        world: "MAIN",
                      });
                      function disableFeature(f) {
                        ScratchTools.disable(f);
                      }
                    } catch (err) {}
                  }
                });
              }
            }
          });
          if (switch23.id === "display-message-count-in-icon") {
            chrome.action.setBadgeText({ text: "" });
          }
        } else {
          if (switch23.id === "display-message-count-in-icon") {
            try {
              var response = await fetch(
                "https://scratch.mit.edu/messages/ajax/get-message-count/"
              );
              var data = await response.json();
              chrome.action.setBadgeText({ text: data.msg_count.toString() });
              chrome.action.setBadgeBackgroundColor({ color: "#ff9f00" });
            } catch (err) {
              chrome.action.setBadgeText({ text: "?" });
              chrome.action.setBadgeBackgroundColor({ color: "#ff9f00" });
            }
          }
          console.log("true");
          await chrome.storage.sync.set({
            features: obj["features"] + switch23.id,
          });
          switch23.checked = true;
          features.forEach(function (el) {
            if (el.file === switch23.id) {
              if (el.dynamic) {
                chrome.tabs.query({}, function (tabs) {
                  for (var i = 0; i < tabs.length; i++) {
                    try {
                      chrome.scripting.executeScript({
                        target: { tabId: tabs[i].id },
                        files: [`/features/${el.file}.js`],
                        world: "MAIN",
                      });
                    } catch (err) {}
                  }
                });
              }
            }
          });
        }
      });
    });
    await chrome.storage.sync.get("features", function (obj) {
      console.log(obj["features"]);
      label23.appendChild(switch23);
      div23.className = "feature";
      var span23 = document.createElement("span");
      span23.className = "slider round";
      label23.appendChild(span23);
      var tags2 = document.createElement("div");
      tags2.className = "tags";
      div23.appendChild(h23);
      div23.appendChild(tags2);
      div23.appendChild(document.createElement("br"));
      var description2 = document.createElement("h3");
      description2.style.marginTop = "-20px";
      description2.style.width = "250px";
      description2.textContent = description;
      var a = document.createElement("h3");
      a.innerHTML = `<span>Credits: <span>`;
      a.style.display = "inline-block";
      a.style.width = "70vw";
      credits.forEach(function (el, i) {
        var credit = document.createElement("a");
        credit.style.display = "inline-block";
        credit.onclick = function () {
          chrome.tabs.create({
            url: urls[i],
          });
        };
        credit.textContent = el;
        credit.style.cursor = "pointer";
        a.appendChild(credit);
        var span = document.createElement("span");
        span.textContent = ",   ";
        if (i !== credits.length - 1) {
          a.appendChild(span);
        }
        span.style.display = "inline-block";
        span.style.marginRight = "2px";
      });
      a.className = "creditNames";
      div23.appendChild(description2);
      div23.appendChild(label23);
      if (options !== undefined) {
        options.forEach(function (el) {
          var input = document.createElement("input");
          input.style.width = "40%";
          input.style.padding = "0.1vw";
          input.style.height = "2rem";
          input.placeholder = el.name;
          input.type = "text";
          input.id = el.id
          getFont();
          async function getFont() {
            await chrome.storage.sync.get(el.id, async function (obj) {
              try {
                if (obj[el.id]) {
                  input.value = obj[el.id];
                } else {
                  input.value = el.default
                }
              } catch (err) {
                console.log(err);
              }
            });
          }
          div23.appendChild(input);
        });
        var btn = document.createElement("button");
        btn.textContent = "Save";
        btn.style.width = "20%";
        btn.style.padding = "0.1vw";
        btn.style.height = "2rem";
        btn.style.marginLeft = "0.5vw";
        btn.onclick = async function () {
          div23.querySelectorAll("input").forEach(async function (el) {
            var input = el.id;
            var data = {};
            if (el.type === "checkbox") {
              data[input] = el.checked;
            } else {
              data[input] = el.value;
            }
            await chrome.storage.sync.set(data);
            chrome.tabs.query({}, function (tabs) {
              for (var i = 0; i < tabs.length; i++) {
                try {
            addData(i);
      async function addData(i) {
        var response = await fetch('/features/features.json')
        var data = await response.json()
        var allStorage = {};
        await data.forEach(async function (el) {
          if (el.options !== undefined) {
            await el.options.forEach(async function (option) {
              var test = await chrome.storage.sync.get(option.id);
              if (test[option.id] !== undefined) {
                var data = {};
                data[option.id] = test[option.id];
                chrome.scripting.executeScript({
                  args: [data],
                  target: { tabId: tabs[i].id },
                  func: getStorage,
                  world: "MAIN",
                });
              }
            });
          }
        });
      }
      function getStorage(storage) {
        ScratchTools.Storage[Object.keys(storage)[0]] =
          storage[Object.keys(storage)[0]];
      }
    } catch(err) {
      console.log(err)
    }
  }
})
          });
          btn.textContent = "Saved";
          setTimeout(fixButton, 1000);
          function fixButton() {
            btn.textContent = "Save";
          }
        };
        div23.appendChild(btn);
      }
      div23.appendChild(a);
      if (tags.includes("Egg")) {
        var div = document.createElement("div");
        div.className = "easter tag";
        div.textContent = "Easter Egg";
        tags2.appendChild(div);
        div23.className = div23.className + " eastereggFeature";
        if (switch23.checked) {
          if (document.querySelector(".navbar") === null) {
            div23.style.display = "block";
          } else {
            div23.style.display = "inline-block";
          }
          div.style.display = "inline-block";
        }
      }
      if (tags.includes("New")) {
        var div = document.createElement("div");
        div.className = "new tag";
        div.textContent = "New";
        tags2.appendChild(div);
      }
      if (tags.includes("Recommended")) {
        var div = document.createElement("div");
        div.className = "recommended tag";
        div.textContent = "Recommended";
        tags2.appendChild(div);
      }
      if (tags.includes("Featured")) {
        var div = document.createElement("div");
        div.className = "featured tag";
        div.textContent = "Featured";
        tags2.appendChild(div);
      }
      if (tags.includes("Beta")) {
        var div = document.createElement("div");
        div.className = "beta tag";
        div.textContent = "Beta";
        tags2.appendChild(div);
      }
      div23.appendChild(tags2);
      async function getWarnings() {
        var response = await fetch("/features/features.json");
        var data = await response.json();
        data.forEach(function (el) {
          if (el.file === id) {
            if (el.warning) {
              var warning = document.createElement("div");
              warning.textContent = el.warning;
              warning.className = "warning";
              div23.insertBefore(warning, div23.querySelector("label"));
            }
          }
        });
        var disabled = (await chrome.storage.sync.get("autoDisabled"))
          .autoDisabled;
        if (disabled && disabled.includes(id)) {
          var warning = document.createElement("div");
          warning.textContent =
            "This feature has been disabled remotely by ScratchTools. You can still enable/disable it, but, for safety reasons, it won't work for now.";
          warning.className = "warning disabled";
          div23.insertBefore(warning, div23.querySelector("label"));
        }
      }
      getWarnings();
      if (
        enabled &&
        document.querySelector("div.enabled") &&
        document.querySelector("input.searchbar").value.replaceAll(" ", "") ===
          ""
      ) {
        document.querySelector("div.enabled").appendChild(div23);
      } else {
        document.querySelector("div.settings").appendChild(div23);
      }
      if (
        !document.querySelector("input.searchbar").value.replaceAll(" ", "") ===
          "" &&
        document.querySelector("div.enabled")
      ) {
        while (document.querySelector("div.enabled").firstChild) {
          document.querySelector("div.enabled").firstChild.remove();
        }
      }
    });
  }
}

function deleteAll() {
  while (document.querySelector("div.settings").firstChild) {
    document.querySelector("div.settings").firstChild.remove();
  }
}
var lastValue = [""];
var input = document.querySelector("input");
//checkSearchBar();

function checkSearchBar() {
  if (
    lastValue[lastValue.length - 1] !== document.querySelector("input").value
  ) {
    lastValue.push(document.querySelector("input").value);
    if (input.value.replaceAll(" ", "") === "") {
      deleteAll();
      getFeatures();
    } else {
      getFeaturesBySearch(document.querySelector("input").value);
    }
  }
  setTimeout(checkSearchBar, 250);
}

async function getFeatures() {
  var response = await fetch("/features/features.json");
  var data = await response.json();
  var obj = await chrome.storage.sync.get("features");
  Object.keys(data).forEach(function (el) {
    if (obj.features.includes(data[el].file)) {
      createFeature(
        data[el].title,
        data[el].description,
        data[el].file,
        data[el].credits,
        data[el].default,
        data[el].tags,
        data[el].urls,
        data[el].type,
        data[el].options,
        true
      );
    } else {
      createFeature(
        data[el].title,
        data[el].description,
        data[el].file,
        data[el].credits,
        data[el].default,
        data[el].tags,
        data[el].urls,
        data[el].type,
        data[el].options
      );
    }
  });
}
getFeatures();

function getCookie(name) {}

document
  .querySelector("div.settings")
  .querySelectorAll("div")
  .forEach(function (item) {});
document
  .querySelector("div.settings")
  .querySelectorAll("h3")
  .forEach(function (item) {
    item.style.width = "720px";
    if (item.parentNode.firstChild === item) {
      item.style.color = "#2196F3";
    }
  });

function searchBar(s1, s2) {
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
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

if (document.querySelector("input.settingsButton") !== null) {
  document.querySelector("input.settingsButton").onclick = function () {
    chrome.tabs.create({
      url: "/extras/index.html",
    });
  };
}

async function getFeaturesBySearch(search) {
  var response = await fetch("/features/features.json");
  var data = await response.json();
  var allValues = [];
  var allStuff = [];
  var obj = await chrome.storage.sync.get("features");
  deleteAll();
  if (search.replaceAll(" ", "") !== "") {
    Object.keys(data).forEach(function (el) {
      if (
        searchBar(`${data[el].title}`.toLowerCase(), search.toLowerCase()) > 0.1
      ) {
        console.log(
          `${search} - ${data[el].title} - ${searchBar(
            `${data[el].title}`.toLowerCase(),
            search.toLowerCase()
          )}`
        );
        allValues.push(
          searchBar(`${data[el].title}`.toLowerCase(), search.toLowerCase())
        );
        allStuff.push(data[el]);
      }
    });
    if (allStuff.length === 0) {
      var i = document.createElement("i");
      i.textContent = "We couldn't find anything, maybe keep searching?";
      i.style.marginTop = "12vw";
      document.querySelector("div.settings").appendChild(i);
    } else {
      var top = [];
      var orderedStuff = [];
      while (allValues.join("").toString().replaceAll("0", "") !== "") {
        top.push(0);
        allValues.forEach(function (el, i) {
          if (allValues[top[top.length - 1]] < el) {
            top.push(i);
          }
        });
        if (allStuff[top[top.length - 1]]["tags"] !== undefined) {
          var tags = allStuff[top[top.length - 1]]["tags"];
        } else {
          var tags = [];
        }
        createFeature(
          allStuff[top[top.length - 1]]["title"],
          allStuff[top[top.length - 1]]["description"],
          allStuff[top[top.length - 1]]["file"],
          allStuff[top[top.length - 1]]["credits"],
          allStuff[top[top.length - 1]]["default"],
          tags,
          allStuff[top[top.length - 1]]["urls"],
          allStuff[top[top.length - 1]]["type"],
          allStuff[top[top.length - 1]]["options"]
        );
        allValues[top[top.length - 1]] = "";
        allStuff[top[top.length - 1]] = "";
      }
    }
  } else {
    Object.keys(data).forEach(function (el) {
      createFeature(
        data[el].title,
        data[el].description,
        data[el].file,
        data[el].credits,
        data[el].default,
        data[el].tags,
        data[el].urls,
        data[el].type,
        data[el].options
      );
    });
  }
}

if (document.querySelector("h2.feedback") !== null) {
  document.querySelector("h2.feedback").onclick = function () {
    chrome.tabs.create({ url: "https://scratchtools.app/feedback/" });
  };
}

document.querySelector('.searchbar').addEventListener('keyup', function(e) {
  if (e.which === 13) {
  document.querySelector('.searchbarbutton').click()
  }
})

async function getNews() {
  try {
    var response = await fetch("https://raw.githubusercontent.com/STForScratch/data/main/news.json");
    var data = await response.json();
    data.forEach(function (el) {
      var div = document.createElement("div");
      div.className = "note " + el.color;
      var h3 = document.createElement("h3");
      h3.innerHTML = el.title;
      var span = document.createElement("span");
      span.innerHTML = el.description;
      div.appendChild(h3);
      div.appendChild(span);
      document.querySelector(".news").appendChild(div);
    });
  } catch (err) {}
}
getNews();
