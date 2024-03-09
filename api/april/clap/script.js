export default function () {
  ScratchTools.waitForElements(".flex-row.stats", function (row) {
    if (row.querySelector(".ste-clap")) return;

    let div = document.createElement("div");
    div.className = "project-claps";
    div.textContent = Math.ceil(
      Number(row.querySelector(".project-views").textContent) / 3
    ).toString();
    div.addEventListener("click", function() {
        var snd = new Audio("https://assets.scratch.mit.edu/83c36d806dc92327b9e7049a565c6bff.wav");
snd.play();
    })

    row.insertBefore(div, row.querySelector(".project-remixes"));

    insertStyles();
  });

  function insertStyles() {
    let text =
      '.project-claps {cursor: pointer;display: flex;padding-right: 2rem;font-size: 1rem;font-weight: bold;align-items: center;}.project-claps:before {display: inline-block;margin-right: .5rem;background-repeat: no-repeat;background-position: center center;background-size: contain;width: 1.75rem;height: 1.75rem;content: "";filter: grayscale(1);background-image: url(https://assets.scratch.mit.edu/get_image/.%2E/f2a6327725fe174fae9f40bad1439b67.png);}';
    let style = document.createElement("style");
    style.textContent = text;
    document.body.appendChild(style);
  }
}
