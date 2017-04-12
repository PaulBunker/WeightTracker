import greeting from './modules/greeting';

var app = document.getElementsByTagName('body')[0];
app.innerHTML = `<p>${greeting.paul}</p>`;


if (module.hot) {
  module.hot.accept();
}


