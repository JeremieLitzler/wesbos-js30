# Whack a mole

[< Back to table of content](../README.md) |
[View previous exercice's notes >](../29-Countdown.Timer/Notes.md)

## Instructions

Using a start button, we launch the game.

The game:

- runs a set time in seconds.
- show a mole from a **randomly picked hole** for a **random time**.
- counts the amount of hits of a mole as it shows up.

BONUS: we will show a timer of the time left in the game.

## Resources

I have use [Math.random](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random) to calculate:

- the random index in the mole list
  - I needed to pick a value from 0 to 5 in the list of six holes where the moles are.
- the random show time
  - I chose to pick a value between 200ms and 2000ms.
