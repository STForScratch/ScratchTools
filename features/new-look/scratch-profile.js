export default async function ({ feature }) {
    let player = await ScratchTools.waitForElement(".user-content div.player");
    let pdata = await ScratchTools.waitForElement(".profile-data .box-head");
    pdata.appendChild(player)
    player.remove()
    if (feature.self.enabled) {
      docume.querySelector("h4").textContent = "Dumpster Fire";
    }
  
    feature.addEventListener("disabled", function () {
      box.querySelector("h4").textContent = oldContent;
    });

    feature.addEventListener("enabled", function () {
      box.querySelector("h4").textContent = "Dumpster Fire";
    });
  }
  
