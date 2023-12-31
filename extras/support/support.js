async function start() {
  var accepted = !!(await chrome.storage.sync.get("acceptedTermsSupport"))
    ?.acceptedTermsSupport;
  if (accepted) {
    document.querySelector(".normal").style.display = null;
  } else {
    document.querySelector(".terms").style.display = null;
  }
}
start();

document.querySelector(".terms button").addEventListener("click", agree);

async function agree() {
  document.querySelector(".terms").style.display = "none";
  await chrome.storage.sync.set({ acceptedTermsSupport: true });
  start();
}

document.querySelector(".topics button").addEventListener("click", function () {
  document.querySelector(".normal").style.display = "none";
  document.querySelector(".additional-support").style.display = null;
});

document
  .querySelector(".option[data-option=discord]")
  .addEventListener("click", function () {
    chrome.tabs.create({
      url: "https://discord.gg/rwAs5jDrTQ",
    });
  });

document
  .querySelector(".option[data-option=twitter]")
  .addEventListener("click", function () {
    chrome.tabs.create({
      url: "https://twitter.com/intent/tweet?text=@STForScratch%20I%20need%20help.",
    });
  });

document.querySelector(".option[data-option=chat]").onclick = function () {
  chrome.tabs.create({
    url: "https://auth.itinerary.eu.org/auth/?redirect="+ btoa("https://scratch.mit.edu/ste/dashboard/verify/?system=support")+"&name=ScratchTools",
  });
};
