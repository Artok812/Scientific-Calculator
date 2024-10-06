var display = document.getElementById("screen");
var buttons = document.getElementsByClassName("button");

Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
        if (button.textContent !== "log" && 
            button.textContent !== "^" && 
            button.textContent !== "!" && 
            button.textContent !== "rem" && 
            button.textContent !== "C" && 
            button.textContent !== "←" && 
            button.textContent !== "=" && 
            button.textContent !== "+" && 
            button.textContent !== "-" && 
            button.textContent !== "x" && 
            button.textContent !== "÷") {
            display.value += button.textContent;
        } else if (button.textContent === "=") {
            equals();
        } else if (button.textContent === "C") {
            clear();
        } else if (button.textContent === "x") {
            multiply();
        } else if (button.textContent === "÷") {
            divide();
        } else if (button.textContent === "←") {
            backspace();
        } else if (button.textContent === "log") {
            log();
        } else if (button.textContent === "^") {
            exponent();
        } else if (button.textContent === "!") {
            factorial();
        } else if (button.textContent === "rem") {
            remainder();
        } else if (button.textContent === "+") {
            add();
        } else if (button.textContent === "-") {
            subtract();
        }
    });
});

function syntaxError() {
    try {
        eval(display.value);  // Try evaluating the expression
    } catch (error) {
        display.value = "Syntax Error";
    }
}

function equals() {
    if (display.value.indexOf("^") > -1) {
        var base = display.value.slice(0, display.value.indexOf("^"));
        var exponent = display.value.slice(display.value.indexOf("^") + 1);
        display.value = Math.pow(parseFloat(base), parseFloat(exponent));
    } else {
        display.value = eval(display.value);
        syntaxError();
    }
}

function clear() {
    display.value = "";
}

function backspace() {
    display.value = display.value.substring(0, display.value.length - 1);
}

function add() {
    display.value += "+";
}

function subtract() {
    display.value += "-";
}

function multiply() {
    display.value += "*";
}

function divide() {
    display.value +=  "/";
}

function factorial() {
    var number = 1;
    var inputValue = parseInt(display.value);
    if (isNaN(inputValue)) {
        display.value = "Invalid input for factorial";
        return;
    }

    if (inputValue < 0) {
        display.value = "Factorial is not defined for negative numbers";
        return;
    }

    for (var i = inputValue; i > 0; i--) {
        number *=  i;
    }
    display.value = number;
}

function log() {
    display.value = Math.log10(parseFloat(display.value));
}

function exponent() {
    display.value += "^";
}

function remainder() {
    display.value += "%"; 
    var expression = display.value;
    var parts = expression.split('%');

    if (parts.length !== 2) {
        return "Invalid expression format";
    }

    var dividend = parseFloat(parts[0]);
    var divisor = parseFloat(parts[1]);

    if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
        return "Invalid dividend or divisor";
    }

    var remainderValue = dividend % divisor;
    display.value = remainderValue;
}