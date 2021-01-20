const slider = document.querySelector('.items');
const walkSpeed = document.querySelector('#walkSpeed');
console.log('speed:', walkSpeed.value);
//stores the fact that the mouse is clicked and held down
let isDown = false;
//stores the starting point where the mouse was clicked
let startX;
//stores how much we scroll horizontally:
// < 0 = scrolling right
// > 0 = scrolling left
let scrollLeft;

function initWalk(event) {
  isDown = true;
  slider.classList.add('active');
  console.log(event);
  const pageX =
    event.type === 'touchstart' ? event.touches[0].pageX : event.pageX;
  //Where did we click?
  startX =
    //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX
    pageX - //the position where we clicked or touched
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetLeft
    slider.offsetLeft; //and take off any spacing on the slider

  //let's save where the initial scroll was
  // in the slider
  scrollLeft = slider.scrollLeft;
}

function walk(event) {
  if (!isDown) return;

  //disable the additional behavior that the
  //browser might think he needs to do while
  //we are down and moving.
  event.preventDefault();

  console.log(event);
  const pageX =
    event.type === 'touchmove' ? [...event.touches][0].pageX : event.pageX;

  console.log(pageX);
  //recalculate where the mouse is
  const x = pageX - slider.offsetLeft;
  //calculate how much we move
  //and apply a speed to scroll faster
  const walk = (x - startX) * walkSpeed.value;
  //set the scroll value
  slider.scrollLeft = scrollLeft - walk;
}

function endWalk() {
  isDown = false;
  slider.classList.remove('active');
}
slider.addEventListener('mousedown', (event) => initWalk(event));
slider.addEventListener('mouseleave', endWalk);
slider.addEventListener('mouseup', endWalk);
slider.addEventListener('mousemove', (event) => walk(event));

slider.addEventListener('touchstart', (event) => initWalk(event));
slider.addEventListener('touchleave', endWalk);
slider.addEventListener('touchend', endWalk);
slider.addEventListener('touchmove', (event) => walk(event));
