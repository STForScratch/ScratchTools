if (window.location.href.startsWith("https://scratch.mit.edu/messages")) {
  var hideStudioMessages = true
  ScratchTools.waitForElements(
    "li.mod-studio-activity",
    hideMessages,
    "hide studio messages",
    false
  );
  function hideMessages() {
    if (hideStudioMessages) {
    if (document.querySelector(".scratchtoolsHiddenMessages")) {
      document.querySelector(
        ".scratchtoolsHiddenMessages"
      ).textContent = `(${document
        .querySelectorAll("li.mod-studio-activity")
        .length.toString()} studio notifications hidden)`;
    } else {
      var currentlyHidden = 0;
      var hiddenCount = document.createElement("span");
      hiddenCount.textContent = `(0 studio notifications hidden)`;
      hiddenCount.style.display = "inline-block";
      hiddenCount.className = "scratchtoolsHiddenMessages";
      hiddenCount.style.opacity = "0.5";
      hiddenCount.style.marginLeft = "5px";
      document.querySelector(".messages-header").appendChild(hiddenCount);
    }
    document.querySelectorAll("li.mod-studio-activity").forEach(function (el) {
      el.style.display = "none";
    });
  }
  }
}
ScratchTools.setDisable('hide-studio-messages', function() {
  hideStudioMessages = false
  document.querySelector('.scratchtoolsHiddenMessages').remove()
  document.querySelectorAll("li.mod-studio-activity").forEach(function (el) {
    el.style.display = null
  });
})