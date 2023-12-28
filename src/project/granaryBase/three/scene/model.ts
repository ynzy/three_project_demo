// 引入Three.js
import { loadImage } from '@/project/webglCity/utils';
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
const loader = new GLTFLoader(); //创建一个GLTF加载器
// const url = loadImage('@/granaryBase/threejs/scene/model.glb');
const url = 'three/scene/model.glb';
loader.load(url, function (gltf) {
  //gltf加载成功后返回一个对象
  // console.log('控制台查看gltf对象结构', gltf);
  // console.log('gltf对象场景属性', gltf.scene);
  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);
});
export { model };
