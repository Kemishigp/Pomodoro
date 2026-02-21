let countdown; // Variable to store the interval
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;

const timerLabel = document.getElementById('timerLbl');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const breakBtn = document.getElementById('breakBtn');

// Function to update the text on the screen
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    // Add a leading zero if seconds are less than 10
    timerLabel.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

startBtn.addEventListener('click', () => {
    if (isRunning) {
        // PAUSE LOGIC
        clearInterval(countdown);
        isRunning = false;
        startBtn.textContent = "Start"; 
    } else {
        // START LOGIC
        isRunning = true;
        startBtn.textContent = "Pause";
        countdown = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(countdown);
                isRunning = false;
                startBtn.textContent = "Start";
                alert("Time's up!");
            }
        }, 1000);
    }
});


breakBtn.addEventListener('click', () => {
    // 1. Reset everything
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = "Start";

    // 2. Set time to 5 minutes
    timeLeft = 5 * 60; 
    updateDisplay();

    // 3. Switch theme
    document.body.classList.add('break-mode');
});

// Update your Restart Logic to remove the break theme
restartBtn.addEventListener('click', () => {
    clearInterval(countdown);
    isRunning = false;
    startBtn.textContent = "Start";
    
    timeLeft = 25 * 60;
    updateDisplay();
    
    // Switch back to original theme (gray)
    document.body.classList.remove('break-mode');
});