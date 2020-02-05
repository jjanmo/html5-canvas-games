const rps = document.querySelectorAll('.icon');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const buttonContainer = document.querySelector('.button-container');
const restartBtn = document.querySelector('.restart-button');
const startFlag = false;

//game start : click button
function choseRps() {
    rps.forEach(ele => ele.addEventListener('click', userRps));
}

//chose computer rps
function getCompRps() {
    const comp = Math.floor(Math.random() * 3 + 1);
    return comp;
}


//compare comp and user
function compare(user, comp) {
    if (user == comp) return 'draw';
    else if (user == 1 && comp === 3 || user == 3 && comp === 1) {
        return user > comp ? 'comp' : 'user';
    }
    else {
        return user > comp ? 'user' : 'comp';
    }
}


function changeScore(result) {
    const userScoreSpan = document.querySelector('#user-score');
    const computerScoreSpan = document.querySelector('#computer-score');
    let userScore = Number(userScoreSpan.textContent);
    let computerScore = Number(computerScoreSpan.textContent);
    if (result === 'user') {
        userScore++;
        userScoreSpan.textContent = userScore;
    }
    else if (result === 'comp') {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
    }
}


function displayModal(compNum, result) {//compNum : 숫자 / result : 문자열
    const h2 = modalContent.querySelector('h2');
    const icon = modalContent.querySelector('i');
    const p = modalContent.querySelector('p');

    //모달창 열기
    modal.classList.remove('hidden');

    //메세지변경
    if (result === 'draw') {
        h2.innerHTML = '비겼습니다😐';
    }
    else if (result === 'user') {
        h2.innerHTML = '당신이 이겼습니닷😎';
    }
    else {
        h2.innerHTML = '당신이 졌습니다.😥';
    }

    //아이콘변경  및 컴퓨터 선택결과표시
    switch (compNum) {
        case 1:
            icon.className = 'fas fa-hand-scissors fa-5x';
            p.innerHTML = '컴퓨터는 가위';
            break;
        case 2:
            icon.className = 'fas fa-hand-rock fa-5x';
            p.innerHTML = '컴퓨터는 바위';
            break;
        case 3:
            icon.className = 'fas fa-hand-paper fa-5x';
            p.innerHTML = '컴퓨터는 보';
            break;
    }
}


function userRps(e) {
    const chose = e.target.id;
    console.log(chose);
    let userNum = 0;
    switch (chose) {
        case 'scissors':
            userNum = 1;
            break;
        case 'rock':
            userNum = 2;
            break;
        case 'paper':
            userNum = 3;
            break;
    }

    //컴퓨터의 가위바위보 선택 결과
    const compNum = getCompRps();

    //비교
    const result = compare(userNum, compNum);

    //결과출력
    //1) 점수바꾸고  / 2) 모달창 띄우기
    changeScore(result);
    displayModal(compNum, result);
}

//다시 시작하기 초기화
function restart() {
    const userScoreSpan = document.querySelector('#user-score');
    const computerScoreSpan = document.querySelector('#computer-score');
    userScoreSpan.innerHTML = 0;
    computerScoreSpan.innerHTML = 0;
}

function closeModal() {
    modal.classList.add('hidden');
    if (!startFlag) {
        buttonContainer.classList.remove('hidden');
        startFlag = true;
    }
}


function init() {
    choseRps();
    modal.addEventListener('click', closeModal);
    restartBtn.addEventListener('click', restart);
}

init();