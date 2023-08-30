export default async function ({ feature, console }) {
  const session = await ScratchTools.Session();
  if (!session.user) return;

  const username = session.user.username;
  const response = await fetch(
    `https://api.scratch.mit.edu/users/${username}/messages/admin`,
    {
      headers: {
        "x-token": session.user.token,
      },
    }
  );
  const data = await response.json();

  if (data.length > 0) {
    if (feature.tab.scratch === 2) {
      document
        .querySelector(".notificationsCount")
        .classList.add("ste-red-alert");
    } else {
      document.querySelector(".message-count").classList.add("ste-red-alert");
    }
  }
}
