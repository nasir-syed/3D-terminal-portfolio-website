let terminalOutput;
let userInput;
let terminalWind;
let modals = {}; // Track open modals for each project

export const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  terminalWind = document.getElementById("terminalWindow")

  console.log("Terminal Div:", document.getElementById("userInput"));
  console.log("Terminal Output Div:", document.getElementById("terminalOutput"));

  if (!userInput || !terminalOutput || !terminalWind) {
    console.error("Terminal elements are not found. Retrying initialization...");
    setTimeout(app, 100); // Retry initialization after a short delay
    return;
  }

    // Prevent body scrolling when touching the terminal window
  terminalWind.addEventListener("touchstart", () => {
    document.body.style.overflow = "hidden";  // Disable body scroll
  });

  terminalWind.addEventListener("touchend", () => {
    document.body.style.overflow = "auto";   // Enable body scroll again
  });

  console.log("Terminal elements initialized successfully.");
};

const execute = function executeCommand(input) {
  if (!terminalOutput) {
    console.error("Terminal output element is not initialized.");
    return;
  }

  let output;
  input = input.toLowerCase().trim();

  if (input.length === 0) {
    return;
  }

  output = `<div class="terminal-line"><span class="success">➜</span> <span class="directory">~</span> ${input}</div>`;
  if (!COMMANDS.hasOwnProperty(input)) {
    output += `<div class="terminal-line">no such command: <span class="output">"${input}"</span></div>`;
  } else {
    output += `<div class="output"> ${COMMANDS[input]} </div>`;
  }

  terminalOutput.innerHTML += `<div class="terminal-line">${output}</div>`;

  // Automatically scroll to the bottom of the terminal window
  const terminalWindow = terminalOutput.closest('.terminal-window'); // Get the parent container
  if (terminalWindow) {
    terminalWindow.scrollTop = terminalWindow.scrollHeight;
  }
};


const key = function keyEvent(e) {
  if (!userInput) {
    console.error("User input element not found.");
    return;
  }

  let input = userInput.value;

  if (e.key === "Enter") {
    execute(input);
    userInput.value = "";
    return;
  }
};


function showProjectModal(projectId) {
  // Prevent opening a new modal if one is already open for this project
  if (modals[projectId]) {
    return; // Exit function if modal is already open
  }

  const terminalWindow = document.querySelector('.terminal-window');

  // Create modal div
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("project-modal");

  // Set modal content based on the projectId
  let modalContent = '';
  
  switch (projectId) {
    case 'mlp':
      modalContent = `
        <h2>MNIST with MLP Model from Scratch</h2>
        <p>This project involves building a Multi-Layer Perceptron (MLP) model from scratch to classify the MNIST dataset, using Python with Pandas and Numpy Libraries.</p>
      `;
      break;
  
    case 'gcdf':
      modalContent = `
        <h2>GCDF Guitar Chords Image Classification [with OpenCV]</h2>
        <p>This project classifies guitar chords from images using OpenCV for image processing and a deep learning model for classification.</p>
      `;
      break;
  
    case 'caudio':
      modalContent = `
        <h2>Chord Audio Classification</h2>
        <p>This project aims to classify chord sounds in audio files using a machine learning model for audio feature extraction and classification.</p>
      `;
      break;
  
    default:
      console.error('Project ID not recognized');
      return;
  }  

  modalDiv.innerHTML = `
    <div class="modal-content">
      ${modalContent}
      <button class="close-btn">Close</button>
    </div>
  `;

  terminalWindow.appendChild(modalDiv);

  // Mark this modal as open for the projectId
  modals[projectId] = modalDiv;

  // for dragging
  let isDragging = false;
  let offsetX, offsetY;

  // Mouse down event to start dragging
  modalDiv.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - modalDiv.offsetLeft;
    offsetY = e.clientY - modalDiv.offsetTop;
    modalDiv.style.cursor = 'grabbing';
  });

  // Mouse move event to move the modal
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      modalDiv.style.left = `${e.clientX - offsetX}px`;
      modalDiv.style.top = `${e.clientY - offsetY}px`;
    }
  });

  // Mouse up event to stop dragging
  document.addEventListener('mouseup', () => {
    isDragging = false;
    modalDiv.style.cursor = 'move';
  });

  modalDiv.querySelector('.close-btn').addEventListener('click', () => {
    closeProjectModal(projectId, modalDiv);
  });
}


