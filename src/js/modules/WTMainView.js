export default class WTMainView {

  constructor(settings) {
    this.element = document.createElement('div');
    this.element.innerHTML = `Your weight is`
    return this.element;
  }

}