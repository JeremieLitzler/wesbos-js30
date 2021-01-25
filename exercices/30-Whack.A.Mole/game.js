const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('.display__time-left');

let lastHole;
let score = 0;
let gameEnded = false;
const gameDurationMs = 10000;
let countDown;

function pickRandomHoleId() {
  return Math.floor(Math.random() * holes.length) + 1;
}
function pickHole() {
  //pick a mole in a list
  const holeId = pickRandomHoleId();
  console.log('holeId', holeId);
  const hole = [...holes].find((h) => h.classList.contains(`hole${holeId}`));
  console.assert(hole !== undefined, 'hole is not found...');
  //don't pick the same twice!
  if (lastHole === hole) hole = pickHole();
  //show the mole
  return hole;
}

function getRandomMoleShowTime(params) {
  //set a min and max show time in ms
  const min = 200;
  const max = 1000;
  //get a random value between the min and max
  const showTime = Math.floor(Math.random() * (max - min)) + min;
  return showTime;
}
function showMole() {
  const hole = pickHole();
  const showTime = getRandomMoleShowTime();
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!gameEnded) showMole();
  }, showTime);
}
function startGame() {
  scoreBoard.innerHTML = 0;
  gameEnded = false;
  launchTimer(gameDurationMs / 1000);
  showMole();
  setTimeout(() => {
    gameEnded = true;
    console.log('Game is done!');
  }, gameDurationMs);
}

function testPickRandonHole(times) {
  for (let index = 0; index < times; index++) {
    const id = pickRandomHoleId();
    console.log(id);
    console.assert(id > 0 && id <= 6);
  }
}
function keepScore() {
  score++;
  scoreBoard.innerHTML = score;
}
function moleHit(event) {
  //https://developer.mozilla.org/fr/docs/Web/API/Event/isTrusted
  if (!event.isTrusted) {
    alert('Are you cheating?');
    return; // cheater!
  }
  keepScore();
}
/**
 * Display the timer value, e.g. minutes and seconds left
 *
 * @param {int} timerVal the timer value in seconds
 */
function displayTimer(timerVal) {
  const minutes = Math.floor(timerVal / 60);
  const remainderSeconds = timerVal % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`;
  document.title = `${display} left!`;
  timeLeft.textContent = display;
}

/**
 * Create the timestamp, call the display functions and launch the timer.
 *
 * @param {int} timerVal the timer value in seconds
 */
function launchTimer(timerVal) {
  clearInterval(countDown);
  const endTime = Date.now() + timerVal * 1000;
  displayTimer(timerVal);

  countDown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }

    displayTimer(secondsLeft);
  }, 1000);
}

moles.forEach((mole) => mole.addEventListener('click', moleHit));
