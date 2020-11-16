  const { concat } = require("lodash");
  import _, { compact } from 'lodash';

  import { wallpapersArr, shuffle } from './Images';

  document.body.style.background = "url('./src/assets/diagonales-decalees.png'), linear-gradient(to right, #360033, #0b8793)";

  // DOM 
  const game = document.querySelector('.game')
  const field = document.createElement('div');
  field.classList.add('field')

  let fieldSize = 300;

  field.style.width = `${fieldSize}px`;
  field.style.height = `${fieldSize}px`;

  const information = document.createElement('div');
  information.classList.add('information')

  const navigation = document.createElement('div');
  navigation.classList.add('navigation')
  game.append(information, field, navigation);

  const time = document.createElement('time');
  time.classList.add('time')

  const pauseButton = document.createElement('button');
  pauseButton.classList.add('pause');
  pauseButton.innerHTML = `<img src='./src/assets/pause.svg' width='12px' height='12px'></img>`;

  const moves = document.createElement('moves');
  moves.classList.add('moves')

  const title = document.createElement('div');
  title.classList.add('title')
  title.innerText = "Let's Play!"
  information.append(time, pauseButton, title, moves); 

  const soundButton = document.createElement('button');
  soundButton.innerText = 'Sound On';
  soundButton.classList.add('soundButton');

  const sound = new Audio('./src/assets/Bulle.wav')
  game.append(sound);

  const newGameDiv = document.createElement('div');
  navigation.classList.add('new-game-div');

  const newGame = document.createElement('button');
  newGame.classList.add('new-game')
  newGame.innerText = 'New Game'

  const fieldSizeOptions = document.createElement('select');
  
  fieldSizeOptions.innerHTML = `
               <select name="Field Size" size="1">
                   <option value="3">3x3</option>
                   <option selected value="4">4x4</option>
                   <option value="5">5x5</option>
                   <option value="6">6x6</option>
                   <option value="7">7x7</option>
                   <option value="8">8x8</option>
               </select>`

  const saveButton = document.createElement('button');
  saveButton.classList.add('save')
  saveButton.innerText = 'Save'

  const solveButton = document.createElement('button');
  solveButton.classList.add('solve')
  solveButton.innerText = 'Solve'

  const results = document.createElement('button');
  results.innerText = 'Best Results'

  const menu = document.createElement('button');
  menu.classList.add('menu')
  menu.innerText = 'Menu'

  navigation.append(newGameDiv, saveButton, soundButton, solveButton, results);
  newGameDiv.append(newGame, fieldSizeOptions);

  // Global Variables
  let counter = 0;
  let seconds = 0;
  let timerOn = false;
  let rightCells;
  let soundOn = true;
  let timeout;
  let number;
  let indexOfWallpaper = 0;
  let empty;
  let targetCell;
  let isShuffle = false;
  let movesEmptyCell = [];
  let movesTargetCell = [];
  let emptyCellCoordinates = {
    left: null,
    top: null,
  }
  let targetCellCoordinates = {
    left: null,
    top: null,
  }
  
 // Create One Cell
  class eachCell {
    constructor(left, top, size, isEmpty, textContent, background) { //9, 16, 25, 36, 49, 64
      this.size = size;
      this.isEmpty = isEmpty;
      this.left = left;
      this.top = top;
      this.textContent = textContent;
      this.styleLeft = null;
      this.styleTop = null;
      this.background = background;

      this.cell = document.createElement('div');
      this.cell.classList.add('cell');

      if(this.isEmpty) {
        this.cell = document.createElement('div');
        this.cell.classList.add('emptyCell'); 
        this.cell.style.background = 'none';
      }
  
      this.cellSize = fieldSize / Math.sqrt(this.size);
  
      this.cell.style.width = `${this.cellSize}px`;
      this.cell.style.height = `${this.cellSize}px`;
  
      this.cell.textContent = textContent;
   
      this.cell.style.left = `${this.left * this.cellSize}px`;
      this.cell.style.top = `${this.top * this.cellSize}px`;

      this.styleLeft = this.cell.style.left;
      this.styleTop = this.cell.style.top;

      if(!this.isEmpty) {
        this.cell.style.background = `url(${wallpapersArr[indexOfWallpaper]})`;
        this.cell.style.backgroundPosition = this.background;
        this.cell.style.backgroundSize = `${fieldSize}px`;
      }
    }
    changePosition() {
      this.cell.style.left = `${this.left * this.cellSize}px`;
      this.cell.style.top = `${this.top * this.cellSize}px`; 

      this.styleLeft = this.cell.style.left;
      this.styleTop = this.cell.style.top;
      this.createCoordinatesTargetCell();
    }

    move(secondCell) {
      const a = this.left;
      const b = secondCell.left;
      const c = this.top;
      const d = secondCell.top;
  
      [this.left, this.top, secondCell.left, secondCell.top] = [b, d, a, c];
  
      this.changePosition();
      secondCell.changePosition();
    }

    createCoordinatesTargetCell() {
      if(this.textContent !== '') {
        targetCellCoordinates = {
          left: this.styleLeft,
          top: this.styleTop, 
        }
      } else {
        emptyCellCoordinates = {
          left: this.styleLeft,
          top: this.styleTop, 
        } 
      }
      return targetCellCoordinates, emptyCellCoordinates;
    }

    isMovable(secondCell) {
      if (this.left === secondCell.left) {
          if (Math.abs(this.top - secondCell.top) === 1) return true;
      }
      else if (this.top === secondCell.top) {
          if (Math.abs(this.left - secondCell.left) === 1) return true;
      }
      return;
  }
  }
  // Create Field
  class Cells {
    constructor (size) { //9, 16, 25, 36, 49, 64
      this.size = size; 
      this.cells = [];
      this.arr = [];
      this.sortedArr = [];
    }

createNumbers() {
    //let newObj = {};
    let newObjTwo = {};
    if(localStorage.getItem("illSaveAllForYou") === null) {
      for(let j = 0; j < this.size; j++) {
        const left = j % Math.sqrt(this.size);
        const top = (j - left) / Math.sqrt(this.size); 
   
        const background = `${(left / (Math.sqrt(this.size) - 1)) * 100}% ${(top / (Math.sqrt(this.size) - 1)) * 100}%`;
  
        if(j === this.size - 1) this.cells.push(new eachCell(left, top, this.size, true, '', background)) 
        else this.cells.push(new eachCell(left, top, this.size, false, j + 1, background))
      }
      //localStorage.setItem('rightCells', JSON.stringify(this.cells)); 
    } else {
      // newObj = JSON.parse(localStorage.getItem('rightCells'))
      // newObj.forEach(cell => {
      //   cell = new eachCell(cell.left, cell.top, cell.size, cell.isEmpty, cell.textContent);
      //   this.cells.push(cell);
      newObjTwo = JSON.parse(localStorage.getItem("illSaveAllForYou"));
      newObjTwo.forEach(cell => {
          cell = new eachCell(cell.left, cell.top, cell.size, cell.isEmpty, cell.textContent, cell.background);
          this.cells.push(cell);
        })  
      }
}    
  
appendToField() {
    this.cells.forEach(item => field.appendChild(item.cell));
    this.cells.forEach(item => {
      if(item.textContent !== '') item.cell.draggable = true;
    });
}

sort() {
  let temp = this.cells.slice();
  temp.sort((a, b) => {
      if (a.top === b.top) return a.left - b.left;
      return a.top - b.top;
  });
  return temp;
}

isSolvable() {
  let sortedBlocks = this.sort();
  let sum = 0;
  let e = 0;

  for (let i = 0; i < sortedBlocks.length; i++) {
      if (sortedBlocks[i].textContent === '') {
          e = sortedBlocks[i].top + 1;
          continue;
      }
      let count = 0;
      for (let j = i; j < sortedBlocks.length; j++) {
          if (sortedBlocks[j].textContent !== '' && sortedBlocks[i].textContent > sortedBlocks[j].textContent) count++;
      }
      sum += count;
  }  
  sum += e;
  return !(sum & 1);
}

isEqual() {
  let sortCells = this.sort();
  for (let i = 0; i < sortCells.length; i++) {
      if (sortCells[i].textContent !== rightCells.cells[i].textContent) return false;
  }
  return true;
}

isEmpty() {
  for (let i = 0; i < this.cells.length; i++) {
    if (this.cells[i].cell.textContent === '') {
      empty = this.cells[i];
      return empty;
    }}
}

shuffle(n) {
  for(let i = 0; i < n; i++) {
    this.cells.forEach(item => {
      if (!item.isMovable(empty)) return;
      item.move(empty);   
      movesEmptyCell.unshift(emptyCellCoordinates);
      movesTargetCell.unshift(targetCellCoordinates);   
      console.log(movesTargetCell);
  }); 
  } 
}

solve() {
  solveButton.setAttribute('disabled', 'true')
     for(let i = movesTargetCell.length - 1; i >= 0; i--) {
     let self = this;
      setTimeout(() => {
      for (let cell of self.cells) {
       if(cell.cell.style.top === movesTargetCell[i].top  && cell.cell.style.left === movesTargetCell[i].left) {
         empty.cell.style.top = movesTargetCell[i].top;
         empty.cell.style.left = movesTargetCell[i].left;
         
         cell.cell.style.top = movesEmptyCell[i].top;
         cell.cell.style.left = movesEmptyCell[i].left; 
         break;
         
       }}}, 300 * i);
 } 
}

addEventListeners() {
  let emptyCell;
  for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].cell.textContent === '') {
        emptyCell = this.cells[i];
      }
      else {
          this.cells[i].cell.addEventListener('click', () => {
              if (!this.cells[i].isMovable(emptyCell)) return;
              this.cells[i].move(emptyCell);
              movesEmptyCell.unshift(emptyCellCoordinates);
              movesTargetCell.unshift(targetCellCoordinates);
              counter++;
              moves.innerText = `Moves: ${counter}`;
              playSound();
              pauseButton.removeAttribute('disabled', 'true');
              if(!timerOn) showTime();
              if (this.isEqual()) alert(`Win! Your time: ${time.innerHTML}. Your Moves: ${counter}`);
          });
          //DragAndDrop
          this.cells[i].cell.addEventListener('dragstart', (e) => { 
            setTimeout(() => {
              if (!this.cells[i].isMovable(emptyCell)) return;
              this.cells[i].cell.classList.add('hideCell');
              e.dataTransfer.effectAllowed = "copyMove";
              e.dataTransfer.dropEffect = 'move';
            }, 0)
            targetCell = this.cells[i];
            return targetCell;
          })
          this.cells[i].cell.addEventListener('dragend', (e) => { 
            if (!this.cells[i].isMovable(emptyCell)) return;
            this.cells[i].cell.classList.remove('hideCell');
            e.dataTransfer.dropEffect = 'move';
            movesEmptyCell.unshift(emptyCellCoordinates);
        movesTargetCell.unshift(targetCellCoordinates);
          })
          saveButton.addEventListener('click', () => {
            localStorage.setItem("illSaveAllForYou", JSON.stringify(this.cells)); 

          })
          // window.onbeforeunload = () =>  {
          //   localStorage.setItem("illSaveAllForYou", JSON.stringify(this.cells)); 
          //   localStorage.setItem('andEvenYourTime', time.innerHTML);
          //   localStorage.setItem('andEvenYourSeconds', seconds);
          //   localStorage.setItem('andEvenYourMoves', counter);
          // }
        }
      }    
      this.isEmpty();
      empty.cell.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      })
      empty.cell.addEventListener('drop', (e) => {
        if (!empty.isMovable(targetCell)) return;
        empty.move(targetCell); 
        e.dataTransfer.dropEffect = 'move';
        counter++;
        moves.innerText = `Moves: ${counter}`;
        playSound();
        pauseButton.removeAttribute('disabled', 'true');
        if(!timerOn) showTime();
      })
      solveButton.addEventListener('click', () => {
        this.solve();
        stopTimer();
        //reverse = !reverse;
      })
    }    
  }
