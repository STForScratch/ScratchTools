async function submit() {
  if (document.querySelector("textarea.feedback").value) {
    document.querySelector("button").style.display = "none";
    var featuresData =
      (await chrome.storage.sync.get("features")).features || "";
    const data = await (
      await fetch("https://data.scratchtools.app/create/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: featuresData }),
      })
    ).json();
    const send = await (
      await fetch("https://data.scratchtools.app/verified-feedback/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: document.querySelector("textarea").value,
          settings: data.code,
          useragent: navigator.userAgent,
          version: chrome.runtime.getManifest().version_name,
          token: new URLSearchParams(new URL(window.location.href).search).get(
            "code"
          ),
        }),
      })
    ).json();
    if (data.error) {
      document.querySelector("button").style.display = null;
      alert(data.error);
    } else {
      document.querySelector(".submission-successful").style.display = null;
      document.querySelector("textarea").style.display = "none";
    }
  } else {
    alert("Please make sure that you've entered valid feedback.");
  }
}

document.querySelector("button").onclick = submit;

async function getMessages() {
  var data = await (
    await fetch("https://data.scratchtools.app/get-messages/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: new URLSearchParams(new URL(window.location.href).search).get(
          "code"
        ),
      }),
    })
  ).json();
  if (data.error) {
    window.location.href =
      "https://scratch.mit.edu/scratchtools/feedback/auth/";
  } else {
    data.forEach(function (el) {
      var div = document.createElement("div");
      div.className = "msg";

      var h3 = document.createElement("h3");
      h3.textContent = `${
        el.unread ? "Unread Message" : "Message"
      } from ${new Date(el.time).toLocaleString()}`;
      div.appendChild(h3);

      var p = document.createElement("p");
      p.textContent = el.message;
      div.appendChild(p);

      if (el.unread) {
        div.classList.add("unread");
      }
      document.querySelector(".messages").prepend(div);
    });
    if (!data.length) {
      var i = document.createElement("i");
      i.textContent = "You have no messages.";
      document.querySelector(".messages").appendChild(i);
    }
  }
}
getMessages();
