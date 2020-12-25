# Notes

## Instructions

Make the hands **rotate** based on the current time.

## How do you rotate in css

We need to use the `@keyframes`.

Ex:

```css
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
```

## How do we rotate

In css, `rotate` operates on the center of the element to rotate.
We want to rotate it from the start of each hand at the center of the clock.

Therefore we need to change the origin.

## How much do we rotate

However, in our case, we need to rotate how much per second, minute or hour?

- for a second: there is 60 seconds in a minute. So it will make **6 degrees** per second.
- for a minute: same rotation angle for the minutes per hour, e.g. **6 degrees** per minutes
  - we could break down each minute into a **0.1 degree** rotation per second to make it smooth.
- for an hour:
  - we could rotate once each hour (dirty UI), e.g. 30 degrees
  - or we could rotate a pourcentage of 30 degree based on the minute count:
    - 30 minutes = 15 degrees
    - 17 minutes = 8.5 degrees
    - etc...
  - or we could break down each minute into a **0.1 degree** rotation per minute to make it smooth.

## Mapping the time

The rotate animation takes the number of degrees.

- 0 degree is 45min or 45 seconds or 9h.
- 180 degrees is 15min or 15 seconds or 3h.
- 0 degree = 360 degree
- etc...

We could also rotate all hands by 90 degrees to set the noon/midnight time.

## Time to run the script

Doing the following shows that the 1 second interval between each run of the script results in an issue:

```js
function setDate() {
  const now = new Date();
  const second = now.getSeconds();
  const minute = now.getMinutes();
  const hour = now.getHours();
  const ms = now.getMilliseconds();
  console.log(`It is ${hour}:${minute}:${second} (${ms})`);
}

setInterval(setDate, 1000);
```

See [the DevTools console logs](DevTools.logs.md).
