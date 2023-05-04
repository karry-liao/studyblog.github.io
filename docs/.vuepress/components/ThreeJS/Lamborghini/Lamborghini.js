// 车模型：灯光一切调整好终极版本
import * as THREE from "three";
import {
  BoxGeometry,
  DoubleSide,
  Mesh,
  AxesHelper,
  TextureLoader,
  GridHelper,
  MeshBasicMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Vector2,
  Raycaster,
  PlaneGeometry,
  AmbientLight,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import pkq from "../../../public/img/pkq1.jpg";

// import Lamborghini from "../../../public/img/Lamborghini.glb";
import { MeshPhysicalMaterial } from "three";
import { SpotLight } from "three";
import { CylinderGeometry } from "three";
import GUI from "lil-gui";
import messi from "../modles/to/messi.jpg";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

import * as TWEEN from "@tweenjs/tween.js";

let scene,
  camera,
  renderer,
  controls,
  mesh,
  lightHelper1,
  rectLight1,
  rectLight2,
rectLight3
let doors = [];

let carStatus;
// 车身材质
let bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: "#6e2121",
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.03,
});

// 玻璃材质
let glassMaterial = new THREE.MeshPhysicalMaterial({
  color: "#793e3e",
  metalness: 0.25,
  roughness: 0,
  transmission: 1.0, //透光性.transmission属性可以让一些很薄的透明表面，例如玻璃，变得更真实一些。
});

// 初始化场景
function initScene() {
  scene = new Scene();
  RectAreaLightUniformsLib.init();
  // scene.add(new AxesHelper(3))
}
function initCamera() {
  camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(4.25, 1.4, -4.5);
}

function initRenderer() {
  renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 支持阴影
  renderer.shadowMap.enabled = true;
  renderer.outputColorSpace = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  document.body.appendChild(renderer.domElement);
}

function loadCarModal() {

  new GLTFLoader().load(
    "models/gltf/Duck/glTF/Lamborghini.glb",
    function (gltf) {
      console.log(gltf);
      const carModel = gltf.scene;

      carModel.rotation.y = Math.PI;

      carModel.traverse((obj) => {
        if (
          obj.name === "Object_103" ||
          obj.name == "Object_64" ||
          obj.name == "Object_77"
        ) {
          // 车身
          obj.material = bodyMaterial;
        } else if (obj.name === "Object_90") {
          // 玻璃
          obj.material = glassMaterial;
        } else if (obj.name === "Empty001_16" || obj.name === "Empty002_20") {
          // 门
          doors.push(obj);
        } else {
        }
        obj.castShadow = true;
      });

      scene.add(carModel);
    },
  );
}

function initAmbientLight() {
  var ambientLight = new AmbientLight("#fff", 0.5);
  scene.add(ambientLight);
}

function initGripHelper() {
  let grid = new GridHelper(20, 40, "red", 0xffffff);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);
}

function initFloor() {
  const floorGeometry = new PlaneGeometry(20, 20);
  const material = new MeshPhysicalMaterial({
    side: DoubleSide,
    color: 0x808080,
    metalness: 0,
    roughness: 0.1,
  });

  const floorMesh = new Mesh(floorGeometry, material);
  floorMesh.rotation.x = Math.PI / 2;
  floorMesh.receiveShadow = true;
  scene.add(floorMesh);
}

function initSpotLight() {
  // 添加头顶聚光灯
  const bigSpotLight = new SpotLight("#ffffff", 0.5);

  bigSpotLight.angle = Math.PI / 8; //散射角度，跟水平线的家教
  bigSpotLight.penumbra = 0.2; // 聚光锥的半影衰减百分比
  bigSpotLight.decay = 2; // 纵向：沿着光照距离的衰减量。
  bigSpotLight.distance = 30;
  bigSpotLight.shadow.radius = 10;
  // 阴影映射宽度，阴影映射高度
  bigSpotLight.shadow.mapSize.set(4096, 4096);

  bigSpotLight.position.set(-5, 10, 1);
  // 光照射的方向
  bigSpotLight.target.position.set(0, 0, 0);
  bigSpotLight.castShadow = true;
  // bigSpotLight.map = bigTexture
  scene.add(bigSpotLight);
}

