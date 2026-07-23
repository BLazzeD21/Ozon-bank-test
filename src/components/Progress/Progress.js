import "./Progress.css";

const RADIUS = 40;

export class Progress {
  constructor(
    target,
    {
      value = 0,
      animated = false,
      hidden = false,
      period = 2000,
      strokeWidth = 8,
    } = {},
  ) {
    this.root =
      typeof target === "string" ? document.querySelector(target) : target;

    if (!(this.root instanceof HTMLElement)) {
      throw new Error(`Progress: target "${target}" was not found`);
    }

    this.root.classList.add("progress");
    
    this.root.innerHTML = `
      <svg class="progress__svg" viewBox="0 0 100 100">
        <title>Progress indicator</title>
        <circle class="progress__track" cx="50" cy="50" r="${RADIUS}"></circle>
        <circle class="progress__arc" cx="50" cy="50" r="${RADIUS}"></circle>
      </svg>
    `;

    this.arc = this.root.querySelector(".progress__arc");
    this.circumference = 2 * Math.PI * this.arc.r.baseVal.value;
    this.arc.style.strokeDasharray = this.circumference;

    this.root.style.setProperty("--progress-stroke", strokeWidth);
    this.root.style.setProperty("--progress-period", `${period}ms`);

    this.setValue(value);
    this.setAnimated(animated);
    this.setHidden(hidden);

    requestAnimationFrame(() => {
      this.root.classList.add("progress--ready");
    });
  }

  setValue(value) {
    const num = Math.round(Number(value));
    this.value = Number.isNaN(num) ? 0 : Math.min(100, Math.max(0, num));

    const offset = this.circumference * (1 - this.value / 100);
    this.arc.style.strokeDashoffset = offset;

    return this;
  }

  getValue() {
    return this.value;
  }

  setAnimated(animated) {
    this.animated = Boolean(animated);
    this.root.classList.toggle("progress--animated", this.animated);
    return this;
  }

  isAnimated() {
    return this.animated;
  }

  setHidden(hidden) {
    this.hidden = Boolean(hidden);
    this.root.classList.toggle("progress--hidden", this.hidden);
    return this;
  }

  isHidden() {
    return this.hidden;
  }

  getState() {
    return { value: this.value, animated: this.animated, hidden: this.hidden };
  }
}
