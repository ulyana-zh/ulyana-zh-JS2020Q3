document.addEventListener('keydown', (e) => {
    console.log(e);
})

// let input = document.querySelector('.use-keyboard-input');
// input.focus();
// input.addEventListener('blur', () => {
//   input.focus();  
// })

// const start = input.selectionStart;
// const end = input.selectionEnd;


const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
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
    start: 0,
    end: 0,
  },

  init() {
    let input = document.querySelector('.use-keyboard-input');

    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  

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

      element.addEventListener('click', () => {
        this.properties.start = input.selectionStart;
        this.properties.end = input.selectionEnd;
      });

      element.addEventListener("keydown", key => {
        this.properties.value += key.key;
        this.open(element.value, currentValue => {
          if (this.properties.start > element.value.length) {
            element.value += currentValue.substring(currentValue.length - 1, currentValue.length);
          }
          else {
            element.value = element.value.substring(0, this.properties.start-1)
              + currentValue.substring(this.properties.start-1, this.properties.end) 
                + element.value.substring(this.properties.end-1, element.value.length);
          }
        });
        this.properties.start++;
        this.properties.end++;
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    const keyLayoutEn = [
      ['`', '~'], ['1', '!'], ['2', '@'], ['3', '#'], ['4', '$'], ['5', '%'], ['6', '^'], ['7', '&'], ['8', '*'], ['9', '('], ['0', ')'], ['-', '_'], ['=','+'], "Backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", ['[', '{'], [']', '}'], 'en',
      "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", [';', ':'], ["'", '"'],  "Enter",
      "done", "Shift", "z", "x", "c", "v", "b", "n", "m", [',', '<'], ['.', '>'], ['/', '?'],
      'sound',"space", 'ArrowLeft', 'ArrowRight'
    ];

    const keyLayoutRu = [
      'ё', ['1', '!'], ['2', '"'], ['3', '№'], ['4', ';'], ['5', '%'], ['6', ':'], ['7', '?'], ['8', '*'], ['9', '('], ['0', ')'], '-', '+', "Backspace",
      "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", 'х', 'ъ', 'ru',
      "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", 'ж', 'э', "Enter",
      "done", "Shift", "я", "ч", "с", "м", "и", "т", "ь", 'б', 'ю', ['.', ','],
      'sound', "space", 'ArrowLeft', 'ArrowRight'
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
      const insertLineBreak = ["Backspace", "en", 'ru', "Enter", 'sound'].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.setAttribute("data", 'key');
      keyElement.classList.add("keyboard__key");


      //Add some music
      const playing = () => {
        if(key === 'Shift') {
          keyElement.addEventListener('click', () => {
            if(this.properties.sound) {
                const audio = document.querySelector('.audio-shift');
                audio.currentTime = 0;
                audio.play();
            }
           })   
        } else if(key === 'Backspace') {
          keyElement.addEventListener('click', () => {
            if(this.properties.sound) {
                const audio = document.querySelector('.audio-backspace');
                audio.currentTime = 0;
                audio.play();
            }
           })   
        } else if(key === 'CapsLock') {
          keyElement.addEventListener('click', () => {
            if(this.properties.sound) {
                const audio = document.querySelector('.audio-capslock');
                audio.currentTime = 0;
                audio.play();
            }
           })   
        } else if(key === 'Enter') {
          keyElement.addEventListener('click', () => {
            if(this.properties.sound) {
                const audio = document.querySelector('.audio-enter');
                audio.currentTime = 0;
                audio.play();
            }
           })   
        } else {
          keyElement.addEventListener('click', () => {
            if(this.properties.sound) {
              if(this.properties.language) {
                const audio = document.querySelector('.audio-en');
                audio.currentTime = 0;
                audio.play();
              } else {
                const audio = document.querySelector('.audio-ru');
                audio.currentTime = 0;
                audio.play();
              }
            }
           })
        }
        };

         playing();

    //Add real keyboard keydown     
    let input = document.querySelector('.use-keyboard-input');

    window.addEventListener("keydown", e => {
      if(typeof key === 'string') {
        if (key === e.key) {
          keyElement.classList.add("keyboard__key-active");
          setTimeout(() => {
              keyElement.classList.remove("keyboard__key-active");
          }, 100);
      }
      } else {
        if (key[0]=== e.key) {
          keyElement.classList.add("keyboard__key-active");
          setTimeout(() => {
              keyElement.classList.remove("keyboard__key-active");
          }, 100);
      } 
      }
    })

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
            
            
            while (this.elements.keysContainer.children.length > 0) {
              this.elements.keysContainer.children[0].remove();
            }
            this.elements.keysContainer.appendChild(this._createKeys());
            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
            input.focus();
          });

          break;

        case "Backspace":

          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
            input.focus();
          });

          break;

        case "CapsLock":

          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
            input.focus();
          });

          window.addEventListener("keydown", (e) => {
            if (e.key === 'CapsLock') {
              this._toggleCapsLock();
              keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
              input.focus();
            }
          });

          break;
      

          case "Shift":
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

            window.addEventListener("keydown", (e) => {
              if (e.key === 'Shift') {
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
              }              
              input.focus();
              keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
              
            });
  
            break;

        case "Enter":
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

          case 'ArrowLeft': 
          keyElement.innerHTML = createIconHTML("arrow_left");
          keyElement.addEventListener("click", () => {
            this.properties.start--;
            this.properties.end--;
            input.setSelectionRange(this.properties.start, this.properties.end);
            this._triggerEvent("oninput");
            input.focus();
          });
                 

          break;

          case 'ArrowRight': 
          keyElement.innerHTML = createIconHTML("arrow_right");
          keyElement.addEventListener("click", () => {
            this.properties.start++;
            this.properties.end++;
            input.setSelectionRange(this.properties.start, this.properties.end);
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
