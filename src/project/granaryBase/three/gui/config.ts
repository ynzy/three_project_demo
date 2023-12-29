import * as THREE from 'three';
import { scene } from '../scene';
import { renderer } from '../RendererCamera';
import { create2DMarker } from '../marker/css2D';
import { model } from '../scene/model';
import { create3DMarker, createSpriteMarker } from '../marker/css3D';
import { createFlame } from '../flame/flame';
import { getBoundingBox } from '@/utils/tool';

let meshList: any[] = [];
const cacheRendererColor = new THREE.Color();
const markerGroup = new THREE.Group();
markerGroup.name = '顶牌组';

// 设置材质
function setMaterial(material: Function) {
  scene.traverse(function (object) {
    if (object.type === 'Mesh') {
      // console.log(object.material); //控制台查看mesh材质
      // MeshLambertMaterial：受光照影响   MeshBasicMaterial：不受光照影响
      object.material = material(object);
    }
  });
}

/**
 * 创建顶牌
 * @param create 创建顶牌方法
 * @param markerGroup 顶牌组
 */
function createMarker(create: Function, markerGroup: THREE.Group) {
  const group = scene.getObjectByName('粮仓');
  //console.log('粮仓', group);
  group.traverse(function (obj) {
    if (obj.type === 'Mesh') {
      const label = create(obj.name); //把粮仓名称obj.name作为标签
      const pos = new THREE.Vector3();
      obj.getWorldPosition(pos); //获取obj世界坐标、
      // 粮仓世界坐标对应粮仓底部圆心位置，如果标签像标注在粮仓底部，需要加上粮仓整体高度
      const { boxSize } = getBoundingBox(obj);
      // console.log(boxSize);
      pos.y = Math.ceil(+boxSize.y) + 2;
      label.position.copy(pos); //标签标注在obj世界坐标
      markerGroup.add(label);
    }
  });
  model.add(markerGroup); //标签插入model组对象中
}

/**
 * 删除顶牌
 * @param group
 */
function removeMarker(group: THREE.Group) {
  // 清理组内的物体
  for (let i = group.children.length - 1; i >= 0; i--) {
    const child = group.children[i];
    group.remove(child);
    // 如果子对象有 dispose 方法，调用它以释放资源
    if (child.dispose) {
      child.dispose();
    }
  }
  model.remove(group);
}

/**
 * 获取粮仓要显示的火焰
 * @param name
 * @returns
 */
function granaryFlame(mesh) {
  const pos = new THREE.Vector3();
  mesh.getWorldPosition(pos); //获取粮仓granary世界坐标设置火焰位置
  const flame = createFlame(); //创建一个对象
  flame.position.copy(pos);
  const { boxSize } = getBoundingBox(mesh);
  flame.position.y += boxSize.y;
  flame.position.y += -4; //适当向下偏移

  const messageTag = createSpriteMarker('粮仓 ' + name + ' 失火了 ！！！');
  flame.add(messageTag); //id"messageTag"对应的HTML元素作为three.js标签
  messageTag.position.y += 40; //考虑火焰高度 向上适当偏移
  flame.tag = messageTag; //火焰自定义一个属性指向自己的HTML标签
  return flame;
}

