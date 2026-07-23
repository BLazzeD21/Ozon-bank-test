const progress = new Progress("#progress", {
  value: 0,
  animated: false,
  hidden: false,
  period: 2000,
});

const valueInput = document.getElementById("value-input");
const animateToggle = document.getElementById("animate-toggle");
const hideToggle = document.getElementById("hide-toggle");

valueInput.value = progress.getValue();

valueInput.addEventListener("input", () => {
  if (valueInput.value === "") return;
  progress.setValue(valueInput.value);
});

valueInput.addEventListener("blur", () => {
  if (valueInput.value === ""){
    valueInput.value = 0;
    progress.setValue(0);
    return;
  }

  valueInput.value = progress.getValue();
});

function bindToggle(button, onChange) {
  button.addEventListener("click", () => {
    const next = button.getAttribute("aria-checked") !== "true";
    button.setAttribute("aria-checked", String(next));
    onChange(next);
  });
}

bindToggle(animateToggle, (checked) => progress.setAnimated(checked));
bindToggle(hideToggle, (checked) => progress.setHidden(checked));
