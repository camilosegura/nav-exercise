class Mobile {
  constructor() {
    this.BREAKPOINT = 768;
    this.$openClose;
    this.$menu;
    this.$controls;
  }

  init($menu) {
    this.$openClose = document.querySelector('.open-close');
    this.$controls = document.querySelector('.controls');
    this.$menu = $menu;
    this.setEvents();
    this.onResize();
  }

  setEvents() {
    this.$openClose.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onClick() {
    if (this.$openClose.classList.contains('open')) {
      this.close();
    } else {
      this.open();
    }
  }

  onResize() {
    if (window.innerWidth < this.BREAKPOINT) {
      this.$controls.style.width = `${window.innerWidth}px`;
    }
  }

  open() {
    this.$openClose.classList.add('open');
    this.$menu.classList.remove('close');
    this.$menu.classList.add('open');
  }

  close() {
    this.$openClose.classList.remove('open');
    this.$menu.classList.remove('open');
    this.$menu.classList.add('close');
  }
}

export default Mobile;
