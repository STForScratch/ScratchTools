export default async function ({ feature }) {
  let box = await ScratchTools.waitForElement(".inner.mod-splash > .box");

  if (box.className.includes("scratchtoolsCustomStudio")) {
    box = box.nextSibling;
  }

  let oldContent = box.querySelector("h4").textContent;
  if (feature.self.enabled) {
    box.querySelector("h4").textContent = "Dumpster Fire";
  }

  feature.addEventListener("disabled", function () {
    box.querySelector("h4").textContent = oldContent;
  });

  feature.addEventListener("enabled", function () {
    box.querySelector("h4").textContent = "Dumpster Fire";
  });
}
