export class Progress {
  constructor(
    root,
    { value = 0, animated = false, hidden = false, period = 2000 } = {},
  ) {
    this.root = document.querySelector(root);
    this.arc = this.root.querySelector(".progress__arc");

    this.circumference = 2 * Math.PI * this.arc.r.baseVal.value;

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
