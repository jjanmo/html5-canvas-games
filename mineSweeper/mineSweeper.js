const difficultySpans = document.querySelectorAll('.difficulty');
const board = document.getElementById('js-board');

let blockObjs = [];     //block obj를 담음 array : 블럭 데이터정보 
let blocks;             //blocks array : 데이터에 따른 화면변경을 위한 것
let isStarted = false;
let totalMine = 0;

// 블록만들기
// 지뢰 놓기 - 지뢰 입력
// 블록주위의 지뢰개수


//초기화
function restartInit() {

}

//difficulty
function handleSelectDifficulty(e) {
    const difficulty = e.target;
    difficultySpans.forEach(ele => ele.classList.remove('selected'));
    difficulty.classList.add('selected');
    paintBlocks(difficulty.textContent);
}

//block
function paintBlocks(difficulty) {
    let fragment;
    switch (difficulty) {
        case 'basic': //10 * 10 지뢰 10개
            fragment = makeBlocks(10);
            totalMine = 10;
            break;
        case 'intermediate': // 15 * 15 지뢰 25개
            fragment = makeBlocks(15);
            totalMine = 25;

            break;
        case 'advanced': //25 * 25 지뢰 50개
            fragment = makeBlocks(25);
            totalMine = 50;
            break;
        default: //custom
            break;
    }
    board.className = ''
    board.classList.add('board', `${difficulty}`);
    board.innerHTML = '';
    board.append(fragment);
    blocks = getBlocks();
}

function makeBlocks(length) {
    blockObjs = [];
    const fragment = new DocumentFragment();
    for (let i = 0; i < length * length; i++) {
        const div = document.createElement('div');
        div.classList.add('block', 'not-clicked');
        div.id = (Date.now() * (i + 1)).toString();
        setBlockObj(div.id);
        fragment.append(div);
    }
    return fragment;
}

function getBlocks() {
    const blocks = document.querySelectorAll('.block');
    return Array.from(blocks);
}


//게임 관련 object 생성

function setBlockObj(id) {
    const blockObj = {
        id: id,
        isFlagged: false,
        getMine: false,
    };
    blockObjs.push(blockObj);
}

function setMine(totalMine, firstClickedId) {
    //mine을 몇개 만들것인가 결정 : mine숫자 -> 난이도에 따라 달라짐
    //첫번째 클릭이 끝난 후 배치 해야함 : 첫번째 클릭칸을 제외
    const TOTAL_BLOCK = blocks.length;
    let mineCount = 0;
    const tmpSelArr = [];
    while (mineCount < totalMine) {
        const selIndex = Math.floor(Math.random() * TOTAL_BLOCK);
        if (blockObjs[selIndex].id === firstClickedId) continue;  //첫번째 클릭 칸 제외
        if (!tmpSelArr.includes(selIndex)) {
            tmpSelArr.push(selIndex);
            mineCount++;
        }
    }
    tmpSelArr.forEach(ele => blockObjs[ele].getMine = true);
}


// function changeBlockObjState{

// }






//block click event
function handleClickBlock(e) {
    console.log(e.target.id);
    if (isStarted) {

    } else {//처음 클릭
        //시작하면 지뢰 셋팅
        const firstClickedId = e.target.id;
        setMine(totalMine, firstClickedId);
        isStarted = true;

    }
}

function init() {
    //difficulty event
    difficultySpans.forEach(ele => ele.addEventListener('click', handleSelectDifficulty));
    //initial
    document.querySelector('.selected').click();  //시작값 : 처음에 1번만 사용
    //block click event
    blocks.forEach(block => block.addEventListener('click', handleClickBlock));
}

init();