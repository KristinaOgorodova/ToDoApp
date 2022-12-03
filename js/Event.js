
import {addToDoItem, createRow, resetForm} from './CreateElem.js';
import {getStorage, setStorage} from './Storage.js';
import {getNewStorageIndexed, changeTasksListIndex, renderList} from './Render.js';

export const userName = prompt('Введите Ваше Имя!');
export const tableBody = document.querySelector('tbody');
export const taskInput = document.querySelector('.form-control');
export const addBtn = document.querySelector('.btn-primary');
export const form = document.querySelector('form');

const ableInput = () => {
  if (taskInput.value.trim() === '') {
    addBtn.disabled = true;
  } else {
    addBtn.disabled = false;
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newTask = Object.fromEntries(formData);
  addToDoItem(newTask);
  createRow(newTask);
  resetForm();
});

taskInput.addEventListener('input', ableInput);

const deleteTask = (e) => {
  if (e.target.dataset.action === 'delete') {
    const tasks = getStorage(userName);

    const currentRow = e.target.closest('.table-success') || e.target.closest('.table-light');

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
  if (e.target.dataset.action === 'done') {
    const tasks = getStorage(userName);

    const taskRow = e.target.closest('.table-success') || e.target.closest('.table-light');

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



