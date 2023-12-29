import * as THREE from 'three';
// 计算物体包围盒
export function getBoundingBox(object) {
  const box = new THREE.Box3();
  box.setFromObject(object);
  const boxSize = new THREE.Vector3();
  box.getSize(boxSize);
  // 输出包围盒的信息
  // console.log("Min:", box.min); // 最小点
  // console.log("Max:", box.max); // 最大点
  // console.log("Size:", box.getSize()); // 尺寸
  return {
    box,
    boxSize
  };
}
