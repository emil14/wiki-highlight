const { document } = window;

class Element {
  constructor(id) {
    this.id = id;
  }

  get element() {
    return document.getElementById(this.id);
  }

  changeVisibility(isVisible) {
    this.element.style.display = isVisible ? 'block' : 'none';
  }
}

class Popup extends Element {
  constructor(id) {
    const element = document.createElement('div');

    super(id);

    element.id = this.id;
    element.style.display = 'none';

    document.body.appendChild(element);
  }

  renderContent(content) {
    this.element.innerHTML = content;
  }
}

class Button extends Element {
  constructor(id, title, callback) {
    const element = document.createElement('button');
    const chromeMaxZIndex = 2147483647;

    super(id);

    this.title = title;
    this.clickCallback = callback;

    element.id = this.id;
    element.innerHTML = this.title;
    element.style.position = 'absolute';
    element.style['z-index'] = chromeMaxZIndex;

    element.addEventListener('click', () => {
      this.clickCallback(this);
    });

    document.body.appendChild(element);
  }

  setPosition(x, y) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }
}

const popup = new Popup('wikiHighlightPopup');
const button = new Button('wikiHighlightButton', 'show popup', (self) => {
  self.changeVisibility(false);
  popup.changeVisibility(true);
});

export { button, popup };

