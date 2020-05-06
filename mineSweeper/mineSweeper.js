const difficultySpans = document.querySelectorAll('.difficulty');
const board = document.getElementById('js-board');


const blockObjs = [];

/*
-
- isMine : boolean
- 

*/

//difficulty
function handleSelectDifficulty(e) {
    const difficulty = e.target;
    // console.log(difficulty);
    difficultySpans.forEach(ele => ele.classList.remove('selected'));
    difficulty.classList.add('selected');
}








//화면과 데이터의 일치





function init() {
    difficultySpans.forEach(ele => ele.addEventListener('click', handleSelectDifficulty))

}


init();