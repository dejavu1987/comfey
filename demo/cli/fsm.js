import Comfey from '../../index.js';
import fsm from '../../fsm/index.js';
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
