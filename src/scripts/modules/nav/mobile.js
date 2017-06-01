class Mobile {
  constructor() {
    this.BREAKPOINT = 768;
    this.$openClose;
    this.$menu;
    this.$controls;
    this.$landing;
    this.overlay;
    this.debounce;
  }

  init($menu, overlay) {
    this.$openClose = document.querySelector('.open-close');
    this.$controls = document.querySelector('.controls');
    this.$landing = document.querySelector('.landing');
    this.$menu = $menu;
    this.overlay = overlay;
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
    clearTimeout(this.debounce);
    this.debounce = setTimeout(this.resize.bind(this), 250);
  }

  resize() {
    if (window.innerWidth < this.BREAKPOINT) {
      this.$controls.style.width = `${window.innerWidth}px`;
    } else {
      this.$menu.setAttribute('aria-hidden', false);
    }
  }

  open() {
    this.$openClose.classList.add('open');
    this.$openClose.setAttribute('aria-expanded', true);
    this.$menu.classList.remove('close');
    this.$menu.classList.add('open');
    this.$menu.setAttribute('aria-hidden', false);
    this.$landing.classList.remove('open');
    this.$landing.classList.add('close');
    this.showOverlay();
  }

  close() {
    this.$openClose.classList.remove('open');
    this.$openClose.setAttribute('aria-expanded', false);
    this.$menu.classList.remove('open');
    this.$menu.classList.add('close');
    this.$menu.setAttribute('aria-hidden', true);
    this.$landing.classList.remove('close');
    this.$landing.classList.add('open');
    this.hideOverlay();
  }

  hideOverlay() {
    if (this.overlay && this.overlay.__proto__.hasOwnProperty('hide')) {
      this.overlay.hide();
    }
  }

  showOverlay() {
    if (this.overlay && this.overlay.__proto__.hasOwnProperty('show')) {
      this.overlay.show();
    }
  }
}

export default Mobile;
