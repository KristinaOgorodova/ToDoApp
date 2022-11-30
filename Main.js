import {renderList} from './js/Render.js';
import {getStorage} from './js/Storage.js';
import {addClassToRow} from './js/CreateElem.js';
import {addBtn, userName} from './js/Event.js';


const init = () => {
  addBtn.disabled = true;

  const tasks = getStorage(userName);
  renderList(tasks);
  addClassToRow();
};

init();

