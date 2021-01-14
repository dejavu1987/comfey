# Comfey 2

Comfey is a tiny data binding library inspired by React hook useState. Read more in [Comfey Wiki](https://github.com/dejavu1987/comfey/wiki)

## Features

- 0 dependencies / Lightweight v1.0.0 is 35 lines of code
- Looks like react hook useState
- No loops, event driven
- (Optional) Simple HTML5 data attributes to bind the html elements to the states
- Finite State Machine as a [plugin](./fsm/README.md)

## Table of content

- [Install](#install)
- [Initialize component](#initialize-component)
- [Initialize state](#initialize-state)
- [Watch](#watch)
- [Multi Apps](#multi-apps)
- [Templating](#templating)
  - [Bind state value to an element](#bind-state-value-to-an-element)
  - [Visibility](#visibility)
  - [Class](#class)
  - [Bind attributes](#bind-attributes)
- [Examples](#examples)
  - [Counter Example](#counter-example)
  - [Comfey - Pokemon buddy game](#comfey---pokemon-buddy-game)
  - [Multi level navigation](#multi-level-navigation)

## Install

Using NPM

```
npm install comfey
```

Using Yarn

```
yarn add comfey
```

## Initialize component

Instantiate `Comfey` - optionally passing a `DOMElement` as root of the component.
By default `document` will be used.

```js
import Comfey from 'comfey';
const myComponent = new Comfey();
```

## Initialize state

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

## Watch

Watch gets `newValue`, `oldValue` and `name` of the state and is invoked everytime the state changes.

```js
function countWatcher(newVal, oldVal, stateName) {
  // Do something when value of count state changes
}
```

## Multi Apps

You can have any number of applications on a page. Instanciate a new Comfey whenever you need.

- Multiple app can use duplicate state names
- they will be scoped within each app
- You will have to scope your javascript as well
- Just avoid declaring getters and setters globally

Example

```js
import ComfeyDom from 'comfey/dom';
// scoped code blocks can use same getters / setters, etc names if desired.
// name uniquely if needs to be in the same scope

(() => {
  const view = new ComfeyDom(document.getElementById('app1'), COMFEY_DEBUG);
  const app = new Comfey(view, COMFEY_DEBUG);
  const [, setActive] = app.useState('stateActive', false);

  setInterval(() => {
    setActive(Math.random() > 0.5);
  }, 1000);
})();

(() => {
  const view = new ComfeyDom(document.getElementById('app2'), COMFEY_DEBUG);
  const app = new Comfey(view, COMFEY_DEBUG);
  const [, setActive] = app.useState('stateActive', false);

  setInterval(() => {
    setActive(Math.random() > 0.5);
  }, 1000);
})();
```

[More Multi App DEMOs](./demo/multiple-app/index.html)

## Templating

### Bind state value to an element

Use `data-bind` attribute with stateName as its value to bind the `innerHTML` of the element to the state's value.

### Visibility

- `data-bind-visible`
- `data-bind-hidden`

Bind visible and hidden accepts value to compare.

Example

`data-bind-visible="numberStatus::medium"`

means the element will be visible if the state `numberStatus` is set to `medium` value.

### Class

- `data-bind-class`

Bind class accepts value to compare, but will not interpolate the bound value as a classname.

Example

`data-bind-class="currentPage::active::home"`

means the element will get active class if the state `currentPage` is set to `home` value.

[More bind-class DEMOs](./demo/bind-class/index.html)

### Bind attributes

You can bind an attribute to a state's value w/ `data-bind-attr`. Data bind attributes can take values delimited by `::` which will make each delimited string an argument. The argument pattern looks like

`<state>::<dynamic-attr>::<value>`

Example:

`data-bind-attr="count::style::font-size: $rem"`

means, a dynamic attribute will be added to the HTML element when the state `count` has a value, the attribute added will be `style` attribute and the value for the style attribute will be

`font-size: <StateValue>rem`

## Examples

### Counter Example

[CodeSandbox](https://codesandbox.io/s/comfy-example-es207?file=/src/index.js)

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

```js
import Comfey from 'comfey';
import ComfeyDom from 'comfey/dom';

const app = new Comfey(new ComfeyDom(document.getElementById('app')));

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

### Comfey - Pokemon buddy game

[Codesandbox](https://codesandbox.io/s/comfey-demo-4n5zt?file=/src/index.js)

### Multi level navigation

[Codesandbox](https://codesandbox.io/s/h1jjx)

## Change log

v2.0

- View abstracted, no more DOM manipulation code in main library
- Empty instantiation of Comfey will ignore view update (Headless Mode) as opposed to falling back to `document`
- `comfey/dom` introduced to support DOM manipulation, which can be optionally passed in to Comfey constructor. See examples above or under `/demo/`
- Comfey is an ESM module
