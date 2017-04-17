import WTSettings from './WTSettings';

import WTMainView from './WTMainView';
import WTGraphsView from './WTGraphsView';
import WTInputView from './WTInputView';

export default class WeightTracker {

  constructor(element) {
    this.element = element;
    this.getSettings();
    this.build();

  }

  build(){

    this.mainView = new WTMainView();
    this.grapsView = new WTGraphsView();
    this.inputView = new WTInputView();

    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.mainView);
    fragment.appendChild(this.grapsView);
    fragment.appendChild(this.inputView);

    this.element.appendChild(fragment);

  }

  getSettings() {
    console.log('settings');
    this.settings = new WTSettings();
  }
}