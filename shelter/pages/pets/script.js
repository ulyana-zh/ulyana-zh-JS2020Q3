//Burger menu 

const burger = document.querySelector('.hamburger'),
nav = document.querySelector('.navigation'),
links = document.querySelectorAll('.navigation li'),
overlay = document.querySelector('.overlay'),
logo = document.querySelector('.header__logo'),
body = document.querySelector('body');

function slider() {
  burger.addEventListener('click', () => {
    nav.classList.toggle('navigation-active');
    burger.classList.toggle('hamburger-active');
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
  })
  overlay.addEventListener('click', () => {
    nav.classList.toggle('navigation-active');
    burger.classList.toggle('hamburger-active');
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
  })
}

slider();