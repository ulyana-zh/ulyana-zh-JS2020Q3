/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Game_mode.js":
/*!*****************************!*\
  !*** ./src/js/Game_mode.js ***!
  \*****************************/
/*! namespace exports */
/*! export clearScore [provided] [no usage info] [missing usage info prevents renaming] */
/*! export playMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export setTimeoutToPlayMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playMode": () => /* binding */ playMode,
/* harmony export */   "setTimeoutToPlayMode": () => /* binding */ setTimeoutToPlayMode,
/* harmony export */   "clearScore": () => /* binding */ clearScore
/* harmony export */ });
/* harmony import */ var _Generate_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Generate_field */ "./src/js/Generate_field.js");

var playMode = {
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
  success: './src/assets/audio/success.mp3',
  failure: './src/assets/audio/failure.mp3'
};
var wordsArray = playMode.wordsArray,
    audioArray = playMode.audioArray,
    clickedCard = playMode.clickedCard,
    currentCard = playMode.currentCard,
    mistakes = playMode.mistakes,
    timer = playMode.timer;
var error = playMode.error,
    correct = playMode.correct,
    success = playMode.success,
    failure = playMode.failure;
var switchButton = document.querySelector('.switch-btn');
var playButton = document.querySelector('.play-btn');
var repeatButton = document.querySelector('.repeat');
var body = document.querySelector('body');
var points = document.querySelector('.points');
var overlay = document.querySelector('.overlay_result');
var categoryName = document.querySelector('.category-name');
var resultImage = document.querySelector('.result__img');
var resultMessage = document.querySelector('.result__text');

var shuffleArray = function shuffleArray(array) {
  return array.sort(function () {
    return Math.random() - 0.5;
  });
};

var playAudio = function playAudio(audioSrc) {
  var audio = new Audio();
  audio.src = audioSrc;
  audio.load();
  audio.play();
};

var createWordsArray = function createWordsArray() {
  _Generate_field__WEBPACK_IMPORTED_MODULE_0__.cardsData.array.forEach(function (card) {
    wordsArray.push(card.word);
  });
  return wordsArray;
};

var createAudioArray = function createAudioArray() {
  _Generate_field__WEBPACK_IMPORTED_MODULE_0__.cardsData.array.forEach(function (card) {
    audioArray.push(card.audio);
  });
  return audioArray;
};

var setTargetCard = function setTargetCard() {
  document.querySelector('.wrapper__main').addEventListener('click', function (e) {
    if (!e.target.classList.contains('wrapper')) {
      clickedCard = e.target.closest('.card');
    }
  });
  return clickedCard;
};

var clearArrays = function clearArrays() {
  wordsArray = [];
  audioArray = [];
};

var shiftArrays = function shiftArrays() {
  wordsArray.shift();
  audioArray.shift();
};

var starGame = function starGame() {
  shuffleArray(_Generate_field__WEBPACK_IMPORTED_MODULE_0__.cardsData.array);
  clearArrays();
  wordsArray = createWordsArray();
  audioArray = createAudioArray();
  playAudio(audioArray[0]);
};

var stopPlaying = function stopPlaying() {
  playMode.startGame = false;
  clearTimeout(timer);
};

var createRightStar = function createRightStar() {
  var star = document.createElement('div');
  star.classList.add('star', 'star_right');
  points.append(star);
};

var createWrongStar = function createWrongStar() {
  var star = document.createElement('div');
  star.classList.add('star', 'star_wrong');
  points.append(star);
};

var clearScore = function clearScore() {
  points.innerHTML = '';
};

var showResultSuccess = function showResultSuccess() {
  overlay.classList.add('overlay_result-active');
  body.classList.add('fixed-position');
  resultImage.classList.add('result__img_success');
  resultMessage.innerText = 'Congratulations!';
  playAudio(success);
};

var showResultFailure = function showResultFailure() {
  overlay.classList.add('overlay_result-active');
  body.classList.add('fixed-position');
  resultImage.classList.add('result__img_failure');

  if (mistakes === 1) {
    resultMessage.innerText = "Oops! You have ".concat(mistakes, " mistake. Try again!");
  } else {
    resultMessage.innerText = "Oops! You have ".concat(mistakes, " mistakes. Try again!");
  }

  playAudio(failure);
};

