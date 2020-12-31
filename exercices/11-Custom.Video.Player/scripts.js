const videoEl = document.querySelector('.player__video');
const playBtn = document.querySelector('.player__button.toggle');
const volumeCursor = document.querySelector('.player__slider[name="volume"]');
const playbackSpdCursor = document.querySelector(
  '.player__slider[name="playbackRate"]',
);
const skipBtns = document.querySelectorAll('[data-skip]');

console.assert(videoEl !== undefined);
console.assert(playBtn !== undefined);
console.assert(volumeCursor !== undefined);
console.assert(playbackSpdCursor !== undefined);
console.assert(skipBtns !== undefined);
console.assert(skipBtns.length === 2);

console.dir(videoEl);

let paused = true;
let spacePressed = false;
let skipValue = 0;
videoEl.currentTime = 0;

function play() {
  paused = false;
  console.log("Let's play!");
  videoEl.play();
  console.log(videoEl.currentTime);

  console.log('Playing!');
}
/**
 * Pause the video
 */
function pause() {
  console.log("Let's pause!");
  videoEl.pause();
  console.log('Paused!');
  console.log(videoEl.currentTime);

  paused = true;
}
function handleSkip(skipElement) {
  if (skipElement.dataset !== undefined && skipElement.dataset.skip) {
    console.log(`${skipElement.dataset.skip}`);
    const newCurrentTime = videoEl.currentTime + skipElement.dataset.skip;
    if (newCurrentTime <= 0) {
      console.log("can't go to negative value!");
      return;
    }
    videoEl.currentTime += parseInt(skipElement.dataset.skip);
    console.log(videoEl.currentTime);
    return;
  }
}

function handleVolume(cursor) {
  return;
}
function handlePlaybackSpeed(cursor) {
  return;
}
/**
 * Control the playback from clicking the play button.
 * Also, pressing space bar pause and stop the video.
 */
function controlPlayback(event) {
  spacePressed = event.keycode === 32;

  handleSkip(this);
  //pause using the space bar
  if (spacePressed) paused = !paused;
  //pause the video if it is isn't
  if (!paused) {
    return pause();
  }
  //otherwise, play it!
  play();
}

playBtn.addEventListener('click', controlPlayback);
window.addEventListener('keydown', controlPlayback);
skipBtns.forEach((skipBtn) => {
  skipBtn.addEventListener('click', controlPlayback);
});
volumeCursor.addEventListener('', controlPlayback);
playbackSpdCursor.addEventListener('', controlPlayback);
