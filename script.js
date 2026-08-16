const BRICK_COLOR = '#deb887';
const BRICK_THICKNESS = 25;
const BRICK_WIDTH = 120;
const BRICK_SPEED = 20;
const WIN_SCORE = 10;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const keys = {};

const gameState = {
  players: {
    firstPlayer: {
      score: 10,
      pos: 0,
      color: BRICK_COLOR,
    },
    secondPlayer: {
      score: 7,
      pos: 200,
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

function drawPlayGround() {}

function drawScore() {
  ctx.fillStyle = BRICK_COLOR;
  ctx.textAlign = 'center';
  ctx.fillText(
    firstPlayer.score + ' - ' + secondPlayer.score,
    canvas.width / 2,
    60
  );
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
