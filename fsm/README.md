# Comfey Finite State Machine

Very light weight add-on to Comfey to power your states with Finite State Machine logic.

## DEMO

[CodeSandbox](https://codesandbox.io/s/comfey-finite-state-machine-9cfpm)

[RPG Demo](https://comfey-fsm.netlify.app/) [GitHub](https://github.com/dejavu1987/comfey-rpg-finite-state-machine)

## Usage

```js
import Comfey from 'comfey';
import fsm from 'comfey/fsm';
const DEBUG = true;

const locationFsmConfig = {
  start: 'a',
  a: { goToC: 'c' },
  c: { goToX: 'x', goToA: 'a' },
};

const app = new Comfey(document.getElementById('app'), DEBUG);

const location = fsm(app, 'location', locationFsmConfig, locationWatcher);

function locationWatcher(newLoc, oldLoc) {
  console.log('Transitioning:', oldLoc + ' -> ' + newLoc);
}

console.log('Current Location:', location.getState()); // a
console.log('Possible Transitions:', location.getTransitions()); // ['goToC']
location.transition('goToC');
console.log('Current Location:', location.getState()); // c
console.log('Possible Transitions:', location.getTransitions()); // ['goToX', 'goToA']
```
