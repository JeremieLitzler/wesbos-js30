# Stripe Follow Along Nav

[< Back to table of content](../README.md) |
[View previous exercice's notes >](../25-Event.Capture.Propagation.Bubbling.and.Once/Notes.md) |
[View next exercice's notes >](../27-Click.and.Drag/Notes.md)

## Instructions

We want to replicate the Stripe menu animation.
We already built the mecanism that enable use to follow the link hovered.

See [exercice 22](22-Follow.Along.Link.Highlighter/Notes.md).

## HTML structure

The nav contains:

- `dropdownBackground` div that will be the actual background to display behind the dropdown menu to show.
- a list of menu where we have:
  - the link on which we want to listen to
  - the content to show when the link is hovered.

## BONUS: fix the bug of the initial event

When I hover a menu link for the first time, you see it slide in, which is not so nice.

I have fix it by adding the `open` class to the background on transitionend.
