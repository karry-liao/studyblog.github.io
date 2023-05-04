// 基础班： 立方体运动

import * as THREE from "three";
import {
  BoxGeometry,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  TextureLoader,
  AxesHelper,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import pkq from "../modles/pkq1.jpg";

const TWEEN = require("@tweenjs/tween.js");

let scene, camera, renderer, controls, mesh;

// 初始化场景
function initScene() {
    scene = new Scene()

    scene.add(new AxesHelper(3))
}

function initMesh() {
    const geometry = new BoxGeometry(1, 1, 1)

    const texture = new TextureLoader().load(pkq)

    const material = new MeshBasicMaterial({
        color: 'yellow',
        map: texture
    })

    mesh = new Mesh(geometry, material)
    scene.add(mesh)
}

function initCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

    camera.position.z = 10
}

function initRenderer() {
    renderer = new WebGLRenderer({
        antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight/2)

    document.body.appendChild(renderer.domElement)
}


function init() {
    initScene()
    initCamera()
    initRenderer()

    initMesh()

    controls = new OrbitControls(camera, renderer.domElement)
}

init();

// 3秒 运动 3个单位， 1/s
const coords = { x: 0 } // Start at (0, 0)
const tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
    .to({ x: 3 }, 3000) // Move to (300, 200) in 1 second.
    .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    .onUpdate(() => {
        mesh.position.x = coords.x
    })
    .start() // Start the tween immediately.


function render(time) {

    // if (mesh.position.x > 3) {

    // } else {
    //     mesh.position.x += 0.01
    // }

    renderer.render(scene, camera)
    requestAnimationFrame(render)

    TWEEN.update(time)
}

render()

window.addEventListener('resize', function () {
    // camera
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // renderer
    renderer.setSize(window.innerWidth, window.innerHeight)
})