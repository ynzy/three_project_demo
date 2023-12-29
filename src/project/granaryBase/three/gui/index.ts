import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { panelList } from './config';

//创建一个GUI对象，你可以看到浏览器右上角多了一个交互界面，GUI本质上就是一个前端js库。
const gui = new GUI();
//改变交互界面style属性
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';

panelList.forEach((item) => {
  // @ts-ignore
  gui.add(item.params, item.property).name(item.name);
});

export { gui };
