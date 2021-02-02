Consider the following code:
```JavaScript
const name = 'Naveed';
const greeting = 'Hello';

const greeter = {
  message: `${greeting} ${name}!`,
  sayGreetings() {
    console.log(this.message);
  }
};
```
Note that the message property uses the result of interpolation as its value. As a result, we have two global variables: name, and greeting that pollute the global scope. As we already know, we should limit the use of global variables as much as we can. Here we can avoid using the global variables by simply setting the message property to the value "Hello Naveed!". But let's pretend that we must use variables and interpolation to accomplish this. Can you think of a way to refactor this code so we don't have any other variables in the global scope besides greeter?

```JavaScript
let greeter = {
  message: (function() {
    let name = 'Naveed';
    let greeting = 'Hello';

    return `${name} ${greeting}!`;
  })(),

  sayGreetings() {
    console.log(this.message);
  }
}
```
