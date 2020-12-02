/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Generate_field.js":
/*!**********************************!*\
  !*** ./src/js/Generate_field.js ***!
  \**********************************/
/*! namespace exports */
/*! export addCardsToDom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export chooseCategory [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCardsToDom": () => /* binding */ addCardsToDom,
/* harmony export */   "chooseCategory": () => /* binding */ chooseCategory
/* harmony export */ });
/* harmony import */ var _data_Cards_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/Cards_data */ "./src/js/data/Cards_data.js");
/* harmony import */ var _components_Card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Card */ "./src/js/components/Card.js");



var generateCards = function generateCards(cardsData) {
  var cards = [];
  cardsData.forEach(function (card) {
    cards.push(new _components_Card__WEBPACK_IMPORTED_MODULE_1__.default(card));
  });
  return cards;
};

var addCardsToDom = function addCardsToDom(numberOfCards) {
  var main = document.querySelector('.wrapper__main');
  generateCards(_data_Cards_data__WEBPACK_IMPORTED_MODULE_0__.default[numberOfCards]).forEach(function (card) {
    main.append(card.generateCard());
  });
};

var chooseCategory = function chooseCategory() {
  var nav = document.querySelector('.navigation');
  nav.addEventListener('click', function (e) {
    if (e.target.classList.contains('nature')) {
      refreshField();
      addCardsToDom(3);
    }
  });
};

var refreshField = function refreshField() {
  var main = document.querySelector('.wrapper__main');
  main.innerHTML = '';
};



/***/ }),

