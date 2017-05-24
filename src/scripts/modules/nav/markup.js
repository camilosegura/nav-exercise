class Markup {
  constructor() {
    this.$li = document.createElement('li');
    this.$a = document.createElement('a');
  }

  createItem(item = { label: '', url: '' }) {
    const $li = this.$li.cloneNode();
    const $a = this.$a.cloneNode();

    $a.setAttribute('href', item.url);
    $a.innerHTML = item.label;

    $li.appendChild($a);

    return $li;
  }
}

export default Markup;
