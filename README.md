### Comfey

Comfey is a tiny data binding library inspired by React hook useState

## Features
- 0 dependencies / Lightweight v1.0.0 is 35 lines of code
- Looks like react hook useState
- No loops, event driven
- Simple HTML5 data attributes to bind the html elements to the states

## Example Application (Counter)

[CodeSandbox](https://codesandbox.io/s/comfy-example-es207?file=/src/index.js)

```JavaScript
import Comfey from "comfey";
const app = new Comfey(document.getElementById('app'));

// Select buttons
const btnIncrement = document.getElementById("increment");
const btnDecrement = document.getElementById("decrement");

// Initialize states
const [, setShowPlus] = app.useState("showPlus", true);
const [, setHideMinus] = app.useState("hideMinus", false);
const [count, setCount] = app.useState("count", 3, countWatcher);

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
btnIncrement.addEventListener("click", () => {
  setCount(count() + 1);
});
btnDecrement.addEventListener("click", () => {
  setCount(count() - 1);
});
```

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

```JavaScript
import Comfey from "comfey";
const myComponent = new Comfey(document.getElementById('my-component'));
```

### Initialize state

```JavaScript
const [count, setCount] = app.useState("count", 3, countWatcher);
```

### Watch
```JavaScript
function countWatcher(newVal, oldVal) {
  // Do something when value of count state changes
}
```
### Templating
```HTML
<div id="my-component">
  <div>Count: <span data-bind="count">
    <!--   This placeholder will be updated with value of count state -->
    </span></div>
  <div>Show plus: <span data-bind="showPlus">x</span></div>
  <div>Hide minus: <span data-bind="hideMinus">x</span></div>
  <div class="buttons">
    <!--   Increment button will be visible if showPlus state is set to true   -->
    <button id="increment" data-bind-visible="showPlus">+</button>
    <button id="decrement" data-bind-hidden="hideMinus">-</button>
  </div>
</div>
```
