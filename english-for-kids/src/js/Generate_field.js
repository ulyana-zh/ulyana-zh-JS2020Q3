import data from './data/Cards_data';
import Card from './components/Card';

const generateCards = (cardsData) => {
  const cards = [];
  cardsData.forEach((card) => {
    cards.push(new Card(card));
  });
  return cards;
};

const addCardsToDom = (numberOfCards) => {
  const main = document.querySelector('.wrapper__main')
  generateCards(data[numberOfCards]).forEach(card => {
    main.append(card.generateCard());
  })
}

const chooseCategory = () => {
  const nav = document.querySelector('.navigation');  
  nav.addEventListener('click', (e) => {
    if(e.target.classList.contains('nature')) {
      refreshField();
      addCardsToDom(3);
    }
  })
  }
  
  const refreshField = () => {
    const main = document.querySelector('.wrapper__main');
    main.innerHTML = '';  
  }

export { addCardsToDom, chooseCategory };