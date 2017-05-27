import FetchData from '../../utilities/fetchData';
import Markup from './markup';

class Nav {
  static async main(url, target) {
    const data = await FetchData.init(url);
    const markup  = new Markup();
    const navDOM = markup.createItems(data.items);

    markup.addClass(navDOM, 'a', 'link')
    markup.addClassByLevel(navDOM, 'ul', 'nav', 1);
    markup.addClassByLevel(navDOM, 'li', 'primary-list-item', 1);
    markup.addClassByLevel(navDOM, 'ul', 'secondary-list', 2);
    markup.addClassByLevel(navDOM, 'a', 'primary', 1);
    markup.addClassByLevel(navDOM, 'a', 'secondary', 2);

    document.querySelector(target).appendChild(navDOM);
  }
}

export default Nav;
