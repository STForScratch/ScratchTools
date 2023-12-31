let USERNAME = new URLSearchParams(window.location.search).get("username");
let TOKEN = new URLSearchParams(window.location.search).get("code");

let EMOJI_PICKER = document.querySelector("input.emoji");
let DN_INPUT = document.querySelector("input.displayname")
let UPDATE_BTN = document.querySelector("div.update button")

async function loadData() {
  let { displayName } = await (
    await fetch(`https://data.scratchtools.app/name/${USERNAME}/`)
  ).json();
  document.querySelector("input.displayname").value = displayName || "";

  let { status } = await (
    await fetch(`https://data.scratchtools.app/status/${USERNAME}/`)
  ).json();
  EMOJI_PICKER.value = status || "🙂";
  let LAST_EMOJI = EMOJI_PICKER.value;
  let ALL_EMOJIS = await (await fetch("./emojis.json")).json();

  EMOJI_PICKER.addEventListener("input", function () {
    EMOJI_PICKER.value = EMOJI_PICKER.value.replace(LAST_EMOJI, "");
    if (EMOJI_PICKER.value !== "") {
      if (!ALL_EMOJIS.includes(EMOJI_PICKER.value)) {
        EMOJI_PICKER.value = LAST_EMOJI;
      } else {
        LAST_EMOJI = EMOJI_PICKER.value;
      }
    }
  });

  EMOJI_PICKER.addEventListener("focusout", function() {
    if (EMOJI_PICKER.value === "") {
        EMOJI_PICKER.value = LAST_EMOJI
    }
  })

  UPDATE_BTN.addEventListener("click", async function() {
    if (displayName !== DN_INPUT.value) {
        let data = await (
            await fetch("https://data.scratchtools.app/setdisplay/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: DN_INPUT.value, token: TOKEN }),
            })
          ).json();
    }
    if (status !== EMOJI_PICKER.value) {
        let data = await (
            await fetch("https://data.scratchtools.app/setstatus/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: EMOJI_PICKER.value, token: TOKEN }),
            })
          ).json();
    }
    document.querySelector(".data").style.display = "none";
    window.location.href = `https://scratch.mit.edu/users/${USERNAME}/`
  })

  document.querySelector(".data").style.display = null;
}
loadData();
