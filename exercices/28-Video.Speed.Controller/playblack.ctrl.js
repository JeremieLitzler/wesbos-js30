const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('video');
const minPlayback = 0.5;
const maxPlayback = 5;
function updatePlayback(event) {
  //evaluate the bar value on hover
  console.log(event);
  const pageY =
    event.type === 'touchmove' ? [...event.touches][0].pageY : event.pageY;

  const barFillValue =
    //cursor position on the page
    //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY
    pageY -
    //distance of the outer border of the current element relative to the inner border of the top of the offsetParent node.
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop
    this.offsetTop;
  //console.log(barFillValue);
  const maxBarHeight = speed.offsetHeight;
  const barPercent = barFillValue / maxBarHeight;
  //console.log(barPercent);
  bar.style.height = `${barPercent * 100}%`;

  //We need to a min and max speeds
  //where 0% of barFillValue is minPlayback
  //and 100% of barFillValue is maxPlayback
  const playback = barPercent * (maxPlayback - minPlayback) + minPlayback;
  console.log(playback);
  bar.innerHTML = `${playback.toFixed(2)}x`;
  video.playbackRate = playback.toFixed(2);
}
speed.addEventListener('mousemove', updatePlayback);
speed.addEventListener('touchmove', updatePlayback);
