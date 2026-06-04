let spinnerContainer = document.getElementById('spinners');
let spinnerUp = document.getElementById('spinnerup');
let spinnerDown = document.getElementById('spinnerdown');
let timerInput = document.getElementById('timerinput');
let timer = document.getElementById('timer');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let goal = document.getElementById('goal');
let goalInput = document.getElementById('goalinput');
const buzzerSound = new Audio('../../assets/audios/buzzer.mp3');

let time;
let timerCount;
let timerOn = false;

window.addEventListener("load", () => {
    let previousTime = localStorage.getItem("taskTime");
    let previousGoal = localStorage.getItem("goal");

    timerInput.value = "00";
    startButton.style.display = "none";

    if (previousTime) {
        timerOn = true;
        time = previousTime;

        let minute = Math.floor(time / 60);
        let second = (time % 60);

        if (minute < 10) {
            minute = String("0" + minute);
        }

        if (second < 10) {
            second = String("0" + second);
        }

        timer.innerText = String(minute + " : " + second);

        spinnerContainer.style.display = "none";

        startButton.style.display = "inline";
        startButton.innerText = "Pause";

        timerInput.style.display = "none";

        startTimer();        
    }

    if (previousGoal || previousGoal == "") {
        goalInput.style.display = "none";
        goal.innerText = previousGoal;
    }
})



spinnerUp.addEventListener("click", () => {
    let currentValue = Number(timerInput.value);
    let newValue;

    newValue = currentValue + 5;

    if (newValue > 60) {
        return;
    }

    if (newValue < 10) {
        newValue = "0" + newValue;
    }

    if (newValue != 0) {
        startButton.style.display = "block";
    } else {
        startButton.style.display = "none";
    }

    timerInput.value = newValue;
})

spinnerDown.addEventListener("click", () => {
    let currentValue = Number(timerInput.value);
    let newValue

    newValue = currentValue - 5;

    if (newValue < 0) {
        return;
    }

    if (newValue < 10) {
        newValue = "0" + newValue;
    }
    
    if (newValue != 0) {
        startButton.style.display = "block";
    } else {
        startButton.style.display = "none";
    }

    timerInput.value = newValue;
})

function startTimer() {
    clearInterval(timerCount);
    timerCount = setInterval(() => {

        let minute = Math.floor(time / 60);
        let second = (time % 60);

        if (minute < 10) {
            minute = String("0" + minute);
        }

        if (second < 10) {
            second = String("0" + second);
        }

        timer.innerText = String(minute + " : " + second);

        if ((time - 1) < 0) {
            startButton.innerText = "Start";
            startButton.style.display = "none";
            stopButton.innerText = "Exit";
            stopButton.style.display = "inline";
            timer.style.color = "var(--urgent)";
            timerInput.style.color = "var(--urgent)";
            goal.style.color = "var(--urgent)";
            buzzerSound.play();
            clearInterval(timerCount);
            localStorage.removeItem("taskTime");
            localStorage.removeItem("goal");
            return;
        }

        time--;
        localStorage.setItem("taskTime", time);
        timerOn = true;
    }, 1000)    
}

startButton.addEventListener("click", () => {
    if (timerOn) {
        timerOn = false;
        stopButton.style.display = "block"
        startButton.innerText = "Resume";
        clearInterval(timerCount);

    } else {
        timerOn = true;
        spinnerContainer.style.display = "none";
        stopButton.style.display = "none"
        startButton.innerText = "Pause";
        timerInput.style.display = "none";

        if (!time) {
            time = (Number(timerInput.value) * 60);
            timer.innerText = (timerInput.value + " : " + "00");

            if (!goalInput.value == "") {
                goalInput.style.display = "none";
                goal.innerText = (goalInput.value);
                localStorage.setItem("goal", goalInput.value);
            } else {
                goalInput.style.display = "none"
                goal.style.display = "none"
            }

        }

        startTimer();
        
    }
})

stopButton.addEventListener("click", () => {
    timerOn = false;
    time = null;
    buzzerSound.pause()
    buzzerSound.currentTime = 0;

    startButton.innerText = "Start";
    startButton.style.display = "none";

    stopButton.style.display = "none";
    stopButton.innerText = "Reset"

    spinnerContainer.style.display = "flex";

    timer.style.color = "var(--studyfontclr)";
    timer.innerText = ":00";    

    timerInput.style.color = "var(--studyfontclr)";
    timerInput.value = "00";
    timerInput.style.display = "inline";

    goal.style.display = "inline";
    goal.innerText = "Goal: ";
    goal.style.color = "var(--studyfontclr)";

    goalInput.style.display = "inline";

    clearInterval(timerCount);
    localStorage.removeItem("taskTime");
    localStorage.removeItem("goal");
    timerCount = null;
})