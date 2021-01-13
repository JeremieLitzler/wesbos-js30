var synthetizedText = document.querySelector('.synthetized');
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  var unsupported = document.createElement('p');
  unsupported.style.fontSize = '2rem';
  var message =
    "Your browser doesn't support window.SpeechRecognition" +
    '<br />' +
    'See <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition" target="_blank"> MDN documentation</a>.' +
    '<br />' +
    'Use <a href="https://www.google.com/search?q=chromium+browser" target="_blank">a Chromium based browser!</a>';
  unsupported.innerHTML = message;
  document.body.appendChild(unsupported);
  synthetizedText.style.display = 'none';
  throw message;
}
const workerLang = document.querySelector('.worker-lang');
const speakUp = document.querySelector('.speak-up');
const confidenceInput = document.querySelector('#confidence');
console.dir('confidence setting:', confidenceInput);

const commands = {
  fr: [
    {
      reset: 'effacer tout',
    },
    {
      deleteLast: 'supprimer',
    },
    {
      copyLast: 'copier',
    },
  ],
  en: [
    {
      reset: 'clean up',
    },
    {
      deleteLast: 'go back',
    },
    {
      copyLast: 'copy',
    },
  ],
};
const speechWorker = new SpeechRecognition();
//we set to true so we can obtain
//the speech recognition result as we go
speechWorker.interimResults = true;
//what language does the worker speak
const userLang = navigator.language.split('-')[0];
console.log('culture:', userLang);
speechWorker.lang = userLang;

if (userLang !== 'en' && userLang !== 'fr') {
  alert(
    'Your language is not supported! Your worker will understand English :) Thank you.',
  );
  speechWorker.lang = 'en';
}
workerLang.innerHTML = `Your transcript worker listens to ${
  userLang === 'en'
    ? '<em><i><u>English</u></i></em>'
    : '<em><i><u>French</u></i></em>'
}.`;
/**
 * Checks if the result event is the final one, e.g. the speaker is done speaking.
 *
 * @param {Object} event The speech recognition result event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResult
 */
function synthetizedLastResult(event) {
  const finalResult = event.results[0];
  return finalResult.isFinal;
}

/**
 * Erase all the recorded transcripts.
 */
function reset() {
  synthetizedText.innerHTML = '';
  return true;
}

/**
 * Remove the last recorded transcript.
 */
function deleteLast() {
  console.log(synthetizedText.childNodes);
  const lastTranscript = synthetizedText.lastChild;
  //if there is no note, nothing to do
  if (lastTranscript === undefined) return true;

  console.log(lastTranscript.innerText);
  synthetizedText.removeChild(lastTranscript);
  return true;
}

/**
 * Duplicate the last recorded transcript.
 */
function copyLast() {
  const lastTranscript = synthetizedText.lastChild;

  //if there is no note, nothing to do
  if (lastTranscript === undefined) return true;

  console.log(lastTranscript.innerText);
  addNewParagraph(lastTranscript.innerText);
  return true;
}

/**
 * Call the requested function dynamically
 *
 * @param {string} funcName the function name to call
 */
function dispatchCommand(funcName) {
  return this[funcName].apply(this, Array.prototype.slice.call(arguments, 1));
}

/**
 * Find out if the transcript is a command or not.
 *
 * @param {string} transcript The spoken sentence
 */
function findCommand(transcript) {
  //let run the command!
  const cultureCommands = commands[userLang];
  if (!cultureCommands) {
    console.warn(`No command for language "${userLang}"!`);
    return;
  }
  let command = undefined;
  for (const cultureCommand of cultureCommands) {
    const cultureCommandArr = [...Object.entries(cultureCommand)[0]];
    console.assert(
      cultureCommandArr.length,
      'check the command definition. it must be an object of following format: { command: "word triggering the command"',
    );
    const isCommandMatch = cultureCommandArr.some((cmdPart) => {
      cmdPart === transcript;
    });
    if (isCommandMatch) {
      command = cultureCommandArr[0];
      console.log('commande found!', command);
      break;
    }
  }
  //continue to write the transcript
  if (command === undefined) return false;

  //otherwise, execute the command
  const dispatchResult = dispatchCommand(command, transcript);
  console.log('dispatchResult', dispatchResult);
  return dispatchResult;
}

/**
 * Add the transcript to the notes.
 *
 * @param {string} transcript The spoken sentence
 */
function addNewParagraph(transcript) {
  p = document.createElement('p');
  p.innerText = transcript;
  synthetizedText.append(p);
}

/**
 * Check if the confidence value is high enough to write what was said.
 *
 * @param {Object} event The speech recognition result event
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionResult
 */
function speakMoreClearly(event) {
  const finalResult = event.results[0];
  const confidence = finalResult[0].confidence;
  const minConfidence = confidenceInput.valueAsNumber;
  console.log('confidence setting:', minConfidence);
  if (confidence > minConfidence) return false;

  speakUp.innerHTML = `Your humble worker wasn't confident enough to transcribe what you said (${Math.round(
    confidence * 100,
  )} %). He needs at least ${minConfidence * 100} % to help you :-)`;
  speakUp.style.display = 'block';
  console.warn('Speak more clearly :-)');
  return true;
}
/**
 * The handler when the result is read by the browser.
 */
speechWorker.addEventListener('result', function (event) {
  speakUp.style.display = 'none';

  // the text synthetized is found in
  //event.results[0][0].transcript
  console.log(event.results[0][0].transcript);

  const transcript = [...event.results]
    .map((result) => result[0]) //SpeechRecognitionResult
    .map((result) => result.transcript) //SpeechRecognitionAlternative
    .join(''); //build the sentence from each SpeechRecognitionAlternative

  if (!synthetizedLastResult(event)) return;
  if (speakMoreClearly(event)) return;
  if (findCommand(transcript)) return;

  //Ok to update the notes
  addNewParagraph(transcript);
});

//restart speechWorker after it is done capturing the speaker
speechWorker.addEventListener('end', speechWorker.start);

//the speech worker needs to start listening
speechWorker.start();
