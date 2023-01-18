if (
  !document.querySelector(".scratchtoolsLoadMorePosts") &&
  document.querySelector("#djangobbindex > .blockpost.roweven")
) {
  let lastPost = Number(
    document.querySelectorAll(".pagination > *")[
      document.querySelectorAll(".pagination > *").length - 2
    ].textContent
  );
  var params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let page = Number(params.page || "1");
  if (page !== lastPost) {
    var btn = document.createElement("button");
    btn.textContent = "Load More";
    btn.onclick = getNextPage;
    btn.className = "button scratchtoolsLoadMorePosts";
    btn.style.paddingLeft = ".5rem";
    btn.style.paddingRight = ".5rem";
    document.querySelector(".linksb").appendChild(btn);
    async function getNextPage() {
      page = page + 1;
      if (page === lastPost) {
        btn.remove();
      }
      var html = await (
        await fetch(
          "https://scratch.mit.edu/discuss/topic/463499/?page=" +
            page.toString()
        )
      ).text();
      var div = document.createElement("div");
      div.innerHTML = html.replaceAll("<!DOCTYPE html>", "");
      var el = div.querySelector("#djangobbindex");
      el.querySelectorAll("#djangobbindex > .blockpost.roweven").forEach(
        function (element) {
          document
            .querySelectorAll("#djangobbindex > .blockpost.roweven")
            [
              document.querySelectorAll("#djangobbindex > .blockpost.roweven")
                .length - 1
            ].after(element);
        }
      );
    }
  }
}
