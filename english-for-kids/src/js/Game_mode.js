import { cardsData } from './Generate_field';

const playMode = {
  isPlaying: false,
  startGame: false,
  wordsArray: [],
  audioArray: [],
  clickedCard: null,
  currentCard: null,
  mistakes: 0,
  timer: null,
  error: './src/assets/audio/error.mp3',
  correct: './src/assets/audio/correct.mp3',
};

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
      playMode.clickedCard = e.target.closest('.card');
    }
  });
  return playMode.clickedCard;
};

const clearArrays = () => {
  playMode.wordsArray = [];
  playMode.audioArray = [];
};

const shiftArrays = () => {
  playMode.wordsArray.shift();
  playMode.audioArray.shift();
};

const starGame = () => {
  shuffleArray(cardsData.array);
  clearArrays();
  playMode.wordsArray = createWordsArray();
  playMode.audioArray = createAudioArray();
  playAudio(playMode.audioArray[0]);
};

const checkWord = () => {
  playMode.clickedCard = setTargetCard();
  document.querySelector('.wrapper__main').addEventListener('click', () => {
    playMode.currentCard = playMode.clickedCard.getAttribute('data-name');
    if (playMode.isPlaying && playMode.startGame) {
      if (playMode.currentCard === playMode.wordsArray[0]) {
        playMode.clickedCard.classList.add('card_disabled');
        playMode.clickedCard.removeEventListener('click', setTargetCard);
        shiftArrays();
        playAudio(playMode.correct);
        setTimeout(() => playAudio(playMode.audioArray[0]), 500);
      } else {
        playMode.mistakes += 1;
        playAudio(playMode.error);
      }
    }
  });
};

const setTimeoutToPlayMode = () => {
  playMode.timer = setTimeout(checkWord);
};

const stopPlaying = () => {
  playMode.startGame = false;
  clearTimeout(playMode.timer);
};

document.querySelector('.switch-btn').addEventListener('click', () => {
  playMode.isPlaying = !playMode.isPlaying;
  document.querySelector('.play-btn').classList.toggle('flex');

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

const playButton = document.querySelector('.play-btn');
const repeatButton = document.querySelector('.repeat');

playButton.addEventListener('click', () => {
  starGame();
  if (playMode.wordsArray.length !== 0 && playMode.audioArray.length !== 0) {
    stopPlaying();
    playMode.startGame = true;
    playMode.mistakes = 0;
    playButton.classList.add('none');
    repeatButton.classList.add('flex');
  }
});

repeatButton.addEventListener('click', () => {
  playAudio(playMode.audioArray[0]);
});

export { playMode, setTimeoutToPlayMode };
