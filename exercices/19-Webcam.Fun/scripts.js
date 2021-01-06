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
