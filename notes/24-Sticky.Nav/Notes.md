# Speech Synthesis

[< Back to table of content](../../README.md) |
[View previous exercice's notes >](../23-Speech.Synthesis/Notes.md) |
[View next exercice's notes >](../25-Event.Capture.Propagation.Bubbling.and.Once/Notes.md)

## Instructions

We have a big header nav and as :

- we scroll down, the nav will fix itself to the top of the window
- we scroll up back to the top, the nav is unfixed.

The content will be slightly scaled (0.98 to 1) when the nav is fixed.

## `offsetTop`

[`offsetTop`](https://www.w3schools.com/jsref/prop_element_offsettop.asp) is the distance between the element and its parent.

In our case, the parent is `body`.

So as we scroll down, we want to check when window.scrollY ([see MDN](https://developer.mozilla.org/fr/docs/Web/API/Window/scrollY)) is larger than `offsetTop` of the nav element.

As soon as it happens, we fix the nav.
We will need to add some `padding-top` so the content following the nav doesn't suddenly get close to the nav element.
