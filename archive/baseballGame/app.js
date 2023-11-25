const inputNumberTd = document.querySelectorAll('.inputNumber');
const scoreTd = document.querySelectorAll('.score');
const inning = document.querySelector('#inning');
const inputDivs = document.querySelectorAll('.input-div');
const buttons = document.querySelector('.buttons');
const modal = document.querySelector('.modal');
let userNumbers = [];
let computerNumbers = [];
let scoreArr = [];
let tryCount = 1;
const NUMBER_COUNT = 3;

function setRandomNumbers() {
    let candidateArr = Array.from({ length: 10 }, (x, i) => i);
    for (let i = 0; i < NUMBER_COUNT; i++) {
        const tmp = candidateArr.splice(Math.floor(Math.random() * (10 - i)), 1);
        computerNumbers.push(tmp[0]);
    }
    console.log(computerNumbers);
}

function clickBtn(e) {
    const target = e.target.id;
    if (target) {
        if (target === 'hit') {
            if (userNumbers.length < NUMBER_COUNT) {
                sendMessage(`${NUMBER_COUNT}자리를 모두 입력하세요`);
                return;
            } else {
                checkNumbers();
                paintScoreBoard();
            }
        } else if (target === 'backspace') {
            deleteNumber();
        } else {
            saveNumber(target);
        }
    }
    paintNumbers();
}

function checkNumbers() {
    let strike = 0,
        ball = 0;
    for (let ui = 0; ui < userNumbers.length; ui++) {
        for (let ci = 0; ci < computerNumbers.length; ci++) {
            if (userNumbers[ui] === computerNumbers[ci] && ui === ci) {
                strike++;
            } else if (userNumbers[ui] === computerNumbers[ci]) {
                ball++;
            }
        }
    }
    const scoreObj = {
        inputNumber: userNumbers.join(''),
        strike,
        ball,
    };
    scoreArr.push(scoreObj);
}

function paintScoreBoard() {
    let win = false;
    scoreArr.forEach((score, idx) => {
        inputNumberTd[idx].innerHTML = score.inputNumber;
        scoreTd[idx].innerHTML = score.strike === 0 && score.ball === 0 ? 'OUT' : `${score.strike}S ${score.ball}B`;
        if (score.strike === 3) win = true;
    });
    next(win);
}

function next(win) {
    const result = document.querySelector('.result');
    if (win) {
        modal.classList.remove('hidden');
        result.innerHTML = `${tryCount}번 시도로 성공👍`;
    } else {
        if (tryCount < 9) {
            tryCount++;
            userNumbers = [];
            inning.innerHTML = tryCount;
        } else {
            modal.classList.remove('hidden');
            result.innerHTML = '마지막 시도로 실패😥';
        }
    }
}

function saveNumber(number) {
    if (userNumbers.length !== NUMBER_COUNT) {
        const isExist = userNumbers.some((ele) => ele === Number(number));
        isExist ? sendMessage('이미 사용한 숫자입니다.') : userNumbers.push(Number(number));
    } else {
        sendMessage('숫자를 모두 입력하셨습니다.');
    }
}

function paintNumbers() {
    inputDivs.forEach((ele) => (ele.innerHTML = ''));
    userNumbers.forEach((number, idx) => {
        inputDivs[idx].innerHTML = number;
    });
}

function deleteNumber() {
    userNumbers.pop();
}

function sendMessage(message) {
    const msgDiv = document.querySelector('.msg');
    msgDiv.innerHTML = message;
    setTimeout(function () {
        msgDiv.innerHTML = '';
    }, 1500);
}

function restart() {
    modal.classList.add('hidden');
    inputNumberTd.forEach((ele) => (ele.innerHTML = ''));
    scoreTd.forEach((ele) => (ele.innerHTML = ''));
    userNumbers = [];
    inputDivs.forEach((ele) => (ele.innerHTML = ''));
    computerNumbers = [];
    setRandomNumbers();
    scoreArr = [];
    tryCount = 1;
    inning.innerHTML = tryCount;
}

function init() {
    setRandomNumbers();
    buttons.addEventListener('click', clickBtn);
    modal.addEventListener('click', restart);
}

init();
