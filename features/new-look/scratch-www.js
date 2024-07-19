export default async function ({ feature }) {
    
    let v = await ScratchTools.waitForElement(".view")
    v.style.background = ScratchTools.Storage.theme
  }