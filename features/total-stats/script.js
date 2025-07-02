export default async function ({ feature }) {
  await ScratchTools.waitForElement(".box-head");

  const username = window.location.pathname.split("/")[2];
  const res = await fetch(
    `https://scratchdata.vercel.app/api/user-stats/${username}`
  );
  if (!res.ok) return;

  const data = await res.json();
  const format = (n) => n.toLocaleString();

  const box = document.createElement("div");
  box.className = "ste-box ste-prevent-select";

  const boxHead = document.createElement("div");
  boxHead.className = "ste-box-head";

  const heading = document.createElement("h4");
  heading.textContent = "Total Project Stats";

  boxHead.appendChild(heading);
  box.appendChild(boxHead);

  const boxContent = document.createElement("div");
  boxContent.className = "ste-box-content ste-tps-content";

  const stats = [
    {
      src: "https://scratch.mit.edu/svgs/project/love-red.svg",
      alt: "Loves",
      value: data.totalLoves,
    },
    {
      src: "https://scratch.mit.edu/svgs/project/fav-yellow.svg",
      alt: "Favorites",
      value: data.totalFavorites,
    },
    {
      src: "https://scratch.mit.edu/svgs/project/views-gray.svg",
      alt: "Views",
      value: data.totalViews,
    },
    {
      src: "https://raw.githubusercontent.com/scratchfoundation/scratch-www/a9cf52cd7fbec834897587dd9e17d648ba0a38b2/static/svgs/messages/remix.svg",
      alt: "Remixes",
      value: data.totalRemixes,
    },
  ];

  for (const stat of stats) {
    const statDiv = document.createElement("div");
    statDiv.className = "ste-tps-stat";

    const img = document.createElement("img");
    img.src = stat.src;
    img.width = 32;
    img.height = 32;
    img.alt = stat.alt;

    const valueDiv = document.createElement("div");
    valueDiv.textContent = format(stat.value);
    valueDiv.className = "ste-tps-value";

    statDiv.appendChild(img);
    statDiv.appendChild(valueDiv);
    boxContent.appendChild(statDiv);
  }

  box.appendChild(boxContent);

  const boxHeads = document.querySelectorAll(".box-head");
  if (boxHeads.length >= 5) {
    const targetBox = boxHeads[4].parentNode;
    targetBox.parentNode.insertBefore(box, targetBox.nextSibling);
  }
}
