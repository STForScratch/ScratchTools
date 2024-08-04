export default async function ({ feature, console }) {
    window.feature = feature

  ScratchTools.waitForElements(".flex-row.comment", function (comment) {
    let data = feature.redux
      .getState()
      .comments.comments.find(
        (c) => c.id.toString() === comment.id.split("-")[1]
      );

    if (data) {
      let replyCount =
        feature.redux.getState().comments.replies[data.id]?.length || 0;
      let repliesLeft = 25 - replyCount;

      updateReply(data.id, repliesLeft);
    } else {
      let parent = findParent(Number(comment.id.split("-")[1]));

      if (parent) {
        let replyCount =
          feature.redux.getState().comments.replies[parent]?.length || 0;
        let repliesLeft = 25 - replyCount;
        updateReply(parent, repliesLeft);
      } else {
        console.log("nope")
      }
    }
  });

  function findParent(replyId) {
    let replies = feature.redux.getState().comments.replies;
    let keys = Object.keys(replies);

    let key = keys.find((k) => replies[k].find((r) => r.id === replyId));

    return key ? Number(key) : null;
  }

  function updateReply(commentId, count) {
    let div = document.querySelector(`.comment#comments-${commentId}`);
    if (!div) return;

    let reply = div.querySelector(".comment-reply span");

    if (reply.querySelector(".ste-reply-count")) {
      reply.querySelector(
        ".ste-reply-count"
      ).textContent = ` (${count.toString()} left)`;
    } else {
      let span = document.createElement("span");
      span.className = "ste-reply-count";
      feature.self.hideOnDisable(span)
      span.textContent = ` (${count.toString()} left)`;
      reply.appendChild(span);
    }

    let data = feature.redux
      .getState()
      .comments.comments.find((c) => c.id.toString() === commentId.toString());

    let replies = feature.redux.getState().comments.replies[commentId.toString()];

    if (data && replies) {
      for (var i in replies) {
        updateReply(replies[i].id, count);
      }
    }
  }
}
