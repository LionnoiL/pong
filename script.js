const BORDER_COLOR = '#fff';
const BALL_COLOR = '#fff';
const BALL_SIZE = 14;
const BRICK_COLOR = '#deb887';
const BRICK_THICKNESS = 25;
const BRICK_WIDTH = 120;
const BRICK_SPEED = 20;
const WIN_SCORE = 10;
const TWO_PI = Math.PI * 2;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const midWidthPlayground = canvas.width / 2;
const midHeightPlayground = canvas.height / 2;
const brickStartPos = midHeightPlayground - BRICK_WIDTH / 2;

const keys = {};

const gameState = {
  ball: {
    x: midWidthPlayground,
    y: midHeightPlayground,
    pos: midHeightPlayground,
    color: BALL_COLOR,
    speed: 2,
  },
  players: {
    firstPlayer: {
      score: 0,
      x: 0,
      y: brickStartPos,
      pos: midHeightPlayground,
      color: BRICK_COLOR,
    },
    secondPlayer: {
      score: 0,
      x: canvas.width - BRICK_THICKNESS,
      y: brickStartPos,
      pos: midHeightPlayground,
      color: BRICK_COLOR,
    },
  },
};

const {
  ball,
  players: { firstPlayer },
  players: { secondPlayer },
} = gameState;

function handleMove(player, move) {
  if (move === 'ArrowUp') {
    const newY = player.y - BRICK_SPEED;
    player.y = newY < 0 ? 0 : newY;
  } else if (move === 'ArrowDown') {
    const newY = player.y + BRICK_SPEED;
    player.y =
      newY > canvas.height - BRICK_WIDTH ? canvas.height - BRICK_WIDTH : newY;
  }
  player.pos = player.y + BRICK_WIDTH / 2;
}

function ballMove() {}

function aiMove() {
  if (secondPlayer.pos < ball.pos) {
    handleMove(secondPlayer, 'ArrowDown');
  } else if (secondPlayer.pos > ball.pos) {
    handleMove(secondPlayer, 'ArrowUp');
  }
}

function update() {
  if (keys['ArrowUp']) {
    handleMove(firstPlayer, 'ArrowUp');
  }

  if (keys['ArrowDown']) {
    handleMove(firstPlayer, 'ArrowDown');
  }

  ballMove();
  aiMove();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayGround();
  drawScore();
  drawBriks();
  drawBall();
}

function drawPlayGround() {
  ctx.fillStyle = BORDER_COLOR;

  const lineWidth = canvas.height / 15;
  for (let i = 0; i < 15; i++) {
    ctx.fillRect(midWidthPlayground - 4, i * lineWidth + 5, 8, lineWidth - 10);
  }
}

function drawScore() {
  ctx.fillStyle = BRICK_COLOR;
  ctx.textBaseline = 'top';

  const firstPlayerScore = String(firstPlayer.score).padStart(2, '0');
  const secondPlayerScore = String(secondPlayer.score).padStart(2, '0');

  const scoreTxt = `${firstPlayerScore} ${secondPlayerScore}`;
  const metrics = ctx.measureText(scoreTxt);
  const leftOffset = metrics.width / 2;

  ctx.fillText(scoreTxt, midWidthPlayground - leftOffset, 30);
}

function drawBriks() {
  ctx.fillStyle = firstPlayer.color;
  ctx.fillRect(firstPlayer.x, firstPlayer.y, BRICK_THICKNESS, BRICK_WIDTH);

  ctx.fillStyle = secondPlayer.color;
  ctx.fillRect(secondPlayer.x, secondPlayer.y, BRICK_THICKNESS, BRICK_WIDTH);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, BALL_SIZE, 0, TWO_PI);
  ctx.fillStyle = ball.color;
  ctx.fill();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => (keys[e.key] = true));
document.addEventListener('keyup', e => (keys[e.key] = false));

requestAnimationFrame(gameLoop);

document.fonts.ready.then(() => {
  ctx.font = '40px "Press Start 2P", monospace';
});
