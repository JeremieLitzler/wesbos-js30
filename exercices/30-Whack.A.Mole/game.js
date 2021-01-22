const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let lastHole;
let score = 0;
let gameEnded = false;
const gameDuration = 10000;

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
  showMole();
  setTimeout(() => (gameEnded = true), gameDuration);
}

function testPickRandonHole(times) {
  for (let index = 0; index < times; index++) {
    const id = pickRandomHoleId();
    console.log(id);
    console.assert(id > 0 && id <= 6);
  }
}
