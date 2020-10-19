// DOM Elements
const time = document.querySelector('.time'),
  date = document.querySelector('.date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options
//const showAmPm = true;


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

  // Set AM or PM
  //const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  //hour = hour % 12 || 12;

  // Output Time with AM/PM
  // time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
  //   sec
  // )} ${showAmPm ? amPm : ''}`;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
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
  if (hour < 6) {
    document.body.style.backgroundImage =
    "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Night, '; 
  }
  else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }

}
 
name.addEventListener('click', name => {
  name.target.innerText = '';
});

focus.addEventListener('click', focus => {
  focus.target.innerText = '';
});

function defaultText(e) {
  e.target.innerText === '' ? e.target.innerText = '[Enter Name]' : e.setName();
};

function defaultTextFocus(e) {
  e.target.innerText === '' ? e.target.innerText = '[YourFocus]' : e.setFocus();
};

// Get Name
function getName() {
    if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } if (localStorage.getItem('name') === '/^[ ]+$/') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
    if (e.type === 'keypress') {
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
  if (localStorage.getItem('focus') === null) {
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

name.addEventListener('blur', defaultText);
focus.addEventListener('blur', defaultTextFocus);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);



// Run
showDate();
showTime();
setBgGreet();
getName();
getFocus();