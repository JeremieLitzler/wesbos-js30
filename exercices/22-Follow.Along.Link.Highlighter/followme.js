const links = document.querySelectorAll('a');

const bubble = document.createElement('span');
bubble.classList.add('highlight');
document.body.appendChild(bubble);

function highlightLink(event) {
  console.log(event);
  //we want to find where is the link
  const bounds = this.getBoundingClientRect();
  console.log(bounds);

  //what is the size of the link?
  //bounds.height and bounds.width give it
  bubble.style.width = `${bounds.width}px`;
  bubble.style.height = `${bounds.height}px`;
  bubble.style.padding = '1em';
  console.dir(window);
  //when the user scrolls down, you will need to get the x and y of the scroll
  //otherwise it will be off
  //it seems ok without scrolling ;)
  const translateX = bounds.left + window.scrollX;
  const translateY = bounds.top + window.scrollY - 4; //4px to center the bubble
  bubble.style.transform = `translate(${translateX}px, ${translateY}px)`;
}

links.forEach((a) => a.addEventListener('mouseover', highlightLink));
