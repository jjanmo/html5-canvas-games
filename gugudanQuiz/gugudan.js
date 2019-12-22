const readyContainer = document.querySelector(".readyContainer");
const startBtn = readyContainer.querySelector(".startBtn");

const inputForm = document.querySelector("#inputForm");
const input = inputForm.querySelector("input");

const btnContainer = document.querySelector(".btnContainer");
const nextBtn = btnContainer.querySelector(".nextBtn");
const quitBtn = btnContainer.querySelector(".quitBtn");

let answer;

function startGame() {
    startBtn.addEventListener("click", makeQuiz);
}

function inputNumber() {
    inputForm.addEventListener("submit", checkNumber);
}

function paintScore(win) {
    const right = document.querySelector("#right");
    const wrong = document.querySelector("#wrong");
    if (win) {
        let rightScore = Number(right.innerHTML);
        rightScore++;
        right.innerHTML = rightScore;
    } else {
        let wrongScore = Number(wrong.innerHTML);
        wrongScore++;
        wrong.innerHTML = wrongScore;
    }
}

function paintResult(win) {
    const result = document.querySelector("#result");
    result.innerHTML = win ? "맞았습니다." : "틀렸습니다.";
}

function checkNumber(e) {
    e.preventDefault();
    const inputValue = Number(input.value);
    let win = false;
    win = inputValue === answer ? true : false;
    paintScore(win);
    paintResult(win);
}

function startProgressbar() {}

function makeQuiz() {
    const firstNumber = document.querySelector("#firstNum");
    const secondNumber = document.querySelector("#secondNum");
    const number1 = Math.ceil(Math.random() * 9);
    const number2 = Math.ceil(Math.random() * 9);
    firstNumber.innerHTML = number1;
    secondNumber.innerHTML = number2;
    answer = number1 * number2;
    input.focus();
}

function init() {
    startGame();
    inputNumber();
}

init();