export const panelList = [
  {
    name: '重置',
    params: {
      onClick: function () {
        // 删除创建的物体
        if (meshList.length) {
          meshList.forEach((object) => {
            if (object.parent) {
              object.parent.remove(object);
            }
          });
          meshList = [];
        }
        // 删除雾化效果
        if (scene.fog) {
          renderer.setClearColor(cacheRendererColor);
          scene.fog = null;
        }
        removeMarker(markerGroup);
      }
    },
    property: 'onClick'
  },
  {
    name: '场景添加辅助线',
    params: {
      onClick: function () {
        // Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
        const axesHelper = new THREE.AxesHelper(250);
        axesHelper.name = '场景坐标轴辅助线';
        meshList.push(axesHelper);
        scene.add(axesHelper);
      }
    },
    property: 'onClick'
  },
  {
    name: '场景添加包围盒',
    params: {
      onClick: function () {
        const liangcang = scene.getObjectByName('粮仓');
        // 创建包围盒对象
        const boundingBox = new THREE.Box3();
        const box = boundingBox.setFromObject(liangcang);
        const size = new THREE.Vector3();
        box.getSize(size);
        console.log('粮仓包围盒大小', size);
        const helper = new THREE.Box3Helper(boundingBox, 0xffff00);
        helper.name = '粮仓包围盒辅助线';
        meshList.push(helper);
        scene.add(helper);
      }
    },
    property: 'onClick'
  },
  {
    name: '批量修改GLTF材质-PBR材质',
    params: {
      onClick: function () {
        setMaterial(function (object) {
          return new THREE.MeshStandardMaterial({
            map: object.material.map, //获取原来材质的颜色贴图属性值
            color: object.material.color, //读取原来材质的颜色
            roughness: object.userData.roughness, //读取原来材质的 Roughness
            metalness: object.userData.metalness //读取原来材质的 Metalness
            // emissive: object.material.emissive,
            // emissiveIntensity: object.material.emissiveIntensity,
            // side: THREE.DoubleSide,//围墙需要设置双面显示
          });
        });
      }
    },
    property: 'onClick'
  },
  {
    name: '批量修改GLTF材质-兰伯特材质',
    params: {
      onClick: function () {
        setMaterial(function (object) {
          object.userData.roughness = object.material.roughness;
          object.userData.metalness = object.material.metalness;
          return new THREE.MeshLambertMaterial({
            map: object.material.map, //获取原来材质的颜色贴图属性值
            color: object.material.color //读取原来材质的颜色
            // side: THREE.DoubleSide,//围墙需要设置双面显示
          });
        });
      }
    },
    property: 'onClick'
  },
  {
    name: '雾化效果',
    params: {
      onClick: function () {
        const color = 0x005577;
        // 设置three.js背景颜色 和雾化颜色相配
        console.log(renderer);
        renderer.getClearColor(cacheRendererColor);
        // 设置three.js背景颜色 和雾化颜色相配
        renderer.setClearColor(color, 1);
        // 设置雾化效果，雾的颜色和背景颜色相近，这样远处网格线和背景颜色融为一体
        scene.fog = new THREE.Fog(color, -100, 1000);
      }
    },
    property: 'onClick'
  },
  {
    name: 'css2D标注粮仓',
    params: {
      onClick: function () {
        createMarker(create2DMarker, markerGroup);
      }
    },
    property: 'onClick'
  },

  {
    name: 'css3DObject标注粮仓',
    params: {
      onClick: function () {
        createMarker(create3DMarker, markerGroup);
      }
    },
    property: 'onClick'
  },
  {
    name: 'css3DSprite标注粮仓',
    params: {
      onClick: function () {
        createMarker(createSpriteMarker, markerGroup);
      }
    },
    property: 'onClick'
  },
  {
    name: '删除顶牌',
    params: {
      onClick: function () {
        removeMarker(markerGroup);
      }
    },
    property: 'onClick'
  },
  {
    name: '告警火焰',
    params: {
      onClick: function () {
        // 用于存储符合条件的 Mesh 对象的数组
        const meshArray: any = [];
        const granaryGroup = scene.getObjectByName('粮仓');
        // 遍历场景，并将符合条件的 Mesh 存储到数组中
        granaryGroup.traverse(function (obj) {
          if (obj.type === 'Mesh') {
            meshArray.push(obj);
          }
        });
        // 随机取出一个物体
        const randomIndex = Math.floor(Math.random() * meshArray.length);
        const randomMesh = meshArray[randomIndex];
        const flame = granaryFlame(randomMesh); //平房仓 P_05
        model.add(flame); //火焰模型添加到model中
        // 通过定时器测试 火焰熄灭
        setTimeout(function () {
          flame.stop(); //隐藏火焰模型
          flame.remove(flame.tag); //从火焰中移出标签对象
          model.remove(flame); //从场景中移出火焰模型对象
        }, 3000); //3秒后火焰熄灭
      }
    },
    property: 'onClick'
  },
  {
    name: 'xxxxx',
    params: {
      onClick: function () {}
    },
    property: 'onClick'
  },
  {
    name: 'xxxxx',
    params: {
      onClick: function () {}
    },
    property: 'onClick'
  },
  {
    name: 'xxx',
    params: {
      onClick: function () {}
    },
    property: 'onClick'
  }
];