var deleteResult = function deleteResult() {
  resultImage.classList.remove('result__img_success');
  resultImage.classList.remove('result__img_failure');
  overlay.classList.remove('overlay_result-active');
  clearScore();
  (0,_Generate_field__WEBPACK_IMPORTED_MODULE_0__.refreshField)();
  stopPlaying();
  repeatButton.classList.remove('flex');
  body.classList.remove('fixed-position');
  categoryName.innerText = 'main'.toUpperCase();
  (0,_Generate_field__WEBPACK_IMPORTED_MODULE_0__.addCardsToDom)('main');
};

var checkWord = function checkWord() {
  clickedCard = setTargetCard();
  document.querySelector('.wrapper__main').addEventListener('click', function (e) {
    if (e.target.classList.contains('wrapper__main')) return;
    currentCard = clickedCard.getAttribute('data-name');

    if (playMode.isPlaying && playMode.startGame && wordsArray.length) {
      if (currentCard === wordsArray[0]) {
        clickedCard.classList.add('card_disabled');
        createRightStar();
        shiftArrays();
        playAudio(correct);
        setTimeout(function () {
          return playAudio(audioArray[0]);
        }, 500);
      } else {
        createWrongStar();
        mistakes += 1;
        playAudio(error);
      }

      if (!wordsArray.length) {
        if (!mistakes) {
          showResultSuccess();
          setTimeout(function () {
            return deleteResult();
          }, 5000);
        } else {
          showResultFailure();
          setTimeout(function () {
            return deleteResult();
          }, 5000);
        }
      }
    }
  });
};

var setTimeoutToPlayMode = function setTimeoutToPlayMode() {
  timer = setTimeout(checkWord);
};

switchButton.addEventListener('click', function () {
  playMode.isPlaying = !playMode.isPlaying;
  stopPlaying();
  clearScore();
  body.classList.toggle('play-mode');
  var card = document.querySelector('[data-category="main"]');

  if (switchButton.classList.contains('switch-on') && !card) {
    playButton.classList.add('flex');
  } else {
    playButton.classList.remove('flex');
  }

  repeatButton.classList.remove('flex');
  document.querySelectorAll('.card__img').forEach(function (elem) {
    if (!elem.closest('[data-category="main"]') && elem.closest('.card__side_front')) {
      elem.classList.toggle('card__img_play');
    }
  });
  document.querySelectorAll('.card__description').forEach(function (elem) {
    if (!elem.closest('[data-category="main"]') && elem.closest('.card__side_front')) {
      elem.classList.toggle('card__description_play');
    }
  });
  document.querySelectorAll('.card').forEach(function (elem) {
    if (elem.classList.contains('card_disabled')) {
      elem.classList.remove('card_disabled');
    }
  });
});
playButton.addEventListener('click', function () {
  starGame();
  playButton.classList.remove('flex');
  repeatButton.classList.add('flex');

  if (wordsArray.length && audioArray.length) {
    stopPlaying();
    playMode.startGame = true;
    mistakes = 0;
  }
});
repeatButton.addEventListener('click', function () {
  playAudio(audioArray[0]);
});


/***/ }),

/***/ "./src/js/Generate_field.js":
/*!**********************************!*\
  !*** ./src/js/Generate_field.js ***!
  \**********************************/
/*! namespace exports */
/*! export addCardsToDom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export cardsData [provided] [no usage info] [missing usage info prevents renaming] */
/*! export chooseCategory [provided] [no usage info] [missing usage info prevents renaming] */
/*! export generateCards [provided] [no usage info] [missing usage info prevents renaming] */
/*! export refreshField [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateCards": () => /* binding */ generateCards,
/* harmony export */   "addCardsToDom": () => /* binding */ addCardsToDom,
/* harmony export */   "chooseCategory": () => /* binding */ chooseCategory,
/* harmony export */   "refreshField": () => /* binding */ refreshField,
/* harmony export */   "cardsData": () => /* binding */ cardsData
/* harmony export */ });
/* harmony import */ var _data_Cards_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/Cards_data */ "./src/js/data/Cards_data.js");
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Card */ "./src/js/components/Card.js");
/* harmony import */ var _Game_mode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Game_mode */ "./src/js/Game_mode.js");



