// 引入Three.js
import { loadImage } from '@/project/webglCity/utils';
import * as THREE from 'three';
// 创建一个火焰动画
function createFlame() {
  // 矩形平面网格模型，用来渲染火焰的动画效果
  const w = 25; //火焰宽度  通过参数w可以快速调节火焰大小，以便于适应对应的三维场景
  const h = 1.6 * w; //火焰高度
  const geometry = new THREE.PlaneGeometry(w, h); //矩形平面
  geometry.translate(0, h / 2, 0); //火焰底部中点和局部坐标系坐标原点重合

  const textureLoader = new THREE.TextureLoader(); //纹理贴图加载器
  const url = loadImage('@granaryBase/three/flame/火焰.png');
  console.log(url);

  const texture = textureLoader.load(url); //创建一个纹理对象
  console.log('texture', texture);

  const num = 15; //火焰多少帧图
  // .repeat方法设置uv两个方向纹理重复数量
  texture.repeat.set(1 / num, 1); // 1/num：从图像上截图一帧火焰
  // texture.offset.x = 0 / num;//选择第1帧火焰
  // texture.offset.x = 1 / num;//选择第2帧火焰
  // texture.offset.x = (num-1) / num;//选择第一帧火焰
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.4, //整体调节透明度 和三维场景相融合
    side: THREE.DoubleSide, //双面可见
    depthWrite: false //是否对深度缓冲区有任何的影响
  });
  const mesh = new THREE.Mesh(geometry, material); // 火焰网格模型
  const flame = new THREE.Group(); //火焰组对象
  // 两个火焰mesh交叉叠加
  // flame.add(mesh, mesh.clone().rotateY(Math.PI / 2))
  // 四个火焰mesh交叉叠加
  flame.add(mesh, mesh.clone().rotateY(Math.PI / 2), mesh.clone().rotateY(Math.PI / 4), mesh.clone().rotateY((Math.PI / 4) * 3));

  let t = 0;
  let stopAnimationFrame: any = null;
  // 火焰动画生成
  function UpdateLoop() {
    t += 0.1; //调节火焰切换速度
    if (t > num) t = 0;
    //  Math.floor(t)取整 保证一帧一帧切换
    texture.offset.x = Math.floor(t) / num; // 动态更新纹理偏移 播放关键帧动画 产生火焰然后效果
    stopAnimationFrame = window.requestAnimationFrame(UpdateLoop); //请求再次执行函数UpdateLoop
  }
  UpdateLoop();

  // 火焰停止
  flame.stop = function () {
    window.cancelAnimationFrame(stopAnimationFrame); //取消动画
  };
  // flame.stop()
  return flame;
}
export { createFlame };
