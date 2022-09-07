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
            add(a,b);
            break;
        
        case '-':
            subtract(a,b);
            break;

        case '*':
            multiply(a,b);
            break;

        case '/':
            divide(a,b);
            break;

        default:
            console.log('something went wrong');
    }
}

// get value from button
document.querySelectorAll('.digit').forEach(button => 
    button.addEventListener('click', e => {
        displayValue(e.target);

        let value = document.getElementById('screen-container').textContent;
        console.log(value);
    }));
      
// display that value
function displayValue(button){
    let value = button.textContent;
    let screen = document.getElementById('screen-container');

    if(screen.textContent === ''){
        screen.innerText = value;
    } else {
        screen.innerText += value;
    }
}