import Comfey from '../../index';
import '../../comfey.css';
import ComfeyDom from '../../view/dom';

const COMFEY_DEBUG = true;

(() => {
  const app = new Comfey(
    new ComfeyDom(document.getElementById('app1'), COMFEY_DEBUG),
    COMFEY_DEBUG
  );
  const [, setActive] = app.useState('stateActive', false);
  const [, setFontSize] = app.useState('fontSize', '');

  setInterval(() => {
    setActive(Math.random() > 0.5);
    setFontSize(Math.random() > 0.5 ? 'large' : 'normal');
  }, 1000);
})();

(() => {
  const app = new Comfey(
    new ComfeyDom(document.getElementById('app2'), COMFEY_DEBUG),
    COMFEY_DEBUG
  );
  const [, setActive] = app.useState('stateActive', false);
  const [, setFontSize] = app.useState('fontSize', '');

  setInterval(() => {
    setActive(Math.random() > 0.5);
    setFontSize(Math.random() > 0.5 ? 'large' : 'normal');
  }, 1000);
})();
