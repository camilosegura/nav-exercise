import './../styles/sass/main.scss';
import Nav from './modules/nav/nav';
import Overlay from './modules/overlay/overlay';

(() => {
  const nav = new Nav();
  const overlay = new Overlay();

  nav.main('/api/nav.json', '.menu', overlay);
})();
