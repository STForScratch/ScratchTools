document.querySelectorAll("body > *").forEach(function (el) {
  el.remove();
});
document.body.style.backgroundColor = "white";
document.body.style.textAlign = "center";
document.body.style.padding = "3rem";
var h1 = document.createElement("h1");
h1.textContent = "Verifying...";
document.body.appendChild(h1);
h1.style.fontFamily = "Inter";
h1.style.color = "#ff9f00";
var style = document.createElement("style");
style.textContent =
  '@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");';
document.body.appendChild(style);
var p = document.createElement("p");
p.textContent =
  "ScratchTools is currently verifying you with our servers. It should only take a short moment.";
p.style.color = "black";
p.style.opacity = ".5";
p.style.fontSize = "1rem";
document.body.appendChild(p);

let locations = {
  dashboard: function ({ token, username }) {
    chrome.runtime.sendMessage(steSupportId, {
      msg: "openDashboardPage",
      token,
      username,
    });
  },
  feedback: function ({ token }) {
    chrome.runtime.sendMessage(steSupportId, {
      msg: "openFeedbackPage",
      token,
    });
  },
  support: function ({ token }) {
    chrome.runtime.sendMessage(steSupportId, { msg: "openSupportChat", token });
  },
};

async function verify() {
  let privateCode = new URLSearchParams(window.location.search).get(
    "privateCode"
  );
  let data = await (
    await fetch(`https://data.scratchtools.app/verify/?code=${privateCode}`)
  ).json();

  if (data.error) {
    h1.textContent = "An error ocurred";
    p.textContent = "There was an issue with your verification.";
  } else {
    let { token, username } = data;
    let system = new URLSearchParams(window.location.search).get("system");
    h1.textContent = "Verified";
    p.textContent = "Now logging you into ScratchTools...";
    locations[system]({ token, username });
  }
}
verify();
