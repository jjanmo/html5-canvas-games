const difficultySpans = document.querySelectorAll('.difficulty');
const board = document.getElementById('js-board');

let blockObjs = {};     //block obj를 담는 객체 : 블럭 데이터정보 
let blocks;             //blocks array : 데이터에 따른 화면변경을 위한 것
let totalMine = 0, x = 0, y = 0;
let isStarted = false;


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
    blockObjs = {};
    const fragment = new DocumentFragment();
    for (let i = 0; i < length * length; i++) {
        const div = document.createElement('div');
        div.classList.add('block', 'not-clicked');
        const id = setId(length, i);
        div.id = id;        //screen - data interaction   
        div.dataset.id = i; //screen - element interaction 
        setBlockObj(id);
        fragment.append(div);
    }
    return fragment;
}

function setId(length, i) {
    if (i % length === 0 && i !== 0) {
        x = 0;
        y++;
    }
    return `${x++}-${y}`;
}


function getBlocks() {
    const blocks = document.querySelectorAll('.block');
    return Array.from(blocks);
}


//게임 관련 object 생성

function setBlockObj(id) {
    const blockObj = {
        getMine: false,
        clicked: false,
        isFlagged: false
    };
    blockObjs[id] = blockObj;
}

function setMine(totalMine, blockId) {
    //mine을 몇개 만들것인가 결정 : mine숫자 -> 난이도에 따라 달라짐
    //첫번째 클릭이 끝난 후 배치 해야함 : 첫번째 클릭칸을 제외
    const blockWidth = Math.sqrt(blocks.length); //board의 한 변 칸수
    let mineCount = 0;
    const tmpSelArr = [];
    while (mineCount < totalMine) {
        const x = Math.floor(Math.random() * blockWidth);
        const y = Math.floor(Math.random() * blockWidth);
        const tmpId = `${x}-${y}`;
        if (tmpId === blockId) continue;  //첫번째 클릭 칸 제외
        if (!tmpSelArr.includes(tmpId)) {
            tmpSelArr.push(tmpId);
            mineCount++;
        }
    }
    tmpSelArr.forEach(ele => blockObjs[ele].getMine = true);
}


// function changeBlockObjState{

// }


//block click event
function handleClickBlock(e) {
    // console.log(blocks, blockObjs);
    const blockId = e.target.id;
    const index = e.target.dataset.id;
    if (!isStarted) { //첫번째 클릭한 후에 지뢰 셋팅
        setMine(totalMine, blockId);
        isStarted = true;
    }
    // setBlockObjState(index);
    renderBlock(blockId, index);
    // // console.log(blockObjs);
}

// function setBlockObjState(index) {
//     blockObjs[index].clicked = true;
// }

function renderBlock(blockId, index) {
    blocks[index].classList.remove('not-clicked');
    if (blockObjs[blockId].getMine) {// 지뢰가 있는 경우
        blocks[index].classList.add('step-mine');
        //game over       
        //모든 지뢰 위치 보여줌 : 현재 상태  + 지뢰 위치 + 잘못된 flag
        //display변경
    }
    else {//지뢰가 아닌 경우
        checkAround(blockId);


    }

    // 좌클릭 
    //1) 뒤집어지는 경우
    //2) 지뢰가 있는 경우 -> 주위 숫자에 따른 지뢰개수를 보여줌
    //3) 자동을 뒤집어짐 = 주위에 아무것도 없는 경우
    // blocks[blockId].classList.remove('not-clicked');
    // blocks[blockId].classList.add('clicked');

    //우클릭 
    //1) 깃발 그리기 or 없애기 
}

function checkAround(blockId) {
    let count = 0;
    let cssName = null;
    const tmp = blockId.split('-');
    const curX = Number(tmp[0]);
    const curY = Number(tmp[1]);
    console.log(curX, curY);
    const tmpArr = [];
    for (let i = curX - 1; i <= curX + 1; i++) {
        for (let j = curY - 1; j <= curY + 1; j++) {
            if (i === curX && j === curY) continue;
            if (blockObjs[`${i}-${j}`]) {
                tmpArr.push(`${i}-${j}`);
                // console.log(blockObjs[`${i}-${j}`]);
                if (blockObjs[`${i}-${j}`].getMine) {
                    count++;
                }
            }
        }
    }
    console.log(tmpArr);
    //css 설정
    switch (count) {
        case 1:
            cssName = 'one';
            break;
        case 2:
            cssName = 'two';
            break;
        case 3:
            cssName = 'three';
            break;
        case 4:
            cssName = 'four';
            break;
        case 5:
            cssName = 'five';
            break;
        case 6:
            cssName = 'six';
            break;
        case 7:
            cssName = 'seven';
            break;
        case 8:
            cssName = 'eight';
            break;
        default:
            cssName = 'zero';
        // tmpArr.forEach(id => checkAround(id));
    }
    document.getElementById(blockId).classList.add(`${cssName}-mine`);
    // blocks[index].classList.add(`${cssName}-mine`);
}

function init() {
    //difficulty event
    difficultySpans.forEach(ele => ele.addEventListener('click', handleSelectDifficulty));
    //initial
    document.querySelector('.selected').click();  //시작값 : 처음에 1번만 사용
    //block click event
    blocks.forEach(block => block.addEventListener('click', handleClickBlock));             //left click
    // blocks.forEach(block => block.addEventListener('contextmenu', handleContextMenu));   //right click
}

init();