function initCylinder() {
  const geometry = new CylinderGeometry(10, 10, 20, 20);
  const material = new MeshPhysicalMaterial({
    color: 0x6c6c6c,
    side: DoubleSide,
  });

  const cylinder = new Mesh(geometry, material);
  scene.add(cylinder);
}

function initController() {
  controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;

  controls.maxDistance = 9;
  controls.minDistance = 1;

  controls.minPolarAngle = 0;
  controls.maxPolarAngle = (80 / 360) * 2 * Math.PI;

  // controls.target.set(0, 0.5, 0)
}

function initGUI() {
  var obj = {
    bodyColor: "#6e2121",
    glassColor: "#aaaaaa",
    carOpen,
    carClose,
    carIn,
    carOut,
  };

  const gui = new GUI();
  gui
    .addColor(obj, "bodyColor")
    .name("车身颜色")
    .onChange((value) => {
      bodyMaterial.color.set(value);
    });

  gui
    .addColor(obj, "glassColor")
    .name("玻璃颜色")
    .onChange((value) => {
      glassMaterial.color.set(value);
    });

  gui.add(obj, "carOpen").name("打开车门");
  gui.add(obj, "carClose").name("关门车门");

  gui.add(obj, "carIn").name("车内视角");
  gui.add(obj, "carOut").name("车外视角");
}

function carOpen() {
  carStatus = "open";
  for (let i = 0; i < doors.length; i++) {
    setAnimationDoor({ x: 0 }, { x: Math.PI / 3 }, doors[i]);
  }
}

function carClose() {
  carStatus = "close";
  for (let i = 0; i < doors.length; i++) {
    setAnimationDoor({ x: Math.PI / 3 }, { x: 0 }, doors[i]);
  }
}

function carIn() {
  setAnimationCamera(
    { cx: 4.25, cy: 1.4, cz: -4.5, ox: 0, oy: 0.5, oz: 0 },
    { cx: -0.27, cy: 0.83, cz: 0.6, ox: 0, oy: 0.5, oz: -3 }
  );
}

function carOut() {
  setAnimationCamera(
    { cx: -0.27, cy: 0.83, cz: 0.6, ox: 0, oy: 0.5, oz: -3 },
    { cx: 4.25, cy: 1.4, cz: -4.5, ox: 0, oy: 0.5, oz: 0 }
  );
}

function setAnimationDoor(start, end, mesh) {
  const tween = new TWEEN.Tween(start)
    .to(end, 1000)
    .easing(TWEEN.Easing.Quadratic.Out);
  tween.onUpdate((that) => {
    mesh.rotation.x = that.x;
  });
  tween.start();
}

function setAnimationCamera(start, end) {
  const tween = new TWEEN.Tween(start)
    .to(end, 3000)
    .easing(TWEEN.Easing.Quadratic.Out);
  tween.onUpdate((that) => {
    //  camera.postition  和 controls.target 一起使用
    camera.position.set(that.cx, that.cy, that.cz);
    controls.target.set(that.ox, that.oy, that.oz);
  });
  tween.start();
}

function createSpotlight(color) {
  const newObj = new THREE.SpotLight(color, 2);
  newObj.castShadow = true;
  newObj.angle = Math.PI / 6;
  newObj.penumbra = 0.2;
  newObj.decay = 2;
  newObj.distance = 50;
  return newObj;
}

function initMessiLight() {
  const spotLight1 = createSpotlight("#ffffff");
  const texture = new TextureLoader().load(messi);
  spotLight1.position.set(0, 3, 0);
  spotLight1.target.position.set(-10, 3, 10);
  spotLight1.map = texture;
    lightHelper1 = new THREE.SpotLightHelper(spotLight1);
    scene.add(spotLight1);
}

