async function submit() {
  if (
    document.querySelector(".ste-username-input").value &&
    document.querySelector(".ste-feedback-input").value
  ) {
    document.querySelector(".ste-submit").style.display = "none";
    var featuresData =
      (await chrome.storage.sync.get("features")).features || "";
    const data = await (
      await fetch("https://data.scratchtools.app/create/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ features: featuresData }),
      })
    ).json();
    const send = await (
      await fetch("https://data.scratchtools.app/feedback/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: document.querySelector(".ste-username-input").value,
          feedback: document.querySelector(".ste-feedback-input").value,
          settings: data.code,
          useragent: navigator.userAgent,
          version: chrome.runtime.getManifest().version_name,
        }),
      })
    ).json();
    alert("Submitted feedback!");
    window.close();
    document.querySelector(".ste-submit").style.display = null;
  } else {
    alert(
      "Please make sure that you've entered valid feedback and a username."
    );
  }
}

document.querySelector(".ste-submit").addEventListener("click", submit)