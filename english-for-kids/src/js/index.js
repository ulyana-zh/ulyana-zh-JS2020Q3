import addEventListenersToNavigation from './Navigation';
import data from './Cards_data';
import Card from './Card';
import { switchedButton } from './Switcher';

const generateCards = (cardsData) => {
  const cards = [];
  cardsData.forEach((card) => {
    cards.push(new Card(card));
  });
  return cards;
};

const addCardsToDom = () => {
  const main = document.querySelector('.wrapper__main')
  generateCards(data[1]).forEach(card => {
    main.append(card.generateCard());
  })
}

window.onload = () => {
  addEventListenersToNavigation();
  addCardsToDom();
  switchedButton();
};


