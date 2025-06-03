let terminalOutput;
let userInput;
let terminalWind;
let modals = {}; 

export const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  terminalWind = document.getElementById("terminalWindow")

  console.log("Terminal Div:", document.getElementById("userInput"));
  console.log("Terminal Output Div:", document.getElementById("terminalOutput"));

  if (!userInput || !terminalOutput || !terminalWind) {
    console.error("Terminal elements are not found. Retrying initialisation...");
    setTimeout(app, 100); 
    return;
  }

  
  terminalWind.addEventListener("touchstart", () => {
    document.body.style.overflow = "hidden";  
  });

  terminalWind.addEventListener("touchend", () => {
    document.body.style.overflow = "auto";   
  });

};

const execute = function executeCommand(input) {
  if (!terminalOutput) {
    console.error("Terminal output element is not initialised.");
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


  const terminalWindow = terminalOutput.closest('.terminal-window');
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

  if (modals[projectId]) {
    return; 
  }

  const terminalWindow = document.querySelector('.terminal-window');

  
  const modalDiv = document.createElement("div");
  modalDiv.classList.add("project-modal");

  let modalContent = '';
  
  switch (projectId) {

    case 'melodex':
      modalContent = `
        <h2>Melodex: Music Reviewing & Personalised Recommendations App</h2>
        <p>A music reviewing social platform with personalised music discovery based on user preferences like mood (via facial emotion recognition), activity, similar songs, and more.</p>
      `;
      break;

    case 'visn':
      modalContent = `
        <h2>VISN - Dynamic Algorithm Visualiser</h2>
        <p>An algorithm visualiser that provides dynamic animations (incorporating user input), step-by-step breakdowns, code snippets, complexity analysis, advantages, and more for various algorithms!</p>
      `;
      break;

    case 'mlp':
      modalContent = `
        <h2>MNIST with MLP Model from Scratch</h2>
        <p>A MLP model with RMSProp optimizer for the MNIST dataset, using only NumPy and Pandas, achieving 98% accuracy.</p>
      `;
      break;
  
    case 'gcdf':
      modalContent = `
        <h2>GCDF Guitar Chords Image Classification [with OpenCV]</h2>
        <p>A TensorFlow CNN model to classify images of G, C, D, and F guitar chords with ~95% test accuracy, with an optional OpenCV integration for real-time classification.</p>
      `;
      break;
  
    case 'caudio':
      modalContent = `
        <h2>Chord Audio Classification</h2>
        <p>Two CNN models for chord recognition: one for acoustic guitar and another for diverse genres/guitar types (e.g., rock).</p>
      `;
      break;
    
    case 'amzrevs':
      modalContent = `
        <h2>Amazon Reviews Sentiment Analysis</h2>
        <p>A sentiment analysis model to classify Amazon reviews (positive/negative) using Python, NLTK, and scikit-learn.</p>
      `;
      break;
  
    case 'cali':
      modalContent = `
        <h2>California Housing Value Prediction</h2>
        <p>A machine learning model to predict California housing prices using census data, encompassing data visualisation, preprocessing, and model application.</p>
      `;
      break;
  
    case 'similarscents':
      modalContent = `
        <h2>Similar Scents Perfume Recommendation</h2>
        <p>A Flask application that recommends perfumes with similar scent profiles based on user-provided input.</p>
      `;
      break;

    case 'chomper':
      modalContent = `
        <h2>Chomper Web Game (Pacman Inspired)</h2>
        <p>A Pac-Man-inspired game using JavaScript with dynamic ghost movement, collision detection, power-ups, and a leaderboard to track scores.</p>
      `;
      break;
  
    case 'pixstar':
      modalContent = `
        <h2>Pixstar (Pinterest Clone)</h2>
        <p>A Pinterest-like platform with core features such as image uploads, search capabilities for users and posts, and a social following system</p>
      `;
      break;
  
    case 'clonify':
      modalContent = `
        <h2>Clonify (Spotify Clone)</h2>
        <p>A Spotify clone with core functionalities, including song management (add/remove) and playlist creation.</p>
      `;
      break;

    case '4sail':
      modalContent = `
        <h2>4sail Marketplace</h2>
        <p>A Dubizzle-like classifieds platform enabling item listing, wishlisting, and real-time buyer/seller communication.</p>
      `;
      break;

    case 'blind75':
      modalContent = `
        <h2>Blind75 LeetCode Problems</h2>
        <p>Solved 75 LeetCode problems commonly asked in FAANG company interviews, focusing on data structures and algorithms.</p>
      `;
      break;
  
    case 'quiz':
      modalContent = `
        <h2>Java Quiz Game (JavaFX GUI)</h2>
        <p>A JavaFX timed quiz application spanning multiple genres, incorporating score tracking and performance feedback.</p>
      `;
      break;
  
    case 'spotifydash':
      modalContent = `
        <h2>Personal Spotify Dashboard</h2>
        <p>A personal Spotify dashboard with Spotipy and Streamlit, visualising top artists/tracks and analysing song characteristics.  The dashboard provides interactive energy/danceability graphs and personalised music recommendations.</p>
      `;
      break;
  
    default:
      console.error('Project ID not recognised');
      return;
  }  

  modalDiv.innerHTML = `
    <div class="modal-content">
      ${modalContent}
      <button class="close-btn">Close</button>
    </div>
  `;

  terminalWindow.appendChild(modalDiv);


  modals[projectId] = modalDiv;


  let isDragging = false;
  let offsetX, offsetY;


  modalDiv.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - modalDiv.offsetLeft;
    offsetY = e.clientY - modalDiv.offsetTop;
    modalDiv.style.cursor = 'grabbing';
  });


  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      modalDiv.style.left = `${e.clientX - offsetX}px`;
      modalDiv.style.top = `${e.clientY - offsetY}px`;
    }
  });


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
  app();
});

const COMMANDS = {
  help:
    'Supported commands: ["<span class="code">about</span>", "<span class="code">experience</span>", "<span class="code">education</span>", "<span class="code">skills</span>", "<span class="code">projects</span>", "<span class="code">contacts</span>"]',
  about:
    "Hello 👋<br>I'm Syed Nasiruddin, currently in the final year of my Information Technology Degree at Middlesex University Dubai and I have keen interest in Full-Stack Development and Data Science !",
  skills:
    `
        <span class="code">Languages:</span> HTML, CSS, JavaScript, Python, Java, SQL<br>
        <span class="code">Frameworks/Libraries:</span> React.js, Vue.js, Tailwind CSS, Express.js, Node.js<br>
        <span class="code">Data & Visualisation:</span> MySQL, MongoDB, Tableau<br>
        <span class="code">General Skills:</span> Full-Stack Development, Machine Learning, Problem-Solving, Teamwork, Leadership, Adaptability, Project Management
    `,
  education:
    "B.Sc. Honours Infomation Technology - Middlesex University Dubai",
  experience:
    "I'm currently working as a student learning assistant at the university that involves assisting the lecturer in teaching the students.",
  contacts:
    'You can contact me on any of the following:<br>["<a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed" class="social link">GitHub</a>", "<a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/syed-nasiruddin/" class="social link">Linkedin</a>"]',
    projects: `
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/Melodex" class="social link">Melodex: Music Reviewing & Personalised Recommendations App</a><br>
    <button class="view-btn" onclick="showProjectModal('melodex')">[View Description]</button><br><br>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/nasir-syed/VISN-algorithm-visualiser" class="social link">VISN - Dynamic Algorithm Visualiser</a><br>
    <button class="view-btn" onclick="showProjectModal('visn')">[View Description]</button><br><br>
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
