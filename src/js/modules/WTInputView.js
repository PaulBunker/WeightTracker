export default class WTInputView {

  constructor() {
    this.weightInput;
    this.weightForm;

    this.onUpdateWeight;

    this.node = document.createElement('div');
    this.buildForms();
  }

  buildForms(){
    this.weightForm = document.createElement('form');

    this.weightForm.innerHTML = `
      <label for="weight">
        Weights
        <input id="weight" type="number" />
      </label>
    `;

    const weightFragment = document.createDocumentFragment();
    weightFragment.appendChild(this.weightForm);

    this.weightInput = weightFragment.querySelector('#weight');
    this.weightForm.action = '';
    this.weightForm.onsubmit = this.handleWeightFormSubmit.bind(this);
    this.node.appendChild(weightFragment);

  }

  handleWeightFormSubmit() {
    this.onUpdateWeight(this.weightInput.value);
    this.weightInput.value = '';
    return false;
  }

}


