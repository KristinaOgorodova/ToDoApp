
import {createRow, tableBody} from './CreateElem.js';

export const renderList = (array) => array.map(createRow);


export const getNewStorageIndexed = (newStorageTask) => {
  newStorageTask.map((elem, index) => elem.id = index + 1);
};

export const changeTasksListIndex = () => {
  tableBody.querySelectorAll('tr').forEach((elem, index) => {
    elem.firstElementChild.textContent = index + 1;
  });
};
