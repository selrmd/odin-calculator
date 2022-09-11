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
            return 'ERROR';
    }
}

function calculator(){
    let operation = {
        inputValue: '',
        firstNumber: null,
        secondNumber: null,
        firstOperation: null,
        secondOperation: null,
        result: null,
    };

    document.getElementById('buttons-container').addEventListener('click', e => {
        operation.inputValue += e.target.textContent;

        displayOperation(operation.inputValue, operation);

        console.log(`operation: 1st: ${operation.firstNumber}||${operation.firstOperation}, 2nd:${operation.secondNumber}||${operation.secondOperation}`);

    });
}

function displayOperation(inputValue, operation){
    // match first number pattern
    // only digits
    if(/^\d+\.?\d*$/.test(inputValue)){

        // parseFloat will remove any leading zeros
        operation.firstNumber = parseFloat(inputValue);

        // display first number
        document.getElementById('result').innerText = operation.firstNumber;

    } // match first operation pattern
      // digits followed by a symbol
    else if(/^\d+\.?\d*[\+\-\*\/]$/.test(inputValue)){

        // store first operator
        operation.firstOperation = inputValue.charAt(inputValue.length - 1);

        // display the operation in the upper portion of display
        document.getElementById('operation').innerText = `${operation.firstNumber} ${operation.firstOperation}`;

    } // match second number pattern
      // a symbol followed by a number only (no symbols)
    else if(/[\+\-\*\/]*[^\+\-\*\/=]$/.test(inputValue)){

        // remove the first number and first
        // operation from received input
        inputValue = inputValue.replace(/^\d+\.?\d*[\+\-\*\/]/, '');

        // parseFloat removes any leading zeros
        operation.secondNumber = parseFloat(inputValue);

        // display the second number at the bottom portion of display
        document.getElementById('result').innerText = operation.secondNumber;

    } // match the full pattern of operation
    else if(inputValue.match(/^\d+\.?\d*[\+\-\*\/]{1}\d+\.?\d*[\+\-\*\/\=]{1}$/)){

        // get the final operation, either '=' or the other 4 operations
        operation.secondOperation = inputValue.charAt(inputValue.length - 1);

        // calculate and display the result
        displayResult(operation);

    } else {
        //clearDisplay();
    }

    console.log(`here's what's going on: ${inputValue}`);
}

// display the result
// this has two possibilities
// either user clicked '=' or other 4 operators
function displayResult(operation){

    // calculate the result
    operation.result = operate(operation.firstOperation, operation.firstNumber, operation.secondNumber);

    if(operation.secondOperation === '='){
        // display full pattern in upper display, ex: 12+25=
        document.getElementById('operation').innerText = `${operation.firstNumber} ${operation.firstOperation} ${operation.secondNumber} ${operation.secondOperation}`;
        
        // display the result in bottom display, ex: 37
        document.getElementById('result').innerText = operation.result;
        
        // use previous result as first operand
        operation.firstNumber = operation.result;
        
        // update inputValue pattern to jump directly to 
        // the 2nd else-if in displayOperation() to get 2nd operator
        operation.inputValue = operation.result;
        
    } else {
        // display the result of the operation plus the second operator
        document.getElementById('operation').innerText = `${operation.result} ${operation.secondOperation}`;

        // swap firstOperation with the second
        operation.firstOperation = operation.secondOperation;

        // use previous result as first operand
        operation.firstNumber = operation.result;

        // update inputValue pattern to jump directly to 2nd else-if
        // in displayOperation() to get 2nd number
        operation.inputValue = operation.firstNumber + operation.secondOperation;
    }
}

function clearDisplay(){
    document.getElementById('operation').innerText = '';
    document.getElementById('result').innerText = '0';

    for(key in operation){
        key = null;
    }
}

calculator();