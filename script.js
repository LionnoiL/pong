const BORDER_COLOR = '#fff';
const BRICK_COLOR = '#deb887';
const BRICK_THICKNESS = 25;
const BRICK_WIDTH = 120;
const BRICK_SPEED = 20;
const WIN_SCORE = 10;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const midWidthPlayground = canvas.width / 2;
const midHeightPlayground = canvas.height / 2;

const keys = {};

const gameState = {
  players: {
    firstPlayer: {
      score: 0,
      pos: midHeightPlayground - BRICK_WIDTH / 2,
      color: BRICK_COLOR,
    },
    secondPlayer: {
      score: 0,
      pos: midHeightPlayground - BRICK_WIDTH / 2,
      color: BRICK_COLOR,
    },
  },
};

const {
  players: { firstPlayer },
  players: { secondPlayer },
} = gameState;

function handleMove(player, move) {
  if (move === 'ArrowUp') {
    const newPos = player.pos - BRICK_SPEED;
    player.pos = newPos < 0 ? 0 : newPos;
  } else if (move === 'ArrowDown') {
    const newPos = player.pos + BRICK_SPEED;
    player.pos =
      newPos > canvas.height - BRICK_WIDTH
        ? canvas.height - BRICK_WIDTH
        : newPos;
  }
}

function update() {
  if (keys['ArrowUp']) {
    handleMove(firstPlayer, 'ArrowUp');
  }

  if (keys['ArrowDown']) {
    handleMove(firstPlayer, 'ArrowDown');
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayGround();
  drawScore();
  drawBriks();
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
  ctx.fillRect(0, firstPlayer.pos, BRICK_THICKNESS, BRICK_WIDTH);

  ctx.fillStyle = secondPlayer.color;
  ctx.fillRect(
    canvas.width - BRICK_THICKNESS,
    secondPlayer.pos,
    BRICK_THICKNESS,
    BRICK_WIDTH
  );
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
