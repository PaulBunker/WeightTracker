export default class WTMainView {

  constructor() {
    this.node = document.createElement('div');
    this.node.innerHTML = 'Your weight is <span class="current"></span>';
  }

  update(weight) {
    const span = this.node.querySelector('span');
    span.innerHTML = weight;
  }

}