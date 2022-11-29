import {renderList} from './js/Render.js';
import {getStorage} from './js/Storage.js';
import {addClassToRow} from './js/CreateElem.js';
import {addBtn} from './js/Event.js';

const tableBody = document.querySelector('tbody');
const userName = prompt('Введите Ваше Имя!');

const init = () => {
  addBtn.disabled = true;

  const tasks = getStorage(userName);
  renderList(tasks);
  addClassToRow();
};

init();

export {userName,tableBody};