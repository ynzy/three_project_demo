// 场景总文件
// 引入Three.js
import * as THREE from 'three';
import { model } from './model.js';
/**
 * 创建场景对象Scene
 */
const scene = new THREE.Scene();
scene.add(model); //粮仓基地三维模型添加到场景中
// console.log(scene);
window.scene = scene;
/**
 * 光源设置
 */
// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

export { scene };
