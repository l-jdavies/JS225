1. Write a function named makeMultipleLister that, when invoked and passed a number, returns a function that logs every positive integer multiple of that number less than 100. Usage looks like this:
```JavaScript
> let lister = makeMultipleLister(13);
> lister();
13
26
39
52
65
78
91
```

```JavaScript
function makeMultipleLister(num) {
  return function() {
    let result = num;
    for (let multiplier = 1; result < 100; multiplier++) {
      console.log(result);
      result = multiplier * num;
    }
  }
}
```

2. Write a program that uses two functions, add and subtract, to manipulate a running total value. When you invoke either function with a number, it should add or subtract that number from the running total and log the new total to the console. Usage looks like this:
```JavaScript
> add(1);
1
> add(42);
43
> subtract(39);
4
> add(6);
10
```

```JavaScript
let totalValue = 0;

function add(num) {
  totalValue += num;
  console.log(totalValue);
}

function subtract(num) {
  totalValue -= num;
  console.log(totalValue);
}
```

3. Given the following code:
```JavaScript
function startup() {
  let status = 'ready';
  return function() {
    console.log('The system is ready.');
  };
}

let ready = startup();
let systemStatus = // ?
```
How can you set the value of systemStatus to the value of the inner variable status without changing startup in any way?

You can't do that without changing the `startup` function.
