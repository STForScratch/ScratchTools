if (
  window.location.href.startsWith("https://scratch.mit.edu/projects/") &&
  window.location.href.includes("/editor")
) {
  async function getRemixParent() {
    var response2 = await fetch("https://scratch.mit.edu/session/", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,el;q=0.8",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
      },
      referrer: window.location.href,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    var data2 = await response2.json();
    var response = await fetch(
      `https://api.${window.location.href
        .replace("/editor/", "")
        .replace("/editor", "")
        .replace("https://", "")}`,
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9,el;q=0.8",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-token": data2.user.token,
        },
        referrer: "https://scratch.mit.edu/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "omit",
      }
    );
    var data = await response.json();
    if (data.remix !== undefined) {
      if (data.remix.parent !== null) {
        var div = document.createElement("div");
        div.className = `${scratchClass("menu-bar_menu-bar-item_")} scratchtools remix`;
        div.innerHTML = `<a href="https://scratch.mit.edu/projects/${data.remix.parent}/editor" style="color: white;"><span class="button_outlined-button_1bS__ menu-bar_menu-bar-button_3IDN0 community-button_community-button_2Lo_g" role="button"><div class="button_content_3jdgj"><span>Go to Parent</span></div></span></a>`;
        document.querySelectorAll("div").forEach(function (el) {
          if (el.className.includes("menu-bar_main-menu_")) {
            if (document.querySelector("div.scratchtools.remix") === null) {
              el.appendChild(div);
            }
          }
        });
      }
    }
  }
  getRemixParent();
}