let numberOfShuffles;
fieldSizeOptions.addEventListener('change', () => {
  switch(fieldSizeOptions.options[fieldSizeOptions.selectedIndex].value) {
    case '3': number = 9; numberOfShuffles = 20; break;
    case '4': number = 16; numberOfShuffles = 30; break;
    case '5': number = 25;  numberOfShuffles = 40; break;
    case '6': number = 36; numberOfShuffles = 50; break;
    case '7': number = 49; numberOfShuffles = 100; break;
    case '8': number = 64; numberOfShuffles = 300; break;
  }  
  return number;
})

//let n = 20;
const createGame = (a = 16) => {
  let cells = new Cells(a);
  cells.createNumbers();
  cells.appendToField();
  cells.addEventListeners();
  if(isShuffle) {
    numberOfShuffles += 5;  
  }
  if(numberOfShuffles === undefined) numberOfShuffles = 30;
  cells.shuffle(numberOfShuffles);
  pauseButton.setAttribute('disabled', 'true');

  //if(localStorage.getItem("illSaveAllForYou") === null) cells.shuffle(n);
 
   
  rightCells = new Cells(a);
  rightCells.createNumbers();
 
  if(localStorage.getItem('andEvenYourTime') === null) {
    time.innerHTML = `00:00:00` 
  } else {
    time.innerHTML = localStorage.getItem('andEvenYourTime');
    seconds = localStorage.getItem('andEvenYourSeconds');    
  }

  if(localStorage.getItem('andEvenYourMoves') === null) {
    moves.innerText = `Moves: ${counter}`;
   } else {
    counter = localStorage.getItem('andEvenYourMoves');
    moves.innerText = `Moves: ${counter}`;
   }   
  }

