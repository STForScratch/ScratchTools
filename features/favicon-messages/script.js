export default async function ({ feature, console }) {
  function drawNotification(canvas, text) {
    var ctx = canvas.getContext("2d");

    var favicon = new Image();
    favicon.src = "/favicon.ico";
    favicon.onload = function () {
      ctx.drawImage(favicon, 0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width - 10, 14, 8, 0, 2 * Math.PI);
      ctx.fillStyle = "#ff9f00";
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "bold " + 10 / (text.length * .4) + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width - 10, 14);

      var newFavicon = canvas.toDataURL("image/png");
      var link = document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = newFavicon;
      document.head.appendChild(link);
    };
  }

  window.setFaviconCount = setFaviconCount
  async function setFaviconCount(count) {
    var canvas = document.createElement("canvas");
    canvas.width = 20;
    canvas.height = 20;

    let data = await (
      await fetch(
        "https://scratch.mit.edu/messages/ajax/get-message-count/?scratchtools=" +
          Date.now().toString()
      )
    ).json();
    drawNotification(canvas, count?.toString() || data.msg_count.toString());
  }

  let interval = setInterval(setFaviconCount, 60000);
  setFaviconCount();

  feature.addEventListener("disabled", function () {
    clearInterval(interval);

    var link = document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = "/favicon.ico";
    document.head.appendChild(link);
  });

  feature.addEventListener("enabled", function () {
    interval = setInterval(setFaviconCount, 60000);
    setFaviconCount()
  });
}
