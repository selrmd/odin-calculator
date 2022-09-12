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

// Handle every exception the user can do
// outside of using the calculator normally
// like clicking an operator multiple times
function calculator(){
    let operation = {
        inputValue: '',
        firstNumber: null,
        secondNumber: null,
        firstOperation: null,
        secondOperation: null,
        result: null,
    };

    // listen to each button on calculator
    document.querySelectorAll('button').forEach(button =>{
        button.addEventListener('click', e => {

            // when the input is a digit
            if(e.target.className === 'digit' && e.target.id !== 'decimal'){
                // verify if the current input hasn't an equal sign
                if(operation.inputValue.endsWith('=')){
                    // user has pressed a number after pressing '='
                    // start a new operation
                    operation.inputValue = '';
                    operation.inputValue += e.target.textContent;
                } 
                // if not, continue getting the user's input
                else {
                    operation.inputValue += e.target.textContent;
                }

            // when the input as an operator
            } else if(e.target.className === 'operator'){
                // get unsanitized input first
                operation.inputValue += e.target.textContent;
    
                // only register the final operator clicked by the user
                // remove any redundant operator
                if(/\d+\.?\d*[\+\-\*\/\=]{2,}/g.test(operation.inputValue)){
                    operation.inputValue = operation.inputValue.replace(/[\+\-\*\/\=]/g, '') + e.target.textContent;
                }

            // when the user click the '=' sign
            } else if(e.target.id === 'equal'){
                // get unsanitized input first
                operation.inputValue += e.target.textContent;

                // replace any previous operator by '=' sign
                operation.inputValue = operation.inputValue.replace(/[\+\-\*\/\=\.]+$/, '=');
            }
            // when the user click a decimal point
            else if(e.target.id === 'decimal'){
                // get unsanitized input first
                operation.inputValue += e.target.textContent;

                // replace first redundant decimal point
                operation.inputValue = operation.inputValue.replace(/\.{2,}/, '.');
                
                // if user click a decimal point again, delete it from input
                if(/\d+\.{1}\d+\.+/.test(operation.inputValue)){
                    operation.inputValue = operation.inputValue.replace(/[\.]+$/, '');
                }

                // if user click a decimal after clicking '=', delete decimal point
                if(/.*\=\./.test(operation.inputValue)){
                    operation.inputValue = operation.inputValue.replace(/[.]+$/, '');
                }
                
            // if user delete some digits
            } else if(e.target.className === 'delete'){
                // (length - 1) to not include 0 or user need to click twice to delete last digit
                if(operation.inputValue.length - 1){
                    operation.inputValue = operation.inputValue.substring(0, operation.inputValue.length - 1);
                } else {
                    operation.inputValue = '0';
                }

            // if user wants to reset the whole calculator
            } else if(e.target.className === 'clear'){
                clearDisplay(operation);
            }
            
            // using inputValue property directly won't work
            // had to pass it as a string argument instead
            displayOperation(operation.inputValue, operation, e);
        });
    });
}

// Use regular expressions to get the operands and operators 
function displayOperation(inputValue, operation, e){

    // match first number pattern
    // only digits
    if(/^\d+\.?\d*$/.test(inputValue)){

        // parseFloat will remove any leading zeros
        operation.firstNumber = parseFloat(inputValue);

        // display first number
        document.getElementById('result').innerText = operation.firstNumber;

    }
    // match first operation pattern
    // digits followed by a symbol
    else if(/^\d+\.?\d*[\+\-\*\/]$/.test(inputValue)){

        // store first operator
        operation.firstOperation = inputValue.charAt(inputValue.length - 1);

        // display the operation in the upper portion of display
        document.getElementById('operation').innerText = `${operation.firstNumber} ${operation.firstOperation}`;
    }
    // match second number pattern
    // a symbol followed by a number only (no symbols)
    else if(/[\+\-\*\/]*[^\+\-\*\/=]$/.test(inputValue)){

        // remove the first number and first
        // operation from received input
        inputValue = inputValue.replace(/^\d+\.?\d*[\+\-\*\/]+/, '');

        // parseFloat removes any leading zeros
        operation.secondNumber = parseFloat(inputValue);

        // display the second number at the bottom portion of display
        document.getElementById('result').innerText = operation.secondNumber;

    }
    // match the exact full pattern of an operation, ex: 50-20= or 12-2*
    else if(inputValue.match(/^\d+\.?\d*[\+\-\*\/]{1}\d+\.?\d*[\+\-\*\/\=]{1}$/)){

        // get the final operation, either '=' or the other 4 operations
        operation.secondOperation = inputValue.charAt(inputValue.length - 1);

        // calculate and display the result
        displayResult(operation);
    }

    console.log(`current input: ${inputValue}`);
}

// handle the calculation and display the result
// this has two possibilities: either user clicked '=' or other 4 operators
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
        // add '=' to reinitialize inputValue in 1st if of setOperands()
        operation.inputValue = operation.result + '=';
        
    } else {
        // display the result of the operation plus the second operator
        document.getElementById('operation').innerText = `${operation.result} ${operation.secondOperation}`;

        // display the result in bottom display, ex: 37
        document.getElementById('result').innerText = operation.result;

        // swap firstOperation with the second
        operation.firstOperation = operation.secondOperation;

        // use previous result as first operand
        operation.firstNumber = operation.result;

        // update inputValue pattern to jump directly to 2nd else-if
        // in displayOperation() to get 2nd number
        operation.inputValue = operation.firstNumber + operation.secondOperation;
    }
}

// delete and reset everything
function clearDisplay(operation){
    // clear display
    document.getElementById('operation').innerText = '';
    document.getElementById('result').innerText = '0';

    // reset all keys in operation
    for(const key in operation){
        operation[key] = null;
    }

    // reset the input string
    operation.inputValue = '';
}

calculator();