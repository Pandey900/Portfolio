const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;
let scoreLimit = 10; // Default score limit

document.addEventListener("keydown", directionControl);
document.getElementById("startGame").addEventListener("click", startGame);

function directionControl(event) {
  if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
  else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function startGame() {
  const userLimit = document.getElementById("scoreLimit").value;
  scoreLimit = parseInt(userLimit); // Convert input to an integer

  if (scoreLimit === 0) {
    showWebsiteContent(); // Skip the game if score limit is 0
  } else {
    document.getElementById("scoreLimitForm").style.display = "none"; // Hide form
    canvas.style.display = "block"; // Show game canvas
    document.getElementById("gameInstructions").style.display = "block"; // Show instructions
    game = setInterval(draw, 100); // Start the game
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over!");
    document.location.reload();
  }

  snake.unshift(newHead);

  if (score >= scoreLimit) {
    clearInterval(game);
    showWebsiteContent();
  }
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function showWebsiteContent() {
  const gameSection = document.getElementById("gameSection");
  const contentSection = document.getElementById("contentSection");
  gameSection.style.display = "none"; // Hide the game section
  contentSection.style.display = "block"; // Show the website content section
}

let game;
