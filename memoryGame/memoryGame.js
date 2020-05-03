// const card = document.querySelector(".card");
// card.addEventListener("click", function (e) {
//     card.classList.toggle("isFliped");
// });

const cards = []; //card object를 담는 배열;
/*
card object
- posX
- posY
- isFlipped 
*/



function suffleCards(candidate) {
    const CARDS_LENGTH = 16;
    for (let i = 0; i < CARDS_LENGTH; i++) {
        cards.push(candidate.splice(Math.floor(Math.random() * (16 - i)), 1)[0]);
    }
    // console.log(cards);
}


function makeCardObject() {//parametr content에 따라서 들어가야할 카드그림이 달라짐
    //socialmedia icons 9개 -> basic 8개 뽑기
    const socialmediaCards = [
        { x: '-20px', y: '-9px', isFlipped: false },
        { x: '-20px', y: '-109px', isFlipped: false },
        { x: '-20px', y: '-209px', isFlipped: false },
        { x: '-125px', y: '-9px', isFlipped: false },
        { x: '-125px', y: '-109px', isFlipped: false },
        { x: '-125px', y: '-209px', isFlipped: false },
        { x: '-230px', y: '-9px', isFlipped: false },
        { x: '-230px', y: '-109px', isFlipped: false },
        { x: '-230px', y: '-209px', isFlipped: false }
    ];
    let candidate = Array.from(socialmediaCards);
    candidate.splice(Math.floor(Math.random() * 9), 1); //9개 중에 8개 선택
    candidate = candidate.concat(candidate);            //16개 카드 생성
    suffleCards(candidate);
    // console.log(socialmediaCards, candidate);
}


function paintBoard() {




}


function makeBoard() { //parameter difficulty에 따라서 보드생성이 달라짐

}






function init() {
    makeCardObject();
}


init();