export default async function ({ feature }) {
  await ScratchTools.waitForElement(".box-head");

  const username = window.location.pathname.split("/")[2];
  const res = await fetch(`https://scratchdata.vercel.app/api/user-stats/${username}`);
  if (!res.ok) return;

  const data = await res.json();
  const format = (n) => n.toLocaleString();

  const stats = [
    {
      icon: "https://scratch.mit.edu/svgs/project/love-red.svg",
      alt: "Loves",
      value: data.totalLoves,
    },
    {
      icon: "https://scratch.mit.edu/svgs/project/fav-yellow.svg",
      alt: "Favorites",
      value: data.totalFavorites,
    },
    {
      icon: "https://scratch.mit.edu/svgs/project/views-gray.svg",
      alt: "Views",
      value: data.totalViews,
    },
    {
      icon: "https://raw.githubusercontent.com/scratchfoundation/scratch-www/a9cf52cd7fbec834897587dd9e17d648ba0a38b2/static/svgs/messages/remix.svg",
      alt: "Remixes",
      value: data.totalRemixes,
    },
  ];

  const box = document.createElement("div");
  box.className = "box slider-carousel-container prevent-select ste-tps-box";
  box.dataset.stFeature = "total-project-stats";

  const head = document.createElement("div");
  head.className = "box-head";

  const title = document.createElement("h4");
  title.textContent = "Total Project Stats";
  head.appendChild(title);
  box.appendChild(head);

  const content = document.createElement("div");
  content.className = "box-content slider-carousel horizontal ste-tps-content";

  for (const stat of stats) {
    const statDiv = document.createElement("div");
    statDiv.className = "ste-tps-stat";

    const icon = document.createElement("img");
    icon.src = stat.icon;
    icon.width = 32;
    icon.height = 32;
    icon.alt = stat.alt;
    icon.style.display = "block";

    const value = document.createElement("div");
    value.className = "ste-tps-value";
    value.textContent = format(stat.value);

    statDiv.appendChild(icon);
    statDiv.appendChild(value);
    content.appendChild(statDiv);
  }

  box.appendChild(content);

  const boxHeads = document.querySelectorAll(".box-head");
  if (boxHeads.length >= 5) {
    const targetBox = boxHeads[4].parentNode;
    targetBox.parentNode.insertBefore(box, targetBox.nextSibling);
  }
}
