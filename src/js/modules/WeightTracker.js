import WTData from './WTdata';

import WTMainView from './WTMainView';
import WTGraphsView from './WTGraphsView';
import WTInputView from './WTInputView';

export default class WeightTracker {

  constructor(element) {
    this.element = element;
    this.data = new WTData();
    this.data.openDB( () => {
      this.data.fetchWeights( (weights) => {
        this.refreshData(weights);
      });
    });

    this.build();
    this.attachHandlers();

  }

  build() {

    this.mainView = new WTMainView();
    this.graphsView = new WTGraphsView();
    this.inputView = new WTInputView();

    const fragment = document.createDocumentFragment();

    fragment.appendChild(this.mainView.node);
    fragment.appendChild(this.graphsView.node);
    fragment.appendChild(this.inputView.node);

    document.body.classList.remove('loading');

    this.element.appendChild(fragment);

  }

  attachHandlers() {
    this.inputView.onUpdateWeight = this.onUpdateWeight.bind(this);
  }

  onUpdateWeight(weight) {
    this.data.inputWeight(weight, () => {
      this.data.fetchWeights( (weights) => {
        this.refreshData(weights);
      });
    });
  }

  refreshData(weights){

    this.mainView.update(weights[weights.length-1].value);
    this.graphsView.addWeights(weights);

  }

}