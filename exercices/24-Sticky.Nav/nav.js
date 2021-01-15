const nav = document.querySelector('nav');

function setFixedNav() {
  //how much have we scrolled
  //vs
  //how far is the nav from the top of the parent element (e.g. body)
  console.log(this.scrollY, navOffsetTop);
  //when we scrolled more than the distance of the nav from the top
  //we fix the nav
  if (window.scrollY >= nav.offsetTop) {
    document.body.classList.add('fixed-nav');
    //add the height of the nav so it doesn't jump the content
    //to the bottom of the nav
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    return;
  }

  //otherwise, we set it back the original position
  document.body.classList.remove('fixed-nav');
  document.body.style.paddingTop = 0;
}

window.addEventListener('scroll', setFixedNav);
