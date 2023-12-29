// 引入Three.js
import { loadImage } from '@/project/webglCity/utils';
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
model.name = '场景';
const granaryArr: THREE.Mesh[] = []; //所有粮仓模型对象的集合，export导出用于射线拾取

const loader = new GLTFLoader(); //创建一个GLTF加载器
// const url = loadImage('@granaryBase/threejs/scene/model.glb');
// const url = 'three/model/model.gltf';
const url = 'three/scene/model.glb';
loader.load(url, function (gltf) {
  //gltf加载成功后返回一个对象
  // console.log('控制台查看gltf对象结构', gltf);
  // console.log('gltf对象场景属性', gltf.scene);
  // 递归遍历gltf.scene
  gltf.scene.traverse(function (object) {
    if (object.type === 'Mesh') {
      // 批量更改所有Mesh的材质
      object.material = new THREE.MeshStandardMaterial({
        map: object.material.map, //获取原来材质的颜色贴图属性值
        color: object.material.color, //读取原来材质的颜色
        roughness: object.material.roughness, //读取原来材质的 Roughness
        metalness: object.material.metalness //读取原来材质的 Metalness
      });
    }
  });
  // 所有粮仓模型的父对象名称：'粮仓'
  const group = gltf.scene.getObjectByName('粮仓');
  //console.log('粮仓', group);
  group.traverse(function (obj) {
    if (obj.type === 'Mesh') {
      granaryArr.push(obj);
    }
  });
  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);
});
// console.log('model', model);

export { model, granaryArr };
