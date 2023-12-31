import { loadImage } from '@webglCity/utils';
import * as THREE from 'three';
import type { Scene } from 'three';

/**
 * 背景天空盒
 */
export class Background {
  private url: string;
  private scene: Scene;
  constructor(scene: Scene) {
    this.url = loadImage('@webglCity/assets/white-bg.png');
    this.scene = scene;
    this.init();
  }
  // 创建天空盒
  init() {
    this.cubeBackground();
  }
  cubeBackground() {
    const textureCube = new THREE.CubeTextureLoader().load([
      loadImage('@webglCity/assets/background/1.jpg'),
      loadImage('@webglCity/assets/background/2.jpg'),
      loadImage('@webglCity/assets/background/3.jpg'),
      loadImage('@webglCity/assets/background/4.jpg'),
      loadImage('@webglCity/assets/background/5.jpg'),
      loadImage('@webglCity/assets/background/6.jpg')
    ]);
    this.scene.background = textureCube; // 作为背景贴图
  }
  sphereBackground() {
    // 创建一个纹理加载器
    const loader = new THREE.TextureLoader();

    const geometry = new THREE.SphereGeometry(5000, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: loader.load(this.url)
    });

    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.copy({
      x: 0,
      y: 0,
      z: 0
    });

    this.scene.add(sphere);
  }
}
