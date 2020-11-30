/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Card.js":
/*!************************!*\
  !*** ./src/js/Card.js ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => /* binding */ Card
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Card = /*#__PURE__*/function () {
  function Card(_ref) {
    var word = _ref.word,
        translation = _ref.translation,
        image = _ref.image,
        audio = _ref.audio;

    _classCallCheck(this, Card);

    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audio = audio;
  } // Card generator


  _createClass(Card, [{
    key: "generateCard",
    value: function generateCard() {
      var card = document.createElement('div');
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
      var cardWord = document.createElement('div');
      cardWord.classList.add('card__word');
      this.cardButton = document.createElement('button');
      this.cardButton.classList.add('card__button');
      this.cardButton.style.backgroundImage = "url('./src/assets/img/refresh.svg')";
      this.cardDescription.append(cardWord, this.cardButton);
      cardWord.innerHTML = this.word;
      var cardImageBack = document.createElement('img');
      cardImageBack.classList.add('card__img');
      cardImageBack.setAttribute('src', this.image);
      var cardDescriptionBack = document.createElement('div');
      cardDescriptionBack.classList.add('card__description');
      var cardTranslation = document.createElement('div');
      cardTranslation.classList.add('card__word');
      cardTranslation.innerHTML = this.translation;
      cardDescriptionBack.append(cardTranslation);
      this.cardBackSide.append(cardImageBack, cardDescriptionBack);
      this.addEventListenersToCard(); //this.changeCardToPlayMode();

      return card;
    } // Add flip to card

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
      this.cardFrontSide.addEventListener('click', function () {
        _this.playAudio();
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
  }, {
    key: "changeCardToPlayMode",
    value: function changeCardToPlayMode() {
      this.cardImage.classList.toggle('card__img_play');
    }
  }]);

  return Card;
}();



/***/ }),

