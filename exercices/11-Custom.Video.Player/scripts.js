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

let paused = true;
let spacePressed = false;
let skipValue = 0;
videoEl.currentTime = 0;

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

/**
 * Control the playback from clicking the play button.
 * Also, pressing space bar pause and stop the video.
 */
function controlPlayback(event) {
  if (this.dataset !== undefined && this.dataset.skip) {
    console.log(`${this.dataset.skip}`);
    const newCurrentTime = videoEl.currentTime + this.dataset.skip;
    if (newCurrentTime <= 0) {
      console.log("can't go to negative value!");
      return;
    }
    videoEl.currentTime += this.dataset.skip;
    console.log(videoEl.currentTime);
    return;
  }

  spacePressed = event.keycode === 32;

  //pause using the space bar
  if (spacePressed) paused = !paused;

  //pause the video if it is isn't
  if (!paused) {
    return pause();
  }

  //otherwise, play it!
  paused = false;
  console.log("Let's play!");
  videoEl.play();
  console.log(videoEl.currentTime);

  console.log('Playing!');
}

playBtn.addEventListener('click', controlPlayback);
window.addEventListener('keydown', controlPlayback);
skipBtns.forEach((skipBtn) => {
  skipBtn.addEventListener('click', controlPlayback);
});
