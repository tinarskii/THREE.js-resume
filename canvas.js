// Texture
var EarthTexture = new THREE.TextureLoader().load("./public/earth.jpg");
var EarthNormalMap = new THREE.TextureLoader().load("./public/normal.tif");
var MoonTexture = new THREE.TextureLoader().load("./public/moon.jpg");
var SunTexture = new THREE.TextureLoader().load("./public/sun.jpg");

// Set background image
const bgImg = new THREE.TextureLoader().load("./public/bg.jpg", (texture) => {
  scene.background = texture;
});

window.onload = () => {
  if (EarthTexture && SunTexture && MoonTexture && EarthNormalMap && bgImg) {
    document.getElementById("loading").style.display = "none";
  }
};

import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {
  Lensflare,
  LensflareElement,
} from "https://threejs.org/examples/jsm/objects/Lensflare.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const Light = new THREE.PointLight(0xffffff, 2, 0);
scene.add(Light);
const controls = new OrbitControls(camera, renderer.domElement);

// Earth
const earthGeo = new THREE.SphereGeometry(2, 4096, 128);
const earthMat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: EarthTexture,
  normalMap: EarthNormalMap,
});
const earth = new THREE.Mesh(earthGeo, earthMat);

earth.position.y = 0;
earth.position.z = 0;
earth.position.x = 0;

scene.add(earth);

const moonGeo = new THREE.SphereGeometry(0.2, 512, 128);
const moonMat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: MoonTexture,
});
const moon = new THREE.Mesh(moonGeo, moonMat);

moon.position.y = 0;
moon.position.z = 2;
moon.position.x = 2;

scene.add(moon);

const sunGeo = new THREE.SphereGeometry(2, 64);
const sunMat = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  map: SunTexture,
});
const sun = new THREE.Mesh(sunGeo, sunMat);

sun.position.y = 0;
sun.position.z = 50;
sun.position.x = 50;

scene.add(sun);

// Set camera position
camera.position.y = 250;
camera.position.x = 250;
camera.position.z = 250;

const lensflare = new Lensflare();
const lensflareTexture = new THREE.TextureLoader().load(
  "./public/lensflare.png"
);

lensflare.addElement(new LensflareElement(lensflareTexture, 512, 0));
Light.add(lensflare);

let t = 0;
let c = 0.01;
let anim;

let zoomIn = setInterval(() => {
  if (camera.position.z > 5) {
    camera.position.y = camera.position.y - 2;
    camera.position.x = camera.position.x - 2;
    camera.position.z = camera.position.z - 2;
  } else {
    clearInterval(zoomIn);
  }
}, 10);

window.onclick = () => {
  if (camera.position.z === 4) {
    let zoomIn = setInterval(() => {
      if (camera.position.z > 1) {
        camera.position.y = camera.position.y - 0.02;
        camera.position.x = camera.position.x - 0.02;
        camera.position.z = camera.position.z - 0.02; // 0.9999999999999973
        document.getElementById("canvas").classList.add("animate-fade-out");
        document.getElementById("title").classList.add("animate-fade-out");
        setTimeout(() => {
          window.location.href = "./about";
        }, 3000);
      } else {
        clearInterval(zoomIn);
      }
    }, 10);
  }
};

setTimeout(() => {
  document.getElementById("title").classList.remove("hidden");
  document.getElementById("title").classList.add("animate-fade");
}, 2500);

const animate = function () {
  anim = requestAnimationFrame(animate);

  t += c;

  earth.rotation.y += (0.001 / 150) * 100;

  moon.position.z = 3 * Math.cos((t / 365) * 100) + 0;
  moon.position.x = 3 * Math.sin((t / 365) * 100) + 0;

  renderer.render(scene, camera);
};
controls.update();
animate();
