class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.readyToReset = false;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '' && this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    compute() {
            let computation;
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
                    switch (this.operation) {
                    case '+': 
                  computation =  prev + current;
                    break;
                    case '-': 
                  computation =  prev - current;
                    break;
                    case '*': 
                  computation =  prev * current;
                    break;
                    case '÷': 
                  computation =  prev / current;
                    break;
                  case 'numx':
                    computation =  prev ** current;   
                    break; 
                    default:
                    return;    
            }
        computation = +computation.toFixed(14); 
        /*computation = Math.round(computation * );  */
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
      }
      sqrtButton() {
            this.currentOperand = Math.sqrt(this.currentOperand);

    }

    negativeNumber () {
        let negativeNumber;
        const currentNumber = parseFloat(this.currentOperand);
        negativeNumber = currentNumber * (-1);
        this.currentOperand = negativeNumber;      
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (this.currentOperand !== this.currentOperand) {
            return 'error';
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null && this.operation != 'numx') {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ${this.operation}`;
        } else if (this.operation === 'numx') {
            this.previousOperandTextElement.innerText = 
            `${this.previousOperand} ^`;
        } else {
            this.previousOperandTextElement.innerText = ''
          }    
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const negativeNumberButton = document.querySelector('[data-negative-number]');
const sqrtButton = document.querySelector('[data-operation-sr]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {

      if(calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
  calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
      }
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

negativeNumberButton.addEventListener('click', button => {
    calculator.negativeNumber();
    calculator.updateDisplay();
    calculator.appendNumber();
  })

  sqrtButton.addEventListener('click', button => {
    calculator.sqrtButton();
    calculator.updateDisplay();
});