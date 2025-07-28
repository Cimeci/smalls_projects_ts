const canvas = document.getElementById("pong") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

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

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function update() {
  	if (keys["w"] && leftPaddle.y > 0) leftPaddle.y -= speed;
  	if (keys["s"] && leftPaddle.y + paddleHeight < canvas.height) leftPaddle.y += speed;

  	if (keys["ArrowUp"] && rightPaddle.y > 0) rightPaddle.y -= speed;
  	if (keys["ArrowDown"] && rightPaddle.y + paddleHeight < canvas.height) rightPaddle.y += speed;

  	ball.x += ball.speedX;
  	ball.y += ball.speedY;

  	if (ball.y < 0 || ball.y > canvas.height) ball.speedY *= -1;

  	const hitLeft = ball.x - ball.radius < leftPaddle.x + paddleWidth && ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight;

  	const hitRight = ball.x + ball.radius > rightPaddle.x && ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight;

  	if (hitLeft || hitRight) ball.speedX *= -1;

  	if (ball.x < 0 || ball.x > canvas.width) {
  	  ball.x = canvas.width / 2;
  	  ball.y = canvas.height / 2;
  	  ball.speedX *= -1;
  	}
}

function draw() {
  	ctx.clearRect(0, 0, canvas.width, canvas.height);

  	ctx.fillStyle = "white";
  	ctx.fillRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight);
  	ctx.fillRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight);

  	ctx.beginPath();
  	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  	ctx.fill();
}

function loop() {
  	update();
  	draw();
  	requestAnimationFrame(loop);
}

loop();
