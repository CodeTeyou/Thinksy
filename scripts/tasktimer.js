let spinnerContainer = document.getElementById("spinners");
let spinnerUp = document.getElementById("spinnerup");
let spinnerDown = document.getElementById("spinnerdown");
let timerInput = document.getElementById("timerinput");
let timer = document.getElementById("timer");
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let goal = document.getElementById("goal");
let goalInput = document.getElementById("goalinput");

const buzzerSound = new Audio("../../assets/audio/buzzer.mp3");
const adjustSound = new Audio("../../assets/audio/adjust.mp3");
const startSound = new Audio("../../assets/audio/timerstarted.mp3");
const denySound = new Audio("../../assets/audio/deny.mp3");

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
    let second = time % 60;

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

  if (!previousGoal || previousGoal == "") {
    goalInput.style.display = "block";
    goal.innerText = "Goal: ";
  } else if (previousGoal) {
    goalInput.style.display = "none";
    goal.innerText = previousGoal;
  }
});

spinnerUp.addEventListener("click", () => {
  let currentValue = Number(timerInput.value);
  let newValue;

  newValue = currentValue + 5;

  if (newValue > 60) {
    denySound.pause();
    denySound.currentTime = 0;
    denySound.play();
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
  adjustSound.pause();
  adjustSound.currentTime = 0;
  adjustSound.play();
});

spinnerDown.addEventListener("click", () => {
  let currentValue = Number(timerInput.value);
  let newValue;

  newValue = currentValue - 5;

  if (newValue < 0) {
    denySound.pause();
    denySound.currentTime = 0;
    denySound.play();
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
  adjustSound.pause();
  adjustSound.currentTime = 0;
  adjustSound.play();
});

function startTimer() {
  clearInterval(timerCount);
  timerCount = setInterval(() => {
    let minute = Math.floor(time / 60);
    let second = time % 60;

    if (minute < 10) {
      minute = String("0" + minute);
    }

    if (second < 10) {
      second = String("0" + second);
    }

    timer.innerText = String(minute + " : " + second);

    if (time - 1 < 0) {
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
  }, 1000);
}

startButton.addEventListener("click", () => {
  if (timerOn) {
    timerOn = false;
    stopButton.style.display = "block";
    startButton.innerText = "Resume";
    clearInterval(timerCount);
  } else {
    timerOn = true;
    spinnerContainer.style.display = "none";
    stopButton.style.display = "none";
    startButton.innerText = "Pause";
    timerInput.style.display = "none";

    if (!time) {
      time = Number(timerInput.value) * 60;
      timer.innerText = timerInput.value + " : " + "00";

      startSound.play();

      if (!goalInput.value == "") {
        goalInput.style.display = "none";
        goal.innerText = goalInput.value;
        localStorage.setItem("goal", goalInput.value);
      } else {
        goalInput.style.display = "none";
        goal.style.display = "none";
        startSound.play();
      }
    }

    startTimer();
  }
});

stopButton.addEventListener("click", () => {
  timerOn = false;
  time = null;
  buzzerSound.pause();
  buzzerSound.currentTime = 0;

  startButton.innerText = "Start";
  startButton.style.display = "none";

  stopButton.style.display = "none";
  stopButton.innerText = "Reset";

  spinnerContainer.style.display = "flex";

  timer.style.color = "var(--fontclr)";
  timer.innerText = ":00";

  timerInput.style.color = "var(--fontclr)";
  timerInput.value = "00";
  timerInput.style.display = "inline";

  goal.style.display = "inline";
  goal.innerText = "Goal: ";
  goal.style.color = "var(--fontclr)";

  goalInput.style.display = "inline";

  clearInterval(timerCount);
  localStorage.removeItem("taskTime");
  localStorage.removeItem("goal");
  timerCount = null;
});