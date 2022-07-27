const saveButton = document.querySelector('.save-button');
const clearButton = document.querySelector('.clear-button');

const list = document.querySelector('.list');
const input = document.querySelector('.input');

let itemArr = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'));

// LISTENERS

saveButton.addEventListener('click', () => {
    if (input.value.trim() != '') {
        addTask();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && input.value.trim() != ''){
        addTask();
    }
})

clearButton.addEventListener('click', () => {
    itemArr = [];
    updateStorage();
    checkClearButton();
    templateHTML();
})

// FUNCTIONS

checkClearButton();

templateHTML();

function addTask(){
    itemArr.push(input.value);
    input.value = '';
    updateStorage();
    checkClearButton();
    templateHTML();
}

function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(itemArr));
}

function createTemplate(item, index) {
    return `<li class="item" id="${index}">
                    <input type="text" value="${item}" readonly>
                    <div class="buttons-wrapper">
                        <button class="edit-button" onclick="editTask(${index})"><svg stroke="currentColor" fill="currentColor"
                                stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z">
                                </path>
                            </svg></button>
                        <button class="add-changes-button hide" onclick="addChangesTask(${index})"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M363 277h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z"></path>
                            <path
                                d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422c-44.3 0-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256c0-44.3 17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z">
                            </path>
                        </svg></button>
                        <button class="delete-button" onclick="deleteTask(${index})">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-9 3h2v6H9v-6zm4 0h2v6h-2v-6zM9 4v2h6V4H9z">
                                    </path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </li>`;
}

function templateHTML() {
    list.innerHTML = '';
    if (itemArr.length > 0) {
        itemArr.forEach((element, index) => {
            list.innerHTML += createTemplate(element, index)
        });
    }
}

function checkClearButton() {
    if (itemArr.length > 0) {
        clearButton.classList.remove('hide');
    } else {
        clearButton.classList.add('hide');
    }
}

// FUNCTIONS - LISTENERS

function editTask(idx) {
    const item = document.getElementById(idx);
    const input = item.children[0];
    const buttonWrapper = item.children[1];

    input.focus();

    buttonWrapper.children[0].classList.add('hide');
    buttonWrapper.children[1].classList.remove('hide');

    input.removeAttribute('readonly')
    input.setSelectionRange(input.value.length, input.value.length);
}

function addChangesTask(idx) {
    const item = document.getElementById(idx);
    const input = item.children[0];
    const buttonWrapper = item.children[1];

    buttonWrapper.children[0].classList.remove('hide');
    buttonWrapper.children[1].classList.add('hide');
    input.setAttribute('readonly', '');
    itemArr[idx] = input.value;

    updateStorage();
}

function deleteTask(idx) {
    itemArr.splice(idx, 1);
    updateStorage();
    checkClearButton();
    templateHTML();
}

