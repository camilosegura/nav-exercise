class Markup {
  constructor() {
    this.$ul = document.createElement('ul');
    this.$li = document.createElement('li');
    this.$a = document.createElement('a');
  }

  createItem(item = { label: '', url: '', items: [] }) {
    const $li = this.$li.cloneNode();
    const $a = this.$a.cloneNode();

    $a.setAttribute('href', item.url);
    $a.innerHTML = item.label;

    $li.appendChild($a);

    if (item.items && item.items.length > 0) {
      $li.appendChild(this.createItems(item.items));
    }

    return $li;
  }

  createItems(items = []) {
    const $ul = this.$ul.cloneNode();

    items.forEach((item) => {
      $ul.appendChild(this.createItem(item));
    });
    return $ul;
  }

  addClass(html, tag, className) {
    const $elements = html.getElementsByTagName(tag);
    const length = $elements.length;
    let i;

    if (html.tagName.toLowerCase() === tag.toLowerCase()) {
      html.setAttribute('class', className);
    }

    for (i = 0; i < length; i++) {
      $elements[i].setAttribute('class', className);
    }

    return html;
  }

  addClassByLevel(html, tag, className, level) {
    const children = html.childNodes;

    if (level === 1) {
      if (tag === 'ul') {
        html.setAttribute('class', className);
      } else {
        children.forEach((child) => {
          if (tag === 'a') {
            child.children[0].setAttribute('class', className);
          } else if (tag === 'li') {
            child.setAttribute('class', className);
          }
        });
      }
    } else {
      children.forEach((child) => {
        const innerChildren = child.childNodes;
        const innerLevel = level - 1;

        innerChildren.forEach((innerChild) => {
          if (innerChild.tagName.toLowerCase() === 'ul') {
            this.addClassByLevel(innerChild, tag, className, innerLevel);
          }
        });
      });
    }

    return html;
  }
}

export default Markup;
