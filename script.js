import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("viewer")
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(10, 10, 10);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(20, 20, 20);
scene.add(light);

// LOAD 3D MODEL
const loader = new GLTFLoader();
loader.load("city.glb", model => {
  scene.add(model.scene);
});

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
