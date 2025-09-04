let count = 0;
let gameActive = false;
let timer;
const TIME_LIMIT = 10; // seconds

const clickBtn = document.getElementById("clickerGame");
const scoreDisplay = document.getElementById("clickScore");
const finalScoreDisplay = document.getElementById("finalScore");
const resetBtn = document.getElementById("resetScore");
const homeBtn = document.getElementById("homeBtn");

function startGame() {
    count = 0;
    gameActive = true;
    scoreDisplay.innerText = `Score: ${count}`;
    finalScoreDisplay.innerText = "";
    clickBtn.disabled = false;
    resetBtn.classList.add("hidden");
    homeBtn.classList.add("hidden");

    timer = setTimeout(endGame, TIME_LIMIT * 1000);
}

function endGame() {
    gameActive = false;
    clickBtn.disabled = true;
    finalScoreDisplay.innerText = `Final Score: ${count}`;
    resetBtn.disabled = false;
    resetBtn.classList.remove("hidden");
    homeBtn.classList.remove("hidden");
}

clickBtn.addEventListener("click", function () {
    if (!gameActive) {
        startGame();
    }
    if (gameActive) {
        count++;
        scoreDisplay.innerText = `Score: ${count}`;
    }
});

resetBtn.addEventListener("click", function () {
    clearTimeout(timer);
    startGame();
});

// Initialize UI
scoreDisplay.innerText = "Score: 0";
finalScoreDisplay.innerText = "";
clickBtn.disabled = false;
resetBtn.classList.add("hidden");
homeBtn.classList.add("hidden");

document.addEventListener('DOMContentLoaded', function () {
    const notification = document.getElementById('notification');
    const closeButton = document.getElementById('closeNotification');

    // Display the notification on page load
    notification.classList.remove('hidden');

    // Hide the notification when the close button is clicked
    closeButton.addEventListener('click', function () {
        notification.classList.add('hidden');
    });
});