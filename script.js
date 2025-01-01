let clicks = 0;
let cps = 0;
let highScore = 0;
let timerRunning = false;
let timerDuration = 0;
let timeLeft = 0;
let timerInterval;

const clickArea = document.getElementById('click-area');
const cpsDisplay = document.getElementById('cps');
const clicksDisplay = document.getElementById('clicks');
const highScoreDisplay = document.getElementById('high-score');
const timeLeftDisplay = document.getElementById('time-left');
const timerButtons = document.querySelectorAll('.timer-btn');

timerButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (timerRunning) return;
        timerDuration = parseInt(button.getAttribute('data-time'));
        timeLeft = timerDuration;
        timeLeftDisplay.textContent = timeLeft;
        clicks = 0;
        clicksDisplay.textContent = clicks;
        cpsDisplay.textContent = "0";
        startTimer();
    });
});

clickArea.addEventListener('click', () => {
    if (timerRunning) {
        clicks++;
        clicksDisplay.textContent = clicks;
    }
});

function startTimer() {
    timerRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            calculateCPS();
        }
    }, 1000);
}

function calculateCPS() {
    cps = clicks / timerDuration;
    cpsDisplay.textContent = cps.toFixed(2);
    if (cps > highScore) {
        highScore = cps;
        highScoreDisplay.textContent = highScore.toFixed(2);
    }
}