import FetchData from '../../utilities/fetchData';
import Markup from './markup';
import Mobile from './mobile';

class Nav {
  constructor() {
    this.markup  = new Markup();
    this.$navDOM;
    this.primary;
    this.overlay;
    this.mobile;
    this.$menu;
    this.a;
  }

  async main(url, target, overlay) {
    const data = await FetchData.init(url);
    this.overlay = overlay;
    this.$navDOM = this.markup.createItems(data.items);
    this.setMainClasses();
    this.$primary = this.$navDOM.querySelectorAll('.primary-list-item');
    this.setEvents();
    this.$menu = document.querySelector(target);
    this.mobile = new Mobile();
    this.mobile.init(this.$menu, overlay);
    this.$menu.appendChild(this.$navDOM);
  }

  setMainClasses() {
    this.markup.addClass(this.$navDOM, 'a', 'link')
    this.markup.addClassByLevel(this.$navDOM, 'ul', 'nav-items', 1);
    this.markup.addClassByLevel(this.$navDOM, 'li', 'primary-list-item', 1);
    this.markup.addClassByLevel(this.$navDOM, 'a', 'primary', 1);
    this.markup.addClassByLevel(this.$navDOM, 'ul', 'secondary-list', 2);
    this.markup.addClassByLevel(this.$navDOM, 'li', 'secondary-list-item', 2);
    this.markup.addClassByLevel(this.$navDOM, 'a', 'secondary', 2);
  }

  setEvents() {
    this.$navDOM.addEventListener('click', this.onClickOuter.bind(this));

    this.overlay.$overlay.addEventListener('click', this.onClickOuter.bind(this));

    this.$primary.forEach(function($el) {
      $el.addEventListener('click', this.onClickPrimary.bind(this));
    }, this);
  }

  onClickPrimary(event) {
    const $element = event.target;
    const $secondaryList = $element.nextElementSibling;

    this.removeActive();
    this.hideOverlay();

    if ($secondaryList) {
      event.preventDefault();
      event.stopPropagation();
      $element.parentElement.classList.add('active');
      $element.classList.remove('down');
      $element.classList.add('up');
      this.showOverlay();
    } else {
      window.location.href = window.location.origin +
        $element.hash.replace('#', '');
    }
  }

  onClickOuter() {
    this.removeActive();
    this.hideOverlay();
    this.mobile.close();
  }

  removeActive() {
    this.$primary.forEach(function($el) {
      if ($el.classList.contains('active')) {
        const $child = $el.querySelector('.primary');

        $el.classList.remove('active');
        $child.classList.remove('up');
        $child.classList.add('down');
      }

    }, this);
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

export default Nav;
