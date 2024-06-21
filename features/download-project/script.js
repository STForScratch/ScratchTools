export default async function ({ feature, console }) {
  ScratchTools.waitForElements(
    ".preview .inner .flex-row.action-buttons",
    async function (row) {
      if (row.querySelector(".ste-download")) return;
      let button = document.createElement("button");
      button.className = "button action-button ste-download";
      button.textContent = "Download"
      button.addEventListener("click", async function () {
        let { title } = feature.redux.getState().preview.projectInfo;
        saveBlob(await feature.traps.vm.saveProjectSb3(), title + ".sb3");
      });
      row.appendChild(button)

      window.feature = feature;
      var saveBlob = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (blob, fileName) {
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        };
      })();
    }
  );
}
