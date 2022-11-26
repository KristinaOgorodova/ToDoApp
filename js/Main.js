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
        `<td class="product-id">${obj.id}</td>
        <td>${obj.task}</td>
        <td>${obj.status}</td>  
        <td><button class="btn btn-danger" data-action="delete">Удалить</button>
            <button class="btn btn-success" data-action="done">Завершить</button>
        </td>`);
    tableBody.append(tr);
};

const renderList = (array) => array.map(createRow);

const numberOrder = (arr) => {

};

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

const deleteTask = (e) => {
    if(e.target.dataset.action === 'delete') {
      const tasks = getStorage(userName);
      const currentRow = e.target.closest('.tableRow');
      const taskId = +currentRow.id;
      const currentRowIndex = tasks.findIndex((task) => task.id === taskId);

      tasks.splice(currentRowIndex, 1);
      setStorage(userName, tasks)



      currentRow.remove();
    }
};

tableBody.addEventListener('click', deleteTask);

const doneTask = (e) => {
    if(e.target.dataset.action === 'done') {
        const tasks = getStorage(userName);
        const taskRow = e.target.closest('.table-light');

        const taskId = +taskRow.id;
        const doneTask = tasks.find((task) => task.id === taskId);

        doneTask.status = 'Выполнено';

        taskRow.classList.add('table-success');
        taskRow.classList.toggle('table-light');

    }
};

tableBody.addEventListener('click', doneTask);

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

    const tasks = getStorage(userName);
    renderList(tasks);
    addClassToRow();
};

init();