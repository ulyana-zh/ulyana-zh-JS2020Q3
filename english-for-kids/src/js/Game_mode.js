import { generateCards, cardsData } from './Generate_field';

// Play mode

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const switchToPlayMode = () => {
    const playButton = document.querySelector('.play-btn');
    playButton.addEventListener('click', () => {
    shuffleArray(cardsData.array);    
    console.log(cardsData.array);
    generateCards(cardsData.array).forEach(card => {
        card.playAudio();
    })
})
}

export { switchToPlayMode };