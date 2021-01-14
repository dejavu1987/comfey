import Comfey from '../../index.js';
const app = new Comfey();
const [, setMessage] = app.useState('stateMessage', false, messageWatcher);

function messageWatcher(message) {
  console.log({ message });
}

setInterval(() => {
  setMessage(Math.random() > 0.5 ? 'Hello World!' : 'Comfey 2');
}, 1000);
