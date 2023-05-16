update(
  chrome.runtime.getManifest().version_name,
  chrome.i18n.getMessage("newest_update_message") ||
    "This new version includes a few cool new features, as well as multiple bug fixes! One feature, Unlisted Projects, allows you to create special links for your unshared projects that allow other people to view them!"
);
function update(updateVersion, updateDescription) {
  if (document.querySelector(".scratchtoolsUpdateInfo") === null) {
    var box = document.createElement("div");
    box.className = "box scratchtoolsUpdateInfo";
    box.style.zIndex = "9999999999999999999999999999";
    var boxHeader = document.createElement("div");
    boxHeader.className = "box-header";
    var boxContent = document.createElement("div");
    boxContent.className = "box-content";
    box.appendChild(boxHeader);
    box.appendChild(boxContent);
    var title = document.createElement("h4");
    title.textContent = "What's New in ScratchTools " + updateVersion;
    title.style.color = "#575e75";
    var p = document.createElement("p");
    p.textContent = updateDescription;
    p.style.color = "#575e75";
    boxContent.appendChild(p);
    boxHeader.appendChild(title);
    box.style.position = "fixed";
    box.style.left = "2rem";
    box.style.bottom = "2rem";
    box.style.position = "fixed";
    box.style.left = "2rem";
    box.style.bottom = "2rem";
    boxContent.style.padding = "8px 20px";
    boxHeader.style.padding = "8px 20px";
    document.body.appendChild(box);
    boxHeader.style.display = "block";
    boxHeader.style.clear = "both";
    boxHeader.style.margin = "0";
    boxHeader.style.borderTop = "1px solid #fff";
    boxHeader.style.borderBottom = "1px solid #d9d9d9";
    boxHeader.style.borderRadius = "10px 10px 0 0";
    boxHeader.style.backgroundColor = "#f2f2f2";
    boxHeader.style.padding = "8px 20px";
    boxHeader.style.height = "20px";
    boxHeader.style.overflow = "hidden";
    boxContent.style.backgroundColor = "#fff";
    box.style.display = "inline-block";
    box.style.border = "1px solid #d9d9d9";
    box.style.borderRadius = "10px 10px 0 0";
    box.style.backgroundColor = "#fff";
    boxContent.style.padding = "8px 20px";
    boxHeader.style.padding = "8px 20px";
    var button = document.createElement("button");
    button.className = "button";
    button.onclick = function () {
      box.remove();
    };
    button.textContent = "Close";
    boxContent.appendChild(button);
    box.style.width = "40vw";
    document.body.appendChild(box);
  }
}
