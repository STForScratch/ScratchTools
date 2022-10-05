// get cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
// get cookie
if (window.location.href.includes("https://scratch.mit.edu/projects/")) {
  if (window.location.href.includes("editor")) {
    if (getCookie("ST Features").includes("remove-editor-icons")) {
      addclick2();
      function addclick2() {
        if (document.querySelector("#react-tabs-0 > img") === null) {
          window.setTimeout(addclick2, 50);
        } else {
          document.querySelector("#react-tabs-0 > img").remove();
          document.querySelector("#react-tabs-2 > img").remove();
          document.querySelector("#react-tabs-4 > img").remove();
        }
      }
    }
    function checkFlag() {
      if (
        document.querySelector(
          "#app > div > div.gui_menu-bar-position_3U1T0.menu-bar_menu-bar_JcuHF.box_box_2jjDp > div.menu-bar_main-menu_3wjWH"
        ) === null
      ) {
        window.setTimeout(
          checkFlag,
          100
        ); /* this checks the flag every 100 milliseconds*/
      } else {
        if (getCookie("ST Features").includes("watermark")) {
          document
            .querySelector(
              "#react-tabs-1 > div.gui_watermark_3vBYb.box_box_2jjDp > img"
            )
            .remove();
        }
      }
    }

    checkFlag();
    checkFlag2();
  }
}
