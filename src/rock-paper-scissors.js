let score = JSON.parse(localStorage.getItem("Score")) || { wins: 0, losses: 0, ties: 0 };

updateScoreDisplay();

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
};

document.getElementById("rockBtn").addEventListener("click", () => playGame("rock"));
document.getElementById("paperBtn").addEventListener("click", () => playGame("paper"));
document.getElementById("scissorsBtn").addEventListener("click", () => playGame("scissors"));
document.getElementById("autoPlayBtn").addEventListener("click", autoPlay);
document.getElementById("resetScoreBtn").addEventListener("click", resetScore);

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  // if (playerMove === 'scissors') {
  //   if (computerMove === 'rock') {
  //     result = 'You lose';
  //   } else if (computerMove === 'paper') {
  //     result = 'You win';
  //   } else if (computerMove === 'scissors') {
  //     result = 'Tie';
  //   }

  // } else if (playerMove === 'paper') {
  //   if (computerMove === 'rock') {
  //     result = 'You win';
  //   } else if (computerMove === 'paper') {
  //     result = 'Tie';
  //   } else if (computerMove === 'scissors') {
  //     result = 'You lose';
  //   }

  // } else if (playerMove === 'rock') {
  //   if (computerMove === 'rock') {
  //     result = 'Tie';
  //   } else if (computerMove === 'paper') {
  //     result = 'You lose';
  //   } else if (computerMove === 'scissors') {
  //     result = 'You win';
  //   }
  // };
  switch (playerMove + computerMove) {
    case 'scissorsrock': result = 'You lose'; break;
    case 'scissorspaper': result = 'You win'; break;
    case 'scissorsscissors': result = 'Tie'; break;
    case 'paperrock': result = 'You win'; break;
    case 'paperpaper': result = 'Tie'; break;
    case 'paperscissors': result = 'You lose'; break;
    case 'rockrock': result = 'Tie'; break;
    case 'rockpaper': result = 'You lose'; break;
    case 'rockscissors': result = 'You win'; break;
  };

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else if (result === 'Tie') {
    score.ties += 1;
  };

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreDisplay();

  document.getElementById('result').innerText = result;

  document.querySelector('.moves').innerHTML = `You
<img src="../images/${playerMove}-emoji.png" id="moveIcon">
<img src="../images/${computerMove}-emoji.png" id="moveIcon">
Computer`;
};

function updateScoreDisplay() {
  document.getElementById('score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
};

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
  localStorage.removeItem('score');
  updateScoreDisplay();
};

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