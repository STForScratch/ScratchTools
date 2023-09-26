export default async function ({ feature, console }) {
  let response = await fetch(
    `https://api.scratch.mit.edu/users/${Scratch.INIT_DATA.PROFILE.model.username}/messages/count/`
  );

  if (!response.ok) {
    console.error("Failed to fetch message count.");
    return;
  }

  let data = await response.json();

  let location = await ScratchTools.waitForElement(".location");

  let span = document.createElement("span");
  span.classList.add("ste-message-count")
  span.textContent = data.count.toString() + " " + feature.msg("messagesCount")
  span.style.paddingLeft = "5px"
  span.style.marginLeft = "5px"
  span.style.borderLeft = "1px solid rgb(204, 204, 204)"

  if (location.querySelector(".ste-message-count")) return;

  location.appendChild(span)

  ScratchTools.appendToSharedSpace({
    space: "afterProfileCountry",
    element: span,
    order: 0,
  });
}
