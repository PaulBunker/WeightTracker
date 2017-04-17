export default class WTInputView {

  constructor(settings) {
    this.element = document.createElement('div');

    this.element.innerHTML = `
      Goal <input type="text" />
    `;

    return this.element;
  }

}


