1. What will the code below output?
```javascript
function foo() {
  return this;
}

let context = foo();
console.log(context);
```

It will log the `window` object.

2. What will the code in the previous question output in strict mode?

It will log `undefined`.

3. What will the code below output? Explain the difference, if any, between this output and that of problem 1.
```javascript
let obj = {
  foo() {
    return this;
  },
};

let context = obj.foo();

console.log(context);
```

It will log `{foo: f}`. In this example `foo` is invoked as a method from within the `obj` object; therefore the execution context is the `obj` object.

4. What will the code below output?
```JavaScript
var message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage();

let bar = {
  message: 'Hello from the function scope!',
};

bar.deliverMessage = deliverMessage;

bar.deliverMessage();
```
Firstly, it will log `Hello from the global scope`, then it will log `Hello from the function scope!`. 

This is because `bar.deliverMessage = deliverMessage` is assigning the `deliverMessage` function object (not the return value of the function invocation) to the `bar` object, where it assigned as the value of the `deliverMessage` property.

When `bar.deliverMessage()` is called, this invokes the `deliverMessage` method, with the `bar` object as the calling object. The `deliverMessage` method accesses the `message` property assigned to `this`. In this example `this` references the object `bar`, therefore `this.message` references `Hello from the function scope!`.

5. What will the code below output? What would happen if we replaced var on line 1 with let? Can you explain why the output changes?
```JavaScript
var a = 10;
let b = 10;
let c = {
  a: -10,
  b: -10,
};

function add() {
  return this.a + b;
}

c.add = add;

console.log(add());
console.log(c.add());
```

`console.log(add())` will log `20`. Here `this` refers to the `window` object; therefore, `this.a` refers to the variable `a`, which was declared with `var` (which creates a new property in the `window` object) and assigned a value of `10`. Due to lexical scoping rules the variable `b`, which was declared with `let` in the global scope and assigned a value of `10`, can be accessed within the `add` function. Therefore `return this.a + b` will return `20`, which will be logged.

`console.log(c.add())` will log `0`. The `add` function object was added to the `c` object, as the property `add`. When `c.add()` method is invoked, `this` references the calling object, `c`. The `c` object has a property `a` with a value of `-10`. Therefore `this.a` within `c.add()` method has a value of `-10`. The `b` variable within `c.add()` will reference the variable `b` that was declared with `let` in the global scope with a value of `10`. Therefore `-10 + 10` will return `0`.

If `var a` was replaced with `let a`, the `console.log(add())` function call would log `NaN` because variables declared with `let` aren't added as properties to the global object.

6. The problems above all feature implicit function execution context. What methods have we learned so far that let us explicitly specify what a function's execution context should be?

`call` and `apply`.

7. In the code below, use `call` to invoke `add` as a method on `bar`, but with `foo` as the execution context. What will this return?
```JavaScript
let foo = {
  a: 1,
  b: 2,
};

let bar = {
   a: 'abc',
   b: 'def',
   add() {
     return this.a + this.b;
   },
};
```

```JavaScript
bar.add.call(foo);
```

This will log `3`.

8. Given the code and desired output shown below, should you use call or apply to supply explicit context and the arguments to outputList? That is, which method makes the most sense to use? Implement a solution using your preferred method such that the desired output is logged, and explain your choice.
```JavaScript
let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList() {
  console.log(this.title + ':');

  let args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}
```

```JavaScript
outputList.apply(fruitsObj, fruitsObj.list);
```
Makes more sense to invoke the `apply` method rather than `call` because the list of fruits are present in an array.

9. For an extra challenge, consider this line of code from the previous problem:
```JavaScript
let args = [].slice.call(arguments);
```
Inside of JavaScript functions, arguments is an object that holds all of the arguments passed to the function. Bearing in mind that the function author wants to iterate over the arguments later in the method using an Array method, why do you think he or she is invoking call?


LS solution:
It isn't possible to call forEach on arguments since it is only Array-like and not an array. However, since it is Array-like (having indices from 0 to length - 1) we can use it as the context to a slice method call on an empty array. The return value assigned to args is an array holding all of the arguments passed to the outputList function since we are executing slice with no arguments passed to it (recall: the first value passed to call is a the execution context).

Modern JavaScript doesn't use the built-in arguments object. Instead, it uses the new rest syntax that we discuss in our Syntactic Sugar gist:
```JavaScript
let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList(...args) {
  console.log(this.title + ':');

  args.forEach(function(elem) {
    console.log(elem);
  });
}
```
