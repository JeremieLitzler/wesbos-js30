const background = document.querySelector('.dropdownBackground');
const arrow = document.querySelector('.arrow');
//we want to only select the direct li under "".cool" class
//Se we will use the ">"
const menus = document.querySelectorAll('.cool > li');
const menuLinks = document.querySelectorAll('.cool > li > a');
const nav = document.querySelector('nav');

console.assert(nav !== undefined);
console.assert(background !== undefined);
console.assert(menus.length === 3, 'we should have 3 selected li');

/**
 * Get the element based on the event:
 * - mouseenter = the element hovered is the LI element we want
 * - focus = the A element is the child of the LI element we want
 *
 * @param {DOMElement} element The element linked to the event
 * @returns {DOMElement}
 */
function getMenu(element) {
  const menu =
    element.nodeName.toLowerCase() === 'a' ? element.parentNode : element;
  return menu;
}

/**
 * Show the menu requested
 *
 * @param {Event object} event The event
 */
function showMenu(event) {
  console.dir(this);
  const menu = getMenu(this);
  //show the menu
  menu.classList.add('trigger-enter');
  console.log(event);
  //we want to find where is the link
  const menuContents = menu.querySelector('.dropdown');
  console.assert(menuContents !== undefined);

  //We need the menu position
  const menuCoords = menuContents.getBoundingClientRect();
  //We need the nav position so we can adjust the background position.
  //Without it, it is off.
  const navCoords = nav.getBoundingClientRect();
  console.log('menuCoords', menuCoords);
  console.log('navCoords', navCoords);
  //what is the size of the menu?
  //bounds.height and bounds.width give it
  background.style.width = `${menuCoords.width}px`;
  background.style.height = `${menuCoords.height}px`;
  console.dir(window);

  //Reminder: when the user scrolls down, you will need to get the x and y of the scroll
  //otherwise it will be off
  //it seems ok without scrolling ;)
  //In the example, we just need to remove the left and top value of the nav
  //from the left and top respectively of the menu selected.
  let translateX = menuCoords.left - navCoords.left;
  if (translateX <= 0) translateX = 16;
  const translateY = menuCoords.top - navCoords.top;
  background.style.transform = `translate(${translateX}px, ${translateY}px)`;

  menu.classList.add('trigger-enter-active');
  background.classList.add('open');
  if (event.type === 'focus') {
    //set focus on first A element in the menu, if any
    console.dir(menuContents);
    event.preventDefault();
    menuContents.focus();
    const firstLink = menuContents.querySelector('li:first-child a');
    if (firstLink !== null) {
      //firstLink.focus();
    }
  }
}

//fix to show the menu the background only once the transform is triggered.
function showBackground(event) {
  if (event.propertyName !== 'transform') return;
}

function hideMenu() {
  const menu = getMenu(this);
  menu.classList.remove('trigger-enter-active', 'trigger-enter');
  background.classList.remove('open');
}

menus.forEach((li) => li.addEventListener('mouseenter', showMenu));
menuLinks.forEach((li) => li.addEventListener('focus', showMenu));
menus.forEach((li) => li.addEventListener('mouseleave', hideMenu));
menuLinks.forEach((li) => li.addEventListener('focusout', hideMenu));
background.addEventListener('transitionend', showBackground);
