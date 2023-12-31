export default async function ({ feature, console }) {
  await ScratchTools.waitForElement(".project-buttons");
  let auth = await feature.auth.fetch();
  let username = feature.redux.getState().preview.projectInfo.author.username;
  let data = await (
    await fetch(`https://scratch.mit.edu/users/${username}/?ste=${Date.now().toString()}`)
  ).text();

  let html = document.createElement("html");
  html.innerHTML = data.split('<div id="follow-button" class="buttons">')[1]
    .split(`</div>
    
  </div>
  <div class="box-content" id="profile-box">`)[0];
  let following = !!html.querySelector("div[data-control=unfollow");

  if (!document.querySelector(".ste-follow-btn")) {
    let button = document.createElement("button");
    button.className =
      "ste-follow-btn button " + (following ? "following" : "notfollowing");
    button.textContent = (following ? "Unfollow" : "Follow") + " " + username;
    button.addEventListener("click", async function () {
      if (following) {
        following = false;
        button.className =
      "ste-follow-btn button " + (following ? "following" : "notfollowing");
        button.textContent =
          (following ? "Unfollow" : "Follow") + " " + username;
        let data = await (
          await fetch(
            "https://scratch.mit.edu/site-api/users/followers/rgantzosTEST/remove/?usernames=" +
              auth.user.username,
            {
              headers: {
                "x-csrftoken": "VZ0lgYGuLZzG5nD4nNirmbbze7CulCmP",
                "x-requested-with": "XMLHttpRequest",
              },
              referrer: "https://scratch.mit.edu/users/" + username + "/",
              body: '{"id":"' + username + '"}',
              method: "PUT",
              mode: "cors",
              credentials: "include",
            }
          )
        ).json();
      } else {
        following = true;
        button.className =
      "ste-follow-btn button " + (following ? "following" : "notfollowing");
        button.textContent =
          (following ? "Unfollow" : "Follow") + " " + username;
        let data = await (
          await fetch(
            "https://scratch.mit.edu/site-api/users/followers/rgantzosTEST/add/?usernames=" +
              auth.user.username,
            {
              headers: {
                "x-csrftoken": "VZ0lgYGuLZzG5nD4nNirmbbze7CulCmP",
                "x-requested-with": "XMLHttpRequest",
              },
              referrer: "https://scratch.mit.edu/users/" + username + "/",
              body: '{"id":"' + username + '"}',
              method: "PUT",
              mode: "cors",
              credentials: "include",
            }
          )
        ).json();
      }
    });
    ScratchTools.appendToSharedSpace({
      space: "beforeRemixButton",
      order: 0,
      element: button,
    });
  }
}