var cardsData = {
  array: [],
  currentCard: null
};
var playButton = document.querySelector('.play-btn');
var switchButton = document.querySelector('.switch-btn');
var repeatButton = document.querySelector('.repeat');
var categoryName = document.querySelector('.category-name');
categoryName.innerText = 'Main'.toUpperCase();

var generateCards = function generateCards(cardsDataArray) {
  var cards = [];
  cardsDataArray.forEach(function (card) {
    cards.push(new _components_Card__WEBPACK_IMPORTED_MODULE_1__.default(card));
  });
  return cards;
};

var filterCategories = function filterCategories(category) {
  return _data_Cards_data__WEBPACK_IMPORTED_MODULE_0__.default.flatMap(function (x) {
    return x;
  }).filter(function (element) {
    return element.category === category;
  });
};

var refreshField = function refreshField() {
  var main = document.querySelector('.wrapper__main');
  main.innerHTML = '';
};

var addCardsToDom = function addCardsToDom(category) {
  var main = document.querySelector('.wrapper__main');
  var currentCardsData = filterCategories(category);
  generateCards(currentCardsData).forEach(function (card) {
    main.append(card.generateCard());
  });
  return currentCardsData;
};

var chooseCategory = function chooseCategory() {
  var nav = document.querySelector('.navigation');
  var main = document.querySelector('.wrapper__main');
  nav.addEventListener('click', function (e) {
    _Game_mode__WEBPACK_IMPORTED_MODULE_2__.playMode.startGame = false;
    (0,_Game_mode__WEBPACK_IMPORTED_MODULE_2__.clearScore)();
    var targetCategory = e.target.getAttribute('data-name');
    nav.childNodes.forEach(function (category) {
      if (!e.target.classList.contains('navigation')) {
        if (category.innerText === e.target.innerText) {
          categoryName.innerText = e.target.innerText.toUpperCase();
          category.classList.add('active');
        } else {
          category.classList.remove('active');
        }
      }
    });

    if (targetCategory) {
      if (repeatButton && !switchButton.classList.contains('switch-on')) {
        if (targetCategory === 'main') {
          repeatButton.classList.remove('flex');
          playButton.classList.remove('flex');
        } else {
          repeatButton.classList.remove('flex');
          playButton.classList.add('flex');
        }
      }

      _Game_mode__WEBPACK_IMPORTED_MODULE_2__.playMode.startGame = false;
      refreshField();
      cardsData.array = addCardsToDom(targetCategory);
    }

    return cardsData.array;
  });
  main.addEventListener('click', function (e) {
    if (!e.target.classList.contains('wrapper')) {
      var clickedCard = e.target.closest('.card');
      cardsData.currentCard = clickedCard.getAttribute('data-name');

      if (clickedCard.getAttribute('data-category') === 'main') {
        if (cardsData.currentCard) {
          if (!switchButton.classList.contains('switch-on')) {
            playButton.classList.add('flex');
          }

          _Game_mode__WEBPACK_IMPORTED_MODULE_2__.playMode.startGame = false;
          categoryName.innerText = cardsData.currentCard.toUpperCase().replace(/-/g, ' ');
          refreshField();
          cardsData.array = addCardsToDom(cardsData.currentCard);
        }
      }
    }

    return cardsData.array;
  });
};



/***/ }),

