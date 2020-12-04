const switchButton = document.querySelector('.switch-btn');

const switchedButton = () => {
    switchButton.addEventListener('click', () => {
        switchButton.classList.toggle('switch-on');
        whatIsTextButton();
    })
}

const whatIsTextButton = () => {
    if(switchButton.classList.contains('switch-on')) {
        switchButton.innerText = 'Train'.toUpperCase();
    } else {
        switchButton.innerText = 'Play'.toUpperCase();       
    }
}

export { switchedButton }
