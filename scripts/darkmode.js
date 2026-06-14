let preference;

window.onload = () => {
  preference = localStorage.getItem("lightPreference");
  if (preference === null) {
    preference = false;
  } else {
    preference = JSON.parse(preference);
  }

  styleColor();
};

const toggleButton = document.getElementById("modeToggle");
const root = document.querySelector(":root");
let styled = getComputedStyle(root);

function flipValue(object, assignedValue) {
  let changeObject = `--${object}`;
  root.style.setProperty(changeObject, String(assignedValue));
}

function styleColor() {
    if (!preference) {
    flipValue("clr", "#EFEFEF");
    flipValue("fontclr", "#272727");
    flipSpinners(preference);
  } else {
    flipValue("clr", "#272727");
    flipValue("fontclr", "#EFEFEF");
    flipSpinners(preference);
  }
}


toggleButton.addEventListener("click", () => {
  preference = !preference;
  styleColor()
  localStorage.setItem("lightPreference", JSON.stringify(preference));
});

function flipSpinners(pref) {
  const spinnerUp = document.getElementById("spinnerup");
  const spinnerDown = document.getElementById("spinnerdown");
  if (spinnerUp && spinnerDown) {
    if (pref) {
      spinnerUp.style.filter = "brightness(0) invert(1) drop-shadow(0 0 0 var(--fontclr))";
      spinnerUp.style.color = "var(--fontclr);";

      spinnerDown.style.filter = "brightness(0) invert(1) drop-shadow(0 0 0 var(--fontclr))";
      spinnerDown.style.color = "var(--fontclr);";
    } else {
      spinnerUp.style.filter = "";
      spinnerUp.style.color = "";

      spinnerDown.style.filter = "";
      spinnerDown.style.color = "";
    }
  }
}
