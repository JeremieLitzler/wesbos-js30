const background = document.querySelector('.dropdownBackground');
//we want to only select the direct li under "".cool" class
//Se we will use the ">"
const menus = document.querySelectorAll('.cool > li');
const nav = document.querySelector('nav');

console.assert(nav !== undefined);
console.assert(background !== undefined);
console.assert(menus.length === 3, 'we should have 3 selected li');

function showMenu(event) {
  //show the menu
  this.classList.add('trigger-enter');
  console.log(event);
  //we want to find where is the link
  const menuContents = this.querySelector('.dropdown');
  console.assert(menuContents !== undefined);

  //We need the menu position
  const menuCoords = menuContents.getBoundingClientRect();
  //We need the nav position so we can adjust the background position.
  //Without it, it is off.
  const navCoords = nav.getBoundingClientRect();
  console.log(menuCoords);
  console.log(navCoords);
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
  const translateX = menuCoords.left - navCoords.left;
  const translateY = menuCoords.top - navCoords.top;
  background.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

//fix to show the menu the background only once the transform is triggered.
function showBackground(event) {
  if (event.propertyName !== 'transform') return;

  background.classList.add('open');
}

menus.forEach((li) => li.addEventListener('mouseover', showMenu));
background.addEventListener('transitionend', showBackground);
