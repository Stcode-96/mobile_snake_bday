// JavaScript code for the Snake game
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

// Adjust canvas size for better mobile display
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 20;

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  ctx.fillStyle = "#00ff00";
  snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

  // Draw food
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function update() {
  // Move the snake
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y -= 1;
      break;
    case "down":
      head.y += 1;
      break;
    case "left":
      head.x -= 1;
      break;
    case "right":
      head.x += 1;
      break;
  }

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    snake.push({});
    spawnFood();
  }

  // Update the snake
  snake.unshift(head);
  snake.pop();

  // Check for collisions with walls or itself
  if (
    head.x < 0 || head.x >= canvas.width / gridSize ||
    head.y < 0 || head.y >= canvas.height / gridSize ||
    checkCollision()
  ) {
    alert("Game Over!");
    resetGame();
  }
}

function checkCollision() {
  const [head, ...body] = snake;
  return body.some(segment => segment.x === head.x && segment.y === head.y);
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / gridSize)),
    y: Math.floor(Math.random() * (canvas.height / gridSize))
  };
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  spawnFood();
}

// Touch event handling for mobile
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  // Determine the primary direction of the swipe
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    // Horizontal swipe
    direction = deltaX > 0 ? "right" : "left";
  } else {
    // Vertical swipe
    direction = deltaY > 0 ? "down" : "up";
  }

  // Prevent scrolling on mobile
  event.preventDefault();
}

// Birthday message on winning
function celebrate() {
  alert("Happy Birthday Welilie! May you have many more!");
  // Add celebratory visuals here (confetti, animations, etc.)
  // ...
}

// Listen for touch events on mobile
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);

// Game loop
function gameLoop() {
  draw();
  update();

  // Check for win condition (customize as needed)
  if (snake.length === (canvas.width / gridSize) * (canvas.height / gridSize)) {
    celebrate();
    resetGame();
  }

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();


