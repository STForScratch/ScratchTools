export default async function ({ feature, console, className }) {
  const FORMATTED_CLASS = className("formatted newline comment");

  // 2.0 comments
  feature.page.waitForElements(
    "ul.comments .comment .info",
    function (comment) {
      if (comment.querySelector(".content." + FORMATTED_CLASS)) return;
      const content = comment.querySelector(".content");

      const clonedContent = content.cloneNode(true);
      clonedContent.classList.add(FORMATTED_CLASS);
      comment.insertBefore(clonedContent, content);
      feature.self.hideOnDisable(clonedContent);
      trimCommentText(clonedContent);
    }
  );

  function trimCommentText(el) {
    let first = el.firstChild;
    while (
      first &&
      first.nodeType === Node.TEXT_NODE &&
      !first.textContent.trim()
    ) {
      el.removeChild(first);
      first = el.firstChild;
    }

    if (first) {
      if (first.nodeType === Node.ELEMENT_NODE && first.tagName === "A") {
        let afterA = first.nextSibling;
        if (afterA && afterA.nodeType === Node.TEXT_NODE) {
          afterA.textContent = afterA.textContent.replace(/^\s+/, " "); // ensure 1 space
        } else if (!afterA || afterA.nodeType !== Node.TEXT_NODE) {
          first.after(document.createTextNode(" "));
        }
      } else if (first.nodeType === Node.TEXT_NODE) {
        first.textContent = first.textContent.replace(/^\s+/, "");
      }
    }

    let last = el.lastChild;
    while (
      last &&
      last.nodeType === Node.TEXT_NODE &&
      !last.textContent.trim()
    ) {
      el.removeChild(last);
      last = el.lastChild;
    }
    if (last && last.nodeType === Node.TEXT_NODE) {
      last.textContent = last.textContent.replace(/\s+$/, "");
    }
  }
}
