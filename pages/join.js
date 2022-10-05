if (window.location.href.includes("https://scratch.mit.edu/join")) {
  var el = document.createElement("a");
  el.href = "https://scratch.mit.edu/";
  el.textContent = "Already have an account?";
  document
    .querySelector(
      "body > div.ReactModalPortal > div > div > div > form > div > div:nth-child(1) > div > div:nth-child(3) > div.join-flow-password-section"
    )
    .appendChild(el);
}
