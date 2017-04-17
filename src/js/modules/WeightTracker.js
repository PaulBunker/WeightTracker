import WTData from './WTdata';

import WTMainView from './WTMainView';
import WTGraphsView from './WTGraphsView';
import WTInputView from './WTInputView';

export default class WeightTracker {

  constructor(element) {
    this.element = element;
    this.data = new WTData();
    this.data.openDB( () => {
      this.data.fetchWeights( (w) => {
        console.log(w);
      });
    });

    this.build();

    this.attachHandlers();

  }

  build() {

    this.mainView = new WTMainView();
    this.grapsView = new WTGraphsView();
    this.inputView = new WTInputView();

    const fragment = document.createDocumentFragment();

    fragment.appendChild(this.mainView.node);
    fragment.appendChild(this.grapsView.node);
    fragment.appendChild(this.inputView.node);

    document.body.classList.remove('loading');

    this.element.appendChild(fragment);

  }

  attachHandlers() {
    this.inputView.onUpdateWeight = this.onUpdateWeight;
  }

  onUpdateWeight(weight) {
    debugger;
    console.log(weight);
    return false;
  }

}