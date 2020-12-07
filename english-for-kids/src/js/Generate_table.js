import data from './data/Cards_data';
import Table from './components/Table';
import Card from './components/Card';
import { cardsData } from './Generate_field';
import { playMode } from './Game_mode';

const generateRows = (wordsData) => {
  const rows = [];
  wordsData.forEach((row) => {
    rows.push(new Table(row));
  });
  return rows;
};

const createArrayForTable = () => data.slice(2).flatMap((x) => x);
let dataForTable = createArrayForTable();

const main = document.querySelector('.wrapper__main');
const switchButton = document.querySelector('.switch-btn');
const statsButton = document.querySelector('.stats-btn');
const resetButton = document.createElement('button');
resetButton.innerText = 'Reset';
const buttons = document.querySelector('.points');
const repeatWordsButton = document.createElement('button');
repeatWordsButton.innerText = 'Repeat difficult words';

const generateTable = () => {
  const table = new Table(dataForTable);
  const head = table.generateHeadOfTheTable();
  main.append(head);
  const body = document.createElement('tbody');
  head.append(body);
  return body;
};

const addRowsToDom = (table) => {
  generateRows(dataForTable).forEach((row) => {
    table.append(row.generateRow());
  });
};

const deleteTable = () => {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';
};

const addEventListener = (table) => {
  dataForTable = generateRows(dataForTable);
  document.querySelector('tr').addEventListener('click', (e) => {
    switch (e.target.innerText) {
      case 'Categories':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.category.localeCompare(b.category));
        } else {
          dataForTable.sort((a, b) => b.category.localeCompare(a.category));
        }
        addRowsToDom(table);
        break;
      case 'Words':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.word.localeCompare(b.word));
        } else {
          dataForTable.sort((a, b) => b.word.localeCompare(a.word));
        }
        addRowsToDom(table);
        break;
      case 'Translation':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.translation.localeCompare(b.translation));
        } else {
          dataForTable.sort((a, b) => b.translation.localeCompare(a.translation));
        }
        addRowsToDom(table);
        break;
      case 'Trained':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.trained - b.trained);
        } else {
          dataForTable.sort((a, b) => b.trained - a.trained);
        }
        addRowsToDom(table);
        break;
      case 'Correct':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.correct - b.correct);
        } else {
          dataForTable.sort((a, b) => b.correct - a.correct);
        }
        addRowsToDom(table);
        break;
      case 'Incorrect':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.incorrect - b.incorrect);
        } else {
          dataForTable.sort((a, b) => b.incorrect - a.incorrect);
        }
        addRowsToDom(table);
        break;
      case '%':
        e.target.classList.toggle('sort');
        deleteTable();
        if (e.target.classList.contains('sort')) {
          dataForTable.sort((a, b) => a.percent - b.percent);
        } else {
          dataForTable.sort((a, b) => b.percent - a.percent);
        }
        addRowsToDom(table);
        break;
      default:
    }
  });
};

const addTableToDom = () => {
  const table = generateTable();
  addRowsToDom(table);
  addEventListener(table);
};

const filterDifficultWords = () => {
  let difWordsArray = [];
  difWordsArray = generateRows(dataForTable);
  difWordsArray = difWordsArray.filter((item) => item.percent > 0 && item.percent !== 100);
  difWordsArray.sort((a, b) => a.percent - b.percent);
  difWordsArray = difWordsArray.slice(0, 8);
  return difWordsArray;
};
const generateCards = (cardsDataArray) => {
  const cards = [];
  cardsDataArray.forEach((card) => {
    cards.push(new Card(card));
  });
  return cards;
};

const addCardsToDom = () => {
  cardsData.array = filterDifficultWords();
  generateCards(cardsData.array).forEach((card) => {
    main.append(card.generateCard());
  });
  return cardsData.array;
};

const addEventListenerToStatsButtons = () => {
  statsButton.addEventListener('click', () => {
    buttons.innerHTML = '';
    buttons.append(repeatWordsButton, resetButton);
    switchButton.classList.add('none');
    document.querySelector('.repeat').classList.remove('flex');
    document.querySelector('.play-btn').classList.remove('flex');
    main.innerHTML = '';
    addTableToDom();
  });

  resetButton.addEventListener('click', () => {
    localStorage.clear();
    main.innerHTML = '';
    dataForTable = generateRows(dataForTable);
    const table = generateTable();
    addRowsToDom(table);
  });

  repeatWordsButton.addEventListener('click', () => {
    filterDifficultWords();
    main.innerHTML = '';
    buttons.innerHTML = '';
    document.querySelector('.switch-btn').classList.remove('none');
    if (switchButton.classList.contains('switch-on')) {
      playMode.isPlaying = false;
    } else {
      playMode.isPlaying = true;
      document.querySelector('.play-btn').classList.add('flex');
    }
    addCardsToDom();
  });
};

export default addEventListenerToStatsButtons;
