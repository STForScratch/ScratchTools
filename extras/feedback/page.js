document.querySelectorAll("body > *").forEach(function (el) {
    el.remove();
  });
  document.body.style.backgroundColor = "white";
  document.body.style.textAlign = "center";
  document.body.style.padding = "3rem";
  var h1 = document.createElement("h1");
  h1.textContent = "ScratchTools Authentication";
  document.body.appendChild(h1);
  h1.style.fontFamily = "Inter";
  h1.style.color = "#ff9f00";
  var style = document.createElement("style");
  style.textContent =
    '@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");';
  document.body.appendChild(style);
  var p = document.createElement("p");
  p.textContent = "Thank you for your patience while we authorize you.";
  p.style.color = "black";
  p.style.opacity = ".5";
  p.style.fontSize = "1rem";
  document.body.appendChild(p);
  
  var verifyUser = async function (callback) {
    var code = await (
      await fetch(`https://data.scratchtools.app/verification/code/`)
    ).json();
    var PROJECT_ID = "854593681";
    var user = Scratch.INIT_DATA.LOGGED_IN_USER.model.username;
    var connection = new WebSocket("wss://clouddata.scratch.mit.edu");
    connection.onerror = console.error;
    connection.onopen = async () => {
      connection.send(
        JSON.stringify({ method: "handshake", project_id: PROJECT_ID, user }) +
          "\n"
      );
      await new Promise((r) => setTimeout(r, 100));
      connection.send(
        JSON.stringify({
          value: code.code.toString(),
          name: "☁ verify",
          method: "set",
          project_id: PROJECT_ID,
          user,
        }) + "\n"
      );
      connection.close();
      var data = await (
        await fetch("https://data.scratchtools.app/verify/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ secret: code.secret }),
        })
      ).json();
      callback(data.code);
    };
  };
  
  verifyUser(function (code) {
      chrome.runtime.sendMessage(steSupportId, { msg: "openFeedbackPage", code });
  });
  