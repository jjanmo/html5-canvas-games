const modal = document.getElementById('js-modal');
const modalOverlay = document.getElementById('js-modal-overlay');
const exitButton = document.getElementById('js-exit-button');
const inputName = document.getElementById('js-input-name');
const submitButton = document.getElementById('js-submit-button');
const records = [];


function handleExitModal() {
    modal.classList.add('hidden');
}


function handleSubmit(e) {
    const record = document.getElementById('js-record').textContent;
    const name = inputName.value;
    sendToDB(record, name, difficulty);
    handleExitModal();
    document.getElementById('js-input-name').value = '';
}

function sendToDB(record, name, difficulty) {
    console.log(record, name, difficulty)
    //local storage 이용
    const userObj = {
        id: Date.now().toString(),
        name,
        record,
        difficulty,
        date: new Date()
    }
    records.push(userObj);
    localStorage.setItem('records', JSON.stringify(records));
}

function init() {
    document.getElementById('js-input-name').focus();
    exitButton.addEventListener('click', handleExitModal);
    modalOverlay.addEventListener('click', handleExitModal);
    submitButton.addEventListener('click', handleSubmit);
}


init();