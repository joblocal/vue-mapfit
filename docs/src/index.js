import Vue from 'vue';
import App from './components/App';

const app = new Vue({
  render: h => h(App),
});

function findOrCreateContainer(id = 'app') {
  let container = document.getElementById(id);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', id);
    document.body.appendChild(container);
  }

  return container;
}

const container = findOrCreateContainer();
app.$mount(container);
