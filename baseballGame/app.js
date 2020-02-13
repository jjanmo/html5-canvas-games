//score-board
const inputNumberTd = document.querySelectorAll('.inputNumber');
const scoreTd = document.querySelectorAll('.score');
//inning span
const inning = document.querySelector('#inning');
//input div(입력창)
const inputDivs = document.querySelectorAll('.input-div');
//buttons
const buttons = document.querySelector('.buttons');
//modal
const modal = document.querySelector('.modal');
let userNumbers = []; //클릭한 숫자 저장
let computerNumbers = []; //컴퓨터의 랜덤 숫자
let scoreArr = []; //스코어 및 (+ 해당 입력숫자) 저장
let tryCount = 1; //시도횟수 max 9
const NUMBER_COUNT = 3;

//컴퓨터의 랜덤 숫자 뽑기
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
                //숫자체크
                checkNumbers();
                //스코어보드에 표시
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

//숫자체크
function checkNumbers() {
    console.log(userNumbers);
    //숫자만 같으면 ball ; 숫자와 자리 같은면 strike
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
    console.log(strike, ball);
    const scoreObj = {
        inputNumber: userNumbers.join(''),
        strike,
        ball
    };
    scoreArr.push(scoreObj);
}

//스코어 입력
function paintScoreBoard() {
    let win = false;
    scoreArr.forEach((score, idx) => {
        inputNumberTd[idx].innerHTML = score.inputNumber;
        scoreTd[idx].innerHTML = score.strike === 0 && score.ball === 0 ? 'OUT' : `${score.strike}S ${score.ball}B`;
        if (score.strike === 3) win = true;
    });
    next(win);
}

/*
입력결과에 따른 반응
1) 답이 맞음 -> 모달창 + 축하메세지 -> 재시작
2) 답이 틀림 -> 시도회숫안 : 다음턴넘김 
             -> 시도횟수초과 : 모달창 + 실패 -> 재시작
*/

function next(win) {
    const result = document.querySelector('.result');
    if (win) {
        //승리 -> 모달창
        modal.classList.remove('hidden');
        result.innerHTML = `${tryCount}번 시도로 성공👍`;
    } else {
        if (tryCount < 9) {
            //시도횟수
            tryCount++;
            //userNumbers초기화
            userNumbers = [];
            //이닝증가
            inning.innerHTML = tryCount;
        } else {
            //실패 -> 모달창
            modal.classList.remove('hidden');
            result.innerHTML = '마지막 시도로 실패😥';
        }
    }
}

//클릭한 숫자 저장
function saveNumber(number) {
    if (userNumbers.length !== NUMBER_COUNT) {
        //같은 숫자 입력 방지
        const isExist = userNumbers.some(ele => ele === Number(number));
        isExist ? sendMessage('이미 사용한 숫자입니다.') : userNumbers.push(Number(number));
    } else {
        sendMessage('숫자를 모두 입력하셨습니다.');
    }
}

//저장한 숫자 표시
function paintNumbers() {
    //input div 초기화
    inputDivs.forEach(ele => (ele.innerHTML = ''));
    //페인팅
    userNumbers.forEach((number, idx) => {
        inputDivs[idx].innerHTML = number;
    });
}

//숫자 지우기
function deleteNumber() {
    userNumbers.pop();
}
//특정 메세지 보내기
function sendMessage(message) {
    const msgDiv = document.querySelector('.msg');
    msgDiv.innerHTML = message;
    setTimeout(function() {
        msgDiv.innerHTML = '';
    }, 1500);
}

//모달창 클릭시 새로시작
function restart() {
    modal.classList.add('hidden');
    inputNumberTd.forEach(ele => (ele.innerHTML = ''));
    scoreTd.forEach(ele => (ele.innerHTML = ''));
    //input 초기화
    userNumbers = [];
    //input창 초기화
    inputDivs.forEach(ele => (ele.innerHTML = ''));
    //랜덤숫자 다시 뽑기
    computerNumbers = [];
    setRandomNumbers();
    //score 초기화
    scoreArr = [];
    tryCount = 1;
    //inning초기화
    inning.innerHTML = tryCount;
}

function init() {
    setRandomNumbers();
    buttons.addEventListener('click', clickBtn);
    modal.addEventListener('click', restart);
}

init();
