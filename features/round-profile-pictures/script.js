var roundness = ScratchTools.Storage["Round Percentage"];
if (!roundness.includes("%")){roundness = roundness.concat("%");}
function roundProfile() {
  document.querySelectorAll("img").forEach(function (el) {
    if (el.src !== undefined) {
      if (el.src.includes("scratch.mit.edu/get_image/user/")) {
		el.style.borderRadius = roundness;
      }
    }
	document.querySelectorAll(".mod-social-message").forEach(function (mod) {
		mod.style.paddingLeft = ".825rem";
		el.style.paddingRight = "0rem";
	});
});
window.setTimeout(roundProfile, 80);
}
roundProfile();