1. What naming convention separates constructor functions from other functions?

Constructor functions start with an uppercase letter, other functions do not.

2. What will the code below output and why?
```JavaScript
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = Lizard();
lizzy.scamper(); // ?
```
A `TypeError`. The `Lizard` function references `this` as the global context, the `Window` object.

3. Alter the code in problem 2 so that it produces the desired output.

```JavaScript
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // ?
```
