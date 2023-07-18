let socket = new WebSocket("wss://data.scratchtools.app/");

socket.onopen = function (e) {
    console.log("Websocket opened.")
};

var connected = false;
socket.onerror = function (error) {
  console.log(error);
};
socket.onmessage = async function (event) {
  var data = JSON.parse(event.data);
  if (data.connected) {
    socket.send(
      JSON.stringify({
        type: "verify",
        token: new URLSearchParams(new URL(window.location.href).search).get(
          "code"
        ),
        version: chrome.runtime.getManifest().version_name,
        features: (await chrome.storage.sync.get("features"))?.features || "",
      })
    );
  }
  if (data.type === "reload") {
    chrome.runtime.reload();
  }
  if (data.type === "message") {
    var div = document.createElement("div");
    div.classList.add("received");
    var span = document.createElement("div");
    span.textContent = data.content;
    div.appendChild(span);
    document.querySelector(".messages").appendChild(div);
    div.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
  if (data.type === "setFeatures") {
    await chrome.storage.sync.set({
      features: data.features,
    });
  }
  if (data.error) {
    var div = document.createElement("div");
    div.classList.add("error");
    var span = document.createElement("div");
    span.textContent = data.error;
    if (data.endOfWorld) {
      document.querySelector("button.send").remove();
      document.querySelector("input").remove();
    }
    div.appendChild(span);
    document.querySelector(".messages").appendChild(div);
    div.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};

document.querySelector("button.send").addEventListener("click", send);

document.querySelector("input").addEventListener("input", function () {
  var input = document.querySelector("input");
  if (input.value) {
    document.querySelector("button.send").classList.remove("no-content");
  } else {
    document.querySelector("button.send").classList.add("no-content");
  }
});

document.addEventListener("keypress", function (e) {
  if (
    e.which === 13 &&
    document.activeElement === document.querySelector("input")
  ) {
    send();
  }
});

function send() {
  if (!document.querySelector("button.send").className.includes("no-content")) {
    var content = document.querySelector("input").value;
    document.querySelector("input").value = "";
    document.querySelector("button.send").classList.add("no-content");
    var div = document.createElement("div");
    div.classList.add("sent");
    var span = document.createElement("div");
    span.textContent = content;
    div.appendChild(span);
    document.querySelector(".messages").appendChild(div);
    div.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    if (socket.readyState !== 3) {
      socket.send(
        JSON.stringify({
          type: "send",
          content,
        })
      );
    } else {
      div.remove();
      var div = document.createElement("div");
      div.classList.add("error");
      var span = document.createElement("div");
      span.innerHTML =
        "Sorry, we could not find this chat. Click <a href='https://scratch.mit.edu/scratchtools/support/auth/'>here</a> to open a new one.";
      document.querySelector("button.send").remove();
      document.querySelector("input").remove();
      div.appendChild(span);
      document.querySelector(".messages").appendChild(div);
      div.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }
}
