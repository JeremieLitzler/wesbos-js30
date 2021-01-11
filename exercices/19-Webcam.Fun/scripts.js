var photoBooth = document.querySelector('.photobooth');

if (!navigator.mediaDevices) {
  var unsupported = document.createElement('p');
  unsupported.style.fontSize = '2rem';
  var message =
    "Your browser doesn't support navigator.mediaDevices" +
    '<br/>' +
    'See <a href="https://developer.mozilla.org/en-US/docs/Web/API/Navigator/mediaDevices" target="_blank"> MDN documentation</a>.' +
    '<br/>' +
    'Use <a href="https://www.google.com/search?q=evergreen+browser" target="_blank">an evergreen browser!</a>';
  unsupported.innerHTML = message;
  document.body.appendChild(unsupported);
  photoBooth.style.display = 'none';
  throw message;
}
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
//where we put the photos taken
const strip = document.querySelector('.strip');
//the audio element
const snap = document.querySelector('.snap');
let loggedPixels = false;
let useRedEffect = false;
let useRGBSplit = false;
let useGreenScreen = false;

function handleWebcameError(err) {
  const errorMsg = document.createElement('p');
  errorMsg.className = 'error';
  if (err.name.includes('NotAllowed')) {
    errorMsg.innerHTML = 'You denied camera access...';
  } else {
    errorMsg.innerHTML = `Error ${err.name} occured!`;
  }
  document.body.appendChild(errorMsg);
}

function modifyPaintedFrame(videoWidth, videoHeight) {
  if (loggedPixels) return;

  let pixels = ctx.getImageData(0, 0, videoWidth, videoHeight);
  //console.log(pixels);
  //loggedPixels = true;
  if (useRedEffect) redEffect(pixels);
  if (useRGBSplit) rgbSplit(pixels);
  if (useGreenScreen) greenScreen(pixels);
}

function enableRedEffect() {
  useRedEffect = true;
  useGreenScreen = useRGBSplit = !useRedEffect;
}
function redEffect(pixels) {
  //we increment by 4 because we read one pixel at a time
  for (let index = 0; index < pixels.data.length; index += 4) {
    pixels.data[index] += 100; //red
    pixels.data[index + 1] -= 50; //green
    pixels.data[index + 2] *= 0.5; //blue
  }
  ctx.putImageData(pixels, 0, 0);
}
function enableRGBSplit() {
  useRGBSplit = true;
  useGreenScreen = useRedEffect = !useRGBSplit;
}

function rgbSplit(pixels) {
  //we increment by 4 because we read one pixel at a time
  for (let index = 0; index < pixels.data.length; index += 4) {
    pixels.data[index + 50] = pixels.data[index]; //red
    pixels.data[index - 300] = pixels.data[index + 1]; //green
    pixels.data[index + 100] = pixels.data[index + 2]; //blue
  }
  ctx.putImageData(pixels, 0, 0);
}

function enableGreenScreen() {
  useGreenScreen = true;
  useRGBSplit = useRedEffect = !useGreenScreen;
}

function greenScreen(pixels) {
  //levels are the range for each color for which we want to take
  //the color out in the given image.
  const levels = {};

  //we read the levels from the inputs
  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  //we increment by 4 because we read one pixel at a time
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    //so if the given color is within the range
    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      //we will set the alpha to 0 = transparent.
      pixels.data[i + 3] = 0;
    }
  }
  ctx.putImageData(pixels, 0, 0);
}
function continuouslyPaintFrame() {
  //take a frame every 16ms. Value depends on the machine...
  //the higher the value, the less fluid it  will be.
  //the lower the value, the more fluid it is but it can drain resources!
  const refreshTime = 16;
  const videoWidth = video.videoWidth;
  const videoHeight = video.videoHeight;
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  setInterval(() => {
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
    modifyPaintedFrame(videoWidth, videoHeight);
  }, refreshTime);
}

function takePhoto() {
  //Get the image as jpeg
  //See https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
  //for the supported formats
  const picture = canvas.toDataURL('image/jpeg');
  const downloadableImage = document.createElement('a');
  //Set the download URL
  downloadableImage.href = picture;
  //Set the image name
  downloadableImage.setAttribute('download', 'image');
  //add the image thumbnail
  downloadableImage.innerHTML = `<img src="${picture}" alt="Video shot" />Image ${
    strip.childNodes.length + 1
  }`;
  //Add downloadableImage to the list
  strip.insertBefore(downloadableImage, strip.firstChild);
}

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((mediaStream) => {
      console.log(mediaStream);
      video.srcObject = mediaStream;
      video.load();
      video.play();
      console.dir(video);
    })
    .catch((err) => {
      handleWebcamError(err);
    });
}

getVideo();
//Why listening to the event "canplay" rather than at the end of the .then() in the promise?
//Because the Promise is run once!
video.addEventListener('canplay', continuouslyPaintFrame);
