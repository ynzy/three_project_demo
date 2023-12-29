import { scene } from './scene/index.js'; //Three.js三维场景
import { renderer, camera } from './RendererCamera.js'; //渲染器对象和相机对象
import { gui } from './gui/index.js';
import { render2DMarker } from './marker/css2D.js';
import { render3DMarker } from './marker/css3D.js';

const label2DRender = render2DMarker();
const label3DRender = render3DMarker();

// 渲染循环
function render() {
  label3DRender.render(scene, camera);
  label2DRender.render(scene, camera);
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position); //通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();

export { renderer, label2DRender, label3DRender };
