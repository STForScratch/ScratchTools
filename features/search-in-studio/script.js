export default async function ({ feature, console }) {
  let projects = [];
  let projectDetailsMap = {};

  function tokenize(text) {
    return text
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);
  }

  function computeExactPhraseScore(title, searchTokens) {
    const titleTokens = tokenize(title);
    const phrase = searchTokens.join(" ");
    const titleString = titleTokens.join(" ");
    if (titleString.includes(phrase)) {
      const startIndex = titleString.indexOf(phrase);
      return startIndex === 0 ? 2 : 1;
    }
    return 0;
  }

  function computeSingleWordScore(title, searchToken) {
    const titleTokens = tokenize(title);
    if (titleTokens[0] === searchToken) {
      return 2;
    } else if (titleTokens.includes(searchToken)) {
      return 1;
    }
    return 0;
  }

  function searchProject(searchText) {
    const searchTokens = tokenize(searchText.trim());
    const exactMatchProjects = projects
      .map((project) => ({
        project,
        score: computeExactPhraseScore(
          projectDetailsMap[project.id].title.toLowerCase(),
          searchTokens
        ),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ project }) => project);

    if (searchTokens.length === 1) {
      const singleWordProjects = projects
        .map((project) => ({
          project,
          score: computeSingleWordScore(
            projectDetailsMap[project.id].title.toLowerCase(),
            searchTokens[0]
          ),
        }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ project }) => project);

      const combinedResults = [...exactMatchProjects, ...singleWordProjects];
      updateProjectContainer(combinedResults);
    } else {
      updateProjectContainer(exactMatchProjects);
    }
  }

  function injectSearchBar() {
    const url = window.location.href;

    if (!url.match(/^https:\/\/scratch\.mit\.edu\/studios\/\d+$/)) {
      return;
    }
    ScratchTools.waitForElements(".studio-header-container", () => {
      const headerContainer = document.querySelector(
        ".studio-header-container"
      );
      if (!headerContainer) return;

      const searchContainer = document.createElement("div");
      searchContainer.className = "search-container";

      const searchInput = document.createElement("input");
      searchInput.type = "text";
      searchInput.className = "search-bar";
      searchInput.id = "projectSearch";
      searchInput.placeholder = "Search projects...";

      searchContainer.appendChild(searchInput);
      headerContainer.appendChild(searchContainer);

      searchInput.addEventListener("input", () => {
        const searchText = searchInput.value;
        if (searchText.trim() === "") {
          updateProjectContainer(projects);
        } else {
          searchProject(searchText);
        }
      });
    });
  }

  async function fetchAllStudioProjects(studioId) {
    let projects = [];
    let offset = 0;
    const limit = 40;

    while (true) {
      const response = await fetch(
        `https://api.scratch.mit.edu/studios/${studioId}/projects?limit=${limit}&offset=${offset}`
      );
      const data = await response.json();

      if (data.length === 0) break;

      projects = projects.concat(data);
      offset += limit;
    }

    return projects;
  }

  async function getProjectDetails(projectId) {
    const response = await fetch(
      `https://api.scratch.mit.edu/projects/${projectId}`
    );
    return response.json();
  }

  async function updateProjectContainer(filteredProjects) {
    ScratchTools.waitForElements(".studio-projects-grid", async () => {
      const container = document.querySelector(".studio-projects-grid");
      if (!container) return;

      container.innerHTML = "";

      if (filteredProjects.length === 0) return;

      for (const project of filteredProjects) {
        const projectDetails = await getProjectDetails(project.id);

        const projectTile = document.createElement("div");
        projectTile.className = "studio-project-tile";

        const projectLink = document.createElement("a");
        projectLink.href = `/projects/${project.id}/`;

        const projectImage = document.createElement("img");
        projectImage.className = "studio-project-image";
        projectImage.src = projectDetails.image || "";

        const projectBottom = document.createElement("div");
        projectBottom.className = "studio-project-bottom";

        const userLink = document.createElement("a");
        userLink.href = `/users/${projectDetails.author.username}/`;

        const userImage = document.createElement("img");
        userImage.className = "studio-project-avatar";
        userImage.src = `https://cdn2.scratch.mit.edu/get_image/user/${projectDetails.author.id}_90x90.png`;

        const projectInfo = document.createElement("div");
        projectInfo.className = "studio-project-info";

        const projectTitle = document.createElement("a");
        projectTitle.className = "studio-project-title";
        projectTitle.href = `/projects/${project.id}/`;
        projectTitle.textContent = projectDetails.title;

        const projectUsername = document.createElement("div");
        projectUsername.className = "studio-project-username";
        projectUsername.textContent = projectDetails.author.username;

        projectLink.appendChild(projectImage);
        projectTile.appendChild(projectLink);

        userLink.appendChild(userImage);
        projectInfo.appendChild(projectTitle);
        projectInfo.appendChild(projectUsername);
        projectBottom.appendChild(userLink);
        projectBottom.appendChild(projectInfo);
        projectTile.appendChild(projectBottom);

        container.appendChild(projectTile);
      }
    });
  }

  async function searchAndDisplayProjects() {
    const studioId = getStudioIdFromUrl();
    if (!studioId) return;

    projects = await fetchAllStudioProjects(studioId);

    projectDetailsMap = {};
    for (const project of projects) {
      projectDetailsMap[project.id] = await getProjectDetails(project.id);
    }

    injectSearchBar();
    updateProjectContainer(projects);
  }

  function getStudioIdFromUrl() {
    const url = window.location.href;
    const matches = url.match(/studios\/(\d+)/);
    return matches ? matches[1] : null;
  }

  searchAndDisplayProjects();
}
