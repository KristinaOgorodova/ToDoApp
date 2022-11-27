'use strict';

const userName = prompt('Введите Ваше Имя!');

const tableBody = document.querySelector('tbody');
const taskInput = document.querySelector('.form-control');
const addBtn = document.querySelector('.btn-primary');
const form = document.querySelector('form');

const setStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};

const createRow = (obj) => {
    const tr = document.createElement('tr');

    tr.classList.add('table-light');

    tr.insertAdjacentHTML('beforeend',
        `<td>${obj.id}</td>
        <td>${obj.task}</td>
        <td>${obj.status}</td>  
        <td><button class="btn btn-danger" data-action="delete">Удалить</button>
            <button class="btn btn-success" data-action="done">Завершить</button>
        </td>`);
    tableBody.append(tr);
};

const renderList = (array) => array.map(createRow);


const addClassToRow = () => {
    const row = document.querySelectorAll('tr');
    row.forEach(tr => {
        tr.classList.add('tableRow');
    });
};

const ableInput = () => {
    if (taskInput.value.length > 3) {
        addBtn.disabled = false;
    } 
};

const taskNumber = (arr) => {
    const taskNumber = arr.length +1;
    return taskNumber;

};

const addToDoItem = (task) => {
    const toDoList = getStorage(userName);
    task.id = taskNumber(toDoList);
    task.status = 'В процессе';

    toDoList.push(task);
    setStorage(userName, toDoList);
};

taskInput.addEventListener('input', ableInput);

const resetForm = () => {
    form.reset();
};

const getNewStorageIndexed = (newStorageTask) => {
    newStorageTask.map((elem, index) => elem.id = index + 1);
};

const changeTasksListIndex = () => {
    tableBody.querySelectorAll('tr').forEach((elem, index) => {
        elem.firstElementChild.textContent = index + 1;
    });
};


form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    addToDoItem(newTask);
    createRow(newTask);
    resetForm();
});

const deleteTask = (e) => {
    if(e.target.dataset.action === 'delete') {
        const tasks = getStorage(userName);
        const currentRow = e.target.closest('.tableRow');
        const taskId = +currentRow.id;
        const currentRowIndex = tasks.findIndex((task) => task.id === taskId);

        tasks.splice(currentRowIndex, 1);

        currentRow.remove();
        getNewStorageIndexed(tasks);
        changeTasksListIndex();
        setStorage(userName, tasks);
    }
};

tableBody.addEventListener('click', deleteTask);

const doneTask = (e) => {
    if(e.target.dataset.action === 'done') {
        const tasks = getStorage(userName);
        const taskRow = e.target.closest('.table-light');

        const row = taskRow.querySelectorAll('td');
        row[1].classList.add('text-decoration-line-through');
        row[2].textContent = 'Выполнено';

        const taskId = +taskRow.id;
        const currentRowIndex = tasks.findIndex((task) => task.id === taskId);
        tasks[currentRowIndex].status = 'Выполнено';

        taskRow.classList.add('table-success');
        taskRow.classList.toggle('table-light');
        setStorage(userName, tasks);
    }
};

tableBody.addEventListener('click', doneTask);


const init = () => {
    addBtn.disabled = true;

    const tasks = getStorage(userName);
    renderList(tasks);
    addClassToRow();
};

init();