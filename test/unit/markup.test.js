import Markup from '../../src/scripts/modules/nav/markup';

let markup = new Markup();
let html;

const item = {
  label: 'What we do',
  url: '#/about/what-we-do',
};

const items1 = [
  {
    label: 'What we do',
    url: '#/about/what-we-do',
  },
];

const items11 = [
  {
    label: 'What we do',
    url: '#/about/what-we-do',
    items: [
      {
        label: 'How we work',
        url: '#/about/how-we-work',
      },
    ],
  },
];

const items3 = [
  {
    label: 'What we do',
    url: '#/about/what-we-do',
  },
  {
    label: 'How we work',
    url: '#/about/how-we-work',
  },
  {
    label: 'Leadership',
    url: '#/about/leadership',
  },
];

const items2 = [
  {
    label: 'What we do',
    url: '#/about/what-we-do',
    items: [
      {
        label: 'How we work',
        url: '#/about/how-we-work',
      },
      {
        label: 'Leadership',
        url: '#/about/leadership',
      },
    ],
  },
];

const items22 = [
  {
    label: 'What we do',
    url: '#/about/what-we-do',
    items: [
      {
        label: 'How we work',
        url: '#/about/how-we-work',
      },
      {
        label: 'Leadership',
        url: '#/about/leadership',
      },
    ],
  },
  {
    label: 'Work',
    url: '#/work',
    items: [

    ],
  },
];

beforeEach(() => {
  markup = new Markup();
  html = markup.createItems(items2);
});

describe('Create item', () => {
  it('should be an item', () => {
    expect(typeof markup.createItem(item)).toBe('object');
  });

  it('should not show errors item', () => {
    expect(typeof markup.createItem()).toBe('object');
  });

  it('should not show errors item', () => {
    expect(typeof markup.createItem()).toBe('object');
  });

  it('should an empty item', () => {
    expect(markup.createItem().outerHTML).toBe('<li><a href=""></a></li>');
  });

  it('should a filled item', () => {
    expect(markup.createItem(item).outerHTML).toBe('<li><a href="#/about/what-we-do">What we do</a></li>');
  });
});

describe('Create items', () => {
  it('Should be an empty list', () => {
    expect(markup.createItems().outerHTML).toBe('<ul></ul>');
  });

  it('Should be a list with 1 items', () => {
    expect(markup.createItems(items1).outerHTML).toBe('<ul><li><a href="#/about/what-we-do">What we do</a></li></ul>');
  });

  it('Should be a list with 3 items', () => {
    expect(markup.createItems(items3).getElementsByTagName('li').length).toBe(3);
  });
});

describe('Create items with sub items', () => {
  it('Should be a list with 1 sub item', () => {
    expect(markup.createItems(items11).outerHTML).toBe('<ul><li><a href="#/about/what-we-do">What we do</a><ul><li><a href="#/about/how-we-work">How we work</a></li></ul></li></ul>');
  });

  it('Should be a list with 2 sub items', () => {
    expect(markup.createItems(items2).outerHTML).toBe('<ul><li><a href="#/about/what-we-do">What we do</a><ul><li><a href="#/about/how-we-work">How we work</a></li><li><a href="#/about/leadership">Leadership</a></li></ul></li></ul>');
  });
});

describe('Modify element', () => {
  describe('Add classes', () => {
    let tag;
    let className;

    it('To anchors', () => {
      className = 'link';
      tag = 'a';

      expect(Markup.addClass(html, tag, className).outerHTML).toBe('<ul><li><a href="#/about/what-we-do" class="link">What we do</a><ul><li><a href="#/about/how-we-work" class="link">How we work</a></li><li><a href="#/about/leadership" class="link">Leadership</a></li></ul></li></ul>')
    });

    it('To lists', () => {
      className = 'lists';
      tag = 'li';

      expect(Markup.addClass(html, tag, className).outerHTML).toBe('<ul><li class="lists"><a href="#/about/what-we-do">What we do</a><ul><li class="lists"><a href="#/about/how-we-work">How we work</a></li><li class="lists"><a href="#/about/leadership">Leadership</a></li></ul></li></ul>');
    });

    it('To UL', () => {
      className = 'UL';
      tag = 'ul';

      expect(Markup.addClass(html, tag, className).outerHTML).toBe('<ul class="UL"><li><a href="#/about/what-we-do">What we do</a><ul class="UL"><li><a href="#/about/how-we-work">How we work</a></li><li><a href="#/about/leadership">Leadership</a></li></ul></li></ul>')
    });
  });

  describe('Add Classes to first level', () => {
    let tag;
    let className;
    const level = 1;

    beforeEach(() => {
      markup = new Markup();
      html = markup.createItems(items22);
    });

    it('To anchors', () => {
      className = 'link';
      tag = 'a';

      expect(markup.addClassByLevel(html, tag, className, level).outerHTML).toBe('<ul><li><a href="#/about/what-we-do" class="link">What we do</a><ul><li><a href="#/about/how-we-work">How we work</a></li><li><a href="#/about/leadership">Leadership</a></li></ul></li><li><a href="#/work" class="link">Work</a></li></ul>');
    });

    it('To lists', () => {
      className = 'lists';
      tag = 'li';

      expect(markup.addClassByLevel(html, tag, className, level).outerHTML).toBe('<ul><li class="lists"><a href="#/about/what-we-do">What we do</a><ul><li><a href="#/about/how-we-work">How we work</a></li><li><a href="#/about/leadership">Leadership</a></li></ul></li><li class="lists"><a href="#/work">Work</a></li></ul>');
    });

    it('To UL', () => {
      className = 'UL';
      tag = 'ul';

      expect(markup.addClassByLevel(html, tag, className, level).outerHTML).toBe('<ul class="UL"><li><a href="#/about/what-we-do">What we do</a><ul><li><a href="#/about/how-we-work">How we work</a></li><li><a href="#/about/leadership">Leadership</a></li></ul></li><li><a href="#/work">Work</a></li></ul>');
    });
  });

  describe('Add Classes to second level', () => {
    let tag;
    let className;
    const level = 2;

    it('To anchors', () => {
      className = 'link';
      tag = 'a';

      expect(markup.addClassByLevel(html, tag, className, level).outerHTML).toBe('<ul><li><a href="#/about/what-we-do">What we do</a><ul><li><a href="#/about/how-we-work" class="link">How we work</a></li><li><a href="#/about/leadership" class="link">Leadership</a></li></ul></li></ul>')
    });

    it('To lists', () => {
      className = 'lists';
      tag = 'li';

      expect(markup.addClassByLevel(html, tag, className, level).outerHTML).toBe('<ul><li><a href="#/about/what-we-do">What we do</a><ul><li class="lists"><a href="#/about/how-we-work">How we work</a></li><li class="lists"><a href="#/about/leadership">Leadership</a></li></ul></li></ul>');
    });

    it('To UL', () => {
      className = 'UL';
      tag = 'ul';

      expect(markup.addClassByLevel(html, tag, className, level).outerHTML).toBe('<ul><li><a href="#/about/what-we-do">What we do</a><ul class="UL"><li><a href="#/about/how-we-work">How we work</a></li><li><a href="#/about/leadership">Leadership</a></li></ul></li></ul>')
    });
  });
  // TODO
  // describe('Add attributes', () => {})
});
