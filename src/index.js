const display = document.getElementById('display');
const buttons = document.getElementById('buttons');

const data = [
    //data of the calculator

    ['(', ')', '<='],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['C', '0', '=', '+']
];

//create elements
data.forEach((row) => {
    const rowElement = document.createElement('div');
    buttons.append(rowElement);
    rowElement.classList.add('row-container');

    row.forEach((button) => {
        const btnElement = document.createElement('button');
        rowElement.append(btnElement);
        btnElement.innerText = button;
        btnElement.classList.add('btn');
        if (button === '<=') {
            btnElement.classList.add('backspace');
        }

        //add action for every button
        btnElement.addEventListener('click', () => handleClick(button));
    });
});

let result = '0';
const operators = ['+', '-', '*', '/'];
const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '(', ')'];
function handleClick(button) {
    let lastChar = result.slice(-1);

    if (button === '=') {
        //do the math
        try {
            result = eval(result).toString();
        } catch (err) {
            result = 'error';
        }
        display.innerText = result;
        return;
    }

    if (button === 'C') {
        //reset calculator
        result = '0';
        display.innerText = result;
        return;
    }

    if ((result === '0' || result === 'error') && button !== '<=') {
        //if we have 0 or error we change the result instead of concatenating
        result = button;
        display.innerText = result;
        return;
    }

    if (button === '<=') {
        //delete one character
        result = result.slice(0, -1);
        display.innerText = result;
        return;
    }

    if (operators.includes(lastChar)) {
        //check if we repeat the operator
        if (!values.includes(button)) {
            //if the button that we click isn't value that we want we replace it
            result = result.slice(0, -1) + button;
            display.innerText = result;
            return;
        }
    }

    result += button;
    display.innerText = result;
}
