let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let modeToggleBtn = document.getElementById('modeToggleBtn');

let timeDisplay = document.getElementById('time');
let lapsContainer = document.getElementById('laps');

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

function formatTime(timeInMs) {
    let hours = Math.floor(timeInMs / 3600000);
    let minutes = Math.floor((timeInMs % 3600000) / 60000);
    let seconds = Math.floor((timeInMs % 60000) / 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime + (Date.now() - startTime));
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 1000);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    elapsedTime = 0;
    lapTimes = [];
    timeDisplay.textContent = formatTime(0);
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime + (Date.now() - startTime);
        lapTimes.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
        lapElement.classList.add(document.body.classList.contains('night-mode') ? 'night-mode' : 'light-mode');
        lapsContainer.appendChild(lapElement);
    }
}

function toggleMode() {
    document.body.classList.toggle('night-mode');
    document.body.classList.toggle('light-mode');
    modeToggleBtn.textContent = document.body.classList.contains('night-mode') ? 'Light Mode' : 'Night Mode';
    
    // Apply mode classes to existing elements
    document.querySelectorAll('button, ul li').forEach(element => {
        element.classList.toggle('night-mode');
        element.classList.toggle('light-mode');
    });
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
modeToggleBtn.addEventListener('click', toggleMode);
