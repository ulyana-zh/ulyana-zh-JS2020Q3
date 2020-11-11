/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar game = document.querySelector('.game');\nvar field = document.createElement('div');\nfield.classList.add('field');\nvar fieldSize = 300;\nfield.style.width = \"\".concat(fieldSize, \"px\");\nfield.style.height = \"\".concat(fieldSize, \"px\");\nvar information = document.createElement('div');\ninformation.classList.add('information');\nvar navigation = document.createElement('div');\nnavigation.classList.add('navigation');\ngame.append(information, field, navigation);\nvar time = document.createElement('time');\ntime.classList.add('time');\ninformation.append(time);\nvar newGame = document.createElement('button');\nnewGame.classList.add('new-game');\nnewGame.innerText = 'New Game';\nvar solve = document.createElement('button');\nsolve.classList.add('solve');\nsolve.innerText = 'Solve';\nvar menu = document.createElement('button');\nmenu.classList.add('menu');\nmenu.innerText = 'Menu';\nnavigation.append(newGame, solve);\nvar counter = 0;\nvar timeCounter = 0;\nvar rightCells;\nvar moves = document.createElement('moves');\nmoves.classList.add('moves');\ninformation.append(moves);\n\nvar eachCell = /*#__PURE__*/function () {\n  function eachCell(left, top, size, isEmpty, textContent) {\n    _classCallCheck(this, eachCell);\n\n    //9, 16, 25, 36, 49, 64\n    this.size = size;\n    this.isEmpty = isEmpty;\n    this.left = left;\n    this.top = top;\n    this.textContent = textContent;\n    this.cell = document.createElement('div');\n    this.cell.classList.add('cell');\n    this.cellSize = fieldSize / Math.sqrt(this.size);\n    this.cell.style.width = \"\".concat(this.cellSize, \"px\");\n    this.cell.style.height = \"\".concat(this.cellSize, \"px\");\n    this.cell.textContent = textContent;\n    this.cell.style.left = \"\".concat(this.left * this.cellSize, \"px\");\n    this.cell.style.top = \"\".concat(this.top * this.cellSize, \"px\");\n  }\n\n  _createClass(eachCell, [{\n    key: \"changePosition\",\n    value: function changePosition() {\n      this.cell.style.left = \"\".concat(this.left * this.cellSize, \"px\");\n      this.cell.style.top = \"\".concat(this.top * this.cellSize, \"px\");\n    }\n  }, {\n    key: \"move\",\n    value: function move(secondCell) {\n      var a = this.left;\n      var b = secondCell.left;\n      var c = this.top;\n      var d = secondCell.top;\n      var _ref = [b, d, a, c];\n      this.left = _ref[0];\n      this.top = _ref[1];\n      secondCell.left = _ref[2];\n      secondCell.top = _ref[3];\n      this.changePosition();\n      secondCell.changePosition();\n    }\n  }, {\n    key: \"isMovable\",\n    value: function isMovable(secondCell) {\n      if (this.left === secondCell.left) {\n        if (Math.abs(this.top - secondCell.top) === 1) return true;\n      } else if (this.top === secondCell.top) {\n        if (Math.abs(this.left - secondCell.left) === 1) return true;\n      }\n\n      return;\n    }\n  }]);\n\n  return eachCell;\n}();\n\nvar Cells = /*#__PURE__*/function () {\n  function Cells(size) {\n    _classCallCheck(this, Cells);\n\n    //9, 16, 25, 36, 49, 64\n    this.size = size;\n    this.cells = [];\n    this.arr = [];\n  }\n\n  _createClass(Cells, [{\n    key: \"createNumbers\",\n    value: function createNumbers() {\n      for (var j = 0; j < this.size; j++) {\n        var left = j % Math.sqrt(this.size);\n        var top = (j - left) / Math.sqrt(this.size);\n        if (j === this.size - 1) this.cells.push(new eachCell(left, top, this.size, true, ''));else this.cells.push(new eachCell(left, top, this.size, false, j + 1));\n      }\n\n      return this.cells;\n    }\n  }, {\n    key: \"createRandomNumbers\",\n    value: function createRandomNumbers() {\n      for (var i = 0; i < this.size; i++) {\n        this.arr.push(i);\n      }\n\n      this.arr = this.arr.sort(function () {\n        return Math.random() - 0.5;\n      });\n      console.log(this.arr);\n\n      for (var j = 0; j < this.size; j++) {\n        var left = j % Math.sqrt(this.size);\n        var top = (j - left) / Math.sqrt(this.size); // const randomIndex = Math.floor(Math.random() * this.arr.length);\n        // const randomNumber = this.arr[randomIndex];\n        // this.arr.splice(randomIndex, 1);\n        // let textContent = 0;\n        // if (randomNumber === 0) textContent = '';\n        // else textContent = randomNumber;\n        // const isEmpty = (randomNumber === 0);\n\n        var textContent = void 0;\n        if (this.arr[j] === 0) textContent = '';else textContent = this.arr[j];\n        var isEmpty = this.arr[j] === 0;\n        this.cells.push(new eachCell(left, top, this.size, isEmpty, textContent));\n      }\n    }\n  }, {\n    key: \"appendToField\",\n    value: function appendToField() {\n      this.cells.forEach(function (item) {\n        return field.appendChild(item.cell);\n      });\n      this.cells.forEach(function (item) {\n        return item.cell.draggable = true;\n      });\n    }\n  }, {\n    key: \"sort\",\n    value: function sort() {\n      var temp = this.cells.slice();\n      temp.sort(function (a, b) {\n        if (a.top === b.top) return a.left - b.left;\n        return a.top - b.top;\n      });\n      return temp;\n    }\n  }, {\n    key: \"isSolvable\",\n    value: function isSolvable() {\n      var sortedBlocks = this.sort();\n      var sum = 0;\n      var e = 0;\n\n      for (var i = 0; i < sortedBlocks.length; i++) {\n        if (sortedBlocks[i].textContent === '') {\n          e = sortedBlocks[i].y + 1;\n          continue;\n        }\n\n        var count = 0;\n\n        for (var j = i; j < sortedBlocks.length; j++) {\n          if (sortedBlocks[j].textContent !== '' && sortedBlocks[i].textContent > sortedBlocks[j].textContent) count++;\n        }\n\n        sum += count;\n      }\n\n      sum += e;\n      return !(sum & 1);\n    }\n  }, {\n    key: \"isEqual\",\n    value: function isEqual() {\n      var sortCells = this.sort();\n\n      for (var i = 0; i < sortCells.length; i++) {\n        if (sortCells[i].textContent !== rightCells.cells[i].textContent) return false;\n      }\n\n      return true;\n    }\n  }, {\n    key: \"addEventListeners\",\n    value: function addEventListeners() {\n      var _this = this;\n\n      var emptyCell;\n\n      var _loop = function _loop(i) {\n        if (_this.cells[i].cell.textContent === '') emptyCell = _this.cells[i];else {\n          _this.cells[i].cell.addEventListener('click', function () {\n            if (!_this.cells[i].isMovable(emptyCell)) return;\n\n            _this.cells[i].move(emptyCell);\n\n            counter++;\n            moves.innerText = \"Moves: \".concat(counter); //if (!randomPuzzle.isSolvable()) console.log('error');\n\n            if (_this.isEqual()) alert('Win!');\n          }); // this.cells[i].cell.addEventListener('dragstart', () => { \n          //   this.cells[i].classList.add(`selected`);\n          // })\n\n\n          _this.cells[i].cell.addEventListener('dragover', function () {\n            if (!_this.cells[i].isMovable(emptyCell)) return;\n\n            _this.cells[i].move(emptyCell); //counter++; \n\n          });\n        }\n      };\n\n      for (var i = 0; i < this.cells.length; i++) {\n        _loop(i);\n      }\n    }\n  }]);\n\n  return Cells;\n}();\n\nvar fieldSizeOptions = document.createElement('select');\nnavigation.append(fieldSizeOptions);\nfieldSizeOptions.innerHTML = \"\\n               <select name=\\\"Field Size\\\" size=\\\"1\\\">\\n                   <option value=\\\"3\\\">3x3</option>\\n                   <option selected value=\\\"4\\\">4x4</option>\\n                   <option value=\\\"5\\\">5x5</option>\\n                   <option value=\\\"6\\\">6x6</option>\\n                   <option value=\\\"7\\\">7x7</option>\\n                   <option value=\\\"8\\\">8x8</option>\\n               </select>\\n   \";\nrightCells = new Cells(9);\nrightCells.createNumbers();\n\nfunction createGame() {\n  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 16;\n  var cells = new Cells(a);\n  cells.createRandomNumbers();\n  cells.appendToField();\n  cells.addEventListeners(); //console.log(fieldSizeOptions.options[fieldSizeOptions.selectedIndex].value)\n\n  if (!cells.isSolvable() || cells.isEqual()) return createRandomNumbers();\n  return cells;\n}\n\nfunction deleteGame() {\n  field.innerHTML = '';\n}\n\nfieldSizeOptions.addEventListener('change', function () {\n  switch (fieldSizeOptions.options[fieldSizeOptions.selectedIndex].value) {\n    case '3':\n      number = 9;\n      break;\n\n    case '4':\n      number = 16;\n      break;\n\n    case '5':\n      number = 25;\n      break;\n\n    case '6':\n      number = 36;\n      break;\n\n    case '7':\n      number = 49;\n      break;\n\n    case '8':\n      number = 64;\n      break;\n  }\n\n  return number;\n});\n\nfunction startNewGame() {\n  newGame.addEventListener('click', function () {\n    deleteGame();\n\n    if (fieldSizeOptions.options[fieldSizeOptions.selectedIndex].value === '4') {\n      createGame();\n    } else {\n      createGame(number);\n    }\n\n    counter = 0;\n    countMoves();\n    timeCounter = 0;\n  });\n}\n\nfunction showTime() {\n  time.innerText = \"Time: \".concat(timeCounter);\n  timeCounter++;\n  setTimeout(showTime, 1000);\n}\n\nfunction countMoves() {\n  moves.innerText = \"Moves: \".concat(counter);\n}\n\nwindow.onload = function () {\n  console.log('Hello, Webpack!');\n  createGame();\n  startNewGame();\n  showTime();\n  countMoves();\n};\n\n//# sourceURL=webpack://gem-puzzle/./src/index.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://gem-puzzle/./src/style.css?");

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
/******/ 	__webpack_require__("./src/index.js");
/******/ 	__webpack_require__("./src/style.css");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;