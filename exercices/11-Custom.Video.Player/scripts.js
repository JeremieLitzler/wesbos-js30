/**
 * The non-interactive UI elements
 */
const videoEl = document.querySelector('.viewer');
const progressContainer = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
/**
 * The controls
 */
const playBtn = document.querySelector('.toggle');
const cursors = document.querySelectorAll('.player__slider');
const skipBtns = document.querySelectorAll('[data-skip]');
/**
 * Check the elements are all found
 */
console.assert(videoEl !== undefined);
console.assert(progressBar !== undefined);
console.assert(playBtn !== undefined);
console.assert(cursors !== undefined);
console.assert(skipBtns !== undefined);
console.assert(cursors.length === 2);
console.assert(skipBtns.length === 2);

console.dir(videoEl);

let spacePressed = false;
let skipValue = 0;
videoEl.currentTime = 0;

/**
 * Update the toggle button icon depending on the video playing or not
 */
function updatePlayBtn(params) {
  const icon = this.paused ? '►' : '❚ ❚';
  playBtn.textContent = icon;
}
/**
 * Handle the click on the skip buttons by adding or retrieving time
 * on the currentTime of the video.
 */
function handleSkip() {
  if (this.dataset !== undefined && this.dataset.skip) {
    console.log(`${this.dataset.skip}`);
    const newCurrentTime = videoEl.currentTime + this.dataset.skip;
    if (newCurrentTime <= 0) {
      console.log("can't go to negative value!");
      return;
    }
    videoEl.currentTime += parseInt(this.dataset.skip);
    console.log(videoEl.currentTime);
    return;
  }
}
/**
 * Prevent the interaction with the controls of the video play or pause the video.
 * The interaction with the controls is dealt in its own event.
 *
 * @param {Object} event The event triggered by the user
 * @param {NodeElement} controlUsedEl The element interacted with
 */
function skipPausePlay(event, controlUsedEl) {
  if (event.keyCode === undefined) return false; //not a keyboard event

  tabPressed = event.keyCode === 9;
  shiftPressed = event.shiftKey;
  if (tabPressed || (tabPressed && shiftPressed)) return true;

  const anythingButSpacePressed =
    event.keyCode !== undefined && event.keyCode !== 32;
  if (anythingButSpacePressed) return true;

  if (controlUsedEl === undefined) return false;
  if (controlUsedEl.classList === undefined) return false;

  if (
    //when space is pressed while selecting with the keyboard
    !anythingButSpacePressed &&
    controlUsedEl.classList.contains('player__button')
  )
    return false;

  return false;
}
/**
 * Update the property in the video element
 * matching the name attribute of the cursor
 * with the cursor's value.
 */
function handleCursorUpdate() {
  console.dir(this.name); //the property to update
  console.log(this.value); //the cursor value
  console.log('Volume:', videoEl.volume);
  videoEl[this.name] = this.value;
  console.log('Volume:', videoEl.volume);
  return;
}
/**
 * Update the playbackRate of the cursor value.
 */
function handlePlaybackSpeed() {
  console.dir(this);
  console.log(this.value);
  console.log('Playback rate:', videoEl.playbackRate);
  videoEl.playbackRate = this.value;
  console.log('Playback rate:', videoEl.playbackRate);
  return;
}
/**
 * Update the progress bar
 */
function handleProgress() {
  const progressVal = (videoEl.currentTime / videoEl.duration) * 100;
  progressBar.style.flexBasis = `${progressVal}%`;
  progressBar.style.width = `${progressVal}%`;
}
/**
 * Set the progress depending on the action.
 *
 * @param {Event} event Either a click or a drag&drop
 */
function setProgress(event) {
  console.log(event.type);
  //When clicking the bar, we want to know where we clicked.
  //element.offsetX tells us.
  //So we need to know the percent value of the offset value divided by the bar full size.
  const progressVal = event.offsetX / progressContainer.offsetWidth;
  console.log(`Clicked at ${progressVal}%`);
  videoEl.currentTime = progressVal * videoEl.duration;
}

/**
 * Control the playback from clicking the play button.
 * Also, pressing space bar pause and stop the video.
 */
function controlPlayback(event) {
  console.dir(event);
  console.dir(this);
  console.log(`Key ${event.keyCode} pressed!`);
  if (skipPausePlay(event, this)) {
    return;
  }

  console.log('Paused?', videoEl.paused);
  const action = videoEl.paused ? 'play' : 'pause';
  videoEl[action]();
}

videoEl.addEventListener('click', controlPlayback);
videoEl.addEventListener('play', updatePlayBtn);
videoEl.addEventListener('pause', updatePlayBtn);
videoEl.addEventListener('timeupdate', handleProgress);
playBtn.addEventListener('click', controlPlayback);
//progressBar.addEventListener('drag', setProgress);

//This was used to use the space bar to control the play/pause.
//However, it messes up with the play button.
//window.addEventListener('keyup', controlPlayback);

skipBtns.forEach((skipBtn) => {
  skipBtn.addEventListener('click', handleSkip);
});
cursors.forEach((cursor) => {
  cursor.addEventListener('input', handleCursorUpdate);
});

progressContainer.addEventListener('click', setProgress);

/**
 * With the help of Wes!
 */
let mouvedown = false;
progressContainer.addEventListener(
  'mousemove',
  (event) => mouvedown && setProgress(event),
);
progressContainer.addEventListener('mousedown', () => (mouvedown = true));
progressContainer.addEventListener('mouseup', () => (mouvedown = false));