/***/ "./src/js/components/Card.js":
/*!***********************************!*\
  !*** ./src/js/components/Card.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Card
/* harmony export */ });
/* harmony import */ var _Game_mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game_mode */ "./src/js/Game_mode.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Card = /*#__PURE__*/function () {
  function Card(_ref) {
    var word = _ref.word,
        translation = _ref.translation,
        image = _ref.image,
        audio = _ref.audio,
        category = _ref.category;

    _classCallCheck(this, Card);

    this.category = category;
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audio = audio;
  }

  _createClass(Card, [{
    key: "generateCard",
    value: function generateCard() {
      this.card = document.createElement('div');
      this.card.classList.add('card');
      this.cardWrapper = document.createElement('div');
      this.cardWrapper.classList.add('card__wrapper');
      this.card.append(this.cardWrapper);
      if (this.category) this.card.setAttribute('data-category', this.category);

      if (this.word !== 'milky way' && this.word !== 'ice skates') {
        this.card.setAttribute('data-name', this.word.replace(/\s+/g, '-').toLowerCase());
      } else {
        this.card.setAttribute('data-name', this.word.replace(/\s+/g, ' ').toLowerCase());
      }

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
      var cardWord = document.createElement('div');
      cardWord.classList.add('card__word');
      this.cardButton = document.createElement('button');

      if (this.category === 'main') {
        this.cardButton.classList.add('card__button_play');
      } else {
        this.cardButton.classList.add('card__button');
      }

      this.cardButton.style.backgroundImage = 'url(\'./src/assets/icons/refresh.svg\')';
      this.cardDescription.append(cardWord, this.cardButton);
      cardWord.innerHTML = this.word;
      var cardImageBack = document.createElement('img');
      cardImageBack.classList.add('card__img');
      cardImageBack.setAttribute('src', this.image);
      var cardDescriptionBack = document.createElement('div');
      cardDescriptionBack.classList.add('card__description');
      var cardTranslation = document.createElement('div');
      cardTranslation.classList.add('card__word');
      if (this.translation) cardTranslation.innerHTML = this.translation;
      cardDescriptionBack.append(cardTranslation);
      this.cardBackSide.append(cardImageBack, cardDescriptionBack); // Game mode

      if (_Game_mode__WEBPACK_IMPORTED_MODULE_0__.playMode.isPlaying) {
        if (this.category !== 'main') {
          this.cardImage.classList.add('card__img_play');
          this.cardDescription.classList.add('card__description_play');
        }
      }

      this.addEventListenersToCard();
      return this.card;
    }
  }, {
    key: "addEventListenersToCard",
    value: function addEventListenersToCard() {
      var _this = this;

      this.cardButton.addEventListener('click', function () {
        _this.cardWrapper.classList.toggle('flip-card');
      });
      this.cardBackSide.addEventListener('mouseleave', function () {
        _this.cardWrapper.classList.toggle('flip-card');
      });
      document.querySelector('.wrapper__main').addEventListener('mouseover', function (e) {
        if (!e.target.closest('.card__side_back')) {
          if (_this.cardWrapper.classList.contains('flip-card')) {
            _this.cardWrapper.classList.remove('flip-card');
          }
        }
      });
      this.cardFrontSide.addEventListener('click', function (e) {
        if (!e.target.classList.contains('card__button') && !_Game_mode__WEBPACK_IMPORTED_MODULE_0__.playMode.isPlaying) _this.playAudio();
      });
    }
  }, {
    key: "playAudio",
    value: function playAudio() {
      var audio = new Audio();
      if (this.audio) audio.src = this.audio;
      audio.load();
      audio.play();
    }
  }]);

  return Card;
}();



/***/ }),

/***/ "./src/js/components/Navigation.js":
/*!*****************************************!*\
  !*** ./src/js/components/Navigation.js ***!
  \*****************************************/
/*! namespace exports */
/*! export addEventListenersToNavigation [provided] [no usage info] [missing usage info prevents renaming] */
/*! export generateNavigation [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addEventListenersToNavigation": () => /* binding */ addEventListenersToNavigation,
/* harmony export */   "generateNavigation": () => /* binding */ generateNavigation
/* harmony export */ });
/* harmony import */ var _data_Cards_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/Cards_data */ "./src/js/data/Cards_data.js");

