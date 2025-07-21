export default async function ({ feature }) {
  const parts = window.location.pathname.split("/");
  const studioId = parts[parts.length - 2];
  if (!studioId) return;

  const session = await ScratchTools.Session();
  if (!session?.user?.username) return;

  const csrfToken = document.cookie.match(/scratchcsrftoken=([^;]+)/)?.[1];
  if (!csrfToken) return;

  ScratchTools.waitForElements(
    ".comment-body",
    (comment) => {
      const topRow = comment.querySelector(".comment-top-row");
      const actionList = topRow?.querySelector(".action-list");
      if (!topRow || !actionList) return;
      if (actionList.querySelector(".ste-comment-invite")) return;

      const inviteBtn = document.createElement("span");
      inviteBtn.classList.add("ste-comment-invite");

      const innerSpan = document.createElement("span");
      innerSpan.textContent = "Invite";
      inviteBtn.appendChild(innerSpan);

      inviteBtn.onclick = async () => {
        const username = topRow.querySelector(".username")?.textContent.trim();
        if (!username) return;
        const url = `https://scratch.mit.edu/site-api/users/curators-in/${studioId}/invite_curator/?usernames=${encodeURIComponent(
          username
        )}`;
        await fetch(url, {
          method: "PUT",
          headers: {
            "x-csrftoken": csrfToken,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      };

      actionList.appendChild(inviteBtn);
    },
    "ste-invite-buttons",
    false
  );
}
