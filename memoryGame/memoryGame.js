// const card = document.querySelector(".card");
// card.addEventListener("click", function (e) {
//     card.classList.toggle("isFliped");
// });

const startBtn = document.getElementById('js-start-button');
const cardBoard = document.getElementById('js-card-board');
let flipCount = 0;
let flippedCards = [];
let start = false;


let cardObjInArray = []; //card object를 담는 배열;
/*
card object
- posX
- posY
- isFlipped 
*/


function readyGame(cards) { //시작 전에 전체적으로 보여주는 단계
    cards.forEach((card, idx) =>
        setTimeout(() => {
            card.classList.add('isFlipped');
        }, 70 * idx)
    );
    cards.forEach((card) =>
        setTimeout(() => {
            card.classList.remove('isFlipped');
        }, 1700)
    );
}

function suffleCards(notShuffledCards) {
    const CARDS_LENGTH = 16;
    for (let i = 0; i < CARDS_LENGTH; i++) {
        cardObjInArray.push(notShuffledCards.splice(Math.floor(Math.random() * (16 - i)), 1)[0]);
        cardObjInArray[i].id = String(Date.now() * (i + 1)); //id부여
    }
    // console.log(cardObjInArray);
}

function copyCardDoubled(candidate) {
    const newCandidate = [];
    candidate.forEach(card => {
        const newCard = Object.assign({}, card);
        newCandidate.push(card);
        newCandidate.push(newCard);
    });
    return newCandidate;
}

function makeCardObject() {//parametr content에 따라서 들어가야 할 카드그림이 달라짐
    cardObjInArray = [];   //card object 배열 초기화
    //socialmedia icons 9개 -> basic 8개 뽑기
    const socialmediaCards = [
        { posId: '-20px -9px', isFlipped: false },
        { posId: '-20px -109px', isFlipped: false },
        { posId: '-20px -212px', isFlipped: false },
        { posId: '-125px -9px', isFlipped: false },
        { posId: '-125px -109px', isFlipped: false },
        { posId: '-125px -212px', isFlipped: false },
        { posId: '-230px -9px', isFlipped: false },
        { posId: '-230px -109px', isFlipped: false },
        { posId: '-230px -212px', isFlipped: false }
    ];
    let candidate = Array.from(socialmediaCards);
    candidate.splice(Math.floor(Math.random() * 9), 1); //9개 중에 8개 선택
    suffleCards(copyCardDoubled(candidate));            //16장 카드 만들기 -> 카드섞기
}


function checkFlippedCards() {
    // console.log(flippedCards);
    const firstCardObj = getCard(flippedCards[0]);
    const secondCardObj = getCard(flippedCards[1]);
    if (firstCardObj.posId === secondCardObj.posId) {
        flippedCards.forEach(cardId => {
            document.getElementById(`${cardId}`).removeEventListener('click', handleClick); //클릭 이벤트를 제거
        });
        //card obj state 변경
        firstCardObj.isFlipped = true;
        secondCardObj.isFlipped = true;
        if (checkGameEnd()) {
            alert("게임종료");
            //걸린 시간 체크
        }
    }
    else {
        //다시 뒤집어 줘야함
        flippedCards.forEach(cardId => {
            setTimeout(() => {
                document.getElementById(`${cardId}`).classList.remove('isFlipped'); //다시 뒤집기
            }, 800);
        })
    }
}

function getCard(id) {
    return cardObjInArray.filter(cardObj => cardObj.id === id)[0];
}


function checkGameEnd() {
    return cardObjInArray.every(cardObj => cardObj.isFlipped);
}

function handleClick(e) {
    const { currentTarget } = e;
    if (flipCount < 2 && !currentTarget.className.includes('isFlipped')) {
        flipCount++;
        currentTarget.classList.toggle('isFlipped');
        flippedCards.push(currentTarget.id);
        if (flipCount === 2) {
            checkFlippedCards();
            setTimeout(() => {
                //안전장치 : 틀린 경우 다시 뒤집어질 때 뒤집어지는 액션이 완료되기전에 클릭할 수 없도록!
                flipCount = 0;
                flippedCards = [];
            }, 900)
        }
    }
}

function paintBoard() {
    const fragment = new DocumentFragment();
    cardBoard.innerHTML = '';   //board초기화
    cardObjInArray.forEach(cardObj => {
        const scene = document.createElement('div');
        scene.classList.add('scene');
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = cardObj.id;
        scene.append(card);
        const front = document.createElement('div');
        front.classList.add('cardface', 'front');
        front.style.backgroundPosition = `${cardObj.posId}`;
        card.append(front);
        const back = document.createElement('div');
        back.classList.add('cardface', 'back');
        card.append(back);
        fragment.append(scene);
    });
    cardBoard.append(fragment);
    const cards = document.querySelectorAll('.card');
    return cards;
};

function handleGameStart(e) {
    makeCardObject();
    const cards = paintBoard();
    readyGame(cards);
    setTimeout(function () {
        cards.forEach(card => card.addEventListener('click', handleClick));
    }, 2000);
}

function init() {
    //default board
    startBtn.addEventListener('click', handleGameStart);
}


init();