var burger = document.querySelector('.hamburger');
var line = document.querySelector('.hamburger__line');
var nav = document.querySelector('.navigation');
var overlay = document.querySelector('.overlay');
var body = document.querySelector('body');
var categories = _data_Cards_data__WEBPACK_IMPORTED_MODULE_0__.default[0];

var generateNavigation = function generateNavigation() {
  categories.forEach(function (element) {
    var category = document.createElement('li');
    var dataName = element.replace(/\s+/g, '-').toLowerCase();
    category.innerHTML = "<a href=# data-name=".concat(dataName, " class='category'>").concat(element, "</a>");
    if (element === 'Main') category.classList.add('active');
    nav.append(category);
  });
};

var slider = function slider() {
  nav.classList.toggle('navigation-active');
  burger.classList.toggle('hamburger-active');
  line.classList.toggle('hamburger__line_active');
  overlay.classList.toggle('overlay-active');
  body.classList.toggle('fixed-position');
};

var addEventListenersToNavigation = function addEventListenersToNavigation() {
  burger.addEventListener('click', function () {
    slider();
  });
  overlay.addEventListener('click', function () {
    slider();
  });
  nav.addEventListener('click', function (e) {
    if (e.target.classList.contains('category')) {
      slider();
    }
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      slider();
    }
  });
  window.addEventListener('resize', function () {
    if (nav.classList.contains('navigation-active')) {
      slider();
    }
  });
};



/***/ }),

/***/ "./src/js/components/Switcher.js":
/*!***************************************!*\
  !*** ./src/js/components/Switcher.js ***!
  \***************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var switchButton = document.querySelector('.switch-btn');

var whatIsTextButton = function whatIsTextButton() {
  if (switchButton.classList.contains('switch-on')) {
    switchButton.innerText = 'Train'.toUpperCase();
  } else {
    switchButton.innerText = 'Play'.toUpperCase();
  }
};

var switchedButton = function switchedButton() {
  switchButton.addEventListener('click', function () {
    switchButton.classList.toggle('switch-on');
    whatIsTextButton();
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (switchedButton);

/***/ }),

