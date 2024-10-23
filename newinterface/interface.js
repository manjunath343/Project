const video = document.getElementById('videoDisplay');
const uploadedVideo = document.getElementById('uploadedVideo');
const startButton = document.getElementById('startCamera');
const stopButton = document.getElementById('stopCamera');
const statsDisplay = document.getElementById('stats');
const alertContainer = document.getElementById('alert-container');
const densityIndicator = document.getElementById('densityIndicator');
let mediaStream;

// Function to start the camera
startButton.addEventListener('click', async () => {
    try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = mediaStream;
    } catch (error) {
        console.error('Error accessing camera: ', error);
    }
});

// Function to stop the camera
stopButton.addEventListener('click', () => {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
});

// Function to handle video upload
document.getElementById('videoUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const url = URL.createObjectURL(file);
        uploadedVideo.src = url;
        uploadedVideo.play();
    }
});

// Simulate crowd density
function getCrowdDensity() {
    return Math.floor(Math.random() * 100);
}

// Update indicator based on crowd density
function updateIndicator(crowdDensity) {
    if (crowdDensity < 30) {
        densityIndicator.style.backgroundColor = 'green';
    } else if (crowdDensity < 70) {
        densityIndicator.style.backgroundColor = 'yellow';
    } else {
        densityIndicator.style.backgroundColor = 'red';
    }
}

// Function to check crowd density and display alert if needed
function checkCrowdDensity() {
    const crowdDensity = getCrowdDensity();
    statsDisplay.textContent = `Crowd Density: ${crowdDensity}%`;
    updateIndicator(crowdDensity); // Update the indicator

    if (crowdDensity > 50) {
        const newAlert = document.createElement('div');
        newAlert.classList.add('alert-box');
        newAlert.innerHTML = `Alert: High Crowd Density! (${crowdDensity}%)`;

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.innerHTML = `Time: ${new Date().toLocaleTimeString()}`;

        newAlert.appendChild(timestamp);
        alertContainer.appendChild(newAlert);
    }
}

// Check crowd density every second
setInterval(checkCrowdDensity, 1000);

// Clear alerts on button click
document.getElementById('clear-btn').addEventListener('click', () => {
    alertContainer.innerHTML = '';
});
