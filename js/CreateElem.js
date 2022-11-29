import {setStorage, getStorage} from './Storage.js';
import {userName, tableBody} from '../Main.js';
import {form} from "./Event.js";



export const createRow = (obj) => {
  const tr = document.createElement('tr');

  tr.insertAdjacentHTML('beforeend',
      `<td>${obj.id}</td>
        <td>${obj.task}</td>
        <td>${obj.status}</td>  
        <td><button class="btn btn-danger" data-action="delete">Удалить</button>
            <button class="btn btn-success" data-action="done">Завершить</button>
        </td>`);

  if (obj.status === 'Выполнено') {
    tr.classList.add('table-success');
    const row = tr.querySelectorAll('td');
    row[1].classList.add('text-decoration-line-through');
  } else {
    tr.classList.add('table-light');
  }

  tr.id = obj.id;

  tableBody.append(tr);
};

export const addClassToRow = () => {
  const row = document.querySelectorAll('tr');
  row.forEach(tr => {
    tr.classList.add('tableRow');
  });
};

const taskNumber = (arr) => {
  const taskNumber = arr.length + 1;
  return taskNumber;
};


export const addToDoItem = (task) => {
  const toDoList = getStorage(userName);
  task.id = taskNumber(toDoList);
  task.status = 'В процессе';

  toDoList.push(task);
  setStorage(userName, toDoList);
};

export const resetForm = () => {
  form.reset();
};
