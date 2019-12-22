const readyContainer = document.querySelector(".readyContainer");
const startBtn = readyContainer.querySelector(".startBtn");

const inputForm = document.querySelector("#inputForm");
const input = inputForm.querySelector("input");

const btnContainer = document.querySelector(".btnContainer");
const nextBtn = btnContainer.querySelector(".nextBtn");
const quitBtn = btnContainer.querySelector(".quitBtn");

//score span
const right = document.querySelector("#right");
const wrong = document.querySelector("#wrong");
//result div
const result = document.querySelector("#result");
//progress bar
const bar = document.querySelector("#bar");

let answer;
let start = false;
let progressbarAction;

function quit() {
    reset(); //점수 및 결과 초기화용
    const before = document.querySelector(".before");
    const problem = document.querySelector(".problem");
    before.classList.remove("hide");
    problem.classList.add("hide");
    //progressbar 초기화
    clearInterval(progressbarAction);
    bar.style.width = "0%";
    start = false;
}

function reset() {
    //다시 시작할 때 필요(점수 및 결과 초기화)
    right.innerHTML = 0;
    wrong.innerHTML = 0;
    result.innerHTML = "";
}

function paintScore(win) {
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
    result.innerHTML = win ? "맞았습니다." : "틀렸습니다.";
    if (win) {
        result.classList.add("rightColor");
        result.classList.remove("wrongColor");
    } else {
        result.classList.add("wrongColor");
        result.classList.remove("rightColor");
    }
}

function checkNumber(e) {
    e.preventDefault();
    //game start 전에 입력방지
    if (!start) {
        input.value = "";
        return;
    }

    const inputValue = Number(input.value);
    //숫자외의 입력값 방지
    if (isNaN(inputValue)) {
        input.value = "";
        return;
    }
    input.value = "";
    let win = false;
    win = inputValue === answer ? true : false;
    paintScore(win);
    paintResult(win);
    clearInterval(progressbarAction);
    nextBtn.click();
}

function startProgressbar() {
    let width = 0; //progressbar scalewidth
    progressbarAction = setInterval(function() {
        if (width >= 100) {
            clearInterval(progressbarAction);
            paintResult(false);
            paintScore(false);
            nextBtn.click();
        } else {
            width++;
            bar.style.width = `${width}%`;
        }
    }, 100);
}

function makeQuiz(e) {
    clearInterval(progressbarAction);
    const targetName = e.target.className;
    // console.log(targetName);
    checkNext(targetName);
    if (!start) return;
    const before = document.querySelector(".before");
    const problem = document.querySelector(".problem");
    before.classList.add("hide");
    problem.classList.remove("hide");
    const firstNumber = document.querySelector("#firstNum");
    const secondNumber = document.querySelector("#secondNum");
    const number1 = Math.ceil(Math.random() * 9);
    const number2 = Math.ceil(Math.random() * 9);
    firstNumber.innerHTML = number1;
    secondNumber.innerHTML = number2;
    answer = number1 * number2;
    startProgressbar();
    input.focus();
}

function checkNext(targetName) {
    //start하기전에 next를 누르는것 방지 : 처음시작을 체크
    if (!start) {
        start = targetName.includes("startBtn") ? true : false;
    } else {
        //중간에 start button을 누르는 경우
        if (targetName.includes("startBtn")) reset();
    }
}

function startGame() {
    startBtn.addEventListener("click", makeQuiz);
}

function nextGame() {
    nextBtn.addEventListener("click", makeQuiz);
}

function quitGame() {
    quitBtn.addEventListener("click", quit);
}

function inputNumber() {
    inputForm.addEventListener("submit", checkNumber);
}

function init() {
    startGame();
    inputNumber();
    nextGame();
    quitGame();
}

init();
