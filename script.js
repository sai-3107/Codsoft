// script.js
const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons-grid');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

buttons.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('clear')) {
        display.textContent = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        return;
    }

    if (target.classList.contains('operator')) {
        if (firstOperand === null) {
            firstOperand = parseFloat(display.textContent);
        } else if (operator) {
            const result = performCalculation();
            display.textContent = result;
            firstOperand = result;
        }
        operator = target.textContent;
        waitingForSecondOperand = true;
        return;
    }

    if (target.classList.contains('equals')) {
        if (operator && firstOperand !== null) {
            const result = performCalculation();
            display.textContent = result;
            firstOperand = result;
            operator = null;
            waitingForSecondOperand = false;
        }
        return;
    }

    if (target.classList.contains('number') || target.classList.contains('decimal')) {
        if (waitingForSecondOperand) {
            display.textContent = target.textContent;
            waitingForSecondOperand = false;
        } else {
            if (display.textContent === '0' && target.textContent !== '.') {
                display.textContent = target.textContent;
            } else {
                display.textContent += target.textContent;
            }
        }
        return;
    }
});

function performCalculation() {
    const secondOperand = parseFloat(display.textContent);
    
    // The case statement logic is replicated here using an if-else structure
    if (operator === '+') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        if (secondOperand === 0) {
            return "Error: Div by Zero"; // Replicating the error handling from the bash script
        }
        return firstOperand / secondOperand;
    }
}