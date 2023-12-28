// 场景总文件
// 引入Three.js
import * as THREE from 'three';
import { model } from './model.js';
/**
 * 创建场景对象Scene
 */
const scene = new THREE.Scene();
scene.add(model); //粮仓基地三维模型添加到场景中
/**
 * 光源设置
 */
// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
// const axesHelper = new THREE.AxesHelper(250);
// scene.add(axesHelper);

export { scene };
