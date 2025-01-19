// Import necessary libraries
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { CSS3DRenderer, CSS3DObject } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/renderers/CSS3DRenderer.js";
import { app } from './terminal.js';

// Create a Three.js Scene
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 4, -80);
camera.lookAt(0, 1, 0);

// Mouse movement tracking
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Variables for the 3D object and controls
let object;
let terminalDiv;
let terminalObject;

// Load the GLTF model
const loader = new GLTFLoader();

loader.load(
  `./apple_macintosh/scene.gltf`, // Replace with your model path
  function (gltf) {
    object = gltf.scene;
    object.scale.set(1.5,1.5,1.5)
    scene.add(object);

    // Create the CSS3DObject for the terminal window
    terminalDiv = document.createElement("div");
    terminalDiv.innerHTML = `
      <div class="terminal-window">
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

    // Make the terminal a CSS3DObject
    terminalObject = new CSS3DObject(terminalDiv);

    // Position and scale the terminal to fit the 3D model screen
    terminalObject.position.set(0, 6.3, 9);
    terminalObject.scale.set(0.050, 0.056, 0.055);

    // Add the terminal as a child of the 3D model
    object.add(terminalObject);

    // Initialize the terminal app after the terminal is added to the DOM
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


// Double-click event listener for zoom effect
document.addEventListener("dblclick", (event) => {
  const zoomInDistance = -45;  // Distance to zoom in
  const zoomOutDistance = -80; // Distance to zoom out (original position)

  // Toggle between zoomed in and original position
  isZoomedIn = !isZoomedIn;
  targetZoom = isZoomedIn ? zoomInDistance : zoomOutDistance;
});


// Renderer setup for 3D canvas
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("3DContainer").appendChild(renderer.domElement);

// CSS3DRenderer for rendering HTML content within 3D space
const cssRenderer = new CSS3DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = 'absolute';
cssRenderer.domElement.style.top = '0';
document.body.appendChild(cssRenderer.domElement);

// Render function to animate the scene
function animate() {
  requestAnimationFrame(animate);

  if (object) {
    // Update object rotation based on mouse position
    object.rotation.y = -3.4 + (mouseX * 0.5) / window.innerWidth;
    object.rotation.x = -0.5 + (mouseY * 0.5) / window.innerHeight;
  }

  // Smoothly interpolate camera position
  camera.position.z += (targetZoom - camera.position.z) * 0.1; // Adjust 0.1 for speed

  // Render the 3D scene with WebGLRenderer
  renderer.render(scene, camera);

  // Render the CSS3D content with CSS3DRenderer
  cssRenderer.render(scene, camera);
}


// Handle window resizing
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
});

// Mouse position listener
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// Start the 3D rendering loop
animate();
