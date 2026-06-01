let spinnerContainer = document.getElementById('spinners');
let spinnerUp = document.getElementById('spinnerup');
let spinnerDown = document.getElementById('spinnerdown');
let timerInput = document.getElementById('timerinput');
let timer = document.getElementById('timer');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop')

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

let timerOn;
let timeStopped;

function tickTimer(timeNow) {
    if (timerOn) {
        let minutes = (Math.floor(timeNow / 60));
        let seconds = (timeNow % 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        timer.innerText = String(minutes + " : " + seconds);
        timeStopped = String(minutes + " : " + seconds);
    }
}

startButton.addEventListener("click", () => {
    if (timerOn) {
        timerOn = false;
        stopButton.style.display = "block"
        startButton.innerText = "Resume";
    } else {
        timerOn = true;
        spinnerContainer.style.display = "none";
        stopButton.style.display = "none"
        startButton.innerText = "Pause";
        timerInput.style.display = "none";


        timer.innerText = (timerInput.value + " : " + "00");

        let timerLength = timerInput.value * 60;


        for (let i = timerLength; i >= 0; i--) {
            let time = timerLength - i;
            if (timeStopped) {
                time = timeStopped
            }
            setTimeout(() => {
                tickTimer(time);
            }, (i * 1000));
        }
    }
})

stopButton.addEventListener("click", () => {
    timerOn = '';
    timeStopped = '';

    startButton.innerText = "Start";
    startButton.style.display = "none";
    stopButton.style.display = "none";
    spinnerContainer.style.display = "flex";
    timerInput.value = "00";
    timerInput.style.display = "inline";
    timer.innerText = ":00";
})