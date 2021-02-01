1. Will the code below execute?
```JavaScript
function() {
  console.log("Sometimes, syntax isn't intuitive!")
}();
```

No. You can't immediately invoke a function declaration, only function expression.

2. Edit the code from problem one so it executes without error.

```JavaScript
(function() {
  console.log("Sometimes, syntax isn't intuitive!")
})();
```

3. The code below throws an error:
```JavaScript
var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
}

sum += sum(numbers);  // ?
```
What kind of problem does this error highlight? Use an IIFE to address it, so that code runs without error.

The problem is the code both a variable declared with `var` and a function called `sum`. Due to hoisting rules, the `sum` function declaration will be hoisted first then `sum` will be reassigned to the value `0`. The last line of the code intends to invoke the `sum` function but instead it will return the primitive value.


```JavaScript
var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function (arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);
```

4. Consider the output below:
```JavaScript
countdown(7);
7
6
5
4
3
2
1
0
Done!
```
Implement a function `countdown` that uses an IIFE to generate the desired output.

```JavaScript
function countdown(num) {
  (function(startNum) {
    while (startNum >= 0) {
      console.log(startNum);
      startNum -= 1;
    }
    console.log('Done!');
  })(num);
}
```

5. Is the named function in this IIFE accessible in the global scope?
```JavaScript
(function foo() {
  console.log('Bar');
})();

foo() // ?
```

No. It would only be visible if it was a function declaration or the IIFE had been assigned to a variable called `foo`.
