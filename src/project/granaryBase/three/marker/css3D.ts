import { CSS3DObject, CSS3DRenderer, CSS3DSprite } from 'three/examples/jsm/Addons.js';

/**
 * 创建3D平面顶牌
 * @param name
 * @returns
 */
export const create3DMarker = (name: string) => {
  // 创建div元素(作为标签)
  const div = document.createElement('div');
  div.innerHTML = name;
  div.classList.add('tag');
  //div元素包装为CSS3模型对象CSS3DObject
  const label = new CSS3DObject(div);
  div.style.pointerEvents = 'none'; //避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  //缩放CSS3DObject模型对象
  label.scale.set(0.2, 0.2, 0.2); //根据相机渲染范围控制HTML 3D标签尺寸
  label.rotateY(Math.PI / 2); //控制HTML标签CSS3对象姿态角度
  return label; //返回CSS3模型标签
};

/**
 * 创建3D精灵顶牌
 * @param name
 * @returns
 */
export const createSpriteMarker = (name: string) => {
  // 创建div元素(作为标签)
  const div = document.createElement('div');
  div.innerHTML = name;
  div.classList.add('tag');
  //div元素包装为CSS3模型对象CSS3DSprite
  const label = new CSS3DSprite(div);
  div.style.pointerEvents = 'none'; //避免HTML标签遮挡三维场景的鼠标事件
  // 设置HTML元素标签在three.js世界坐标中位置
  // label.position.set(x, y, z);
  //缩放CSS3DSprite模型对象
  label.scale.set(0.2, 0.2, 0.2); //根据相机渲染范围控制HTML 3D标签尺寸
  label.rotateY(Math.PI / 2); //控制HTML标签CSS3对象姿态角度
  // label.rotateX(-Math.PI/2);
  return label; //返回CSS3模型标签
};

/**
 * 渲染3D顶牌
 */
export const render3DMarker = () => {
  const labelRenderer = new CSS3DRenderer();
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
