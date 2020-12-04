import { addEventListenersToNavigation, generateNavigation } from './components/Navigation';
import { switchedButton } from './components/Switcher';
import { addCardsToDom , chooseCategory  } from './Generate_field';

window.onload = () => {
  addCardsToDom('main');
  generateNavigation();
  addEventListenersToNavigation();
  switchedButton();
  chooseCategory();
};



