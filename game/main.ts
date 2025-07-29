const canvas = document.getElementById("pong") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
let	isRunning = false;
let gameOver = false;

const paddleWidth = 10;
const paddleHeight = 100;
const speed = 6;

const leftPaddle = { x: 10, y: canvas.height / 2 - paddleHeight / 2 };
const rightPaddle = { x: canvas.width - 20, y: canvas.height / 2 - paddleHeight / 2 };

const ball = {
  	x: canvas.width / 2,
  	y: canvas.height / 2,
  	radius: 10,
  	speedX: 5,
  	speedY: 5
};

const keys: Record<string, boolean> = {};

let score1 = 0;
let score2 = 0;

function drawScore(ctx) {
  	ctx.font = "30px Arial";
  	ctx.fillStyle = "#FFF";
  	ctx.fillText(`${score1}`, canvas.width / 4, 50);
  	ctx.fillText(`${score2}`, (canvas.width * 3) / 4, 50);
}

document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    if (gameOver) {
      score1 = 0;
      score2 = 0;
      gameOver = false;
    }

    isRunning = !isRunning;
    if (isRunning) {
      resetBall();
    } else {
      ball.speedX = 0;
      ball.speedY = 0;
    }
  }
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {keys[e.key] = false});

function resetBall() {
  	ball.x = canvas.width / 2;
  	ball.y = canvas.height / 2;

  	const speed = canvas.width / 200;
	
	const maxAngle = Math.PI / 4;
  	// const angle = (Math.random() * 2 - 1) * maxAngle;
	let angle = 0;
	do {
		angle = (Math.random() * 2 - 1) * maxAngle;
	} while (Math.abs(angle) < 0.1); // angle > ~6°

  	const direction = Math.random() < 0.5 ? -1 : 1;

  	ball.speedX = Math.cos(angle) * speed * direction;
  	ball.speedY = Math.sin(angle) * speed;
	
}


function update() {
	if (score1 >= 5 || score2 >= 5) {
  		isRunning = false;
  		gameOver = true;
  		ball.speedX = 0;
  		ball.speedY = 0;
	}

  	if (keys["w"] && leftPaddle.y > 2) leftPaddle.y -= speed;
  	if (keys["s"] && leftPaddle.y + paddleHeight < canvas.height - 2) leftPaddle.y += speed;

  	if (keys["ArrowUp"] && rightPaddle.y > 2) rightPaddle.y -= speed;
  	if (keys["ArrowDown"] && rightPaddle.y + paddleHeight < canvas.height - 2) rightPaddle.y += speed;

	if (keys["space"]) {ball.speedX = 0; ball.speedY = 0;}

  	ball.x += ball.speedX;
  	ball.y += ball.speedY;

  	if (ball.y < 0 || ball.y > canvas.height) ball.speedY *= -1;

  	const hitLeft = ball.x - ball.radius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight;

  	const hitRight = ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight;

  	if (hitLeft || hitRight) ball.speedX *= -1;

  	if (ball.x < 0 || ball.x > canvas.width) {
		if (ball.x < 0) {
  			score2++;
  			resetBall();
		}
		if (ball.x > canvas.width) {
			score1++;
			resetBall();
		}
  	  	ball.x = canvas.width / 2;
  	  	ball.y = canvas.height / 2;
  	  	ball.speedX *= -1;
  	}

	const accelerationFactor = 1 + (canvas.width / 2000000);
	ball.speedX *= accelerationFactor;
	ball.speedY *= accelerationFactor;
}

function draw() {
	if (gameOver) {
		overlay.style.display = "flex";
		modalText.textContent = score1 > score2 ? "Player 1 a gagné !" : "Player 2 a gagné !";
		startBtn.textContent = "Rejouer";
	}

  	ctx.clearRect(0, 0, canvas.width, canvas.height);

  	ctx.fillStyle = "white";
  	ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
  	ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

  	ctx.beginPath();
  	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  	ctx.fill();
	drawScore(ctx);
}

function loop() {
  	update();
  	draw();
  	requestAnimationFrame(loop);
}

const overlay = document.getElementById("overlay")!;
const startBtn = document.getElementById("startBtn")!;
const modalText = document.getElementById("modalText")!;

startBtn.addEventListener("click", () => {
  if (gameOver) {
    score1 = 0;
    score2 = 0;
    gameOver = false;
    modalText.textContent = "Voulez-vous jouer à Pong ?";
    startBtn.textContent = "Jouer";
	}
	overlay.style.display = "none";
	isRunning = true;
	resetBall();
	loop();
});
