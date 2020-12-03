import data from './data/Cards_data';
import Card from './components/Card';
import { playMode } from './Game_mode';

const cardsData = {
  array: [],
  currentCard: null,
};

const generateCards = (cardsData) => {
  const cards = [];
  cardsData.forEach((card) => {
    cards.push(new Card(card));
  });
  return cards;
};

const filterCategories = (category) => {
  return data.flatMap((x) => x).filter((element) => element.category === category);
};

const refreshField = () => {
  const main = document.querySelector('.wrapper__main');
  main.innerHTML = '';
};

const addCardsToDom = (category) => {
  const main = document.querySelector('.wrapper__main');
  const cardsData = filterCategories(category);
  generateCards(cardsData).forEach((card) => {
    main.append(card.generateCard());
  });
  return cardsData;
};

const chooseCategory = () => {
  const nav = document.querySelector('.navigation');
  const main = document.querySelector('.wrapper__main');

  nav.addEventListener('click', (e) => {
    playMode.startGame = false;
    const targetCategory = e.target.getAttribute('data-name');
    if (targetCategory) {
      refreshField();
      cardsData.array = addCardsToDom(targetCategory);
    } return cardsData.array;
  });

  main.addEventListener('click', (e) => {
    playMode.startGame = false;
    if (!e.target.classList.contains('wrapper')) {
      const clickedCard = e.target.closest('.card');
      cardsData.currentCard = clickedCard.getAttribute('data-name');
      if (clickedCard.getAttribute('data-category') === 'main') {
        if (cardsData.currentCard) {
          refreshField();
          cardsData.array = addCardsToDom(cardsData.currentCard);
        }
      }
    } return cardsData.array;
  });
};

export {
  generateCards, addCardsToDom, chooseCategory, refreshField, cardsData,
};
