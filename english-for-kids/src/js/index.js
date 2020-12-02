import { addEventListenersToNavigation, generateNavigation } from './components/Navigation';
import { switchedButton } from './components/Switcher';
import { addCardsToDom , chooseCategory } from './Generate_field';

window.onload = () => {
  addCardsToDom(8);
  generateNavigation();
  addEventListenersToNavigation();
  switchedButton();
  chooseCategory();
};


