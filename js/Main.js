'use strict';

const toDoList = [
    { id: '1',
    task: 'Купить слона',
    status:'В процессе',
    }];

const userName = prompt('Введите Ваше Имя!');

const tableBody = document.querySelector('tbody');
const taskInput = document.querySelector('.form-control');
const addBtn = document.querySelector('.btn-primary');
const resetBtn = document.querySelector('.btn-warning');
const form = document.querySelector('form');

const setStorage = (key) => {
    localStorage.setItem(key, JSON.stringify(toDoList));
};

const getStorage = (key) => {
    JSON.parse(localStorage.getItem(key));
};

const removeItemfromStorage = () => {};

const createRow = (obj) => {
    const tr = document.createElement('tr');

    tr.classList.add('table-light');

    tr.insertAdjacentHTML('beforeend',
        `<td class="product-id">${obj.id}</td>
        <td>${obj.task}</td>
        <td>${obj.status}</td>  
        <td><button class="btn btn-danger">Удалить</button>
            <button class="btn btn-success">Завершить</button>
        </td>`);
    tableBody.append(tr);
};

const renderList = (array) => array.map(createRow);

const ableInput = () => {
    if (taskInput.value.length > 3) {
        addBtn.disabled = false;
    } 
};

const taskNumber = (obj) => {
    const number = obj.length +1;
    return number;
};

const addToDoItem = (task) => {
    task.id = taskNumber(toDoList);
    task.status = 'В процессе';
    toDoList.push(task);
    setStorage(userName);
};

taskInput.addEventListener('input', ableInput);

const resetForm = () => {
    form.reset();
    taskInput.textContent = '';
};

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTask = Object.fromEntries(formData);
    addToDoItem(newTask);
    createRow(newTask);
    resetForm();
});


const init = () => {
    addBtn.disabled = true;
    getStorage(userName);
    renderList(toDoList);
};

init();