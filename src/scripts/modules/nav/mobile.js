class Mobile {
  constructor($menu, overlay) {
    const overlayProto = Object.getPrototypeOf(overlay);
    this.BREAKPOINT = 768;
    this.$openIcon = document.querySelector('.open');
    this.$closeIcon = document.querySelector('.close');
    this.$openClose = document.querySelector('.open-close');
    this.$menu = $menu;
    this.$controls = document.querySelector('.controls');
    this.$landing = document.querySelector('.landing');
    this.overlay = overlay;
    this.canShow = Object.prototype.hasOwnProperty.call(overlayProto, 'show');
    this.canHide = Object.prototype.hasOwnProperty.call(overlayProto, 'hide');
    this.debounce = undefined;

    this.setEvents();
    this.onResize();
  }

  setEvents() {
    this.$openClose.addEventListener('click', this.onClick.bind(this));
    this.$openClose.addEventListener('animationend', this.onAnimationend.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onClick() {
    if (this.$openClose.classList.contains('open')) {
      this.close();
    } else {
      this.open();
    }
  }

  onAnimationend() {
    if (this.$openClose.classList.contains('open')) {
      this.$openIcon.classList.remove('active');
      this.$closeIcon.classList.add('active');
    }
  }

  onResize() {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(this.resize.bind(this), 10);
  }

  resize() {
    if (window.innerWidth < this.BREAKPOINT) {
      this.$controls.style.width = `${window.innerWidth}px`;
    } else {
      this.$menu.setAttribute('aria-hidden', false);

      if (this.$menu.classList.contains('open')) {
        this.close();
      }
    }
  }

  open() {
    this.$openClose.classList.add('open');
    this.$openClose.classList.remove('close');
    this.$openClose.setAttribute('aria-expanded', true);
    this.$menu.classList.remove('close');
    this.$menu.classList.add('open');
    this.$menu.setAttribute('aria-hidden', false);
    this.$landing.classList.remove('open');
    this.$landing.classList.add('close');
    this.showOverlay();
  }

  close() {
    this.$openIcon.classList.add('active');
    this.$closeIcon.classList.remove('active');
    this.$openClose.classList.add('close');
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
    if (this.overlay && this.canHide) {
      this.overlay.hide();
    }
  }

  showOverlay() {
    if (this.overlay && this.canShow) {
      this.overlay.show();
    }
  }
}

export default Mobile;
