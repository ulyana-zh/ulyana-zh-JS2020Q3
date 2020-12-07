const switchButton = document.querySelector('.switch-btn');

const whatIsTextButton = () => {
  if (switchButton.classList.contains('switch-on')) {
    switchButton.innerText = 'Train'.toUpperCase();
  } else {
    switchButton.innerText = 'Play'.toUpperCase();
  }
};

const switchedButton = () => {
  switchButton.addEventListener('click', () => {
    switchButton.classList.toggle('switch-on');
    whatIsTextButton();
  });
};

export default switchedButton;

