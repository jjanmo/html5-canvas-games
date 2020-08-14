const playersBtn = document.querySelectorAll('.player');
const msg = document.getElementById('js-msg');
const blocks = document.querySelectorAll('.block');
const restartBtn = document.getElementById('js-restart-button');

let blockData = null;
let start = false;
let player = 'x';
let com = 'o';
let curTurn = 'x';
let result = '';

function makeRandomBlockId() {
    const row = Math.floor(Math.random() * 3);
    const col = Math.floor(Math.random() * 3);
    return `${row}${col}`;
}

function saveComputerData() {
    let selectable = false;
    while (!selectable) {
        const id = makeRandomBlockId();
        if (!blockData[id]) {
            selectable = true;
            saveData(id, com);
            paintComputerTurn(id);
        }
    }
}

function paintComputerTurn(id) {
    const target = document.getElementById(id);
    target.textContent = com;
    target.classList.add(`${com}`);

    if (checkEndGame()) changeTurn();
}

function handlePlayer(e) {
    const { target } = e;
    const selX = document.getElementById('selX');
    const selO = document.getElementById('selO');
    if (target.textContent === 'x') {
        target.classList.add('selected');
        playersBtn[1].classList.remove('selected');
        selX.classList.remove('hidden');
        selO.classList.add('hidden');
        player = 'x';
        com = 'o';
    } else {
        target.classList.add('selected');
        playersBtn[0].classList.remove('selected');
        selO.classList.remove('hidden');
        selX.classList.add('hidden');
        player = 'o';
        com = 'x';
    }

    if (player === 'o') {
        start = true;
        blockChoosing();
        saveComputerData();
    }
}

function setBlockData() {
    blockData = {};
    blocks.forEach((ele) => {
        const id = ele.id;
        blockData[id] = '';
    });
}

function changeTurn() {
    curTurn = curTurn === 'x' ? 'o' : 'x';
    msg.textContent = `${curTurn} turn`;
}

function handleClickBlock(e) {
    const { target } = e;
    const id = target.id;
    if (curTurn === player) {
        if (!start) {
            blockChoosing();
            start = true;
        }
        target.textContent = player;
        target.classList.add(`${player}`);
        saveData(id, player);

        if (checkEndGame()) {
            changeTurn();
            setTimeout(saveComputerData, 1000);
        }
    }
}

function saveData(id, status) {
    const tmpBlockData = Object.assign({}, blockData);
    tmpBlockData[id] = status;
    blockData = tmpBlockData;
}

function checkEndGame() {
    const winnable = [
        ['00', '01', '02'],
        ['10', '11', '12'],
        ['20', '21', '22'],
        ['00', '10', '20'],
        ['01', '11', '21'],
        ['02', '12', '22'],
        ['00', '11', '22'],
        ['02', '11', '20'],
    ];

    winnable.forEach((locs) => {
        if (
            blockData[locs[0]] &&
            blockData[locs[0]] === blockData[locs[1]] &&
            blockData[locs[1]] &&
            blockData[locs[1]] === blockData[locs[2]]
        ) {
            result = `${curTurn} win 😎`;
        }
    });

    if (!result) {
        for (let id in blockData) {
            if (!blockData[id]) {
                return 'next';
            }
        }
        result = 'draw 😏';
    }
    msg.textContent = result;
    blockClick();
}

function blockChoosing() {
    playersBtn.forEach((ele) => ele.removeEventListener('click', handlePlayer));
}

function blockClick() {
    blocks.forEach((ele) => ele.removeEventListener('click', handleClickBlock));
}

function handleRestart(e) {
    setBlockData();
    start = false;
    player = 'x';
    com = 'o';
    curTurn = 'x';
    result = '';
    msg.textContent = 'choose player or start';
    blocks.forEach((ele) => (ele.textContent = ''));
    playersBtn.forEach((ele) => ele.addEventListener('click', handlePlayer));
    blocks.forEach((ele) => ele.addEventListener('click', handleClickBlock));
    blocks.forEach((ele) => (ele.className = 'block'));
    playersBtn.forEach((ele) => (ele.className = 'player'));
    playersBtn[0].classList.add('selected');
}

function init() {
    playersBtn.forEach((ele) => ele.addEventListener('click', handlePlayer));
    blocks.forEach((ele) => ele.addEventListener('click', handleClickBlock));
    restartBtn.addEventListener('click', handleRestart);
    setBlockData();
}

init();
