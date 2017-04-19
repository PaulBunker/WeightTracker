export default class WTGraphsView {

  constructor() {
    this.node = document.createElement('div');
    this.dataNode = document.createElement('div');
    this.node.innerHTML = `
      Graphs
    `;

    this.node.appendChild(this.dataNode);

  }

  addWeights(weights) {
    this.dataNode.innerHTML = '';
    const fragment = document.createDocumentFragment();
    weights.forEach( (weight) => {
      let row = document.createElement('div');
      row.innerHTML = weight.value;
      fragment.appendChild(row);
    });
    this.dataNode.appendChild(fragment);
  }

}


