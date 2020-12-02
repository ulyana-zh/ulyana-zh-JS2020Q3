import data from '../data/Cards_data';

const burger = document.querySelector('.hamburger');
const nav = document.querySelector('.navigation');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');

const generateNavigation = () => {
  data[0].forEach(element => {
    const category = document.createElement('li');
    const className = element.replace(/\s+/g, '-').toLowerCase();
    category.innerHTML = `<a href=# class='${className} category'>${element}</a>`
    nav.append(category);
  });
}

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
  nav.addEventListener('click', (e) => {
    if(e.target.classList.contains('category')) {
      slider();
    }
  })
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

export { addEventListenersToNavigation, generateNavigation };
