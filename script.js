import { GLTFLoader } from "https://threejs.org/examples/jsm/loaders/GLTFLoader.js";
import { voxelizeModel } from "./voxelizer.js";

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

let model;  // store model globally

// LOAD THE MODEL
const loader = new GLTFLoader();
loader.load("city.glb", gltf => {
  model = gltf;
  scene.add(model.scene);
});

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();


// =============================
// VOXELIZER / EXPORT SECTION
// =============================
document.addEventListener("keydown", e => {
  if (e.key === "v") {   // Press V to export
    if (!model) return alert("Model not loaded yet!");

    const voxels = voxelizeModel(model.scene, 2); // size 2 blocks
    downloadJSON(voxels);
  }
});

function downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "city_bloxd.json";
  a.click();
}
