const BRICK_COLOR = '#deb887';
const BRICK_THICKNESS = 25;
const BRICK_WIDTH = 120;

const WIN_SCORE = 10;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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

function update() {}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayGround();
  drawScore();
  drawBriks();
}

function drawPlayGround() {}

function drawScore() {
  const {
    players: { firstPlayer },
    players: { secondPlayer },
  } = gameState;

  ctx.fillStyle = BRICK_COLOR;
  ctx.textAlign = 'center';
  ctx.fillText(
    firstPlayer.score + ' - ' + secondPlayer.score,
    canvas.width / 2,
    60
  );
}

function drawBriks() {
  const {
    players: { firstPlayer },
    players: { secondPlayer },
  } = gameState;

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

requestAnimationFrame(gameLoop);

document.fonts.ready.then(() => {
  ctx.font = '40px "Press Start 2P", monospace';
});
