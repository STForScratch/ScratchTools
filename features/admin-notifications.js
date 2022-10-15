async function checkAdminNotifications() {
  var session = await ScratchTools.Session();
  var response = await fetch(
    "https://api.scratch.mit.edu/users/" +
      session.user.username +
      "/messages/admin",
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
        "x-token": session.user.token,
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
  if (data.length > 0) {
    if (document.querySelector(".notificationsCount") === null) {
      document.querySelector(".message-count").style.backgroundColor =
        "#ff1a1a";
    } else {
      document.querySelector(".notificationsCount").style.backgroundColor =
        "#ff1a1a";
    }
  }
}
checkAdminNotifications();
