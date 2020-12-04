import { cardsData } from './Generate_field';

const playMode = {
  isPlaying: false,
  startGame: false,
  wordsArray: [],
  audioArray: [],
  currentCard: null,
  mistakes: 0,
  error: './src/assets/audio/error.mp3',
  correct: './src/assets/audio/correct.mp3'
};

document.querySelector('.switch-btn').addEventListener('click', () => {
  playMode.isPlaying = !playMode.isPlaying;
  document.querySelector('.play-btn').classList.toggle('play-on');

  document.querySelectorAll('.card__img').forEach((card) => {
    if (!card.closest('[data-category="main"]') && card.closest('.card__side_front')) {
      card.classList.toggle('card__img_play');
    }
  });
  document.querySelectorAll('.card__description').forEach((card) => {
    if (!card.closest('[data-category="main"]') && card.closest('.card__side_front')) {
      card.classList.toggle('card__description_play');
    }
  });
});

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const playAudio = (audioSrc) => {
  const audio = new Audio();
  audio.src = audioSrc;
  audio.load();
  audio.play();
};

const createWordsArray = () => {
  cardsData.array.forEach((card) => {
    playMode.wordsArray.push(card.word);
  });
  return playMode.wordsArray;
};

const createAudioArray = () => {
  cardsData.array.forEach((card) => {
    playMode.audioArray.push(card.audio);
  });
  return playMode.audioArray;
};

const setTargetCard = () => {
  document.querySelector('.wrapper__main').addEventListener('click', (e) => {
    if (!e.target.classList.contains('wrapper')) {
      const clickedCard = e.target.closest('.card');
      playMode.currentCard = clickedCard.getAttribute('data-name');
    }
  });
  return playMode.currentCard;
};

function clearArrays() {
  playMode.wordsArray = [];
  playMode.audioArray = [];
}

function shiftArrays() {
  playMode.wordsArray.shift();
  playMode.audioArray.shift();
}

function starGame() {
  shuffleArray(cardsData.array);
  clearArrays();
  playMode.wordsArray = createWordsArray();
  playMode.audioArray = createAudioArray();
  playAudio(playMode.audioArray[0]);
}

document.querySelector('.play-btn').addEventListener('click', () => {
    playMode.startGame = true;
    starGame();
    if (playMode.startGame) checkWord();
  });

const checkWord = () => {
  playMode.currentCard = setTargetCard();
  document.querySelector('.wrapper__main').addEventListener('click', () => {
    if (playMode.isPlaying) {
      console.log(playMode.wordsArray, playMode.currentCard);
      if (playMode.wordsArray[0] === playMode.currentCard) {
        shiftArrays();
        playAudio(playMode.correct);
        setTimeout(() => playAudio(playMode.audioArray[0]), 500)
      } else {
        playMode.mistakes++;
        playAudio(playMode.error);
        console.log('false', playMode.mistakes);
      }
    }
  });
};

export { playMode };
