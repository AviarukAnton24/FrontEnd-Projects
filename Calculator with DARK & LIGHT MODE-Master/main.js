// Функция для получения истории операций
function getHistory() {
    return document.getElementById('history-value').innerText;
}

// Функция для вывода истории операций
function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

// Функция для получения текущего вывода
function getOutput() {
    return document.getElementById("output-value").innerText;
}

// Функция для вывода текущего значения
function printOutput(num) {
    if (num === "") {
        document.getElementById("output-value").innerText = num;
    } else {
        document.getElementById("output-value").innerText = getFormattedNumber(num);
    }
}

// Функция для форматирования числа
function getFormattedNumber(num) {
    if (num === "-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

// Функция для обратного форматирования числа (удаление запятых)
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g, ''));
}

// Функция для обработки нажатий операторов
function handleOperatorClick(operator) {
    if (operator === "clear") {
        printHistory("");
        printOutput("");
    } else if (operator === "backspace") {
        var output = reverseNumberFormat(getOutput()).toString();
        if (output) {
            output = output.substr(0, output.length - 1);
            printOutput(output);
        }
    } else {
        var output = getOutput();
        var history = getHistory();
        if (output === "" && history !== "") {
            if (isNaN(history[history.length - 1])) {
                history = history.substr(0, history.length - 1);
            }
        }
        if (output !== "" || history !== "") {
            output = output === "" ? output : reverseNumberFormat(output);
            history = history + output;
            if (operator === "=") {
                var result = eval(history);
                printOutput(result);
                printHistory("");
            } else if (operator === "%") {
                var n = reverseNumberFormat(getOutput());
                var percent = n / 100;
                printOutput(percent.toFixed(4));
            } else {
                history = history + operator;
                printHistory(history);
                printOutput("");
            }
        }
    }
}

// Добавление обработчиков событий для кнопок операторов
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        handleOperatorClick(this.id);
    });
}

// Добавление обработчиков событий для кнопок чисел
var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        var output = reverseNumberFormat(getOutput());
        if (!isNaN(output)) {
            output = output + this.id;
            printOutput(output);
        }
    });
}

// Переключение между темной и светлой темами
let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

// Обработка ввода с клавиатуры
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        var output = reverseNumberFormat(getOutput());
        if (!isNaN(output)) {
            output = output + event.key;
            printOutput(output);
        }
    } else if (event.key === '+') {
        handleOperatorClick('+');
    } else if (event.key === '-') {
        handleOperatorClick('-');
    } else if (event.key === '*') {
        handleOperatorClick('*');
    } else if (event.key === '/') {
        handleOperatorClick('/');
    } else if (event.key === 'Enter' || event.key === '=') {
        handleOperatorClick('=');
    } else if (event.key === 'Backspace') {
        handleOperatorClick('backspace');
    } else if (event.key === 'Delete') {
        handleOperatorClick('clear');
    } else if (event.key === '%' && event.shiftKey) {
        handleOperatorClick('%');
    }
});
