# Speech Synthesis

[< Back to table of content](../README.md) |
[View previous exercice's notes >](../22-Follow.Along.Link.Highlighter/Notes.md) |
[View next exercice's notes >](../24-Sticky.Nav/Notes.md)

## Instructions

Look at the [SpeechSynthesisUtterance API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) to know how to make the speaker... tell your story!

We need to:

- Load the voices
  - That is done with [SpeechSynthesis.getVoices()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices)
- Select a voice in a dropdown
  - On select an option of the dropdown, we want to set the speaker's voice (SpeechSynthesisUtterance.voice)
- Listen for the rate and pitch value update so that the voice selected will speak the sentence according to those values.
  - On the input event, set the SpeechSynthesisUtterance.rate or SpeechSynthesisUtterance.pitch on the speaker's instance
- Bind the speak and stop buttons to what they need to do.
  - To start or stop the speaker, we can user [speak()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak) and [cancel](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel) of SpeechSynthesis object.

BONUS :

- Transform the Speak button as paused and resume button
- Load the speaker with the default selection of voice, rate and pitch.
