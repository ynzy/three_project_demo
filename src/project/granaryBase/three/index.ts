import { renderer } from './RenderLoop';
export const initThreeJs = (dom: HTMLElement) => {
  // console.log('初始化js');
  //Three.js渲染结果Canvas画布插入到body元素中
  dom.appendChild(renderer.domElement);
};
