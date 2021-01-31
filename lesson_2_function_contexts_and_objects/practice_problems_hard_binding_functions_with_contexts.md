1. What function can we use to permanently bind a function to a particular execution context?

`bind()`

2. What will the code below log to console?
```JavaScript
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);
```

Nothing, the `foo()` function hasn't been invoked.

3. What will the code below output?
```JavaScript
let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(bar());
```

`5`. `bar = foo.bind(obj)` returns a new function in which `foo` is bound to the context argument, `obj`. When `bar()` is invoked, `this` references `obj` as the execution context.

4. What will the code below log to the console?
```JavaScript
let positiveMentality = {
  message: 'JavaScript makes sense!',
};

let negativeMentality = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positiveMentality);

negativeMentality.logMessage = bar;
negativeMentality.logMessage();
```

`'JavaScript makes sense!'`. The `Function` method `bind` was used to return a new function in which `foo` is permanently bound to the `positiveMentality` object as the execution context. The return value of `bind` was assigned to the variable `bar`. `bar` was assigned as a value to the `logMessage` property in the `negativeMentality` object. When `negativeMentality.logMessage()` was invoked, the execution context referenced by `this` is the `positiveMentality` object.

5. What will the code below output?
```JavaScript
let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);
```

`Amazebulous`. The `bind` method changes the execution context permanently and that can't be overriden, even using methods the explicitly change the execution context, such as `call` or `apply`.
