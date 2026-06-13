let preference;

window.addEventListener("load", () => {
    preference = localStorage.getItem("lightPreference");
    if (!preference || preference === false) {
        flipValue("clr", "#EFEFEF")
        flipValue("fontclr", "#272727")
        preference = true;
    } else {
        flipValue("clr", "#272727")
        flipValue("fontclr", "#EFEFEF")
        preference = false;
    }
})

window.addEventListener("beforeunload", () => {
    localStorage.setItem("lightPreference", preference)
})

const toggleButton = document.getElementById("modeToggle")
const root = document.querySelector(":root");
let styled = getComputedStyle(root);

function flipValue(object, assignedValue) {
  let changeObject = `--${object}`;
  root.style.setProperty(changeObject, String(assignedValue));
}

toggleButton.addEventListener("click", () => {
    if (!preference || preference === false) {
        flipValue("clr", "#EFEFEF")
        flipValue("fontclr", "#272727")
        preference = true;
    } else {
        flipValue("clr", "#272727")
        flipValue("fontclr", "#EFEFEF")
        preference = false;
    }
})