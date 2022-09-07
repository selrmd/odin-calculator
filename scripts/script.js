function add(a, b){
    a = Number(a);
    b = Number(b);

    if(Number.isNaN(a) || Number.isNaN(b))
        return 'ERROR';

    return a + b;
}

function subtract(a, b){
    a = Number(a);
    b = Number(b);

    if(Number.isNaN(a) || Number.isNaN(b))
        return 'ERROR';

    return a - b;
}

function multiply(a, b){
    a = Number(a);
    b = Number(b);

    if(Number.isNaN(a) || Number.isNaN(b))
        return 'ERROR';

    return a * b;
}

function divide(a, b){
    a = Number(a);
    b = Number(b);

    if(Number.isNaN(a) || Number.isNaN(b))
        return 'ERROR';
    else {
        if(b === 0){
            return 'ERROR';
        }

        return a / b;
    }
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default:
            console.log('something went wrong');
    }
}

// let firstNumber = 0, secondNumber = 0, result = 0, operator = '';
// get value from button
// document.querySelectorAll('button').forEach(button => 
//     button.addEventListener('click', e => {
//         if(e.target.className === 'digit' && operator === ''){
//             console.log(`first number, and operator: ${operator}`);
//             displayValue(e.target);
//             firstNumber = document.getElementById('screen-container').textContent;
//             console.log('getting first number');
//         } else if (e.target.className === 'clear') {
//             document.getElementById('screen-container').innerText = '0';
//             firstNumber = 0;
//             secondNumber = 0;
//             operator = '';
//             console.log('clear everything');
//         } else if(e.target.className === 'digit' && operator !== '') {
//             displayValue(e.target);
//             secondNumber = document.getElementById('screen-container').textContent;
//             console.log('getting second number');
//         } else if(e.target.id === 'equal'){
//             result = operate(operator, firstNumber, secondNumber);
//             console.log(`first ${firstNumber}, scnd ${secondNumber}, oprt ${operator}, result: ${result}`);
//             document.getElementById('screen-container').innerText = result;
//             console.log('getting result');
//         } else {
//             operator = e.target.innerText;
//             console.log(`getting operator: ${operator}`);
//             document.getElementById('screen-container').innerText = '0';
//         }

//         console.log(firstNumber);
//         console.log(secondNumber);
//     }));
      

// getting the number from display isn't a good solution
// let's try an array
let numArray = [], oprtArray = [], inputValue = '';

document.querySelectorAll('button').forEach(button => 
    button.addEventListener('click', e => {

        if(e.target.className === 'digit'){
            inputValue += e.target.textContent;
        } else if (e.target.className === 'operator') {
            numArray.push(Number(inputValue));
            oprtArray.push(e.target.textContent);
            inputValue = '';
        }

        displayValue(e.target);

        console.log(`inputValue is ${inputValue}`);
        console.log(`numArray is: ${numArray}`);
        console.log(`oprtArray is: ${oprtArray}`);

    }));

// display that value
function displayValue(button){
    let value = button.textContent;
    let screen = document.getElementById('screen-container');

    if(screen.textContent === '0'){
        screen.innerText = '';
        screen.innerText = value;
    } else {
        screen.innerText += value;
    }
}