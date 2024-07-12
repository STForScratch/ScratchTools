export default function ({ feature }) {
  ScratchTools.waitForElements(
    ".studio-info-footer-stats",
    async function (footer) {
      if (!footer) return;

      const studioId = window.location.href.match(/studios\/(\d+)/)[1];
      const apiUrl = `https://api.scratch.mit.edu/studios/${studioId}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const createdDate = new Date(data.history.created);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const formattedDate = `Created ${
        monthNames[createdDate.getUTCMonth()]
      } ${createdDate.getUTCDate()}, ${createdDate.getUTCFullYear()}`;

      const creationDateDiv = document.createElement("div");
      creationDateDiv.classList.add("studio-creation-date");

      const creationDateImg = document.createElement("img");
      creationDateImg.src = feature.self.getResource("calendar");

      const creationDateSpan = document.createElement("span");
      creationDateSpan.textContent = formattedDate;

      creationDateDiv.appendChild(creationDateImg);
      creationDateDiv.appendChild(creationDateSpan);

      footer.insertBefore(creationDateDiv, footer.firstChild);
    }
  );
}
