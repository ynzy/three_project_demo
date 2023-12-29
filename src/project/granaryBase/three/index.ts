import { renderer } from './RenderLoop';
import { choose, chooseMesh } from './choose'; //执行射线拾取代码
import { createMarkerByDomId } from './marker/css3D';
import { scene } from './scene/index'; //Three.js三维场景
import messageData from './messageData'; //粮仓数据模拟

export const initThreeJs = (dom: HTMLElement) => {
  // console.log('初始化js');
  //Three.js渲染结果Canvas画布插入到body元素中
  dom.appendChild(renderer.domElement);

  const messageTag = createMarkerByDomId('messageTag');
  scene.add(messageTag); //id"messageTag"对应的HTML元素作为three.js标签

  const idArr = ['granaryName', 'temperature', 'grain', 'grainImg', 'weight', 'granaryHeight', 'grainHeight'];

  // click mousemove
  addEventListener('click', function () {
    if (chooseMesh) {
      messageTag.element.style.visibility = 'hidden'; //隐藏标签
    }
    choose(event, messageTag); //执行射线拾取的代码

    // 选中不同粮仓，HTML标签信息跟着改变
    if (chooseMesh) {
      //批量更新粮仓chooseMesh的标签信息
      idArr.forEach(function (id) {
        const dom = document.getElementById(id);
        if (id == 'grainImg') {
          dom.src = messageData[chooseMesh.name][id]; //设置图片路径
        } else {
          dom.innerHTML = messageData[chooseMesh.name][id];
        }
      });
      messageTag.element.style.visibility = 'visible'; //显示标签
      // messageTag.position.copy(chooseMesh.getWorldPosition());//通过粮仓世界坐标设置标签位置
      messageTag.position.copy(chooseMesh.point); //射线在粮仓表面拾取坐标

      // 数字滚动动画
      const weightDOM = document.getElementById('weight');
      weightDOM.innerHTML = 0;
      const weightMax = messageData[chooseMesh.name]['weight']; //粮仓重量
      let weight = 0; //粮仓初始重量
      const interval = setInterval(function () {
        if (weight < weightMax) {
          weight += Math.floor(weightMax / 50); //重量累加
          document.getElementById('weight').innerHTML = weight;
        } else {
          clearInterval(interval); //一旦达到粮食重量，取消周期性函数interval
        }
      }, 5);
    }
  });
};
