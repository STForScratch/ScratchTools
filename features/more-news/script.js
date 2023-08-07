export default async function ({ feature, console }) {
  let news = await ScratchTools.waitForElement(".splash-header > .news ul");

  let button = document.createElement("button");
  button.textContent = "Load More";
  button.classList.add("button");
  button.classList.add("ste-load-more-news");
  feature.self.hideOnDisable(button);

  let offset = 3;

  news.appendChild(button);
  button.addEventListener("click", async function () {
    button.style.display = "none";
    let data = await (
      await fetch(
        `https://api.scratch.mit.edu/news?offset=${offset.toString()}`
      )
    ).json();
    if (data.length === 20) {
      button.style.display = null;
    }
    offset += 20;
    data.forEach(function (item) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = item.url;
      li.appendChild(a);

      let img = document.createElement("img");
      img.className = "news-image";
      img.src = item.image;
      img.height = 54;
      a.appendChild(img);

      let div = document.createElement("div");
      div.className = "news-description";
      a.appendChild(div);

      let h4 = document.createElement("h4");
      h4.textContent = item.headline;
      div.appendChild(h4);

      let p = document.createElement("p");
      p.textContent = item.copy;
      div.appendChild(p);

      feature.self.hideOnDisable(li);
      news.insertBefore(li, button);
    });
  });
}
