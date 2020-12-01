import Comfey from '../../index';
import '../../comfey.css';
const COMFEY_DEBUG = true;
const app = new Comfey(document.getElementById('app'), COMFEY_DEBUG);
const [, setActive] = app.useState('stateActive', false);
const [, setFontSize] = app.useState('fontSize', '');

setInterval(() => {
  setActive(Math.random() > 0.5);
  setFontSize(Math.random() > 0.5 ? 'large' : 'normal');
}, 1000);
