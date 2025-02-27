export default async function ({ feature, console }) {
  let data = await getFeatured();

  // Wait for boxes to load
  await ScratchTools.waitForElement(".box");

  // Select featured section using internal key
  let box = [...document.querySelectorAll("div.box")].find(
    (box) =>
      box[
        Object.keys(box).find((key) => key.startsWith("__reactInternalInstance"))
      ]?.return.key === "community_featured_projects"
  );

  if (box) {
    // Add class to select using waitForElements API
    box.classList.add("featured-projects");

    // Change box title and link to studio
    box.querySelector("h4").textContent = "ScratchTools Featured Projects";
    box.querySelector("a").href = "/studios/32047713/comments";
    box.querySelector("a").textContent = "Submit a project";

    ScratchTools.waitForElements(".featured-projects .thumbnail-info", function(info) {
        let project = info.closest(".project");
        let indexOfProject = [...document.querySelectorAll(".featured-projects .thumbnail-info")].indexOf(info);
        
        if (data[indexOfProject]) {
            let thumbnail = project.querySelector("a.thumbnail-image");
            thumbnail.href = `/projects/${data[indexOfProject].id}/`;
            thumbnail.firstChild.src = data[indexOfProject].thumbnail;

            info.querySelector(".thumbnail-creator a").href = `/users/${data[indexOfProject].author}/`;
            info.querySelector(".thumbnail-creator a").textContent = data[indexOfProject].author;

            info.querySelector("a").href = `/projects/${data[indexOfProject].id}/`;
            info.querySelector("a").title = data[indexOfProject].title;
            info.querySelector("a").textContent = data[indexOfProject].title;
        }
    });
  }

  async function getFeatured() {
    let FEATURED = [];
    let data = await (
      await fetch(feature.server.endpoint("/featured/"))
    ).json();

    for (var i in data) {
      try {
        let project = await (
          await fetch(`https://api.scratch.mit.edu/projects/${data[i]}/`)
        ).json();
        FEATURED.push({
          id: data[i],
          thumbnail: `https://cdn2.scratch.mit.edu/get_image/project/${data[i]}_480x360.png`,
          title: project.title,
          author: project.author.username,
        });
      } catch (err) {}
    }

    return FEATURED;
  }
}
