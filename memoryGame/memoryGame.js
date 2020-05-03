// const card = document.querySelector(".card");
// card.addEventListener("click", function (e) {
//     card.classList.toggle("isFliped");
// });

// const cards = document.querySelectorAll('.card');
const cardBoard = document.getElementById('js-card-board');
const cardObjInArray = []; //card object를 담는 배열;
/*
card object
- posX
- posY
- isFlipped 
*/



function suffleCards(candidate) {
    const CARDS_LENGTH = 16;
    for (let i = 0; i < CARDS_LENGTH; i++) {
        cardObjInArray.push(candidate.splice(Math.floor(Math.random() * (16 - i)), 1)[0]);
    }
    // console.log(cardObjInArray);
}


function makeCardObject() {//parametr content에 따라서 들어가야할 카드그림이 달라짐
    //socialmedia icons 9개 -> basic 8개 뽑기
    const socialmediaCards = [
        { x: '-20px', y: '-9px', isFlipped: false },
        { x: '-20px', y: '-109px', isFlipped: false },
        { x: '-20px', y: '-212px', isFlipped: false },
        { x: '-125px', y: '-9px', isFlipped: false },
        { x: '-125px', y: '-109px', isFlipped: false },
        { x: '-125px', y: '-212px', isFlipped: false },
        { x: '-230px', y: '-9px', isFlipped: false },
        { x: '-230px', y: '-109px', isFlipped: false },
        { x: '-230px', y: '-212px', isFlipped: false }
    ];
    let candidate = Array.from(socialmediaCards);
    candidate.splice(Math.floor(Math.random() * 9), 1); //9개 중에 8개 선택
    candidate = candidate.concat(candidate);            //16개 카드 생성
    suffleCards(candidate);
    // console.log(socialmediaCards, candidate);
    paintBoard();
}


function handleClick(e) {
    console.log('click');
    const { currentTarget } = e;
    console.log(currentTarget);
    currentTarget.classList.toggle('isFlipped');
}


function paintBoard() {
    const fragment = new DocumentFragment();
    cardBoard.innerHTML = '';   //board초기화
    cardObjInArray.forEach(cardObj => {
        const scene = document.createElement('div');
        scene.classList.add('scene');
        const card = document.createElement('div');
        card.addEventListener('click', handleClick);
        card.classList.add('card');
        scene.append(card);
        const front = document.createElement('div');
        front.classList.add('cardface', 'front');
        console.log(`${cardObj.x}px ${cardObj.y}px`);
        front.style.backgroundPosition = `${cardObj.x} ${cardObj.y}`;
        card.append(front);
        const back = document.createElement('div');
        back.classList.add('cardface', 'back');
        card.append(back);
        fragment.append(scene);
    });
    cardBoard.append(fragment);
};

function init() {
    makeCardObject();
}


init();