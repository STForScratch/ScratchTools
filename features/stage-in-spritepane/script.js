export default async function ({ feature, console }) {
    const stage = await ScratchTools.waitForElement("div.target-pane_stage-selector-wrapper_qekSW");
    stage.classList.add("ste-stage_in_spritepane");
    document.getElementsByClassName("sprite-info_sprite-info_3EyZh")[0].appendChild(stage);
}