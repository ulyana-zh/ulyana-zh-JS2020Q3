//Fonts Arrays
const fontsDay1 = [
  '01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'  
]
const fontsDay2 = [
  '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg'  
]
const fontsDay3 = [
  '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg'  
]
const fontsDay4 = [
  '19.jpg', '20.jpg', '01.jpg', '02.jpg', '03.jpg', '04.jpg'  
]

const baseNight = '../momentum/assets/images/night/';
const baseMorning = '../momentum/assets/images/morning/';
const baseDay = '../momentum/assets/images/day/';
const baseEvening = '../momentum/assets/images/evening/';

function createArr(array) {
  let arr = [], arr1 = [],
  arr2 = [], arr3 = [], arr4 = [];   
 for(let i = 0; i<array.length; i++) {
   arr1[i] = baseNight + array[i];
   arr2[i] = baseMorning + array[i];
   arr3[i] = baseDay + array[i];
   arr4[i] = baseEvening + array[i];   
 } 
  arr = arr1.concat(arr2, arr3, arr4)
  return arr;
}

const day1 = createArr(fontsDay1); //0-23 index
const day2 = createArr(fontsDay2); 
const day3 = createArr(fontsDay3); 
const day4 = createArr(fontsDay4); 
const font = [day1, day2, day3, day4];


shuffle(font);
const randomFonts = font[0];


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
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting

let j = 0;
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    
  if (hour < 6) {
    body.style.backgroundImage = `url(${randomFonts[j]})`;
    greeting.textContent = 'Good Night, '; 
    if(min === 0 && sec === 0) {
      body.style.backgroundImage = `url(${randomFonts[j+1]})`  
      j++;
    }
    
  }
  else if (hour < 12) {
    // Morning
    body.style.backgroundImage =
      "url('../momentum/assets/images/morning/01.jpg')";
      greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    body.style.backgroundImage =
    "url('../momentum/assets/images/day/02.jpg')";
    greeting.textContent = 'Good Afternoon, ';    
  } else {
    // Evening
    body.style.backgroundImage =
      "url('../momentum/assets/images/evening/01.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
  setInterval(setBgGreet, 10000)
}
 
// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if(e.target.innerText === '') {
        e.target.innerText = '[Enter Name]'
        name.blur();
      } else {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }      
    } 
    } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if(e.target.innerText === '') {
        e.target.innerText = '[Enter Focus]';
        focus.blur();
      } else {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

function clearInput(e) {
  e.target.innerText = '';
}
function defaultTextName(e) {
  e.target.innerText === '' ? e.target.innerText = localStorage.getItem('name', e.target.innerText) : e.target.innerText = e.target.innerText;
};

function defaultTextFocus(e) {
  e.target.innerText === '' ? e.target.innerText = localStorage.getItem('focus', e.target.innerText) : e.target.innerText = e.target.innerText;
};

// Get Quote
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  try {
    const res = await fetch(url);
    const data = await res.json(); 
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
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
  
  if(data.weather === undefined) {
    city.textContent= 'Your city was not found. Please, enter the correct city name'
    throw new Error ('Please, enter the correct city');
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `wind speed: ${data.wind.speed}m/s`;
  }
  }

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

//Random functions
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function randomItem(array) {
  let a = array[Math.floor(Math.random()*array.length)];
  return a;
}


//Fonts Slider
function viewBgImage(data) {
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
   body.style.backgroundImage = `url(${src})`;
  }; 
}

  let i = 0;
 function getImage() {   
  const index = i % randomFonts.length;
  const imageSrc = randomFonts[index];
  viewBgImage(imageSrc);
  i++;
  updateFont.disabled = true;
  setTimeout(function() { 
    updateFont.disabled = false 
  }, 1000);
} 




name.addEventListener('keypress', setName);
name.addEventListener('click', clearInput);

name.addEventListener('blur', defaultTextName);
name.addEventListener('blur', setName);

focus.addEventListener('click', clearInput);
focus.addEventListener('keypress', setFocus);

focus.addEventListener('blur', defaultTextFocus);
focus.addEventListener('blur', setFocus);

updateFont.addEventListener('click', getImage);

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