function closeProjectModal(projectId, modal) {
  if (modal) {
    modal.remove();
    delete modals[projectId]; 
  }
}

window.showProjectModal = showProjectModal;
window.closeProjectModal = closeProjectModal;





document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", () => {
  app(); // Ensure the terminal is initialized after the DOM is loaded
});

const COMMANDS = {
  help:
    'Supported commands: ["<span class="code">about</span>", "<span class="code">experience</span>", "<span class="code">education</span>", "<span class="code">skills</span>", "<span class="code">projects</span>", "<span class="code">contacts</span>"]',
  about:
    "Hello 👋<br>I'm Syed Nasiruddin, an aspiring web developer and data scientist currently in the final year of my Information Technology Degree at Middlesex University Dubai. I have a burning passion to want and help others with code that I create. I enjoy the limitless potential of impact that I can have with what I build. It is what pushes me every day to become a better developer.",
  skills:
    '<span class="code">Languages:</span> HTML, CSS, JavaScript, TypeScript, Python, Java <br><span class="code">Technologies:</span> Git, REST API\'s<br><span class="code">Frameworks:</span> React.js, Next.js, Vue.js',
  education:
    "B.Sc. Honours Infomation Technology - Middlesex University Dubai",
  experience:
    "I'm currently working as a student learning assistant at the university that involves assisting the lecturer in teaching the students.",
  contact:
    'You can contact me on any of the following:<br>["<a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed" class="social link">GitHub</a>", "<a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/syed-nasiruddin/" class="social link">Linkedin</a>"]',
    projects: `
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/MLP-from-scratch" class="social link">MNIST with MLP Model from Scratch</a><br>
    <button class="view-btn" onclick="showProjectModal('mlp')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/GCDF-guitar-chords-classification" class="social link">GCDF Guitar Chords Image Classification [with OpenCV]</a><br>
    <button class="view-btn" onclick="showProjectModal('gcdf')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/chord-audio-classification" class="social link">Chord Audio Classification</a><br>
    <button class="view-btn" onclick="showProjectModal('caudio')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/amazon-reviews-sentiment-analysis" class="social link">Amazon Reviews Sentiment Analysis</a><br>
    <button class="view-btn" onclick="showProjectModal('amzrevs')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/california-housing-value-prediction" class="social link">California Housing Value Prediction</a><br>
    <button class="view-btn" onclick="showProjectModal('cali')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/california-housing-value-prediction" class="social link">Similar Scents Perfume Recommendation/a><br>
    <button class="view-btn" onclick="showProjectModal('similarscents')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/Chomper-Game-Website" class="social link">Chomper Web Game (Pacman Inspired)</a><br>
    <button class="view-btn" onclick="showProjectModal('chomper')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/Pixstar-Website" class="social link">Pixstar (Pinterest Clone)</a><br>
    <button class="view-btn" onclick="showProjectModal('pixstar')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/Clonify" class="social link">Clonify (Spotify Clone)</a><br>
    <button class="view-btn" onclick="showProjectModal('clonify')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/4sail-Website" class="social link">4sail Marketplace</a><br>
    <button class="view-btn" onclick="showProjectModal('4sail')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/Blind75" class="social link">Blind75 LeetCode Problems</a><br>
    <button class="view-btn" onclick="showProjectModal('blind75')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/Java-Quiz-Generator" class="social link">Java Quiz Game (JavaFX GUI)</a><br>
    <button class="view-btn" onclick="showProjectModal('quiz')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/Personal-Spotify-Dashboard" class="social link">Personal Spotify Dashboard</a><br>
    <button class="view-btn" onclick="showProjectModal('spotifydash')">[View Description]</button><br><br>
    <p>[Click on the name of the project to go to its GitHub page]</p><br>
  `,  
  larry: "<img src='https://preview.redd.it/evil-larry-contender-v0-o2vtj7gpkb6e1.jpeg?width=1170&format=pjpg&auto=webp&s=10958a5cea725761891c1c5037d0da4617c1376d' alt='Evil Larry' />",
};