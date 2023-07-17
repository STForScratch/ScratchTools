async function getMessages() {
  var messageCount = (
    await (
      await fetch("https://scratch.mit.edu/messages/ajax/get-message-count/")
    ).json()
  ).msg_count;
  var userToken = (await ScratchTools.Session())?.user?.token;
  if (messageCount) {
    messageCount = messageCount > 100 ? 100 : messageCount;
    var pages = Math.floor(messageCount / 40);
    var additional = messageCount - pages * 40;
    var messages = [];
    for (let i = 0; i < pages; i++) {
      var data = await (
        await fetch(
          "https://api.scratch.mit.edu/users/rgantzos/messages?limit=40&offset=" +
            (i * 40).toString(),
          {
            headers: {
              "x-token": userToken,
            },
          }
        )
      ).json();
      messages.push(...data);
    }
    if (additional) {
      var data = await (
        await fetch(
          "https://api.scratch.mit.edu/users/rgantzos/messages?limit=" +
            additional +
            "&offset=" +
            (pages * 40).toString(),
          {
            headers: {
              "x-token": userToken,
            },
          }
        )
      ).json();
      messages.push(...data);
    }
    getImportantMessages(messages.filter((el) => el.type === "addcomment"));
  }
}
getMessages();

async function getImportantMessages(messages) {
  var data = await (
    await fetch("https://ai.scratchtools.dev/important/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })
  ).json();
  data.length = data.length < 10 ? data.length : 10;
  var box = await ScratchTools.waitForElement(
    ".messages-details.inner > .messages-social"
  );
  if (data) {
    var div = document.createElement("div");
    div.className = "ste-important";
    var h4 = document.createElement("h4");
    h4.textContent = "Important Messages";
    var span = document.createElement("span");
    span.textContent =
      "This section contains comments identified as important.";
    h4.appendChild(span);
    div.appendChild(h4);
    box.parentNode.prepend(div);
    var messagesBox = document.createElement("div");
    messagesBox.className = "messages";
    div.appendChild(messagesBox);
    data.forEach(function (el) {
      var msg = document.createElement("div");
      msg.appendChild(
        createMsgElement("a", el.actor_username, `/users/${el.actor_username}/`)
      );
      msg.appendChild(
        createMsgElement(
          "span",
          " commented on " + (el.comment_type === 0 ? "your project " : "")
        )
      );
      msg.appendChild(
        createMsgElement(
          "a",
          el.comment_type === 0 ? el.comment_obj_title : "your profile",
          el.comment_type === 0
            ? `/projects/${el.comment_obj_id}/#comments-${el.comment_id}`
            : `/users/${el.comment_obj_title}/#comments-${el.comment_id}`
        )
      );
      var commentContent = document.createElement("div");
      commentContent.className = "ste-important-content";
      commentContent.textContent = el.comment_fragment;
      msg.appendChild(commentContent);
      messagesBox.appendChild(msg);
    });
  }
}

function createMsgElement(type, content, link) {
  var el = document.createElement(type);
  if (type === "a") {
    el.href = link;
  }
  el.textContent = content;
  return el;
}
