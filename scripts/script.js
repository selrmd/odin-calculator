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
    let screen, 
        firstNumber = null, secondNumber = null, result,
        firstOperator, secondOperator;

    // \d*      matches first number
    // [+\-*\/] matches the 4 operators
    // \d*      matches second number
    // =        matches literal "="
    let equalReg = /\d*[+\-*\/]\d*=/;
    // \d*      matches first number
    // [+\-*\/] matches the 4 operators
    // \d*      matches second number
    // [+\-*\/] matches the 4 operators
    let oprReg = /\d*[+\-*\/]\d*[+\-*\/]/;

    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', e => {

            displayValue(e.target);

            screen = document.getElementById('screen-container').textContent.replace(/\s/g, '');

            if(equalReg.test(screen)){
                firstNumber = parseInt((/^\d*/).exec(screen).toString());
                firstOperator = (/\D/).exec(screen).toString();
                secondNumber = parseInt((/\d*.$/).exec(screen).toString());

                result = operate(firstOperator, firstNumber, secondNumber);

                document.getElementById('screen-container').innerText = result;
            }
            
            if(oprReg.test(screen)){
                firstNumber = parseInt((/^\d*/).exec(screen).toString());
                firstOperator = (/\D/).exec(screen).toString();
                secondNumber = parseInt((/\d*.$/).exec(screen).toString());
                secondOperator = (/.$/).exec(screen).toString();

                result = operate(firstOperator, firstNumber, secondNumber);
                document.getElementById('screen-container').innerText = result + '\xa0' + secondOperator + '\xa0';
            }

        });
    });

}

// display that value
function displayValue(button){
    let value = button.textContent;
    let screen = document.getElementById('screen-container');

    // prevent user from adding trailing zeros
    if(screen.textContent === '0'){
        screen.innerText = '';
        screen.innerText = value;
    // don't add space to numbers
    } else if((/\d/).test(value)){
        screen.innerText += value;
    // add spaces when user clicks an operator
    } else {
        screen.innerText += '\xa0' + value + '\xa0';
    }
}

// calculate the result
function calculate(numArr, oprArr){

    return numArr.reduce((result, nextNum, index) => 
        operate(oprArr[index - 1], result, nextNum));
        
}

calculator();