const deleteGame = () => {
  field.innerHTML = '';
  movesTargetCell = [];
  movesEmptyCell = [];
}

const startNewGame = () => {
  newGame.addEventListener('click', () => {
    deleteGame();
    if(fieldSizeOptions.options[fieldSizeOptions.selectedIndex].value === '4') {
      localStorage.removeItem('illSaveAllForYou');
      createGame();  
    } else {
      localStorage.removeItem('illSaveAllForYou');
      createGame(number);
    } 
    indexOfWallpaper += 1;
    if(indexOfWallpaper === wallpapersArr.length) indexOfWallpaper = 0;
    isShuffle = true;
    solveButton.removeAttribute('disabled', 'true')
    counter = 0;
    seconds = 0;
    time.innerHTML = `00:00:00`;
    countMoves();
    stopTimer();
  })
}

const showTime = () => {
  timerOn = true;
  let hours = parseInt(seconds / 3600 % 24); 
  let min = parseInt(seconds / 60 % 60); 
  let sec  = parseInt(seconds % 60);
      if (sec.toString().length === 1) sec   = '0' + sec;
      if (min.toString().length === 1) min   = '0' + min;
      if (hours.toString().length === 1) hours = '0' + hours;
      time.innerHTML = `${hours}:${min}:${sec}`;
      seconds++;
      timeout = setTimeout(showTime, 1000);  
}

const stopTimer = () => {
   timerOn = false;
   clearTimeout(timeout);
}

const countMoves = () => {
    moves.innerText = `Moves: ${counter}`;   
}

const playSound = () => {
  if(soundOn) {
    sound.currentTime = 0;
    sound.play();
  }    
}
saveButton.addEventListener('click', () => {
  localStorage.setItem('andEvenYourTime', time.innerHTML);
  localStorage.setItem('andEvenYourSeconds', seconds);
  localStorage.setItem('andEvenYourMoves', counter);
})

soundButton.addEventListener('click', () => {
  soundOn = !soundOn;
  soundButton.classList.toggle('soundButtonOff');
  if(soundButton.classList.contains('soundButtonOff')) {
    soundButton.innerText = 'Sound off';
  } else {
    soundButton.innerText = 'Sound on'; 
  }
})

pauseButton.addEventListener('click', () => {
  timerOn === !timerOn; 
  if(timerOn) {
    stopTimer();
  } else {
    showTime();
  }
})

window.onload = () => {
  console.log('Привет, проверяющий! Если ты видишь это, желаю тебе хорошего дня:)');  
  createGame();  
  startNewGame(); 
};


