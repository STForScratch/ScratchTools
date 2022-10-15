if (window.location.href.includes("https://scratch.mit.edu/ideas")) {
  el = document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(1)"
  );
  var clone = el.cloneNode(true);
  document
    .querySelector(
      "#view > div > div.tips-activity-guides > div > section > div.masonry > div"
    )
    .appendChild(clone);
  var elem = document.createElement("a");
  elem.href = "https://www.youtube.com/watch?v=xZgeaYdx_uM&t";
  elem.textContent = "Make a Clicker Game";
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(10) > div > div.ttt-tile-info > h4"
  ).textContent = "";
  document
    .querySelector(
      "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(10) > div > div.ttt-tile-info > h4"
    )
    .appendChild(elem);
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(10)"
  ).onClick = 'window.location.href = "https://scratchstatus.org/"';
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(10) > div > div.ttt-tile-info > p"
  ).textContent = "Make a game where people earn points by clicking an object!";
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(10) > div > div.ttt-tile-image > img"
  ).src = "https://i.ibb.co/m0Kp8BG/download-1-1.png";

  el = document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(1)"
  );
  var clone = el.cloneNode(true);
  document
    .querySelector(
      "#view > div > div.tips-activity-guides > div > section > div.masonry > div"
    )
    .appendChild(clone);
  var elem = document.createElement("a");
  elem.href = "https://youtu.be/aUmXJJww7KE";
  elem.textContent = "Make a Platformer Game";
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(11) > div > div.ttt-tile-info > h4"
  ).textContent = "";
  document
    .querySelector(
      "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(11) > div > div.ttt-tile-info > h4"
    )
    .appendChild(elem);
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(11)"
  ).onClick = 'window.location.href = "https://scratchstatus.org/"';
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(11) > div > div.ttt-tile-info > p"
  ).textContent = "Make a game where characters jump over walls and spikes!";
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(11) > div > div.ttt-tile-image > img"
  ).src = "https://i.ibb.co/0ZsJKff/a-Um-XJJww7-KE-HD.jpg";

  el = document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(1)"
  );
  var clone = el.cloneNode(true);
  document
    .querySelector(
      "#view > div > div.tips-activity-guides > div > section > div.masonry > div"
    )
    .appendChild(clone);
  var elem = document.createElement("a");
  elem.href = "https://youtu.be/JEw3xiC3-aQ";
  elem.textContent = "Make a Snake Game";
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(12) > div > div.ttt-tile-info > h4"
  ).textContent = "";
  document
    .querySelector(
      "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(12) > div > div.ttt-tile-info > h4"
    )
    .appendChild(elem);
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(12)"
  ).onClick = 'window.location.href = "https://scratchstatus.org/"';
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(12) > div > div.ttt-tile-info > p"
  ).textContent =
    "Make a game where you control a snake and make sure it does not die!";
  document.querySelector(
    "#view > div > div.tips-activity-guides > div > section > div.masonry > div > div:nth-child(12) > div > div.ttt-tile-image > img"
  ).src =
    "https://i.ytimg.com/vi/JEw3xiC3-aQ/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBBSeaBRVYFbQ99iUc4iqPTmVvytg";
}
