// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  updateFont = document.querySelector('.update-icon'),
  body = document.querySelector('.body'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption'),
  updateQuoteButton = document.querySelector('.update-quote'),
  weatherIcon = document.querySelector('.weather-icon'),
  temperature = document.querySelector('.temperature'),
  weatherDescription = document.querySelector('.weather-description'),
  city = document.querySelector('.city'),
  humidity = document.querySelector('.humidity'),
  windSpeed = document.querySelector('.wind-speed');


//Fonts Arrays
const numberImg = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', 
'13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg']

const baseNight = '../momentum/assets/images/night/';
const baseMorning = '../momentum/assets/images/morning/';
const baseDay = '../momentum/assets/images/day/';
const baseEvening = '../momentum/assets/images/evening/';

function createArr(base, array) {
  let arr = [];
  for(let i = 0; i<array.length; i++) {
    arr[i] = base + array[i];
  }
  return arr;
}
let nightWall = createArr(baseNight, numberImg),
morningWall = createArr(baseMorning, numberImg),
dayWall = createArr(baseDay, numberImg),
eveningWall = createArr(baseEvening, numberImg);


let currentImg = new Date().getHours();
let wallpapersArr = shuffle(nightWall)
.slice(0, 6).concat(shuffle(morningWall).slice(0, 6)).concat(shuffle(dayWall).slice(0, 6)).concat(shuffle(eveningWall).slice(0, 6));

//Show Date
function showDate() {
 let today = new Date(),
 day = today.getDay(),
 month = today.getMonth(),
 dateToday = today.getDate();

//Days Names
switch(day) {
  case 0: day = 'Sunday'; break;
  case 1: day = 'Monday'; break;
  case 2: day = 'Tuesday'; break;
  case 3: day = 'Wednesday'; break;
  case 4: day = 'Thursday'; break;
  case 5: day = 'Friday'; break;
  case 6: day = 'Saturday'; break;
}

//Month Names
switch(month) {
  case 0: month = 'January'; break;
  case 1: month = 'February'; break;
  case 2: month = 'March'; break;
  case 3: month = 'April'; break;
  case 4: month = 'May'; break;
  case 5: month = 'June'; break;
  case 6: month = 'July'; break;
  case 7: month = 'August'; break;
  case 8: month = 'September'; break;
  case 9: month = 'October'; break;
  case 10: month = 'November'; break;
  case 11: month = 'December'; break;
}

 //Output Day 
 date.innerHTML = `${day}<span>, </span>${month} ${dateToday}`;
 setTimeout(showDate, 1000);
}


// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  if (today.getMinutes() == 00 && today.getSeconds() == 00) {
    currentImg++;
  }

  if (currentImg == 24) {
    currentImg = 0;
  }

  body.style.backgroundImage = `url("${wallpapersArr[currentImg]}")`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours(); 
    
    if (hour >=6 && hour < 12) {
    // Morning
      greeting.textContent = 'Good Morning, ';
  } else if (hour >= 12 && hour < 18) {
    // Afternoon
    greeting.textContent = 'Good Afternoon, ';    
  } else if (hour >= 18 && hour < 24) {
    // Evening
    greeting.textContent = 'Good Evening, ';
  }  else {
    // Night 
      greeting.textContent = 'Good Night, '; 
    }
  setTimeout(setBgGreet, 1000);
}

function nextImg() {
  if (currentImg + 1 === 24) {
    currentImg = 0;
  } else {
    currentImg++;
  }
  let src = wallpapersArr[currentImg];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  updateFont.disabled = true;
  setTimeout(() => {
  updateFont.disabled = false}, 
  1000);
}

function clearInput(e) {
  e.target.innerText = '';
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

// Get Quote
async function getQuote() {  
  const url = `https://api.quotable.io/random`;
  try {
    const res = await fetch(url);
    const data = await res.json(); 
    if(data.length < 200) {
      blockquote.textContent = data.content;
      figcaption.textContent = data.author;
    }
  } catch {
    setTimeout(getQuote, 100);
    return false;
  }
}

//Get Weather 
async function getWeather() {  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=4f9c79bc975d67f3955a8894ac82d130&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
  try {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `wind speed: ${data.wind.speed}m/s`;   
  } catch {
    city.textContent= 'Your city was not found'
    throw new Error ('Please, enter the correct city');
  }
  setTimeout(getWeather, 3600000)
  }

function setCity(event) {
  if (event.code === 'Enter' || event.code === 'click') {
    getWeather();
    localStorage.setItem('city', event.target.innerText);
    city.blur();
  }
}

function getCity() {
  if (localStorage.getItem('city') === null || localStorage.getItem('city') === '') {
    getWeather();
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

//Random functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//addEventListeners


name.addEventListener('click', clearInput);
name.addEventListener('blur', getName);
focus.addEventListener('click', clearInput);
focus.addEventListener('blur', getFocus);


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

city.addEventListener('click', clearInput);
city.addEventListener('blur', getCity);

updateFont.addEventListener('click', nextImg);

document.addEventListener('DOMContentLoaded', getQuote);
updateQuoteButton.addEventListener('click', getQuote);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);


// Run
showDate();
showTime();
setBgGreet();
getName();
getFocus();
getWeather();
getCity();