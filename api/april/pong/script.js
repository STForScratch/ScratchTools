let hiScore = 0;

async function getHiScore() {
  let { pongHiScore } = await chrome.storage.sync.get("pongHiScore");
  hiScore = pongHiScore || 0;

  if (hiScore > 0) {
    document.querySelector(".hi-score").textContent =
      "HI " + hiScore.toString();
    document.querySelector(".hi-score").style.display = "block";
  }
}
getHiScore();

async function fetchAndProcessImage(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const circleCanvas = document.createElement("canvas");
      const circleCtx = circleCanvas.getContext("2d");

      const size = Math.min(canvas.width, canvas.height);
      circleCanvas.width = size;
      circleCanvas.height = size;

      circleCtx.beginPath();
      circleCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      circleCtx.closePath();
      circleCtx.fillStyle = circleCtx.createPattern(canvas, "no-repeat");
      circleCtx.fill();

      const base64 = circleCanvas.toDataURL();

      document.querySelector("img.avatar").src = base64;
      pong();
    };

    img.src = URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching and processing image:", error);
  }
}

fetchAndProcessImage(
  `https://data.scratchtools.app/pfp/${new URLSearchParams(window.location.search).get(
    "id"
  )}/`
);

document.querySelector(".play-again").addEventListener("click", function() {
    window.location.href = window.location.href
})

let score = 0;
let colors = ["#ffd663", "#ff9a63", "#ff6363", "#63b6ff", "#63ff9c", "#fa63ff"];
document.querySelector("h1.score").textContent = "0";

async function pong() {
  const canvas = document.getElementById("gameCanvas");
  canvas.style.backgroundColor =
    colors[score - Math.floor(score / colors.length) * colors.length];
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;

  const paddle = {
    width: canvas.width / 8,
    height: canvas.height / 20,
    x: canvas.width / 2,
    y: canvas.height - canvas.height / 100 - 40,
  };

  const ball = {
    size: canvas.width / 17,
    x: canvas.width / 2,
    y: canvas.height / 2,
    speedX: canvas.width / 180,
    speedY: canvas.width / 180,
    img: document.querySelector("img.avatar"),
    rotationAngle: 0,
    rotationSpeed: Math.PI / 180,
  };

  function drawPaddle() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(paddle.x - paddle.width / 2 + 20, paddle.y - paddle.height / 2);
    ctx.lineTo(paddle.x + paddle.width / 2 - 20, paddle.y - paddle.height / 2);
    ctx.quadraticCurveTo(
      paddle.x + paddle.width / 2,
      paddle.y - paddle.height / 2,
      paddle.x + paddle.width / 2,
      paddle.y - paddle.height / 2 + 20
    );
    ctx.lineTo(paddle.x + paddle.width / 2, paddle.y + paddle.height / 2 - 20);
    ctx.quadraticCurveTo(
      paddle.x + paddle.width / 2,
      paddle.y + paddle.height / 2,
      paddle.x + paddle.width / 2 - 20,
      paddle.y + paddle.height / 2
    );
    ctx.lineTo(paddle.x - paddle.width / 2 + 20, paddle.y + paddle.height / 2);
    ctx.quadraticCurveTo(
      paddle.x - paddle.width / 2,
      paddle.y + paddle.height / 2,
      paddle.x - paddle.width / 2,
      paddle.y + paddle.height / 2 - 20
    );
    ctx.lineTo(paddle.x - paddle.width / 2, paddle.y - paddle.height / 2 + 20);
    ctx.quadraticCurveTo(
      paddle.x - paddle.width / 2,
      paddle.y - paddle.height / 2,
      paddle.x - paddle.width / 2 + 20,
      paddle.y - paddle.height / 2
    );
    ctx.closePath();
    ctx.fill();
  }

  function drawBall() {
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.rotate(ball.rotationAngle);
    ctx.drawImage(
      ball.img,
      -ball.size / 2,
      -ball.size / 2,
      ball.size,
      ball.size
    );
    ctx.restore();
  }

  function movePaddle(e) {
    paddle.x = e.clientX * 2;
    if (paddle.x < paddle.width / 2) {
      paddle.x = paddle.width / 2;
    }
    if (paddle.x > canvas.width - paddle.width / 2) {
      paddle.x = canvas.width - paddle.width / 2;
    }
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();

    ball.x += ball.speedX;
    ball.y += ball.speedY;
    ball.rotationAngle += ball.rotationSpeed;

    if (ball.x + ball.size / 2 >= canvas.width || ball.x - ball.size / 2 <= 0) {
      ball.speedX *= -1;
    }
    if (ball.y - ball.size / 2 <= 0) {
      ball.speedY *= -1;
    }

    if (
      ball.y + ball.size / 2 >= paddle.y - paddle.height / 2 &&
      ball.x + ball.size / 2 >= paddle.x - paddle.width / 2 &&
      ball.x - ball.size / 2 <= paddle.x + paddle.width / 2
    ) {
      ball.speedY *= -1;
      ball.speedX *= 1.1;

      score += 1;
      canvas.style.backgroundColor =
        colors[score - Math.floor(score / colors.length) * colors.length];
      document.querySelector("h1.score").textContent = score.toString();
    }

    if (ball.y + ball.size / 2 >= canvas.height) {
      canvas.style.display = "none";
      finishedScore();
      return;
    }

    requestAnimationFrame(update);
  }

  update();

  document.addEventListener("mousemove", movePaddle);
}

async function finishedScore() {
  let { pongHiScore } = await chrome.storage.sync.get("pongHiScore");

  if ((pongHiScore || 0) < score && score > 0) {
    chrome.storage.sync.set({ pongHiScore: score });
    document.querySelector(".hi-score").textContent = "HI " + score;
    document.querySelector(".hi-score").style.display = "block"
  }

  document.querySelector(".score").style.display = "none";
  document.querySelector(".final-score").style.display = null;
  document.querySelector(".final-score h1").textContent = score;
  document.body.style.backgroundColor = "#ffd663"
}
