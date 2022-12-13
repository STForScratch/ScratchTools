ScratchTools.waitForElements(
  ".flex-row.remix-credit",
  function (el) {
    el.querySelector("img").remove();
    var title = el.querySelector("[href^='/projects/']").textContent;
    var link = el.querySelector("[href^='/projects/']").href;
    var a = document.createElement("a");
    a.textContent = title;
    a.href = link;
    el.textContent = "Original project: ";
    a.style.marginLeft = ".25rem";
    el.appendChild(a);
  },
  "minimizedRemixCredits",
  false
);
