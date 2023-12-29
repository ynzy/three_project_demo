import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export const create2DMarker = (name: string) => {
  // 创建div元素(作为标签)
  const div = document.createElement('div');
  div.innerHTML = name;
  div.classList.add('tag');
  //div元素包装为CSS3模型对象CSS3DObject
  const label = new CSS2DObject(div);
  div.style.pointerEvents = 'none'; //避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  //缩放CSS3DObject模型对象
  return label; //返回CSS3模型标签
};

/**
 * 渲染2D顶牌
 */
export const render2DMarker = () => {
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  // 相对标签原位置位置偏移大小
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.left = '0px';
  // //设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.body.appendChild(labelRenderer.domElement);
  return labelRenderer;
};
