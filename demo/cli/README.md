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
