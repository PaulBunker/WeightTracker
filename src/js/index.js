import WeightTracker from './modules/WeightTracker';

var appContainer = document.getElementsByTagName('body')[0];
new WeightTracker(appContainer);

if (DEVELOPMENT) {
  if (module.hot) {
    module.hot.accept();
  }
}
