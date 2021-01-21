const timers = document.querySelectorAll('.timer__button');
const form = document.querySelector('form');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

console.assert(timers.length > 0);
console.assert(form !== null, 'no form');
console.assert(timeLeft !== null, 'no h1 found');
console.assert(endTime !== null, 'no paragraph found');

//hold the setInterval returned value
let countDown;

/**
 * Display the time when the time will end.
 *
 * @param {double} timestamp milliseconds timestamp
 */
function displayEndTime(timestamp) {
  const time = new Date(timestamp);
  console.log(
    `end at: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
  );

  const minutesInt = time.getMinutes();
  console.log('minutesInt:', minutesInt);
  let hoursInt = time.getHours();
  console.log('hoursInt:', hoursInt);
  if (hoursInt > 23) {
    hoursInt = hoursInt % 24;
  }

  endTime.innerHTML = `Be back at 
    ${hoursInt > 9 ? '' : '0'}${hoursInt}:${
    minutesInt > 9 ? '' : '0'
  }${minutesInt}`;
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
  displayEndTime(endTime);
  displayTimer(timerVal);

  //const intervalCost = 'interval';
  countDown = setInterval(() => {
    //console.time(intervalCost);
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countDown);
      return;
    }

    displayTimer(secondsLeft);
    //console.timeEnd(intervalCost);
  }, 1000);
}

/**
 * Read the preset value before launching the timer
 * @param {Object} event Click event on timer presets
 */
function setTimer(event) {
  const timerVal = this.dataset.time;
  console.log('Timer value:', timerVal);
  launchTimer(timerVal);
}

//Click handlers
timers.forEach((timer) => timer.addEventListener('click', setTimer));
//Form submit handler
form.addEventListener('submit', function (event) {
  event.preventDefault(); //prevent reload for the form submission
  const timerVal = this.minutes.value * 60;
  console.log('Timer value:', timerVal);
  launchTimer(timerVal);
});
