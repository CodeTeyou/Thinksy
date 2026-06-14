let preference;

window.addEventListener("load", () => {
    preference = localStorage.getItem("lightPreference");
    if (preference === null) {
        preference = false;
    } else {
        preference = JSON.parse(preference);
    }

    if (preference) {
        flipValue("clr", "#EFEFEF")
        flipValue("fontclr", "#272727")
    } else {
        flipValue("clr", "#272727")
        flipValue("fontclr", "#EFEFEF")
    }
})

const toggleButton = document.getElementById("modeToggle")
const root = document.querySelector(":root");
let styled = getComputedStyle(root);

function flipValue(object, assignedValue) {
  let changeObject = `--${object}`;
  root.style.setProperty(changeObject, String(assignedValue));
}

toggleButton.addEventListener("click", () => {
    if (!preference) {
        flipValue("clr", "#EFEFEF")
        flipValue("fontclr", "#272727")
        preference = true;
    } else {
        flipValue("clr", "#272727")
        flipValue("fontclr", "#EFEFEF")
        preference = false;
    }
    localStorage.setItem("lightPreference", preference)
})