import {renderList} from './js/Render.js';
import {getStorage} from './js/Storage.js';
import {addBtn, userName} from './js/Event.js';


const init = () => {
  addBtn.disabled = true;

  const tasks = getStorage(userName);
  renderList(tasks);
};

init();

