//Burger menu 

const burger = document.querySelector('.hamburger__pets'),
nav = document.querySelector('.navigation'),
links = document.querySelectorAll('.navigation li'),
overlay = document.querySelector('.overlay'),
logo = document.querySelector('.header__logo'),
body = document.querySelector('body'),
link = document.querySelector('.close-burger');
    

function slider() {
    nav.classList.toggle('navigation-active');
    burger.classList.toggle('hamburger__pets-active');
    overlay.classList.toggle('overlay-active');
    logo.classList.toggle('header__logo-active');
    body.classList.toggle('fixed-position');
    links.forEach((link, index) => {
      if(link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinksFade .5s ease forwards ${index/4 + 0.3}s`;
      }
    })
  }

burger.addEventListener('click', () => {
  slider();
})

overlay.addEventListener('click', () => {
  slider();
})

link.addEventListener('click', () => {
  if(nav.classList.contains('navigation-active')) {
    slider();
  }
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
   slider();
}})

window.addEventListener('resize', () => {
  if(nav.classList.contains('navigation-active')) {
    slider();
  }
})