export default async function ({ feature, console }) {
  let currentSearch = null;

  let colors = await (
    await fetch(feature.self.getResource("tag-colors"))
  ).json();

  ScratchTools.waitForElements(".scratchCommentTextarea", function (text) {
    updateTags(text);
    if (text.dataset.steTracker) return;
    text.dataset.steTracker = "tracking";
    text.addEventListener("input", function () {
      updateTags(text);
    });
  });

  let ul = await ScratchTools.waitForElement(
    "ul[class^='react-tabs_react-tabs__tab-list_']"
  );
  if (!ul.querySelector(".ste-clear-search")) {
    let clearSearch = document.createElement("div");
    clearSearch.className = "ste-clear-search";
    clearSearch.textContent = feature.msg("clear-search");
    clearSearch.style.display = "none";
    ul.appendChild(clearSearch);

    clearSearch.addEventListener("click", function () {
      currentSearch = null;
      clearSearch.style.display = "none";
      document.querySelectorAll(".blocklyDraggable").forEach(function (el) {
        el.classList.remove("ste-hide-search");
        if (el.parentElement.firstChild.tagName === "line") {
          el.parentElement.classList.remove("ste-hide-search")
        }
      });
    });
  }

  ScratchTools.waitForElements(".blocklyDraggable", function (el) {
    if (!currentSearch) return;
    if (
      [...el.querySelectorAll("textarea")].find((el) =>
        el.value?.match(/#\w+/g)?.includes(currentSearch)
      )
    ) {
      el.classList.remove("ste-hide-search");
      if (el.parentElement.firstChild.tagName === "line") {
        el.parentElement.classList.remove("ste-hide-search")
      }
    } else {
      el.classList.add("ste-hide-search");
      if (el.parentElement.firstChild.tagName === "line") {
        el.parentElement.classList.add("ste-hide-search")
      }
    }
  });

  function updateTags(text) {
    if (text.value.match(/#\w+/g)) {
      if (currentSearch) {
        if (text.value.match(/#\w+/g).includes(currentSearch)) {
          text.parentElement.parentElement.parentElement.classList.remove(
            "ste-hide-search"
          );
        } else {
          text.parentElement.parentElement.parentElement.classList.add(
            "ste-hide-search"
          );
        }
      }
      if (text.parentElement.querySelector(".ste-comment-tags")) {
        text.parentElement.querySelector(".ste-comment-tags").innerHTML = "";
        text.value.match(/#\w+/g).forEach(function (tag) {
          let span = document.createElement("span");
          span.textContent = tag;
          span.style.backgroundColor =
            colors[tag.toLowerCase().split("")[1]]?.bg || "#434445";
          span.style.color =
            colors[tag.toLowerCase().split("")[1]]?.text || "white";
          text.parentElement
            .querySelector(".ste-comment-tags")
            .appendChild(span);

          span.addEventListener("click", function () {
            currentSearch = tag;
            document.querySelector(".ste-clear-search").style.display = null;
            document
              .querySelectorAll(".blocklyDraggable")
              .forEach(function (el) {
                if (
                  [...el.querySelectorAll("textarea")].find((el) =>
                    el.value?.match(/#\w+/g)?.includes(tag)
                  )
                ) {
                  el.classList.remove("ste-hide-search");
                  if (el.parentElement.firstChild.tagName === "line") {
                    el.parentElement.classList.remove("ste-hide-search")
                  }
                } else {
                  el.classList.add("ste-hide-search");
                  if (el.parentElement.firstChild.tagName === "line") {
                    el.parentElement.classList.add("ste-hide-search")
                  }
                }
              });
          });
        });
      } else {
        let div = document.createElement("div");
        div.className = "ste-comment-tags";
        text.parentElement.appendChild(div);
        text.value.match(/#\w+/g).forEach(function (tag) {
          let span = document.createElement("span");
          span.textContent = tag;
          span.style.backgroundColor =
            colors[tag.toLowerCase().split("")[1]]?.bg || "#434445";
          span.style.color =
            colors[tag.toLowerCase().split("")[1]]?.text || "white";
          div.appendChild(span);

          span.addEventListener("click", function () {
            currentSearch = tag;
            document.querySelector(".ste-clear-search").style.display = null;
            document
              .querySelectorAll(".blocklyDraggable")
              .forEach(function (el) {
                if (
                  [...el.querySelectorAll("textarea")].find((el) =>
                    el.value?.match(/#\w+/g)?.includes(tag)
                  )
                ) {
                  el.classList.remove("ste-hide-search");
                  if (el.parentElement.firstChild.tagName === "line") {
                    el.parentElement.classList.remove("ste-hide-search")
                  }
                } else {
                  el.classList.add("ste-hide-search");
                  if (el.parentElement.firstChild.tagName === "line") {
                    el.parentElement.classList.add("ste-hide-search")
                  }
                }
              });
          });
        });
      }
    } else {
      text.parentElement.querySelector(".ste-comment-tags")?.remove();
    }
  }
}
