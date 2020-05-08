const difficultySpans = document.querySelectorAll('.difficulty');
const board = document.getElementById('js-board');

let blockObjs = {};     //block obj를 담는 객체 : 블럭 데이터정보 
let blocks;             //blocks array
let totalMine = 0;
let isStarted = false;


//게임 다시 시작 할 때마다 초기화해야 할 것들
//-> 다시 시작하는 경우 : 1)난이도 클릭시 2) start button 클릭시
function restartInit() {
    isStarted = false;
    blockObjs = {}; //blockObjs 초기화
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
    restartInit();
    let fragment;
    switch (difficulty) {
        case 'basic': //10 * 10 지뢰 10개
            fragment = makeBlocks(10);
            totalMine = 10;
            break;
        case 'intermediate': // 15 * 15 지뢰 25개
            fragment = makeBlocks(15);
            totalMine = 40;
            break;
        case 'advanced': //20 * 20 지뢰 60개
            fragment = makeBlocks(20);
            totalMine = 100;
            break;
        default: //custom
            break;
    }
    board.className = ''
    board.classList.add('board', `${difficulty}`);
    board.innerHTML = '';
    board.append(fragment);

    blocks = document.querySelectorAll('.block');
    makeClickEvent(blocks);
    // console.log(blocks, blockObjs);
}

function makeBlocks(length) {
    let x = 0, y = 0;
    const fragment = new DocumentFragment();
    for (let i = 0; i < length * length; i++) {
        //순회하는 동안 x,y값 설정(행과열설정)
        if (i % length === 0 && i !== 0) {
            x = 0;
            y++;
        }
        const curObj = setBlockObj(x++, y);
        const div = document.createElement('div');
        div.classList.add('block', 'not-clicked');
        div.id = curObj.setId();        //screen - data interaction   
        // div.dataset.index = i;          //screen - element interaction 
        fragment.append(div);
    }
    // console.log(blockObjs);
    return fragment;
}

//make event listener in block
//-> whenever board repaint, make eventlistener
function makeClickEvent() {
    //block click event
    blocks.forEach(block => block.addEventListener('click', handleClickBlock));             //left click
    // blocks.forEach(block => block.addEventListener('contextmenu', handleContextMenu));   //right click
}


//게임 관련 object 생성
function setBlockObj(x, y) {
    const blockObj = {
        posX: x,
        posY: y,
        getMine: false,
        clicked: false,
        isFlagged: false,
        setId: function () {
            return `${this.posX}-${this.posY}`;
        }
    };
    blockObjs[`${blockObj.setId()}`] = blockObj;
    return blockObj;
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


//block click event
function handleClickBlock(e) {
    console.log(blocks, blockObjs);
    const { target } = e;
    if (target.className.includes('not-clicked')) {
        const blockId = target.id;
        // const index = e.target.dataset.index; //사용할지 말지 ??
        if (!isStarted) { //첫번째 클릭한 후에 지뢰 셋팅
            setMine(totalMine, blockId);
            isStarted = true;
        }
        checkMine(blockId);
        // // console.log(blockObjs);
    }
}

function checkMine(blockId) {
    if (blockObjs[blockId].getMine) {// 지뢰가 있는 경우
        document.getElementById(blockId).classList.add('step-mine');
        document.getElementById(blockId).classList.remove('not-clicked');
        //game over       
        //모든 지뢰 위치 보여줌 : 현재 상태  + 지뢰 위치 + 잘못된 flag
        //display변경
    }
    else {//지뢰가 아닌 경우
        checkAround(blockId);
    }
}

function checkAround(blockId) {
    let count = 0;
    const posX = blockObjs[blockId].posX;
    const posY = blockObjs[blockId].posY;
    const recursionArr = [];
    for (let i = posX - 1; i <= posX + 1; i++) {
        for (let j = posY - 1; j <= posY + 1; j++) {
            if (i === posX && j === posY) continue;     //클릭한 자기자신 제거
            if (blockObjs[`${i}-${j}`]) {
                if (blockObjs[`${i}-${j}`].clicked) continue;
                //-> 클릭된 블록 제거 : 재귀적 구현을 위해서 코드위치 중요 - 재귀 탈출조건(recursionArr에 등록될 블록의 구분해줌)
                if (blockObjs[`${i}-${j}`].getMine) {
                    count++;
                }
                recursionArr.push(`${i}-${j}`);
            }
        }
    }
    // console.log(recursionArr);
    // console.log(count);
    changeBlockObjState(blockId);
    renderBlock(blockId, count);
    if (count === 0) {
        recursionArr.forEach(blockId => checkAround(blockId));
    }
}

function changeBlockObjState(blockId) {
    blockObjs[blockId].clicked = true;
    // console.log(blockObjs);
}


function renderBlock(blockId, count) {
    const curBlock = document.getElementById(blockId);
    let value = null;
    //css 설정
    switch (count) {
        case 1:
            value = 'one';
            break;
        case 2:
            value = 'two';
            break;
        case 3:
            value = 'three';
            break;
        case 4:
            value = 'four';
            break;
        case 5:
            value = 'five';
            break;
        case 6:
            value = 'six';
            break;
        case 7:
            value = 'seven';
            break;
        case 8:
            value = 'eight';
            break;
        default:
            value = 'zero';
    }
    curBlock.classList.remove('not-clicked');
    curBlock.classList.add(`${value}-mine`);
    // blocks[index].classList.add(`${cssName}-mine`);
}

function init() {
    //difficulty event
    difficultySpans.forEach(ele => ele.addEventListener('click', handleSelectDifficulty));
    //initial
    document.querySelector('.selected').click();  //시작값 : 처음에 1번만 사용
}

init();

    // 좌클릭 
    //1) 뒤집어지는 경우
    //2) 지뢰가 있는 경우 -> 주위 숫자에 따른 지뢰개수를 보여줌
    //3) 자동을 뒤집어짐 = 주위에 아무것도 없는 경우
    // blocks[blockId].classList.remove('not-clicked');
    // blocks[blockId].classList.add('clicked');

    //우클릭 
    //1) 깃발 그리기 or 없애기 