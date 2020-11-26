export default class Card {
    constructor({ word, translation, image, audio }) {
        this.word = word;
        this.translation = translation;
        this.image = image;
        this.audio = audio;
        this.nameOfCategory = '';
    }

    // Card generator
    generateCard() {
        let template = '';
        let card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-name', this.word);

        if(this.image) template += `<img class="card__img" src=${this.image}>`;

        template += `<div class="card__description">`;

        if(this.word) template += `<div class="card__word">${this.word}</div>`;
        template += ` <button class="card__button">btn</button>`;

        template += `</div>`;

        card.innerHTML = template;
        return card;
    }
}

