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

## How much do we rotate

However, in our case, we need to rotate how much per second, minute or hour?

- for a second: there is 60 seconds in a minute. So it will make 6 degree per second.
- for a minute: same rotation angle for the minutes per hour
- for an hour:
  - we could rotate once each hour (dirty UI), e.g. 30 degrees
  - or we could rotate a pourcentage of 30 degree based on the minute count:
    - 30 minutes = 15 degrees
    - 17 minutes = 8.5 degrees
    - etc...
