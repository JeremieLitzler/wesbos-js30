# Slide In on Scroll

[< Back to table of content](../../README.md) |
[View previous exercice's notes >](../12-Key.Sequence.Detection/Notes.md) |
[View next exercice's notes >](../14-JavaScript.References.VS.Copying/Notes.md)

## Instructions

When the user scrolls where there is an image, the image will slide in or slide up when it is on screen the way.
So:

- As the user scrolls down, when the image is 50% in the viewport, we show it.
- As the user scrolls down past the image, when the image is 50% off scree, we hide it.

### Brainstorming

#### How do you how far from the top of the viewport the image is

- [See getBoundingClientRect](https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect).
  - `top` is how far the top of the element is from top of viewport.
  - `bottom` is how far the bottom of the element is from top of viewport.
  - `top` - bottom = height.
  - `height` is the height of the element.
  - negative value of top means the element is disappearing from the viewport.
  - negative value of bottom means the element is gone from the viewport.

#### How do we calculate that half the image is visible in the viewport

- half the image = `height` of element / 2
- visible part of the image = `height of window` - `top` [distance of top of element from top of viewport]

#### How do we know the image is going off screen

When `top` = - `height` of element
