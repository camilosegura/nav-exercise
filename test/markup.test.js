import Markup from '../src/scripts/modules/nav/markup';

const markup = new Markup();

describe('Create item', () => {
  const item = {
    label: 'What we do',
    url: '#/about/what-we-do',
  };

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
