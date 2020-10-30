const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false,
    shift: false,
    language: true,
    sound: true,
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    
  //   this.elements.keys.forEach(element => {
  //     element.addEventListener('click', () => {
  //     const audio = document.querySelector('.audio');
  //     audio.currentTime = 0;
  //     audio.play();
  //   })
  // }); 

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    
    document.querySelectorAll(".use-keyboard-input").forEach(element => {

      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });

      

      // element.addEventListener('mousedown', (e) => {
      //   e.preventDefault();

      //   input.selectionStart = 0;
      //   input.selectionEnd = 0;
      // });

    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayoutEn = [
      '`', ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], '-', '+', "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", ['[', '{'], [']', '}'], 'en',
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", [';', ':'], ["'", '"'],  "enter",
      "done", "shift", "z", "x", "c", "v", "b", "n", "m", [',', '<'], ['.', '>'], ['/', '?'],
      'sound',"space", 'left', 'right'
    ];

    const keyLayoutRu = [
      'ё', ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*'], ['9', '('], ['0', ')'], '-', '+', "backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", 'х', 'ъ', 'ru',
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", 'ж', 'э', "enter",
      "done", "shift", "я", "ч", "с", "м", "и", "т", "ь", 'б', 'ю', ['.', ','],
      'sound', "space", 'left', 'right'
    ];

    let keyLayout;
    if(this.properties.language) {
      keyLayout = keyLayoutEn;
    } else {
      keyLayout = keyLayoutRu; 
    }    

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "en", 'ru', "enter", '/', '?', '.', ',' ].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      const playing = () => {
        keyElement.addEventListener('click', () => {
          if(this.properties.sound) {
            const audio = document.querySelector('.audio');
            audio.currentTime = 0;
            audio.play();
          }
      })
    }
    playing();

    let input = document.querySelector('.use-keyboard-input');


      switch (key) {

        case 'sound':
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "keyboard__key--active");
          keyElement.innerHTML = `<img src='./assets/volume.svg' width='20px' height='20px'></img>`;
          keyElement.addEventListener("click", () => {
            this.properties.sound = !this.properties.sound;
            keyElement.classList.toggle("keyboard__key--active", this.properties.sound);
            playing();
            input.focus();
          });
          break;

        case "en":
          keyElement.innerText = 'en';
            keyElement.addEventListener("click", () => {
              this.properties.language = !this.properties.language;
              while (this.elements.keysContainer.children.length > 0) {
                this.elements.keysContainer.children[0].remove(); 
              }
              this.elements.keysContainer.appendChild(this._createKeys());
              this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");  
              input.focus(); 
          });
        
          break;

          case "ru":
            keyElement.innerText = 'ru';
            keyElement.addEventListener("click", () => {
            this.properties.language = !this.properties.language;
            this.properties.shift = false;
            
            while (this.elements.keysContainer.children.length > 0) {
              this.elements.keysContainer.children[0].remove();
            }
            this.elements.keysContainer.appendChild(this._createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
            input.focus();
          });

          break;

        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
            input.focus();
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            input.focus();
          });

          break;
      

          case "shift":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
            keyElement.innerText = 'Shift';
  
            keyElement.addEventListener("click", () => {
              this._toggleShift();
              for (let i = 0; i<keyLayout.length; i++) {
                if (typeof keyLayout[i] !== 'string') { 
                  keyLayout[i].reverse();
                    for (const key of this.elements.keys) {
                          if (key.textContent === keyLayout[i][1]) {
                            key.textContent = keyLayout[i][0];
                          }
                    }
                } 
              }
              input.focus();
              keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
            });
  
            break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
            input.focus();
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
            input.focus();
          });

          break;

          case 'left': 
          keyElement.innerHTML = createIconHTML("arrow_left");
          keyElement.addEventListener("click", () => {
            
            this._triggerEvent("oninput");
            input.focus();
          });
          

          break;

          case 'right': 
          keyElement.innerHTML = createIconHTML("arrow_right");
          keyElement.addEventListener("click", () => {
            
            this._triggerEvent("oninput");
            input.focus();
          });
         

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          if(typeof key === 'string') {
            keyElement.textContent = key.toLowerCase();
            keyElement.addEventListener("click", () => {
              this.properties.value += this.properties.capsLock || this.properties.shift ? key.toUpperCase() : key.toLowerCase();
              this._triggerEvent("oninput");
              input.focus();  
            
            });
          } else {
            keyElement.textContent = key[0];
            keyElement.addEventListener("click", () => {
              this.properties.value += key[0];
              this._triggerEvent("oninput");
              input.focus(); 
            });  
          }     
          break; 
  
      };

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      } 
    }
  },

  _toggleShift() {
    this.properties.shift = !this.properties.shift;
    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
          key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      } 
  }
},




  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});