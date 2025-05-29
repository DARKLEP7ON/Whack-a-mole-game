// script.js
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const startButton = document.getElementById('start-button');

let score = 0;
let timeLeft = 30;
let timerId = null;
let moleTimerId = null;

function randomHole() {
  holes.forEach(hole => hole.classList.remove('up'));
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  hole.classList.add('up');
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;
  startButton.disabled = true;

  timerId = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerId);
      clearInterval(moleTimerId);
      holes.forEach(hole => hole.classList.remove('up'));
      alert(`Game Over! Your score is ${score}.`);
      startButton.disabled = false;
    }
  }, 1000);

  moleTimerId = setInterval(randomHole, 800);
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
