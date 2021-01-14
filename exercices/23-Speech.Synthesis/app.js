if (
  typeof speechSynthesis === 'undefined' ||
  speechSynthesis.onvoiceschanged === undefined
) {
  var unsupported = document.createElement('p');
  unsupported.style.fontSize = '2rem';
  var message =
    "Your browser doesn't support speechSynthesis or speechSynthesis.onvoiceschanged is not available" +
    '<br />' +
    'See <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" target="_blank"> MDN documentation</a>.' +
    '<br />' +
    'Use <a href="https://www.google.com/search?q=chromium+browser" target="_blank">a Chromium based browser!</a>';
  unsupported.innerHTML = message;
  document.body.appendChild(unsupported);
  synthetizedText.style.display = 'none';
  throw message;
}

const speaker = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const startOverButton = document.querySelector('#startOver');
speaker.text = document.querySelector('textarea').value;
speaker.volume = 1;
console.log('Speaker will say:', speaker.text);
//btw, speechSynthesis.paused is not set on pause...
//hence the paused variable.
//maybe it will work soon
let paused = false;

function loadVoices() {
  voices = this.getVoices();
  //console.table(voices);
  voicesDropdown.innerHTML = `${voices
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</input>`,
    )
    .join('')}`;

  //set default voice before we select one!
  setVoice(voicesDropdown);
}

function setVoice(element) {
  speaker.voice = voices.find((voice) => voice.name === element.value);
  console.log(speaker);
}

function setOption(option) {
  speaker[option.name] = option.value;
  console.log(speaker);
}
function toggle(start = true) {
  //handle stop
  if (!start) {
    paused = false;
    speechSynthesis.cancel();
    speakButton.innerText = 'Speak';
    return;
  }
  //handle startup
  if (!paused && !speechSynthesis.pending && !speechSynthesis.speaking) {
    console.log("Let's start to speak");
    speechSynthesis.speak(speaker);
    speakButton.innerText = 'Pause';
    return;
  }
  //handle pausing
  if (!paused) {
    paused = !paused;
    console.log('Pause speaker');
    speechSynthesis.pause();
    speakButton.innerText = 'Resume';
    return;
  }
  //handle resuming
  if (paused) {
    paused = !paused;
    console.log("Let's continue");
    speechSynthesis.resume();
    speakButton.innerText = 'Pause';
    return;
  }
}
// Load the voices
speechSynthesis.addEventListener('voiceschanged', loadVoices);
// Select a voice in a dropdown
voicesDropdown.addEventListener('change', () => setVoice(voicesDropdown));
// Listen for the rate and pitch value update so that the voice selected will speak the sentence according to those values.
options.forEach((range) => {
  range.addEventListener('input', setOption(range));
});
// Bind the speak and stop buttons to what they need to do.
speakButton.addEventListener('click', toggle);
startOverButton.addEventListener('click', () => toggle(false));
//reset the speak button once the speaker is done, kinda like a start over click
speaker.addEventListener('end', () => toggle(false));
