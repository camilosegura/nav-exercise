import './../styles/sass/main.scss';
import Nav from './modules/nav/nav';

(() => {
  Nav.main('/api/nav.json', '.menu');
})()
