# Comfey 2 for CLI application

Comfey 2 can not only be used on your browser but also on any nodejs application whether be it a serverside or a CLI application

This example shows you how you can simply use Comfey on your CLI application, could be useful for your next build pipeline script??

Comfey is only supported as an ESM so you will require >= NodeJs@12

## Usage

```js
import Comfey from 'comfey';
const app = new Comfey();
const [, setMessage] = app.useState('stateMessage', null, messageWatcher);

function messageWatcher(message) {
  console.log({ message });
}

setInterval(() => {
  setMessage(Math.random() > 0.5 ? 'Hello World!' : 'Comfey 2');
}, 1000);
```

## Output

The message will be logged to console every second

```
{ message: 'Comfey 2' }
{ message: 'Hello World!' }
{ message: 'Comfey 2' }
{ message: 'Hello World!' }
{ message: 'Hello World!' }
{ message: 'Comfey 2' }
{ message: 'Comfey 2' }
{ message: 'Hello World!' }
{ message: 'Comfey 2' }
{ message: 'Hello World!' }

```

## CLI app using FSM

```js
import Comfey from 'comfey';
import fsm from 'comfey/fsm';
import readline from 'readline';
import journey from './journey.fsm.js';

const readInput = readline.createInterface({
  input: process.stdin,
});

const app = new Comfey();

const location = fsm(app, 'location', journey, locationWatcher);

printOptions();

readInput.on('line', function (input) {
  const inputInt = parseInt(input);
  if (isNaN(inputInt) || inputInt > location.getTransitions().length) {
    console.warn('Invalid choice, enter one of the listed numbers.');
    return;
  }
  location.transition(location.getTransitions()[input - 1]);
  printOptions();
});

function locationWatcher(newLoc, oldLoc) {
  console.log(`${oldLoc} -> ${newLoc}`);
}

function printOptions() {
  console.log(
    location.getTransitions().map((transition, i) => `${i + 1}. ${transition}`)
  );
}
```

## Output

```bash
[ '1. openDrawer', '2. enterBath', '3. exitApartment' ]
3
livingRoom -> street
[
  '1. enterKiosk',
  '2. enterMall',
  '3. enterApartment',
  '4. enterSupermarket',
  '5. enterHospital',
  '6. enterBar'
]
2
street -> mall
[ '1. exitMall', '2. enterSupermarket' ]
2
mall -> supermarket
[ '1. exitSupermarket' ]
1
supermarket -> street
[
  '1. enterKiosk',
  '2. enterMall',
  '3. enterApartment',
  '4. enterSupermarket',
  '5. enterHospital',
  '6. enterBar'
]
```
