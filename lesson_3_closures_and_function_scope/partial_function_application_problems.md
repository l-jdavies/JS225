1. Write a function named greet that takes two arguments and logs a greeting:
```JavaScript
> greet('howdy', 'Joe');
Howdy, Joe!
> greet('good morning', 'Sue');
Good morning, Sue!
```

```JavaScript
function greet(greeting, name) {
  console.log(`${greeting[0].toUpperCase()}${greeting.slice(1)}, ${name}!`)
}
```

2. Use the partial function shown above and your solution to problem 1 to create sayHello and sayHi functions that work like this:
```JavaScript
> sayHello('Brandon');
Hello, Brandon!
> sayHi('Sarah');
Hi, Sarah!
```

```JavaScript
function partial(func, arg1) {
  return function(arg2) {
    return func(arg1, arg2);
  }
}

function greet(greeting, name) {
  console.log(`${greeting[0].toUpperCase()}${greeting.slice(1)}, ${name}!`)
}

let sayHello = partial(greet, 'hello');
sayHello('Brandon');

let sayHi = partial(greet, 'hi');
sayHi('Sarah');
```
