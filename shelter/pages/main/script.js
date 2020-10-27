//Burger menu 

const burger = document.querySelector('.hamburger'),
nav = document.querySelector('.navigation'),
links = document.querySelectorAll('.navigation li'),
overlay = document.querySelector('.overlay'),
logo = document.querySelector('.header__logo'),
body = document.querySelector('body'),
link = document.querySelector('.close-burger');

function slider() {
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

//Popup and slider

const popup = document.querySelector('.popup'),
popupJennifer = document.querySelector('.popup__jennifer'),
popupSophia = document.querySelector('.popup__sophia'),
popupKatrine = document.querySelector('.popup__katrine'),
popupWoody = document.querySelector('.popup__woody');


document.querySelector('.layout-columns__item-1').addEventListener('click', () => {
  popupKatrine.classList.toggle('popup-active');  
})

document.querySelector('.layout-columns__item-2').addEventListener('click', () => {
  popupJennifer.classList.toggle('popup-active');    
})

document.querySelector('.layout-columns__item-3').addEventListener('click', () => {
  popupWoody.classList.toggle('popup-active');  
})

document.querySelector('.button_close-1').addEventListener('click', () => {
  popupKatrine.classList.toggle('popup-active');  
})

document.querySelector('.button_close-2').addEventListener('click', () => {
  popupJennifer.classList.toggle('popup-active');  
})

document.querySelector('.button_close-3').addEventListener('click', () => {
  popupWoody.classList.toggle('popup-active');  
})




