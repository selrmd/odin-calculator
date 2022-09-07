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

// decide which function to use
// based on the operator
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

// store the operands and operators in an array
// then loop through it to get the final result
function calculator(){
    let numArray = [], oprtArray = [];
    let inputValue = '', result = 0, operator = '';

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', e => {

            // get the number part of the operation
            if(e.target.className === 'digit'){
                // new operation that doesn't use
                // previous result
                if(operator === '='){
                    inputValue = '';
                    operator = '';
                    document.getElementById('screen-container').innerText = '';
                }
                // store the user input for digit
                // to get the number
                inputValue += e.target.textContent;
                // display the input dynamically
                displayValue(e.target);

            } // store the first number,get the operator
              // AND get the second input
            else if (e.target.className === 'operator') {
                // store the first number in an array
                numArray.push(Number(inputValue));
                // store the first operator in an array
                operator = e.target.textContent;
                oprtArray.push(operator);
                // reset the temp string to get the new number
                inputValue = '';
                // keep displaying the rest of operation
                displayValue(e.target);

            } // calculate and display the result of operation
            else if(e.target.className === 'equal') {
                // store the second number
                numArray.push(Number(inputValue));
                // get the result and display it
                result = calculate(numArray, oprtArray);
                document.getElementById('screen-container').innerText = result;

                // reset the previous arrays
                // to get new operations
                numArray = [], oprtArray = [];
                operator = '=';
                // new input is the result of previous operation
                // if the user wishes to continue the current operation
                inputValue = result;

            } // clear everything when pressing "Clear"
            else if(e.target.className === 'clear'){
                inputValue = '';
                numArray = [], oprtArray = [];
                document.getElementById('screen-container').innerText = 0;
            }

        })
    });
}

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

// calculate the result
function calculate(numArr, oprArr){

    return numArr.reduce((result, nextNum, index) => 
        operate(oprArr[index - 1], result, nextNum));
        
}

calculator();