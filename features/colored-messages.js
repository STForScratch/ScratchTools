var style = document.createElement("style");
if (window.location.href.includes("https://scratch.mit.edu/messages")) {
  style.innerHTML = `
  .social-message
  {
    border-bottom-color: #C5C5C5;
  }

  .social-message.mod-forum-activity
  {
    background-color: hsl(300, 55%, 92%);
  }

  .social-message.mod-comment-message,
  .social-message.mod-follow-user
  {
    background-color: hsl(215, 100%, 90%);
  }

  .social-message.mod-curator-invite,
  .social-message.mod-become-manager,
  .social-message.mod-studio-activity
  {
    background-color: hsl(163, 60%, 85%);
  }

  .social-message.mod-love-favorite
  {
    background-color: hsl(45, 90%, 95%);
  }

  .social-message.mod-love-project
  {
    background-color: hsl(350, 100%, 95%);
  }

  .social-message.mod-remix-project
  {
    background-color: hsl(260, 100%, 90%);
  }

.social-message {
opacity: 0.75;
}

  .social-message.mod-unread
  {
    opacity: 1;
  }
`;
  document.body.appendChild(style);
}
