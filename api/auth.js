ScratchTools.Session = async function () {
  var response = await fetch("https://scratch.mit.edu/session/", {
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
  var data = await response.json();
  return data;
};
async function getAuth() {
  ScratchTools.Auth = await ScratchTools.Session();
}
getAuth();
