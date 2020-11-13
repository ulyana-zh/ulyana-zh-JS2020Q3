const { concat } = require("lodash");

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

  const moves = document.createElement('moves');
  moves.classList.add('moves')

  const title = document.createElement('div');
  title.classList.add('title')
  title.innerText = "Let's Play!"
  information.append(time, title, moves); 

  const soundButton = document.createElement('button');
  soundButton.innerHTML = `<img src='./src/assets/volume.svg' width='20px' height='20px'></img>`
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


  const solve = document.createElement('button');
  solve.classList.add('solve')
  solve.innerText = 'Solve'

  const results = document.createElement('button');
  results.innerText = 'Best Results'

  const menu = document.createElement('button');
  menu.classList.add('menu')
  menu.innerText = 'Menu'

  navigation.append(newGameDiv, fieldSizeOptions, soundButton, solve, results);
  newGameDiv.append(newGame, fieldSizeOptions);

  let counter = 0;
  let now = new Date();
  let rightCells;
  let soundOn = true;
  let timeout;
 
  class eachCell {
    constructor(left, top, size, isEmpty, textContent) { //9, 16, 25, 36, 49, 64
      this.size = size;
      this.isEmpty = isEmpty;
      this.left = left;
      this.top = top;
      this.textContent = textContent;

      this.cell = document.createElement('div');
      this.cell.classList.add('cell');

      if(this.isEmpty) {
        this.cell = document.createElement('div');
        this.cell.classList.add('emptyCell'); 
      }
  
      this.cellSize = fieldSize / Math.sqrt(this.size);
  
      this.cell.style.width = `${this.cellSize}px`;
      this.cell.style.height = `${this.cellSize}px`;
  
      this.cell.textContent = textContent;
   
      this.cell.style.left = `${this.left * this.cellSize}px`;
      this.cell.style.top = `${this.top * this.cellSize}px`;
    }

    changePosition() {
      this.cell.style.left = `${this.left * this.cellSize}px`;
      this.cell.style.top = `${this.top * this.cellSize}px`; 
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

  class Cells {
    constructor (size) { //9, 16, 25, 36, 49, 64
      this.size = size; 
      this.cells = [];
      this.arr = [];
    }

  createNumbers() {
    let newObj = {};
    if(localStorage.getItem('rightCells') === null) {
      for(let j = 0; j < this.size; j++) {

        const left = j % Math.sqrt(this.size);
        const top = (j - left) / Math.sqrt(this.size); 
        
        if(j === this.size - 1) this.cells.push(new eachCell(left, top, this.size, true, '')) 
        else this.cells.push(new eachCell(left, top, this.size, false, j + 1))
      }
      localStorage.setItem('rightCells', JSON.stringify(this.cells)); 
    } else {
      newObj = JSON.parse(localStorage.getItem('rightCells'))
      newObj.forEach(cell => {
        cell = new eachCell(cell.left, cell.top, cell.size, cell.isEmpty, cell.textContent);
        this.cells.push(cell);
      })  
    }
    return this.cells;
  }  
  
  createRandomNumbers() {
    let newObj = [];
    for(let i = 0; i < this.size; i++) {
      this.arr.push(i);
    }
    this.arr = this.arr.sort(() => {
      return Math.random()-0.5;
    })

    if(localStorage.getItem('cells') === null) {
    for(let j = 0; j < this.size; j++) {
      const left = j % Math.sqrt(this.size);
      const top = (j - left) / Math.sqrt(this.size); 

            // const randomIndex = Math.floor(Math.random() * this.arr.length);
            // const randomNumber = this.arr[randomIndex];
            // this.arr.splice(randomIndex, 1);

            // let textContent = 0;
            // if (randomNumber === 0) textContent = '';
            // else textContent = randomNumber;
            // const isEmpty = (randomNumber === 0);

      let textContent; 
      if (this.arr[j] === 0) textContent = '';
      else textContent = this.arr[j];
      const isEmpty = (this.arr[j] === 0);      
      this.cells.push(new eachCell(left, top, this.size, isEmpty, textContent))  
      }} else {
      newObj = JSON.parse(localStorage.getItem('cells'))
      newObj.forEach(cell => {
        cell = new eachCell(cell.left, cell.top, cell.size, cell.isEmpty, cell.textContent);
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
          e = sortedBlocks[i].y + 1;
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

 addEventListeners() {
  field.addEventListener('click', () => {
      now = new Date()
      showTime();
    }, {once: true})
    
   let a;
  let emptyCell;
  for (let i = 0; i < this.cells.length; i++) {
      if (this.cells[i].cell.textContent === '') {
        emptyCell = this.cells[i];
        a = function(b) {
          emptyCell.cell.addEventListener('dragover', (e) => {
            e.preventDefault();
          })
          emptyCell.cell.addEventListener('drop', (e) => {
            //if (!this.cells[i].isMovable(emptyCell)) return;
            emptyCell.move(b); 
            //console.log(emptyCell)
          })
        } 
      }
      else {
          this.cells[i].cell.addEventListener('click', () => {
              if (!this.cells[i].isMovable(emptyCell)) return;
              this.cells[i].move(emptyCell);
              counter++;
              moves.innerText = `Moves: ${counter}`;
              playSound();
              localStorage.setItem('cells', JSON.stringify(this.cells)); 
              //if (!randomPuzzle.isSolvable()) console.log('error');
              if (this.isEqual()) alert('Win!');
          });
              //DragAndDrop
              this.cells[i].cell.addEventListener('dragstart', () => { 
                setTimeout(() => {
                  //if (!this.cells[i].isMovable(emptyCell)) return;
                  this.cells[i].cell.classList.add('hideCell');
                }, 0)
              })
              this.cells[i].cell.addEventListener('dragend', () => { 
                //if (!this.cells[i].isMovable(emptyCell)) return;
                this.cells[i].cell.classList.remove('hideCell');
              })
              a(this.cells[i]);
              

             
              // this.cells[i].cell.addEventListener('dragenter', () => {
              //   if (!this.cells[i].isMovable(emptyCell)) return;
                
              // })
              // this.cells[i].cell.addEventListener('dragleave', () => {
              //   if (!this.cells[i].isMovable(emptyCell)) return;
               
              // })
      
            
              
            

      }
  }
}
}
fieldSizeOptions.addEventListener('change', () => {
  switch(fieldSizeOptions.options[fieldSizeOptions.selectedIndex].value) {
    case '3': number = 9;  break;
    case '4': number = 16; break;
    case '5': number = 25;  break;
    case '6': number = 36; break;
    case '7': number = 49; break;
    case '8': number = 64; break;
  }  
  return number;
})

const createGame = (number = 16) => {
  let cells = new Cells(number);
  cells.createRandomNumbers();

  rightCells = new Cells(number);
  rightCells.createNumbers();
  console.log(rightCells)
  
  cells.appendToField();
  cells.addEventListeners();

  time.innerHTML = `00:00:00`
  moves.innerText = `Moves: 0`

  if (!cells.isSolvable() || cells.isEqual()) return createRandomNumbers();
}

const deleteGame = () => {
  field.innerHTML = '';
}


const startNewGame = () => {
  newGame.addEventListener('click', () => {
    deleteGame();
    if(fieldSizeOptions.options[fieldSizeOptions.selectedIndex].value === '4') {
      localStorage.removeItem('cells');
      createGame();   
    } else {
      localStorage.removeItem('cells');
      createGame(number);
    } 
    counter = 0;
    countMoves();
    now = new Date();
    stopTimer();
  })
}

const showTime = () => {
  const newDate = new Date() - now.getTime();
      let sec   = Math.abs(Math.floor(newDate / 1000) % 60); //sek
      let min   = Math.abs(Math.floor(newDate / 1000/60) % 60); //min
      let hours = Math.abs(Math.floor(newDate / 1000 / 60 / 60) % 24); //hours
      if (sec.toString().length === 1) sec   = '0' + sec;
      if (min.toString().length === 1) min   = '0' + min;
      if (hours.toString().length === 1) hours = '0' + hours;
      time.innerHTML = `${hours}:${min}:${sec}`;
      timeout = setTimeout(showTime, 1000);
 }

 const stopTimer = () => {
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

soundButton.addEventListener('click', () => {
  soundOn = !soundOn;
})

window.onload = () => {
  console.log('Hello, Webpack!');  
  createGame();  
  startNewGame(); 
};
