# Countdown Timer

[< Back to table of content](../../README.md) |
[View previous exercice's notes >](../28-Video.Speed.Controller/Notes.md) |
[View next exercice's notes >](../30-Whack.A.Mole/Notes.md)

## Instructions

Build a countdown timer for various values and display the clock time when the timer will end.

## `Date` tricks

For the countdown, it is much easier to handle a timestamp.

To build a timestamp, it is done with:

```js
const timestampNow = Date.now();

const secondsToAdd = 1000;
//convert seconds to ms
const timestampFuture = Date.now() + secondsToAdd * 1000;

//usage of the timestamp
const futureDate = new Date(timestampFuture);
```

Then you can access the `Date` methods: `getHours`, `getMinutes`, `getSeconds`, etc...