/***/ "./src/js/components/Card.js":
/*!***********************************!*\
  !*** ./src/js/components/Card.js ***!
  \***********************************/
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
      this.cardButton.style.backgroundImage = "url('./src/assets/icons/refresh.svg')";
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
      document.querySelector('.wrapper__main').addEventListener('mouseover', function () {
        if (_this.cardWrapper.classList.contains('flip-card')) {
          _this.cardWrapper.classList.remove('flip-card');
        }
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
var nav = document.querySelector('.navigation');
var overlay = document.querySelector('.overlay');
var body = document.querySelector('body');

var generateNavigation = function generateNavigation() {
  _data_Cards_data__WEBPACK_IMPORTED_MODULE_0__.default[0].forEach(function (element) {
    var category = document.createElement('li');
    var className = element.replace(/\s+/g, '-').toLowerCase();
    category.innerHTML = "<a href=# class='".concat(className, " category'>").concat(element, "</a>");
    nav.append(category);
  });
};

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
var data = [['Main', 'Animals 1', 'Animals 2', 'Weather', 'Nature', 'Fruits', 'Colors', 'Sports', 'Space'], [{
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
  word: 'cat',
  translation: 'кот',
  image: './src/assets/img/cat.jpg',
  audio: './src/assets/audio/cat.mp3'
}, {
  word: 'dog',
  translation: 'собака',
  image: './src/assets/img/dog.jpg',
  audio: './src/assets/audio/dog.mp3'
}, {
  word: 'owl',
  translation: 'сова',
  image: './src/assets/img/owl.jpg',
  audio: './src/assets/audio/owl.mp3'
}, {
  word: 'bird',
  translation: 'птица',
  image: './src/assets/img/bird.jpg',
  audio: './src/assets/audio/bird.mp3'
}, {
  word: 'fox',
  translation: 'лиса',
  image: './src/assets/img/fox.jpg',
  audio: './src/assets/audio/fox.mp3'
}, {
  word: 'rabbit',
  translation: 'кролик',
  image: './src/assets/img/rabbit.jpg',
  audio: './src/assets/audio/rabbit.mp3'
}, {
  word: 'sheep',
  translation: 'овечка',
  image: './src/assets/img/sheep.jpg',
  audio: './src/assets/audio/sheep.mp3'
}, {
  word: 'parrot',
  translation: 'попугай',
  image: './src/assets/img/parrot.jpg',
  audio: './src/assets/audio/parrot.mp3'
}], [{
  word: 'snow',
  translation: 'снег',
  image: './src/assets/img/snow.jpg',
  audio: './src/assets/audio/snow.mp3'
}, {
  word: 'rain',
  translation: 'дождь',
  image: './src/assets/img/rain.png',
  audio: './src/assets/audio/rain.mp3'
}, {
  word: 'rainbow',
  translation: 'радуга',
  image: './src/assets/img/rainbow.jpg',
  audio: './src/assets/audio/rainbow.mp3'
}, {
  word: 'sun',
  translation: 'солнце',
  image: './src/assets/img/sun.jpg',
  audio: './src/assets/audio/sun.mp3'
}, {
  word: 'sunset',
  translation: 'закат',
  image: './src/assets/img/sunset.jpg',
  audio: './src/assets/audio/sunset.mp3'
}, {
  word: 'lightning',
  translation: 'молния',
  image: './src/assets/img/lightning.jpg',
  audio: './src/assets/audio/lightning.mp3'
}, {
  word: 'wind',
  translation: 'ветер',
  image: './src/assets/img/wind.jpg',
  audio: './src/assets/audio/wind.mp3'
}, {
  word: 'fog',
  translation: 'туман',
  image: './src/assets/img/fog.jpg',
  audio: './src/assets/audio/fog.mp3'
}], [{
  word: 'mountain',
  translation: 'гора',
  image: './src/assets/img/mountains.png',
  audio: './src/assets/audio/mountain.mp3'
}, {
  word: 'ocean',
  translation: 'океан',
  image: './src/assets/img/ocean.jpg',
  audio: './src/assets/audio/ocean.mp3'
}, {
  word: 'beach',
  translation: 'пляж',
  image: './src/assets/img/beach.jpg',
  audio: './src/assets/audio/beach.mp3'
}, {
  word: 'desert',
  translation: 'пустыня',
  image: './src/assets/img/desert.jpg',
  audio: './src/assets/audio/desert.mp3'
}, {
  word: 'forest',
  translation: 'лес',
  image: './src/assets/img/forest.png',
  audio: './src/assets/audio/forest.mp3'
}, {
  word: 'tree',
  translation: 'дерево',
  image: './src/assets/img/tree.png',
  audio: './src/assets/audio/tree.mp3'
}, {
  word: 'lake',
  translation: 'озеро',
  image: './src/assets/img/lake.jpg',
  audio: './src/assets/audio/lake.mp3'
}, {
  word: 'island',
  translation: 'остров',
  image: './src/assets/img/island.jpg',
  audio: './src/assets/audio/island.mp3'
}], [{
  word: 'banana',
  translation: 'банан',
  image: './src/assets/img/banana.jpg',
  audio: './src/assets/audio/banana.mp3'
}, {
  word: 'orange',
  translation: 'апельсин',
  image: './src/assets/img/orange.jpg',
  audio: './src/assets/audio/orange.mp3'
}, {
  word: 'watermelon',
  translation: 'арбуз',
  image: './src/assets/img/watermelon.jpg',
  audio: './src/assets/audio/watermelon.mp3'
}, {
  word: 'lemon',
  translation: 'лимон',
  image: './src/assets/img/lemon.jpg',
  audio: './src/assets/audio/lemon.mp3'
}, {
  word: 'pineapple',
  translation: 'ананас',
  image: './src/assets/img/pineapple.jpg',
  audio: './src/assets/audio/pineapple.mp3'
}, {
  word: 'kiwi',
  translation: 'киви',
  image: './src/assets/img/kiwi.jpg',
  audio: './src/assets/audio/kiwi.mp3'
}, {
  word: 'tangerine',
  translation: 'мандарин',
  image: './src/assets/img/tangerine.jpg',
  audio: './src/assets/audio/tangerine.mp3'
}, {
  word: 'apple',
  translation: 'яблоко',
  image: './src/assets/img/apple.jpg',
  audio: './src/assets/audio/apple.mp3'
}], [{
  word: 'blue',
  translation: 'синий',
  image: './src/assets/img/blue.jpg',
  audio: './src/assets/audio/blue.mp3'
}, {
  word: 'red',
  translation: 'красный',
  image: './src/assets/img/red.jpg',
  audio: './src/assets/audio/red.mp3'
}, {
  word: 'green',
  translation: 'зеленый',
  image: './src/assets/img/green.jpg',
  audio: './src/assets/audio/green.mp3'
}, {
  word: 'yellow',
  translation: 'желтый',
  image: './src/assets/img/yellow.jpg',
  audio: './src/assets/audio/yellow.mp3'
}, {
  word: 'pink',
  translation: 'розовый',
  image: './src/assets/img/pink.jpg',
  audio: './src/assets/audio/pink.mp3'
}, {
  word: 'orange',
  translation: 'оранжевый',
  image: './src/assets/img/orange_color.jpg',
  audio: './src/assets/audio/orange.mp3'
}, {
  word: 'purple',
  translation: 'фиолетовый',
  image: './src/assets/img/purple.jpg',
  audio: './src/assets/audio/purple.mp3'
}, {
  word: 'grey',
  translation: 'серый',
  image: './src/assets/img/grey.jpg',
  audio: './src/assets/audio/grey.mp3'
}], [{
  word: 'football',
  translation: 'футбол',
  image: './src/assets/img/football.jpg',
  audio: './src/assets/audio/football.mp3'
}, {
  word: 'hockey',
  translation: 'хоккей',
  image: './src/assets/img/hockey.png',
  audio: './src/assets/audio/hockey.mp3'
}, {
  word: 'basketball',
  translation: 'баскетбол',
  image: './src/assets/img/basketball.jpg',
  audio: './src/assets/audio/basketball.mp3'
}, {
  word: 'tennis',
  translation: 'теннис',
  image: './src/assets/img/tennis.jpg',
  audio: './src/assets/audio/tennis.mp3'
}, {
  word: 'bicycle',
  translation: 'велосипед',
  image: './src/assets/img/bicycle.jpg',
  audio: './src/assets/audio/bicycle.mp3'
}, {
  word: 'swim',
  translation: 'плавать',
  image: './src/assets/img/swimming.jpg',
  audio: './src/assets/audio/swim.mp3'
}, {
  word: 'ice skates',
  translation: 'коньки',
  image: './src/assets/img/skates.jpg',
  audio: './src/assets/audio/iceskates.mp3'
}, {
  word: 'ski',
  translation: 'ходить на лыжах',
  image: './src/assets/img/ski.jpg',
  audio: './src/assets/audio/ski.mp3'
}], [{
  word: 'rocket',
  translation: 'ракета',
  image: './src/assets/img/rocket.jpg',
  audio: './src/assets/audio/rocket.mp3'
}, {
  word: 'planet',
  translation: 'планета',
  image: './src/assets/img/planet.jpg',
  audio: './src/assets/audio/planet.mp3'
}, {
  word: 'astronaut',
  translation: 'космонавт',
  image: './src/assets/img/cosmonaut!.jpg',
  audio: './src/assets/audio/astronaut.mp3'
}, {
  word: 'star',
  translation: 'звезда',
  image: './src/assets/img/star.jpg',
  audio: './src/assets/audio/star.mp3'
}, {
  word: 'galaxy',
  translation: 'галактика',
  image: './src/assets/img/galaxy.jpg',
  audio: './src/assets/audio/galaxy.mp3'
}, {
  word: 'moon',
  translation: 'луна',
  image: './src/assets/img/moon.jpg',
  audio: './src/assets/audio/moon.mp3'
}, {
  word: 'universe',
  translation: 'вселенная',
  image: './src/assets/img/galaxy1.jpg',
  audio: './src/assets/audio/universe.mp3'
}, {
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




window.onload = function () {
  (0,_Generate_field__WEBPACK_IMPORTED_MODULE_2__.addCardsToDom)(8);
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_0__.generateNavigation)();
  (0,_components_Navigation__WEBPACK_IMPORTED_MODULE_0__.addEventListenersToNavigation)();
  (0,_components_Switcher__WEBPACK_IMPORTED_MODULE_1__.switchedButton)();
  (0,_Generate_field__WEBPACK_IMPORTED_MODULE_2__.chooseCategory)();
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