/***/ "./src/js/data/Cards_data.js":
/*!***********************************!*\
  !*** ./src/js/data/Cards_data.js ***!
  \***********************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var data = [['Main', 'Space', 'Weather', 'Nature', 'Animals 1', 'Animals 2', 'Fruits', 'Colors', 'Sports'], [{
  category: 'main',
  word: 'Animals 1',
  image: './src/assets/img/panda.jpg'
}, {
  category: 'main',
  word: 'Animals 2',
  image: './src/assets/img/dog.jpg'
}, {
  category: 'main',
  word: 'Weather',
  image: './src/assets/img/rain.png'
}, {
  category: 'main',
  word: 'Nature',
  image: './src/assets/img/forest.png'
}, {
  category: 'main',
  word: 'Fruits',
  image: './src/assets/img/watermelon.jpg'
}, {
  category: 'main',
  word: 'Colors',
  image: './src/assets/img/blue.jpg'
}, {
  category: 'main',
  word: 'Sports',
  image: './src/assets/img/bicycle.jpg'
}, {
  category: 'main',
  word: 'Space',
  image: './src/assets/img/rocket.jpg'
}], [{
  category: 'animals-1',
  word: 'panda',
  translation: 'панда',
  image: './src/assets/img/panda.jpg',
  audio: './src/assets/audio/panda.mp3'
}, {
  category: 'animals-1',
  word: 'giraffe',
  translation: 'жираф',
  image: './src/assets/img/giraffe.jpg',
  audio: './src/assets/audio/giraffe.mp3'
}, {
  category: 'animals-1',
  word: 'koala',
  translation: 'коала',
  image: './src/assets/img/koala.jpg',
  audio: './src/assets/audio/koala.mp3'
}, {
  category: 'animals-1',
  word: 'sloth',
  translation: 'ленивец',
  image: './src/assets/img/sloth.jpg',
  audio: './src/assets/audio/sloth.mp3'
}, {
  category: 'animals-1',
  word: 'elephant',
  translation: 'слон',
  image: './src/assets/img/elephant.jpg',
  audio: './src/assets/audio/elephant.mp3'
}, {
  category: 'animals-1',
  word: 'monkey',
  translation: 'обезьяна',
  image: './src/assets/img/monkey.jpg',
  audio: './src/assets/audio/monkey.mp3'
}, {
  category: 'animals-1',
  word: 'tiger',
  translation: 'тигр',
  image: './src/assets/img/tiger.jpg',
  audio: './src/assets/audio/tiger.mp3'
}, {
  category: 'animals-1',
  word: 'lion',
  translation: 'лев',
  image: './src/assets/img/lion.jpg',
  audio: './src/assets/audio/lion.mp3'
}], [{
  category: 'animals-2',
  word: 'cat',
  translation: 'кот',
  image: './src/assets/img/cat.jpg',
  audio: './src/assets/audio/cat.mp3'
}, {
  category: 'animals-2',
  word: 'dog',
  translation: 'собака',
  image: './src/assets/img/dog.jpg',
  audio: './src/assets/audio/dog.mp3'
}, {
  category: 'animals-2',
  word: 'owl',
  translation: 'сова',
  image: './src/assets/img/owl.jpg',
  audio: './src/assets/audio/owl.mp3'
}, {
  category: 'animals-2',
  word: 'bird',
  translation: 'птица',
  image: './src/assets/img/bird.jpg',
  audio: './src/assets/audio/bird.mp3'
}, {
  category: 'animals-2',
  word: 'fox',
  translation: 'лиса',
  image: './src/assets/img/fox.jpg',
  audio: './src/assets/audio/fox.mp3'
}, {
  category: 'animals-2',
  word: 'rabbit',
  translation: 'кролик',
  image: './src/assets/img/rabbit.jpg',
  audio: './src/assets/audio/rabbit.mp3'
}, {
  category: 'animals-2',
  word: 'sheep',
  translation: 'овечка',
  image: './src/assets/img/sheep.jpg',
  audio: './src/assets/audio/sheep.mp3'
}, {
  category: 'animals-2',
  word: 'parrot',
  translation: 'попугай',
  image: './src/assets/img/parrot.jpg',
  audio: './src/assets/audio/parrot.mp3'
}], [{
  category: 'weather',
  word: 'snow',
  translation: 'снег',
  image: './src/assets/img/snow.jpg',
  audio: './src/assets/audio/snow.mp3'
}, {
  category: 'weather',
  word: 'rain',
  translation: 'дождь',
  image: './src/assets/img/rain.png',
  audio: './src/assets/audio/rain.mp3'
}, {
  category: 'weather',
  word: 'rainbow',
  translation: 'радуга',
  image: './src/assets/img/rainbow.jpg',
  audio: './src/assets/audio/rainbow.mp3'
}, {
  category: 'weather',
  word: 'sun',
  translation: 'солнце',
  image: './src/assets/img/sun.jpg',
  audio: './src/assets/audio/sun.mp3'
}, {
  category: 'weather',
  word: 'sunset',
  translation: 'закат',
  image: './src/assets/img/sunset.jpg',
  audio: './src/assets/audio/sunset.mp3'
}, {
  category: 'weather',
  word: 'lightning',
  translation: 'молния',
  image: './src/assets/img/lightning.jpg',
  audio: './src/assets/audio/lightning.mp3'
}, {
  category: 'weather',
  word: 'wind',
  translation: 'ветер',
  image: './src/assets/img/wind.jpg',
  audio: './src/assets/audio/wind.mp3'
}, {
  category: 'weather',
  word: 'fog',
  translation: 'туман',
  image: './src/assets/img/fog.jpg',
  audio: './src/assets/audio/fog.mp3'
}], [{
  category: 'nature',
  word: 'mountain',
  translation: 'гора',
  image: './src/assets/img/mountains.png',
  audio: './src/assets/audio/mountain.mp3'
}, {
  category: 'nature',
  word: 'ocean',
  translation: 'океан',
  image: './src/assets/img/ocean.jpg',
  audio: './src/assets/audio/ocean.mp3'
}, {
  category: 'nature',
  word: 'beach',
  translation: 'пляж',
  image: './src/assets/img/beach.jpg',
  audio: './src/assets/audio/beach.mp3'
}, {
  category: 'nature',
  word: 'desert',
  translation: 'пустыня',
  image: './src/assets/img/desert.jpg',
  audio: './src/assets/audio/desert.mp3'
}, {
  category: 'nature',
  word: 'forest',
  translation: 'лес',
  image: './src/assets/img/forest.png',
  audio: './src/assets/audio/forest.mp3'
}, {
  category: 'nature',
  word: 'tree',
  translation: 'дерево',
  image: './src/assets/img/tree.png',
  audio: './src/assets/audio/tree.mp3'
}, {
  category: 'nature',
  word: 'lake',
  translation: 'озеро',
  image: './src/assets/img/lake.jpg',
  audio: './src/assets/audio/lake.mp3'
}, {
  category: 'nature',
  word: 'island',
  translation: 'остров',
  image: './src/assets/img/island.jpg',
  audio: './src/assets/audio/island.mp3'
}], [{
  category: 'fruits',
  word: 'banana',
  translation: 'банан',
  image: './src/assets/img/banana.jpg',
  audio: './src/assets/audio/banana.mp3'
}, {
  category: 'fruits',
  word: 'orange',
  translation: 'апельсин',
  image: './src/assets/img/orange.jpg',
  audio: './src/assets/audio/orange.mp3'
}, {
  category: 'fruits',
  word: 'watermelon',
  translation: 'арбуз',
  image: './src/assets/img/watermelon.jpg',
  audio: './src/assets/audio/watermelon.mp3'
}, {
  category: 'fruits',
  word: 'lemon',
  translation: 'лимон',
  image: './src/assets/img/lemon.jpg',
  audio: './src/assets/audio/lemon.mp3'
}, {
  category: 'fruits',
  word: 'pineapple',
  translation: 'ананас',
  image: './src/assets/img/pineapple.jpg',
  audio: './src/assets/audio/pineapple.mp3'
}, {
  category: 'fruits',
  word: 'kiwi',
  translation: 'киви',
  image: './src/assets/img/kiwi.jpg',
  audio: './src/assets/audio/kiwi.mp3'
}, {
  category: 'fruits',
  word: 'tangerine',
  translation: 'мандарин',
  image: './src/assets/img/tangerine.jpg',
  audio: './src/assets/audio/tangerine.mp3'
}, {
  category: 'fruits',
  word: 'apple',
  translation: 'яблоко',
  image: './src/assets/img/apple.jpg',
  audio: './src/assets/audio/apple.mp3'
}], [{
  category: 'colors',
  word: 'blue',
  translation: 'синий',
  image: './src/assets/img/blue.jpg',
  audio: './src/assets/audio/blue.mp3'
}, {
  category: 'colors',
  word: 'red',
  translation: 'красный',
  image: './src/assets/img/red.jpg',
  audio: './src/assets/audio/red.mp3'
}, {
  category: 'colors',
  word: 'green',
  translation: 'зеленый',
  image: './src/assets/img/green.jpg',
  audio: './src/assets/audio/green.mp3'
}, {
  category: 'colors',
  word: 'yellow',
  translation: 'желтый',
  image: './src/assets/img/yellow.jpg',
  audio: './src/assets/audio/yellow.mp3'
}, {
  category: 'colors',
  word: 'pink',
  translation: 'розовый',
  image: './src/assets/img/pink.jpg',
  audio: './src/assets/audio/pink.mp3'
}, {
  category: 'colors',
  word: 'orange',
  translation: 'оранжевый',
  image: './src/assets/img/orange_color.jpg',
  audio: './src/assets/audio/orange.mp3'
}, {
  category: 'colors',
  word: 'purple',
  translation: 'фиолетовый',
  image: './src/assets/img/purple.jpg',
  audio: './src/assets/audio/purple.mp3'
}, {
  category: 'colors',
  word: 'grey',
  translation: 'серый',
  image: './src/assets/img/grey.jpg',
  audio: './src/assets/audio/grey.mp3'
}], [{
  category: 'sports',
  word: 'football',
  translation: 'футбол',
  image: './src/assets/img/football.jpg',
  audio: './src/assets/audio/football.mp3'
}, {
  category: 'sports',
  word: 'hockey',
  translation: 'хоккей',
  image: './src/assets/img/hockey.png',
  audio: './src/assets/audio/hockey.mp3'
}, {
  category: 'sports',
  word: 'basketball',
  translation: 'баскетбол',
  image: './src/assets/img/basketball.jpg',
  audio: './src/assets/audio/basketball.mp3'
}, {
  category: 'sports',
  word: 'tennis',
  translation: 'теннис',
  image: './src/assets/img/tennis.jpg',
  audio: './src/assets/audio/tennis.mp3'
}, {
  category: 'sports',
  word: 'bicycle',
  translation: 'велосипед',
  image: './src/assets/img/bicycle.jpg',
  audio: './src/assets/audio/bicycle.mp3'
}, {
  category: 'sports',
  word: 'swim',
  translation: 'плавать',
  image: './src/assets/img/swimming.jpg',
  audio: './src/assets/audio/swim.mp3'
}, {
  category: 'sports',
  word: 'ice skates',
  translation: 'коньки',
  image: './src/assets/img/skates.jpg',
  audio: './src/assets/audio/iceskates.mp3'
}, {
  category: 'sports',
  word: 'ski',
  translation: 'ходить на лыжах',
  image: './src/assets/img/ski.jpg',
  audio: './src/assets/audio/ski.mp3'
}], [{
  category: 'space',
  word: 'rocket',
  translation: 'ракета',
  image: './src/assets/img/rocket.jpg',
  audio: './src/assets/audio/rocket.mp3'
}, {
  category: 'space',
  word: 'planet',
  translation: 'планета',
  image: './src/assets/img/planet.jpg',
  audio: './src/assets/audio/planet.mp3'
}, {
  category: 'space',
  word: 'astronaut',
  translation: 'космонавт',
  image: './src/assets/img/cosmonaut!.jpg',
  audio: './src/assets/audio/astronaut.mp3'
}, {
  category: 'space',
  word: 'star',
  translation: 'звезда',
  image: './src/assets/img/star.jpg',
  audio: './src/assets/audio/star.mp3'
}, {
  category: 'space',
  word: 'galaxy',
  translation: 'галактика',
  image: './src/assets/img/galaxy.jpg',
  audio: './src/assets/audio/galaxy.mp3'
}, {
  category: 'space',
  word: 'moon',
  translation: 'луна',
  image: './src/assets/img/moon.jpg',
  audio: './src/assets/audio/moon.mp3'
}, {
  category: 'space',
  word: 'universe',
  translation: 'вселенная',
  image: './src/assets/img/galaxy1.jpg',
  audio: './src/assets/audio/universe.mp3'
}, {
  category: 'space',
  word: 'milky way',
  translation: 'млечный путь',
  image: './src/assets/img/milkyway.jpg',
  audio: './src/assets/audio/milkyway.mp3'
}]];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Navigation */ "./src/js/components/Navigation.js");
/* harmony import */ var _components_Switcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Switcher */ "./src/js/components/Switcher.js");
/* harmony import */ var _Generate_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Generate_field */ "./src/js/Generate_field.js");
/* harmony import */ var _Game_mode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Game_mode */ "./src/js/Game_mode.js");





window.onload = function () {
  (0,_Generate_field__WEBPACK_IMPORTED_MODULE_2__.addCardsToDom)('main');
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_0__.generateNavigation)();
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_0__.addEventListenersToNavigation)();
  (0,_components_Switcher__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_Generate_field__WEBPACK_IMPORTED_MODULE_2__.chooseCategory)();
  (0,_Game_mode__WEBPACK_IMPORTED_MODULE_3__.setTimeoutToPlayMode)();
};

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ 	__webpack_require__("./src/sass/style.scss");
/******/ })()
;
//# sourceMappingURL=script.js.map