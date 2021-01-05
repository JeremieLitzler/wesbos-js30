# Mouse Move Shadow

[< Back to table of content](../README.md) |
[View previous exercice's notes >](../15-LocalStorage/Notes.md) |
[View next exercice's notes >](../17-Sort.Without.Articles/Notes.md)

## Instructions

We want to add 4 values (4 colors) to `text-shadow` as we hover inside the hero div so that when:

- the cursor is up, the shadow is down
- the cursor is down, the shadow is on top
- etc for left or right.

## Resources

- [offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
- [offsetHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)

Also,

- `offsetWidth`, `offsetHeight`: The size of the visual box incuding all borders. Can be calculated by adding `width/height` and paddings and borders, if the element has `display: block`
- `clientWidth`, `clientHeight`: The visual portion of the box content, not including borders or scroll bars , but includes padding . Can not be calculated directly from CSS, depends on the system's scroll bar size.
- `scrollWidth`, `scrollHeight`: The size of all of the box's content, including the parts that are currently hidden outside the scrolling area. Can not be calculated directly from CSS, depends on the content.

![5AAyW](5AAyW.png)

[See this Stackoverflow the live](https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively)