function initMutilColor() {
  //创建三色光源
  rectLight1 = new THREE.RectAreaLight(0xff0000, 50, 1, 10);
  rectLight1.position.set(15, 10, 15);
  rectLight1.rotation.x = -Math.PI / 2;
  rectLight1.rotation.z = -Math.PI / 4;
  scene.add(rectLight1);

  rectLight2 = new THREE.RectAreaLight(0x00ff00, 50, 1, 10);
  rectLight2.position.set(13, 10, 13);
  rectLight2.rotation.x = -Math.PI / 2;
  rectLight2.rotation.z = -Math.PI / 4;
  scene.add(rectLight2);

  rectLight3 = new THREE.RectAreaLight(0x0000ff, 50, 1, 10);
  rectLight3.position.set(11, 10, 11);
  rectLight3.rotation.x = -Math.PI / 2;
  rectLight3.rotation.z = -Math.PI / 4;
  scene.add(rectLight3);

  scene.add(new RectAreaLightHelper(rectLight1));
  scene.add(new RectAreaLightHelper(rectLight2));
  scene.add(new RectAreaLightHelper(rectLight3));

  startColorAnim();
}

function startColorAnim() {
  const carTween = new TWEEN.Tween({ x: -5 })
    .to({ x: 25 }, 2000)
    .easing(TWEEN.Easing.Quadratic.Out);
  carTween.onUpdate(function (that) {
    rectLight1.position.set(15 - that.x, 10, 15 - that.x);
    rectLight2.position.set(13 - that.x, 10, 13 - that.x);
    rectLight3.position.set(11 - that.x, 10, 11 - that.x);
  });
  carTween.onComplete(function (that) {
    rectLight1.position.set(-15, 10, 15);
    rectLight2.position.set(-13, 10, 13);
    rectLight3.position.set(-11, 10, 11);

    rectLight1.rotation.z = Math.PI / 4;
    rectLight2.rotation.z = Math.PI / 4;
    rectLight3.rotation.z = Math.PI / 4;
  });
  carTween.repeat(10);

  const carTween2 = new TWEEN.Tween({ x: -5 })
    .to({ x: 25 }, 2000)
    .easing(TWEEN.Easing.Quadratic.Out);
  carTween2.onUpdate(function (that) {
    rectLight1.position.set(-15 + that.x, 10, 15 - that.x);
    rectLight2.position.set(-13 + that.x, 10, 13 - that.x);
    rectLight3.position.set(-11 + that.x, 10, 11 - that.x);
  });
  carTween2.onComplete(function (that) {
    rectLight1.position.set(15, 10, 15);
    rectLight2.position.set(13, 10, 13);
    rectLight3.position.set(11, 10, 11);
    rectLight1.rotation.z = -Math.PI / 4;
    rectLight2.rotation.z = -Math.PI / 4;
    rectLight3.rotation.z = -Math.PI / 4;
  });

  carTween.start();
}
function init() {
  initScene();
  initCamera();
  initRenderer();
  loadCarModal();
  initAmbientLight();
  initFloor();
  initSpotLight();
  initMessiLight();
  initCylinder();
  initController();
  initGUI();
  initMutilColor();
}

init();


function render(time) {

  // if (mesh.position.x > 3) {

  // } else {
  //     mesh.position.x += 0.01
  // }

//   renderer.render(scene, camera);
  requestAnimationFrame(render);

  TWEEN.update(time);
  controls.update();
}

render();
window.addEventListener("resize", function () {
  // camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("click", onPointClick);
function onPointClick(event) {
  let pointer = {};
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  var vector = new Vector2(pointer.x, pointer.y);
  var raycaster = new Raycaster();
  raycaster.setFromCamera(vector, camera);
  let intersects = raycaster.intersectObjects(scene.children);

  intersects.forEach((item) => {
    if (item.object.name === "Object_64" || item.object.name === "Object_77") {
      if (!carStatus || carStatus === "close") {
        carOpen();
      } else {
        carClose();
      }
      console.log(intersects);
    }
  });
}