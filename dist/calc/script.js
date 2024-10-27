<<<<<<< HEAD
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const handleNumber = (number) => {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay(currentInput);
    };

    const handleOperator = (op) => {
        if (currentInput !== '') {
            if (previousInput !== '') {
                calculate();
            }
            operator = op;
            previousInput = currentInput;
            currentInput = '';
        }
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay(currentInput);
    };

    const handleEqual = () => {
        if (operator !== null && currentInput !== '') {
            calculate();
        }
    };

    const handleClear = () => {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay('0');
    };

    const handleDelete = () => {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        updateDisplay(currentInput);
    };

    document.querySelector('.buttons').addEventListener('click', (e) => {
        const target = e.target;
        const action = target.dataset.action;
        const value = target.textContent;

        switch (action) {
            case 'number':
                handleNumber(value);
                break;
            case 'operator':
                handleOperator(value);
                break;
            case 'equal':
                handleEqual();
                break;
            case 'clear':
                handleClear();
                break;
            case 'delete':
                handleDelete();
                break;
            case 'decimal':
                if (!currentInput.includes('.')) {
                    handleNumber(value);
                }
                break;
        }
    });
});
=======
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    const updateDisplay = (value) => {
        display.textContent = value;
    };

    const handleNumber = (number) => {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay(currentInput);
    };

    const handleOperator = (op) => {
        if (currentInput !== '') {
            if (previousInput !== '') {
                calculate();
            }
            operator = op;
            previousInput = currentInput;
            currentInput = '';
        }
    };

    const calculate = () => {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay(currentInput);
    };

    const handleEqual = () => {
        if (operator !== null && currentInput !== '') {
            calculate();
        }
    };

    const handleClear = () => {
        currentInput = '';
        previousInput = '';
        operator = null;
        updateDisplay('0');
    };

    const handleDelete = () => {
        currentInput = currentInput.slice(0, -1);
        if (currentInput === '') {
            currentInput = '0';
        }
        updateDisplay(currentInput);
    };

    document.querySelector('.buttons').addEventListener('click', (e) => {
        const target = e.target;
        const action = target.dataset.action;
        const value = target.textContent;

        switch (action) {
            case 'number':
                handleNumber(value);
                break;
            case 'operator':
                handleOperator(value);
                break;
            case 'equal':
                handleEqual();
                break;
            case 'clear':
                handleClear();
                break;
            case 'delete':
                handleDelete();
                break;
            case 'decimal':
                if (!currentInput.includes('.')) {
                    handleNumber(value);
                }
                break;
        }
    });
});
>>>>>>> 96876d6 (New)
