export default async function ({ feature }) {
  let options = [
    {
      icon: "title-icon",
      id: "title",
    },
    {
      icon: "user-icon",
      id: "author",
    },
    {
      icon: "calendar-icon",
      id: "period",
    },
  ];
  let page = window.location.pathname.split("/");;
  let filterData;
  let apiCache = {};

  function checkProject(data) {
    return (
      filterData !== null &&
      (
        filterData.period && (
          (
            filterData.period.shareStart &&
            filterData.period.shareStart > data.history.shared.split("T")[0]
          )||(
            filterData.period.shareEnd &&
            filterData.period.shareEnd < data.history.shared.split("T")[0]
          )||(
            filterData.period.updateStart &&
            filterData.period.updateStart > data.history.modified.split("T")[0]
          )||(
            filterData.period.updateEnd &&
            filterData.period.updateEnd < data.history.modified.split("T")[0]
          )
        )
      )||(
        filterData.title && (
          (
            filterData.title.including &&
            !filterData.title.including.every((text) => data.title.toLowerCase().includes(text.toLowerCase()))
          )||(
            filterData.title.excluding &&
            filterData.title.excluding.some((text) => data.title.toLowerCase().includes(text.toLowerCase()))
          )
        )
      )||(
        filterData.author && (
          (
            filterData.author.including &&
            !filterData.author.including.includes(data.author.username.toLowerCase())
          )||(
            filterData.author.excluding &&
            filterData.author.excluding.includes(data.author.username.toLowerCase())
          )
        )
      )
    );
  }

  function checkStudio(data) {
    return (
      filterData !== null &&
      (
        filterData.period && (
          (
            filterData.period.shareStart &&
            filterData.period.shareStart > data.history.shared.split("T")[0]
          )||(
            filterData.period.shareEnd &&
            filterData.period.shareEnd < data.history.shared.split("T")[0]
          )||(
            filterData.period.updateStart &&
            filterData.period.updateStart > data.history.modified.split("T")[0]
          )||(
            filterData.period.updateEnd &&
            filterData.period.updateEnd < data.history.modified.split("T")[0]
          )
        )
      )||(
        filterData.title && (
          (
            filterData.title.including &&
            !filterData.title.including.every((text) => data.title.toLowerCase().includes(text.toLowerCase()))
          )||(
            filterData.title.excluding &&
            filterData.title.excluding.some((text) => data.title.toLowerCase().includes(text.toLowerCase()))
          )
        )
      )
    );
  }


  async function filter() {
    if (!filterData) {
      return document.querySelectorAll(".ste-filter-hide").forEach((element) => {
        element.classList.remove("ste-filter-hide");
      });
    }
    switch (page[1]) {
      case "search":
      case "explore": {
        if (page[2] === "projects")
          document.querySelectorAll(".thumbnail.project").forEach((element) => {
            filterItem("project", element);
          });
        else if (page[2] === "studios")
          document.querySelectorAll(".thumbnail.gallery").forEach((element) => {
            filterItem("studio", element);
          });
        break;
      }
      case "studios": {
        document.querySelectorAll(".studio-project-tile").forEach((element) => {
          filterItem("project", element);
        });
        break;
      }
    }
  }

  async function filterItem(type, element) {
    if (!filterData) return;
    let href = element.querySelector("a").href;
    let data = apiCache[href];
    if (!data) {
      data = await (await fetch(`${href.replace("scratch.mit.edu", "api.scratch.mit.edu")}`)).json();
      apiCache[href] = data;
    }
    if (data.code === "NotFound") return element.classList.add("ste-filter-hide");
    console.log(await checkStudio(data))
    if (type === "project" && await checkProject(data) || type === "studio" && await checkStudio(data))
      element.classList.add("ste-filter-hide");
    else if (element.classList.contains("ste-filter-hide"))
      element.classList.remove("ste-filter-hide");
  }

  filterStyleSheet(feature.settings.get("filter-operation") || "blur");
  feature.settings.addEventListener("changed", function ({ key, value }) {
    if (key == "filter-operation") filterStyleSheet(value);
  });
  async function filterStyleSheet(filterType) {
    let app = await ScratchTools.waitForElement("#app");
    if (filterType === "hide") {
      app.classList.add("ste-filter-mode-hide");
      app.classList.remove("ste-filter-mode-blur");
    } else if (filterType === "blur") {
      app.classList.add("ste-filter-mode-blur");
      app.classList.remove("ste-filter-mode-hide");
    }
  }


  if (feature.settings.get("keep-settings") === true) filterData = await ScratchTools.storage.get("project-filter");
  switch (page[1]) {
    case "search":
    case "explore": {
      if (page[2] === "projects")
        ScratchTools.waitForElements(".thumbnail.project", (element) => {
          filterItem("project", element);
        });
      else if (page[2] === "studios") {
        ScratchTools.waitForElements(".thumbnail.gallery", (element) => {
          filterItem("studio", element);
        });
        options = [
          {
            icon: "title-icon",
            id: "title",
          },
          {
            icon: "calendar-icon",
            id: "period",
          },
        ];
      }
      break;
    }

    case "studios": {
      ScratchTools.waitForElements(".studio-project-tile", (element) => {
        filterItem("project", element);
      });
      break;
    }
  }


  const filterButton = document.createElement("div");
  filterButton.classList.add("ste-filter-button");
  const filterIcon = document.createElement("img");
  filterIcon.src = feature.self.getResource("filter-icon");
  filterButton.appendChild(filterIcon);
  const filterText = document.createElement("p");
  filterText.textContent = feature.msg("filter");
  filterButton.appendChild(filterText);
  feature.self.hideOnDisable(filterButton)

  const controlBar = document.createElement("div");
  controlBar.classList.add("ste-filter-bar");
  if (!filterData) controlBar.style.display = "none";
  else filterButton.classList.add("active");

  filterButton.addEventListener("click", () => {
    if (controlBar.style.display == "none") {
      controlBar.style.display = "flex";
      filterButton.classList.add("active");
    } else {
      controlBar.style.display = "none";
      if (filterButton.classList.contains("active"))
        filterButton.classList.remove("active");
    }
  });

  const filterSettings = document.createElement("div");
  filterSettings.classList.add("ste-filter-settings");
  options.forEach((option) => {
    const button = document.createElement("div");
    button.classList.add("ste-filter-button");
    if (filterData)
      if (filterData[option.id])
        if (Object.keys(filterData[option.id]).length !== 0)
          button.classList.add("active");

    const icon = document.createElement("img");
    icon.src = feature.self.getResource(option.icon);
    button.appendChild(icon);
    const text = document.createElement("p");
    text.textContent = feature.msg(option.id);
    button.appendChild(text);

    button.addEventListener("click", function () {
      optionButtonClick(option.id, button);
    });
    filterSettings.appendChild(button);
  });

  const resetButton = document.createElement("div");
  resetButton.style.marginLeft = "20px"
  resetButton.classList.add('ste-filter-button');
  const resetButtonText = document.createElement("p");
  resetButtonText.classList.add('ste-reset');
  resetButtonText.textContent = feature.msg("reset");
  resetButton.appendChild(resetButtonText);
  resetButton.addEventListener("click", function () {
    optionButtonClick("reset", resetButton);
  })

  filterSettings.appendChild(resetButton);
  controlBar.appendChild(filterSettings);
  feature.self.hideOnDisable(controlBar)


  function optionButtonClick(id, button) {
    function createDetails(label) {
      const details = document.createElement("details");
      details.classList.add("ste-project-filter-details");
      details.setAttribute("open", "open");
      const summary = document.createElement("summary");
      summary.textContent = `${feature.msg(label)}`;
      details.appendChild(summary);
      return details;
    }

    function createTextTag(id, type) {
      const content = document.createElement("div");
      const tags = document.createElement("div");
      tags.style.margin = "0";
      function addTag(text) {
        const tag = document.createElement("span");
        tag.classList.add("ste-filter-text");
        tag.textContent = text;
        tag.addEventListener("click", function () {
          filterData[id][type] = filterData[id][type].filter(function (
            tagText
          ) {
            return tagText !== text;
          });
          tag.remove();
          if (filterData[id][type].length == 0) {
            delete filterData[id][type];
          }
          if (Object.keys(filterData[id]).length == 0) {
            if (button.classList.contains("active"))
              button.classList.remove("active");
          }
          filter();
        });
        tags.appendChild(tag);
      }
      if (filterData?.[id]?.[type])
        filterData[id][type].forEach(addTag);

      const addButton = document.createElement("button");
      addButton.style.cssText = "min-width: 40px !important;";
      addButton.textContent = "+";
      addButton.addEventListener("click", function () {
        if (!input.value) return;
        
        filterData = filterData ?? {};
        filterData[id] = filterData[id] ?? {};
        filterData[id][type] = filterData[id][type] ?? [];
        filterData[id][type].push(input.value.toLowerCase());
        addTag(input.value);
        input.value = "";
        filter();
        button.classList.add("active");
      });
      const input = document.createElement("input");

      content.appendChild(tags);
      content.appendChild(addButton);
      content.appendChild(input);
      return content;
    }

    switch (id) {
      case "reset": {
        filterData = null;
        document
          .querySelectorAll(".ste-filter-bar .ste-filter-button.active")
          .forEach((element) => {
            element.classList.remove("active");
          });
        filter();
        break;
      }

      case "title": {
        const includingDetails = createDetails("including");
        const includingTextTag = createTextTag("title", "including");
        includingDetails.appendChild(includingTextTag);
        const excludingDetails = createDetails("excluding");
        const excludingTextTag = createTextTag("title", "excluding");
        excludingDetails.appendChild(excludingTextTag);
        let modal = ScratchTools.modals.create({
          title: `${feature.msg("title")}`,
          components: [
            {
              type: "html",
              content: includingDetails,
            },
            {
              type: "html",
              content: excludingDetails,
            },
          ],
        });
        break;
      }

      case "author": {
        const includingDetails = createDetails("including");
        const includingTextTag = createTextTag("author", "including");
        includingDetails.appendChild(includingTextTag);
        const excludingDetails = createDetails("excluding");
        const excludingTextTag = createTextTag("author", "excluding");
        excludingDetails.appendChild(excludingTextTag);
        let modal = ScratchTools.modals.create({
          title: `${feature.msg("author")}`,
          components: [
            {
              type: "html",
              content: includingDetails,
            },
            {
              type: "html",
              content: excludingDetails,
            },
          ],
        });
        break;
      }

      case "period": {
        function createInput(id, label) {
          const content = document.createElement("div");
          content.textContent = feature.msg(label);
          const input = document.createElement("input");
          input.type = "date";
          input.style.margin = "0 10px";
          if (filterData?.period?.[id]) input.value = filterData.period[id];
          input.addEventListener("change", () => {
            if (input.value) {
              filterData = filterData ?? {};
              filterData.period = filterData.period ?? {};
              filterData.period[id] = input.value;
              button.classList.add("active");
            } else if (filterData.period[id]) delete filterData.period[id];
            filter();
          });
          const resetButton = document.createElement("button");
          resetButton.textContent = feature.msg("reset");
          resetButton.addEventListener("click", () => {
            input.value = "";
            if (filterData.period[id]) delete filterData.period[id];
            if (Object.keys(filterData["period"]).length == 0) {
              delete filterData.period
              if (button.classList.contains("active"))
                button.classList.remove("active");
            }
            filter();
          });
          content.appendChild(input);
          content.appendChild(resetButton);
          return content;
        }

        const shareStart = createInput("shareStart", "startDate");
        const shareEnd = createInput("shareEnd", "endDate");
        const updateStart = createInput("updateStart", "startDate");
        const updateEnd = createInput("updateEnd", "endDate");

        const shareDetails = createDetails("sharedDate");
        shareDetails.appendChild(shareStart);
        shareDetails.appendChild(shareEnd);

        const updateDetails = createDetails("updateDate");
        updateDetails.appendChild(updateStart);
        updateDetails.appendChild(updateEnd);

        ScratchTools.modals.create({
          title: `${feature.msg("period")}`,
          components: [
            {
              type: "html",
              content: shareDetails,
            },
            {
              type: "html",
              content: updateDetails,
            },
          ],
        });
        break;
      }
    }
  }


  switch (page[1]) {
    case "search":
    case "explore": {
      const sortElement = await ScratchTools.waitForElement(
        "div.sort-controls"
      );
      const sortForm = await ScratchTools.waitForElement("form.sort-mode");
      controlBar.appendChild(sortForm);
      sortElement.after(controlBar);

      sortElement.appendChild(filterButton);
      break;
    }

    case "studios": {
      async function setFilterControl() {
        const tabTitle = document.querySelector(".studio-header-container h2");
        const headerContainer = document.querySelector(
          ".studio-header-container"
        );
        headerContainer.after(controlBar);
        tabTitle.after(filterButton);
      }
      await ScratchTools.waitForElement(".studio-project-tile");
      if (
        /^[0-9]+$/.test(
          window.location.pathname.replace("/studios/", "").replaceAll("/", "")
        )
      )
        setFilterControl();
      const buttons = document.querySelectorAll(".studio-tab-nav .nav_link");
      buttons.forEach((button) => {
        if (
          /^[0-9]+$/.test(
            button.href.replace("https://scratch.mit.edu/studios/", "")
          )
        )
          button.addEventListener("click", async function () {
            await ScratchTools.waitForElement(".studio-project-tile");
            setFilterControl();
          });
      });
      break;
    }
  }

  window.addEventListener("beforeunload", async function (event) {
    if (
      feature.settings.get("keep-settings") === true &&
      JSON.stringify(filterData) !== JSON.stringify(await ScratchTools.storage.get("project-filter"))
    )
      await ScratchTools.storage.set({
        key: "project-filter",
        value: filterData,
      });
  });
}
