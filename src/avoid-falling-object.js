const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game settings
canvas.width = 400;
canvas.height = 600;
const playerWidth = 40;
const playerHeight = 20;
const playerSpeed = 5;
const objectWidth = 30;
const objectHeight = 30;
const objectSpeed = 3;

let playerX = (canvas.width - playerWidth) / 2;
let score = 0;
let gameOver = false;
let fallingObjects = [];

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, canvas.height - playerHeight - 10, playerWidth, playerHeight);
}

function drawObject(obj) {
    ctx.fillStyle = 'red';
    ctx.fillRect(obj.x, obj.y, objectWidth, objectHeight);
}

function spawnObject() {
    const x = Math.random() * (canvas.width - objectWidth);
    fallingObjects.push({ x, y: -objectHeight });
}

function moveObjects() {
    for (let obj of fallingObjects) {
        obj.y += objectSpeed;
    }
    // Remove objects that are off screen
    fallingObjects = fallingObjects.filter(obj => obj.y < canvas.height);
}

function checkCollision() {
    for (let obj of fallingObjects) {
        if (
            obj.x < playerX + playerWidth &&
            obj.x + objectWidth > playerX &&
            obj.y < canvas.height - playerHeight - 10 + playerHeight &&
            obj.y + objectHeight > canvas.height - playerHeight - 10
        ) {
            gameOver = true;
        }
    }
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', 100, 300);
        ctx.font = '20px Arial';
        ctx.fillText(`Final Score: ${score}`, 130, 340);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    for (let obj of fallingObjects) {
        drawObject(obj);
    }
    drawScore();

    moveObjects();
    checkCollision();

    score++;
    requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (e.key === 'ArrowRight' && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
});

// Spawn objects every 1 second
setInterval(() => {
    if (!gameOver) spawnObject();
}, 1000);

// Start game
gameLoop();