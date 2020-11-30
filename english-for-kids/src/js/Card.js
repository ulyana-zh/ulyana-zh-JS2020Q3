export default class Card {
  constructor({
    word, translation, image, audio,
  }) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audio = audio;
  }

  // Card generator
  generateCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    this.cardWrapper = document.createElement('div');
    this.cardWrapper.classList.add('card__wrapper');
    card.append(this.cardWrapper);

    card.setAttribute('data-name', this.word);

    this.cardFrontSide = document.createElement('div');
    this.cardFrontSide.classList.add('card__side_front');

    this.cardBackSide = document.createElement('div');
    this.cardBackSide.classList.add('card__side_back');

    this.cardWrapper.append(this.cardFrontSide, this.cardBackSide);

    this.cardImage = document.createElement('img');
    this.cardImage.classList.add('card__img');
    this.cardImage.setAttribute('src', this.image);

    this.cardDescription = document.createElement('div');
    this.cardDescription.classList.add('card__description');

    this.cardFrontSide.append(this.cardImage, this.cardDescription);

    const cardWord = document.createElement('div');
    cardWord.classList.add('card__word');
    this.cardButton = document.createElement('button');
    this.cardButton.classList.add('card__button');
    this.cardButton.style.backgroundImage = `url('./src/assets/img/refresh.svg')`;

    this.cardDescription.append(cardWord, this.cardButton);

    cardWord.innerHTML = this.word;

    const cardImageBack = document.createElement('img');
    cardImageBack.classList.add('card__img');
    cardImageBack.setAttribute('src', this.image);

    const cardDescriptionBack = document.createElement('div');
    cardDescriptionBack.classList.add('card__description');

    const cardTranslation = document.createElement('div');
    cardTranslation.classList.add('card__word');
    cardTranslation.innerHTML = this.translation;

    cardDescriptionBack.append(cardTranslation);

    this.cardBackSide.append(cardImageBack, cardDescriptionBack);

    this.addEventListenersToCard();
    //this.changeCardToPlayMode();
    return card;
  }

  // Add flip to card
  addEventListenersToCard() {
    this.cardButton.addEventListener('click', () => {
      this.cardWrapper.classList.toggle('flip-card');
    });
    this.cardBackSide.addEventListener('mouseleave', () => {
      this.cardWrapper.classList.toggle('flip-card');
    });
    this.cardFrontSide.addEventListener('click', () => {
        this.playAudio();   
    });
  }

  playAudio() {
    let audio = new Audio();
    if (this.audio) audio.src = this.audio;
    audio.load();
    audio.play();
}

  changeCardToPlayMode() {
    this.cardImage.classList.toggle('card__img_play')
  }
}
