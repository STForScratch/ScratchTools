export default async function () {
  let jokes = (await import("./data.js")).default();
  let outer = await ScratchTools.waitForElement(".outer")

  let joke = jokes[Math.floor(Math.random() * jokes.length)];

  let div = document.createElement("div");
  div.textContent = joke;
  div.classList.add("ste-joke-banner");
  outer.prepend(div);

  div.style.backgroundColor = "#eb506a"
  div.style.color = "white"
  div.style.fontSize = "1.2rem"
  div.style.fontWeight = "500"
  div.style.textAlign = "center"
  div.style.padding = "1rem"
}
