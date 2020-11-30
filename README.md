# Comfey

Comfey is a tiny data binding library inspired by React hook useState

## Features

- 0 dependencies / Lightweight v1.0.0 is 35 lines of code
- Looks like react hook useState
- No loops, event driven
- Simple HTML5 data attributes to bind the html elements to the states

## Usage

### Install

Using NPM

```
npm install comfey
```

Using Yarn

```
yarn add comfey
```

### Initialize component

Instantiate `Comfey` - optionally passing a `DOMElement` as root of the component.
By default `document` will be used.

```js
import Comfey from 'comfey';
const myComponent = new Comfey(document.getElementById('my-component'));
```

### Initialize state

Use `.useState()` method to initialize a state, `useState()` accepts 3 parameters.
Returns getter and setter functions

```js
/**
 *
 * @param {string} state name of the state
 * @param {any} initialVal initial value
 * @param {function} watcher watcher function that will be called everytime the value of the state changes
 *
 * @returns {Array<[function, function]>} getterFunction and SetterFunction
 */
```

Example:

```js
const [count, setCount] = app.useState('count', 3, countWatcher);
```

### Watch

Watch gets `newValue`, `oldValue` and `name` of the state and is invoked everytime the state changes.

```js
function countWatcher(newVal, oldVal, stateName) {
  // Do something when value of count state changes
}
```

### Templating

Use `data-bind` attribute with stateName as its value to bind the `innerHTML` of the element to the state's value
Other binding data attributes

- `data-bind-visible`
  -- Accepts value to compare (See next example)
- `data-bind-hidden`

```html
<div id="my-component">
  <div>
    Count:
    <span data-bind="count">
      <!--   This placeholder will be updated with value of count state -->
    </span>
  </div>
  <div>Show plus: <span data-bind="showPlus">x</span></div>
  <div>Hide minus: <span data-bind="hideMinus">x</span></div>
  <div class="buttons">
    <!--   Increment button will be visible if showPlus state is set to true   -->
    <button id="increment" data-bind-visible="showPlus">+</button>
    <button id="decrement" data-bind-hidden="hideMinus">-</button>

    <!-- Bind attribute, state :: attr :: value, $ for stateValue placeholder -->
    <button id="increment" data-bind-attr="disablePlus::disabled::">+</button>
    <div>
      Count:<span
        data-bind-attr="count::style::font-size: $rem"
        data-bind="count"
        >x</span
      >
    </div>
    <div>
      NumberStatus:
      <span data-bind-visible="numberStatus::medium">Medium</span>
      <span data-bind-visible="numberStatus::max">Max</span>
      <span data-bind-visible="numberStatus::min">Min</span>
    </div>
  </div>
</div>
```

## Example Application (Counter)

[CodeSandbox](https://codesandbox.io/s/comfy-example-es207?file=/src/index.js)

```js
import Comfey from 'comfey';
const app = new Comfey(document.getElementById('app'));

// Select buttons
const btnIncrement = document.getElementById('increment');
const btnDecrement = document.getElementById('decrement');

// Initialize states
const [, setShowPlus] = app.useState('showPlus', true);
const [, setHideMinus] = app.useState('hideMinus', false);
const [count, setCount] = app.useState('count', 3, countWatcher);

function countWatcher(newVal) {
  if (newVal > 4) {
    setShowPlus(false);
  } else {
    setShowPlus(true);
    if (newVal < 1) {
      setHideMinus(true);
    } else {
      setHideMinus(false);
    }
  }
}

// Button behaviours
btnIncrement.addEventListener('click', () => {
  setCount(count() + 1);
});
btnDecrement.addEventListener('click', () => {
  setCount(count() - 1);
});
```

## Example Application (Comfey - Pokemon buddy game)

[Codesandbox](https://codesandbox.io/s/comfey-demo-4n5zt?file=/src/index.js)
