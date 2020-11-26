const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

const slider = () => {
  nav.classList.toggle('navigation-active');
  burger.classList.toggle('hamburger-active');
  overlay.classList.toggle('overlay-active');
  body.classList.toggle('fixed-position');
};

const addEventListenersToNavigation = () => {
  burger.addEventListener('click', () => {
    slider();
  });
  overlay.addEventListener('click', () => {
    slider();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      slider();
    }
  });
  window.addEventListener('resize', () => {
    if (nav.classList.contains('navigation-active')) {
      slider();
    }
  });
};

export default addEventListenersToNavigation;