/***/ "./src/js/Cards_data.js":
/*!******************************!*\
  !*** ./src/js/Cards_data.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var data = [['Animal', 'Action (set B)', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'], [{
  word: 'panda',
  translation: 'панда',
  image: './src/assets/img/panda.jpg',
  audio: './src/assets/audio/panda.mp3'
}, {
  word: 'giraffe',
  translation: 'жираф',
  image: './src/assets/img/giraffe.jpg',
  audio: './src/assets/audio/giraffe.mp3'
}, {
  word: 'koala',
  translation: 'коала',
  image: './src/assets/img/koala.jpg',
  audio: './src/assets/audio/koala.mp3'
}, {
  word: 'sloth',
  translation: 'ленивец',
  image: './src/assets/img/sloth.jpg',
  audio: './src/assets/audio/sloth.mp3'
}, {
  word: 'elephant',
  translation: 'слон',
  image: './src/assets/img/elephant.jpg',
  audio: './src/assets/audio/elephant.mp3'
}, {
  word: 'monkey',
  translation: 'обезьяна',
  image: './src/assets/img/monkey.jpg',
  audio: './src/assets/audio/monkey.mp3'
}, {
  word: 'tiger',
  translation: 'тигр',
  image: './src/assets/img/tiger.jpg',
  audio: './src/assets/audio/tiger.mp3'
}, {
  word: 'lion',
  translation: 'лев',
  image: './src/assets/img/lion.jpg',
  audio: './src/assets/audio/lion.mp3'
}], [{
  word: 'open',
  translation: 'открывать',
  image: './src/assets/img/open.jpg',
  audio: './src/assets/audio/open.mp3'
}, {
  word: 'play',
  translation: 'играть',
  image: './src/assets/img/play.jpg',
  audio: './src/assets/audio/play.mp3'
}, {
  word: 'point',
  translation: 'указывать',
  image: './src/assets/img/point.jpg',
  audio: './src/assets/audio/point.mp3'
}, {
  word: 'ride',
  translation: 'ездить',
  image: './src/assets/img/ride.jpg',
  audio: './src/assets/audio/ride.mp3'
}, {
  word: 'run',
  translation: 'бегать',
  image: './src/assets/img/run.jpg',
  audio: './src/assets/audio/run.mp3'
}, {
  word: 'sing',
  translation: 'петь',
  image: './src/assets/img/sing.jpg',
  audio: './src/assets/audio/sing.mp3'
}, {
  word: 'skip',
  translation: 'пропускать, прыгать',
  image: './src/assets/img/skip.jpg',
  audio: './src/assets/audio/skip.mp3'
}, {
  word: 'swim',
  translation: 'плавать',
  image: './src/assets/img/swim.jpg',
  audio: './src/assets/audio/swim.mp3'
}], [{
  word: 'cat',
  translation: 'кот',
  image: './src/assets/img/cat.jpg',
  audio: './src/assets/audio/cat.mp3'
}, {
  word: 'chick',
  translation: 'цыплёнок',
  image: './src/assets/img/chick.jpg',
  audio: './src/assets/audio/chick.mp3'
}, {
  word: 'chicken',
  translation: 'курица',
  image: './src/assets/img/chicken.jpg',
  audio: './src/assets/audio/chicken.mp3'
}, {
  word: 'dog',
  translation: 'собака',
  image: './src/assets/img/dog.jpg',
  audio: './src/assets/audio/dog.mp3'
}, {
  word: 'horse',
  translation: 'лошадь',
  image: './src/assets/img/horse.jpg',
  audio: './src/assets/audio/horse.mp3'
}, {
  word: 'pig',
  translation: 'свинья',
  image: './src/assets/img/pig.jpg',
  audio: './src/assets/audio/pig.mp3'
}, {
  word: 'rabbit',
  translation: 'кролик',
  image: './src/assets/img/rabbit.jpg',
  audio: './src/assets/audio/rabbit.mp3'
}, {
  word: 'sheep',
  translation: 'овца',
  image: './src/assets/img/sheep.jpg',
  audio: './src/assets/audio/sheep.mp3'
}], [{
  word: 'bird',
  translation: 'птица',
  image: './src/assets/img/bird.jpg',
  audio: './src/assets/audio/bird.mp3'
}, {
  word: 'fish',
  translation: 'рыба',
  image: './src/assets/img/fish1.jpg',
  audio: './src/assets/audio/fish.mp3'
}, {
  word: 'frog',
  translation: 'жаба',
  image: './src/assets/img/frog.jpg',
  audio: './src/assets/audio/frog.mp3'
}, {
  word: 'giraffe',
  translation: 'жирафа',
  image: './src/assets/img/giraffe.jpg',
  audio: './src/assets/audio/giraffe.mp3'
}, {
  word: 'lion',
  translation: 'лев',
  image: './src/assets/img/lion.jpg',
  audio: './src/assets/audio/lion.mp3'
}, {
  word: 'mouse',
  translation: 'мышь',
  image: './src/assets/img/mouse.jpg',
  audio: './src/assets/audio/mouse.mp3'
}, {
  word: 'turtle',
  translation: 'черепаха',
  image: './src/assets/img/turtle.jpg',
  audio: './src/assets/audio/turtle.mp3'
}, {
  word: 'dolphin',
  translation: 'дельфин',
  image: './src/assets/img/dolphin.jpg',
  audio: './src/assets/audio/dolphin.mp3'
}], [{
  word: 'skirt',
  translation: 'юбка',
  image: './src/assets/img/skirt.jpg',
  audio: './src/assets/audio/skirt.mp3'
}, {
  word: 'pants',
  translation: 'брюки',
  image: './src/assets/img/pants.jpg',
  audio: './src/assets/audio/pants.mp3'
}, {
  word: 'blouse',
  translation: 'блузка',
  image: './src/assets/img/blouse.jpg',
  audio: './src/assets/audio/blouse.mp3'
}, {
  word: 'dress',
  translation: 'платье',
  image: './src/assets/img/dress.jpg',
  audio: './src/assets/audio/dress.mp3'
}, {
  word: 'boot',
  translation: 'ботинок',
  image: './src/assets/img/boot.jpg',
  audio: './src/assets/audio/boot.mp3'
}, {
  word: 'shirt',
  translation: 'рубашка',
  image: './src/assets/img/shirt.jpg',
  audio: './src/assets/audio/shirt.mp3'
}, {
  word: 'coat',
  translation: 'пальто',
  image: './src/assets/img/coat.jpg',
  audio: './src/assets/audio/coat.mp3'
}, {
  word: 'shoe',
  translation: 'туфли',
  image: './src/assets/img/shoe.jpg',
  audio: './src/assets/audio/shoe.mp3'
}], [{
  word: 'sad',
  translation: 'грустный',
  image: './src/assets/img/sad.jpg',
  audio: './src/assets/audio/sad.mp3'
}, {
  word: 'angry',
  translation: 'сердитый',
  image: './src/assets/img/angry.jpg',
  audio: './src/assets/audio/angry.mp3'
}, {
  word: 'happy',
  translation: 'счастливый',
  image: './src/assets/img/happy.jpg',
  audio: './src/assets/audio/happy.mp3'
}, {
  word: 'tired',
  translation: 'уставший',
  image: './src/assets/img/tired.jpg',
  audio: './src/assets/audio/tired.mp3'
}, {
  word: 'surprised',
  translation: 'удивлённый',
  image: './src/assets/img/surprised.jpg',
  audio: './src/assets/audio/surprised.mp3'
}, {
  word: 'scared',
  translation: 'испуганный',
  image: './src/assets/img/scared.jpg',
  audio: './src/assets/audio/scared.mp3'
}, {
  word: 'smile',
  translation: 'улыбка',
  image: './src/assets/img/smile.jpg',
  audio: './src/assets/audio/smile.mp3'
}, {
  word: 'laugh',
  translation: 'смех',
  image: './src/assets/img/laugh.jpg',
  audio: './src/assets/audio/laugh.mp3'
}]];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);

/***/ }),

