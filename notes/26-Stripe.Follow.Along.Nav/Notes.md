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

## BONUS: enable keyboard navigation

When I use the keyboard, I can navigate through the menu and show on focus of the link.

## BONUS 2: focus trap to navigate in the submenu when it contains link elements

I haven't achieved this yet.
However, [checkout Stripe's JS](https://b.stripecdn.com/mkt/assets/SiteHeader-a7b40e0e.js) and the following methods:

- handleMenuEntered
- handleMenuLeft
- handleMenuTransitionEnd
- handleMenuButtonClicked
- handleTriggerClicked
- handleTriggerEntered
- handleTriggerLeft
- handleTriggerFocused
- handleEscape
- toggleDropdown
- registerArrowKeyNavigation <==
- unregisterArrowKeyNavigation <==
- openDropdown
- closeDropdown
