export default async function ({ feature, console }) {
  const username = window.location.pathname.split('/')[2];
  if (!username) return;

  const followersEndpoint = `https://api.scratch.mit.edu/users/${username}/followers/`;
  const followingEndpoint = `https://api.scratch.mit.edu/users/${username}/following/`;

  try {
    const followersResponse = await fetch(followersEndpoint);
    if (!followersResponse.ok) return;

    const followersData = await followersResponse.json();
    if (!Array.isArray(followersData)) return;

    const mostRecentFollowers = followersData
      .slice(0, 9)
      .filter(follower => follower.username && follower.profile && follower.profile.images)
      .map(follower => ({
        username: follower.username,
        profileImage: follower.profile.images['90x90'] || follower.profile.images['50x50'] || '',
      }));

    const followingResponse = await fetch(followingEndpoint);
    if (!followingResponse.ok) return;

    const followingData = await followingResponse.json();
    if (!Array.isArray(followingData)) return;

    const mostRecentFollowing = followingData
      .slice(0, 9)
      .filter(follow => follow.username && follow.profile && follow.profile.images)
      .map(follow => ({
        username: follow.username,
        profileImage: follow.profile.images['90x90'] || follow.profile.images['50x50'] || '',
      }));

    const allFeaturedElements = document.querySelectorAll("#featured");
    if (allFeaturedElements.length === 0) return;

    const lastFeaturedElement = allFeaturedElements[allFeaturedElements.length - 1];
    lastFeaturedElement.innerHTML = "";

    mostRecentFollowers.forEach(follower => {
      const li = document.createElement("li");
      li.className = "user thumb item";

      const link = document.createElement("a");
      link.href = `/users/${follower.username}/`;
      link.title = follower.username;

      const img = document.createElement("img");
      img.className = "lazy";
      img.src = follower.profileImage;
      img.alt = follower.username;
      img.width = 60;
      img.height = 60;

      const span = document.createElement("span");
      span.className = "title";

      const spanLink = document.createElement("a");
      spanLink.href = `/users/${follower.username}/`;
      spanLink.textContent = follower.username;

      link.appendChild(img);
      span.appendChild(spanLink);
      li.appendChild(link);
      li.appendChild(span);

      lastFeaturedElement.appendChild(li);
    });

    if (allFeaturedElements.length > 1) {
      const secondLastFeaturedElement = allFeaturedElements[allFeaturedElements.length - 2];
      secondLastFeaturedElement.innerHTML = "";

      mostRecentFollowing.forEach(follow => {
        const li = document.createElement("li");
        li.className = "user thumb item";

        const link = document.createElement("a");
        link.href = `/users/${follow.username}/`;
        link.title = follow.username;

        const img = document.createElement("img");
        img.className = "lazy";
        img.src = follow.profileImage;
        img.alt = follow.username;
        img.width = 60;
        img.height = 60;

        const span = document.createElement("span");
        span.className = "title";

        const spanLink = document.createElement("a");
        spanLink.href = `/users/${follow.username}/`;
        spanLink.textContent = follow.username;

        link.appendChild(img);
        span.appendChild(spanLink);
        li.appendChild(link);
        li.appendChild(span);

        secondLastFeaturedElement.appendChild(li);
      });
    }
  } catch (error) {
    return;
  }
}
