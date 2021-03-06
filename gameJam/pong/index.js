const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
canvas.classList.add("center");

const arrow = document.getElementById("arrow");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const home = document.getElementById("home");
const easyButton = document.getElementById("easy");
const normalButton = document.getElementById("normal");
const hardButton = document.getElementById("hard");

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

setTimeout(() => {
  arrow.classList.add("flash");
}, 5000);

let paused = false;

let hit = new Audio();
let wall = new Audio();
let userScore = new Audio();
let comScore = new Audio();

hit.src = "sounds/hit.mp3";
wall.src = "sounds/wall.mp3";
comScore.src = "sounds/comScore.mp3";
userScore.src = "sounds/userScore.mp3";

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  velocityX: 5,
  velocityY: 5,
  speed: 7,
  color: "WHITE",
};

const user = {
  x: 0,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "WHITE",
};

const computer = {
  x: canvas.width - 10,
  y: (canvas.height - 100) / 2,
  width: 10,
  height: 100,
  score: 0,
  color: "WHITE",
};

const net = {
  x: (canvas.width - 2) / 2,
  y: 0,
  height: 10,
  width: 2,
  color: "WHITE",
};

function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
}

canvas.addEventListener("mousemove", mouseTrack);

function mouseTrack(evt) {
  let rect = canvas.getBoundingClientRect();

  user.y = evt.clientY - rect.top - user.height / 2;
}

function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;
}

function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}

function drawText(text, x, y) {
  context.fillStyle = "#FFF";
  context.font = "75px sans";
  context.fillText(text, x, y);
}

function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return (
    p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top
  );
}

function update() {
  if (!paused) {
    if (ball.x - ball.radius < 0) {
      computer.score++;
      comScore.play();
      resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
      user.score++;
      userScore.play();
      resetBall();
    }

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // my first baby AI :')
    computer.y += (ball.y - (computer.y + computer.height / 2)) * 0.05;

    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
      ball.velocityY = -ball.velocityY;
      wall.play();
    }

    let player = ball.x + ball.radius < canvas.width / 2 ? user : computer;

    if (collision(ball, player)) {
      hit.play();

      let collidePoint = ball.y - (player.y + player.height / 2);
      collidePoint = collidePoint / (player.height / 2);

      let angleRad = (Math.PI / 4) * collidePoint;
      let direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);

      ball.speed += 0.1;
    }
  }
}

function render() {
  drawRect(0, 0, canvas.width, canvas.height, "#000");

  drawText(user.score, canvas.width / 4, canvas.height / 5);

  drawText(computer.score, (3 * canvas.width) / 4, canvas.height / 5);

  drawNet();

  drawRect(user.x, user.y, user.width, user.height, user.color);

  drawRect(
    computer.x,
    computer.y,
    computer.width,
    computer.height,
    computer.color
  );

  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
function game() {
  update();
  render();
}

easyButton.addEventListener("click", (event) => {
  let loop = (framePerSecond) => {
    setInterval(game, 1000 / framePerSecond);
  };

  loop(50);
});

normalButton.addEventListener("click", (event) => {
  let loop = (framePerSecond) => {
    setInterval(game, 1000 / framePerSecond);
  };

  loop(100);
});

hardButton.addEventListener("click", (event) => {
  let loop = (framePerSecond) => {
    setInterval(game, 1000 / framePerSecond);
  };

  loop(200);
});
