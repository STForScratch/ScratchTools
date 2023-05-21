if (!document.querySelector(".location").className.includes(" scratchtools")) {
  getapi2(
    `https://api.${window.location.href.replaceAll(
      "https://",
      ""
    )}messages/count`
  );
  async function getapi2(url) {
    if (!document.querySelector(".ste-messagecount")) {
      // Storing response
      const response = await fetch(url);

      // Storing data in form of JSON
      var data = await response.json();
      console.log(data);
      var stuff = data["count"];
      var span = document.createElement("span");
      span.className = "ste-messagecount";
      span.textContent = `${stuff} Messages`;
      span.title = "This was added by ScratchTools.";
      span.style.borderLeft = "1px solid #ccc";
      span.style.paddingLeft = "5px";
      span.style.marginLeft = "5px";
      span.setScratchTools();

      if (document.querySelector(".ste-isonline")) {
        document
          .querySelector(".location")
          .insertBefore(span, document.querySelector(".ste-isonline"));
      } else {
        document.querySelector(".location").appendChild(span);
      }
    }
  }
}