/***/ "./src/js/Navigation.js":
/*!******************************!*\
  !*** ./src/js/Navigation.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
var burger = document.querySelector('.hamburger');
var nav = document.querySelector('.navigation');
var overlay = document.querySelector('.overlay');
var body = document.querySelector('body');

var slider = function slider() {
  nav.classList.toggle('navigation-active');
  burger.classList.toggle('hamburger-active');
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addEventListenersToNavigation);

/***/ }),

/***/ "./src/js/Switcher.js":
/*!****************************!*\
  !*** ./src/js/Switcher.js ***!
  \****************************/
/*! namespace exports */
/*! export playMode [provided] [no usage info] [missing usage info prevents renaming] */
/*! export switchedButton [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "switchedButton": () => /* binding */ switchedButton,
/* harmony export */   "playMode": () => /* binding */ playMode
/* harmony export */ });
var switchButton = document.querySelector('.switch-btn');
var playMode = false;

var switchedButton = function switchedButton() {
  switchButton.addEventListener('click', function () {
    switchButton.classList.toggle('switch-on');
    whatIsTextButton();
    playMode = !playMode;
  });
};

var whatIsTextButton = function whatIsTextButton() {
  if (switchButton.classList.contains('switch-on')) {
    switchButton.innerText = 'Train'.toUpperCase();
  } else {
    switchButton.innerText = 'Play'.toUpperCase();
  }
};



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
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation */ "./src/js/Navigation.js");
/* harmony import */ var _Cards_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Cards_data */ "./src/js/Cards_data.js");
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Card */ "./src/js/Card.js");
/* harmony import */ var _Switcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Switcher */ "./src/js/Switcher.js");





var generateCards = function generateCards(cardsData) {
  var cards = [];
  cardsData.forEach(function (card) {
    cards.push(new _Card__WEBPACK_IMPORTED_MODULE_2__.default(card));
  });
  return cards;
};

var addCardsToDom = function addCardsToDom() {
  var main = document.querySelector('.wrapper__main');
  generateCards(_Cards_data__WEBPACK_IMPORTED_MODULE_1__.default[1]).forEach(function (card) {
    main.append(card.generateCard());
  });
};

window.onload = function () {
  (0,_Navigation__WEBPACK_IMPORTED_MODULE_0__.default)();
  addCardsToDom();
  (0,_Switcher__WEBPACK_IMPORTED_MODULE_3__.switchedButton)();
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