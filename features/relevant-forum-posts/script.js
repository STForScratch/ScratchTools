export default async function ({ feature, console }) {
  if (window.location.pathname.split("/")[4] !== "add") return;

  let input = await ScratchTools.waitForElement("input#id_name");
  input.addEventListener("focusout", async function () {
    if (!feature.self.enabled) return;
    if (!input.value) return;
    let data = await fetchRelevantPosts(input.value);
    if (document.querySelector(".ste-relevant-posts")) {
      document.querySelector(".ste-relevant-posts").remove();
    }
    if (data.length !== 0) {
      data.length = 10;
      let div = document.createElement("div");
      div.className = "ste-relevant-posts";
      feature.self.hideOnDisable(div)

      let postIds = [];

      data.forEach(function (post) {
        if (!postIds.find((el) => el === post.topic.id)) {
          postIds.push(post.topic.id);
          let a = document.createElement("a");
          a.href = `/discuss/topic/${post.topic.id}/`;

          let h3 = document.createElement("h3");
          h3.textContent = post.topic.title;

          let p = document.createElement("p");
          p.innerHTML = post.content.html;
          p.textContent = p.textContent.slice(0, 100);

          let category = document.createElement("p");
          category.textContent = post.topic.category;
          category.className = "ste-relevant-category"

          a.appendChild(h3);
          a.appendChild(p);
          a.appendChild(category);

          div.appendChild(a);
        }
      });

      input.parentNode.parentNode.insertBefore(
        div,
        input.parentNode.nextSibling
      );
    }
  });

  async function fetchRelevantPosts(content) {
    let data = await (
      await fetch(
        `https://scratchdb.lefty.one/v3/forum/search/?q=${content
          .replaceAll("?", "")
          .replaceAll("#", "")
          .replaceAll("&", "")}&o=relevance&page=0`
      )
    ).json();
    return data.posts;
  }
}
