export default async function ({ feature, console }) {
  let updatedReplies = [];

  ScratchTools.waitForElements(
    "ul.messages-social-list > li.social-message",
    updateReplies
  );

  function updateReplies() {
    let messages = feature.redux.getState().messages.messages.social;
    document
      .querySelectorAll("ul.messages-social-list > li.social-message")
      .forEach(function (msg, i) {
        if (updatedReplies.includes(msg)) return;
        if (
          messages[i].commentee_username &&
          messages[i].commentee_username !==
            feature.redux.getState().session.session.user.username
        ) {
          let info = msg.querySelector("p.comment-message-info > span");
          let span = document.createElement("span");
          let text = info.childNodes[1];
          info.insertBefore(span, text);
          text.remove();
          span.innerHTML =
            " " +
            feature.msg("repliedTo").replace("${commenter}", "<a></a>") +
            " ";
          span.querySelector("a").textContent = messages[i].commentee_username;
          span.querySelector(
            "a"
          ).href = `/users/${messages[i].commentee_username}/`;
          updatedReplies.push(msg);
        }
      });
  }
}
