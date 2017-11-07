class Element {
  constructor(id) {
    this.id = id;

    this.init();
  }

  get element() {
    return window.document.getElementById(this.id);
  }

  changeVisibility(isVisible) {
    this.element.style.display = isVisible ? 'block' : 'none';
  }
}

class Popup extends Element {
  init() {
    const element = window.document.createElement('div');

    element.id = this.id;
    element.style.display = 'none';

    window.document.body.appendChild(element);
  }
  renderContent(content) {
    this.element.innerHTML = content;
  }
}

class Button extends Element {
  constructor(id, title, callback) {
    super(id);

    this.title = title;
    this.clickCallback = callback;
  }

  init() {
    const element = window.document.createElement('button');
    const chromeMaxZIndex = 2147483647;

    element.id = this.id;
    element.innerHTML = this.title;
    element.style.position = 'absolute';
    element.style['z-index'] = chromeMaxZIndex;

    element.addEventListener('click', () => {
      this.clickCallback(this);
    });

    window.document.body.appendChild(element);
  }
  setPosition(x, y) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}

export const popup = new Popup('wikiHighlightPopup');
export const button = new Button('wikiHighlightButton', 'show popup', (self) => {
  self.changeVisibility(false);
  popup.changeVisibility(true);
});

