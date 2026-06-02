let spinnerContainer = document.getElementById('spinners');
let spinnerUp = document.getElementById('spinnerup');
let spinnerDown = document.getElementById('spinnerdown');
let timerInput = document.getElementById('timerinput');
let timer = document.getElementById('timer');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
const buzzerSound = new Audio('../../assets/audios/buzzer.mp3');

timerInput.value = "00";
startButton.style.display = "none"

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

let time;
let timerCount;

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
            startButton.innerText = "Start"
            startButton.style.display = "none"
            stopButton.innerText = "Exit"
            stopButton.style.display = "inline"
            timer.style.color = "var(--urgent)"
            timerInput.style.color = "var(--urgent)"
            buzzerSound.play()
            startButton.innerText
            clearInterval(timerCount);
            return;
        }

        time--;
    }, 1000)    
}



let timerOn = false;

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

    timer.style.color = "var(--studyfontclr)"
    timer.innerText = ":00";    

    timerInput.style.color = "var(--studyfontclr)"
    timerInput.value = "00";
    timerInput.style.display = "inline";

    clearInterval(timerCount);
    timerCount = null;
})