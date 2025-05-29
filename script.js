// script.js
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const timeBar = document.getElementById('progress-bar');
const difficultySelect = document.getElementById('difficulty');
const startButton = document.getElementById('start-button');

let score = 0;
let highScore = localStorage.getItem('whackHighScore') || 0;
let timeLeft = 30;
let gameTime = 30;
let moleTimerId = null;
let countdownId = null;

highScoreDisplay.textContent = highScore;

function randomHole() {
  holes.forEach(hole => hole.classList.remove('up'));
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  hole.classList.add('up');
}

function startGame() {
  score = 0;
  timeLeft = gameTime;
  scoreDisplay.textContent = score;
  timeBar.style.width = '100%';
  startButton.disabled = true;

  const difficulty = parseInt(difficultySelect.value);

  countdownId = setInterval(() => {
    timeLeft--;
    timeBar.style.width = `${(timeLeft / gameTime) * 100}%`;
    if (timeLeft <= 0) {
      clearInterval(countdownId);
      clearInterval(moleTimerId);
      holes.forEach(hole => hole.classList.remove('up'));
      startButton.disabled = false;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('whackHighScore', highScore);
        highScoreDisplay.textContent = highScore;
      }
      alert(`Game Over! Your score is ${score}.`);
    }
  }, 1000);

  moleTimerId = setInterval(randomHole, difficulty);
}

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole.classList.contains('up')) {
      score++;
      scoreDisplay.textContent = score;
      hole.classList.remove('up');
    }
  });
});

startButton.addEventListener('click', startGame);


