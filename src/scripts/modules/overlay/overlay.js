class Overlay {
  constructor() {
    this.$overlay = document.querySelector('.overlay');
  }

  show() {
    if (this.$overlay) {
      this.$overlay.classList.add('active');
    }
  }

  hide() {
    if (this.$overlay) {
      this.$overlay.classList.remove('active');
    }
  }
}

export default Overlay;
