
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { CSS3DRenderer, CSS3DObject } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS3DRenderer.js";
import { app } from './terminal.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 4, -80);
camera.lookAt(0, 1, 0);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let terminalDiv;
let terminalObject;

const loader = new GLTFLoader();

loader.load(
  `./apple_macintosh/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    object.scale.set(1.5,1.5,1.5)
    scene.add(object);

  
    terminalDiv = document.createElement("div");
    terminalDiv.innerHTML = `
      <div class="terminal-window" id="terminalWindow" onclick="document.getElementById('userInput').focus()">
        <div class="terminal-output" id="terminalOutput">
            <div class="terminal-line">
                <span class="help-msg">Welcome to my portfolio! — Type <span class="code">help</span> for a list of supported commands.</span>
            </div>
        </div>
        <div class="terminal-line">
            <span class="success">➜</span>
            <span class="directory">~</span>
            <input type="text" class="user-input" id="userInput" autocomplete="off"></input>
        </div>
    </div>
    `;

  
    terminalObject = new CSS3DObject(terminalDiv);

  
    terminalObject.position.set(0, 6.4, 9);
    terminalObject.scale.set(0.051, 0.056, 0.055);

  
    object.add(terminalObject);

  
    app();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

let isZoomedIn = false;
let targetZoom = camera.position.z;

document.addEventListener("dblclick", (event) => {
  const zoomInDistance = -45; 
  const zoomOutDistance = -80;


  isZoomedIn = !isZoomedIn;
  targetZoom = isZoomedIn ? zoomInDistance : zoomOutDistance;
});


const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3DContainer").appendChild(renderer.domElement);

const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  if (object) {
  
    object.rotation.y = -3.4 + (mouseX * 0.5) / window.innerWidth;
    object.rotation.x = -0.5 + (mouseY * 0.5) / window.innerHeight;
  }


  camera.position.z += (targetZoom - camera.position.z) * 0.1;


  renderer.render(scene, camera);


  cssRenderer.render(scene, camera);
}


window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
});

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

animate();
