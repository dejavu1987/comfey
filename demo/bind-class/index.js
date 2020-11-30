import Comfey from '../../index';
import '../../comfey.css';

const app = new Comfey(document.getElementById('app'));
const [getActive, setActive] = app.useState('stateActive', false);
const [, setFontSize] = app.useState('fontSize', '');

setInterval(() => {
  setActive(Math.random() > 0.5);
  setFontSize(Math.random() > 0.5 ? 'large' : 'normal');
}, 1000);
