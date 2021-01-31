1. What does `this` point to in the code below?
```JavaScript
function whatIsMyContext() {
  return this;
}
```

`this` is determined by how a function is executed, so we don't know what it references.

2. What does `this` point to in the code below?
```JavaScript
function whatIsMyContext() {
  return this;
}

whatIsMyContext();
```

This is function invocation so `this` references the `window` object if executed in a browser without strict mode. If strict mode is used, `this` will be `undefined`.

3.  What does `this` point to in the code below?
```JavaScript
function foo() {
  function bar() {
    function baz() {
      console.log(this);
    }

    baz();
  }

  bar();
}

foo();
```

Again `foo` is invoked by function invocation so `this` is the global context i.e. `window` if run in a browser and strict mode isn't used.

4. What does `this` point to in the code below?
```JavaScript
let obj = {
  count: 2,
  method() {
    return this.count;
  },
};

obj.method();
```

`method` is invoked by a method invocation; therefore, the execution context is determined by the object the method was called on. In this example the execution context will be the object `obj`, and that is the object referenced by `this`.

5. In strict mode, what does the following program log to the console?
```JavaScript
function foo() {
  console.log(this.a);
}

let a = 2;
foo();
```

`undefined`. In strict mode, the global context cannot be accessed and evaluates to `undefined`.

6. What does the following program log to the console?
```JavaScript
let a = 1;
function bar() {
  console.log(this.a);
}

let obj = {
  a: 2,
  foo: bar,
};

obj.foo();
```

`2`. `foo` references the function `bar` and `foo` is invoked as a method invocation. Therefore, `this` references `obj` and `obj` has a property `a` that has a value of `2`.

7. What does the following code log to the console?
```JavaScript
let foo = {
  a: 1,
  bar() {
    console.log(this.baz());
  },

  baz() {
    return this;
  },
};

foo.bar();
let qux = foo.bar;
qux();
```

The `foo` object will be logged first because `foo.bar()` will invoke `this.baz()`. When `baz()` is invoked, `this` references the `foo` object and the execution context of `baz` will be set to `foo`.


`qux()` will log an error because `qux` was assigned the return value of `foo.bar`, which is the `bar()` function and the `bar` function assigned to `qux` has no reference to the `foo` object. When `qux()` is invoked as a function invocation, with no explicit execution context supplied `this` references the global context, which is `window`, when the function is invoked in a browser. `qux()` invokes the `bar` function and within the `bar` function `this` will reference `window`. The `bar` function attempts to call the `baz` method on the `window` object but `window.baz` has not been defined.
