1. What does the following code log to the console?
```JavaScript
let a = 1;
let foo;
let obj;

function Foo() {
  this.a = 2;
  this.bar = function() {
    console.log(this.a);
  };
  this.bar();
}

foo = new Foo();

foo.bar();
Foo();

obj = {};
Foo.call(obj);
obj.bar();

console.log(this.a);
```

`foo = new Foo()` will log `2` because this will create a new object and the execution context of `Foo` will be set to the new object. Within `Foo` `this.a = 2` will create a new property (`a`) on the new object and assign it a value of `2`. The `Foo` function also adds a function, `bar` on the object referenced by `this`. Within the `bar` function, the value of `this.a` is logged. The last line of the `Foo` function invokes the `bar` function from the object referenced by `this`. The object referenced by `this` has a property `a`, with a value of `2`, so that value is logged. The `Foo` function will implicitly return the object referenced by `this` and the object is assigned to the variable `foo`.

`foo.bar()` will log `2` for the reasons above.

`Foo()` will log `2` because the `Foo` function will add a property `a` with a value of `2` to the global execution context object, `window`.

`Foo.call(obj)` will log `2` - the `Foo` method is invoked with the object referenced by `obj` set as the explicit execution context by the `call` method.

`obj.bar()` will log `2` - invoking the `bar` method on the `obj` object.

`console.log(this.a)` will log `2` because the global object, referenced by `this` has a property called `a`, with a value of `2`.

2. What does the following code log to the console?
```JavaScript
let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area();
  this.perimeter = RECTANGLE.perimeter();
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);
console.log(rect1.perimeter);
```

The `RECTANGLE` object contains functions that utilise the `this` keyword but the `RECTANGLE` object doesn't contain the properties the functions are attempting to reference, i.e. `this.width`, so they will evaluate to `undefined` and each of the functions will return `NaN`.

How do you fix this problem?

It can be fixed by explicitly providing an execution context, by using the `call` or `apply` method (there are no arguments, so either could be used):
```JavaScript
let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);
console.log(rect1.perimeter);
```

3. Write a constructor function Circle, that takes a radius as an argument. You should be able to call an area method on the created objects to get the circle's area. Test your implementation with the following code:
```JavaScript
let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
```

```JavaScript
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return 3.1415 * (this.radius ** 2);
}
```

4. What will the following code log out and why?
```JavaScript
let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
```

It will return `true`. `ninja` is an object constructed from `Ninja`, which has a property `swung` with a value of `true`. `ninja.swingSword()` will cause JS to search the `ninja` object for a property called `swingSword`. `ninja` doesn't contain the property so JS will look at the prototype of `ninja`, which this the `Ninja.prototype` object. The `Ninja.prototype` object does contain a property called `swingSword` so that method will be invoked. The `swingSword` method utilises the `this` keyword and because the method was invoked with `ninja` as the calling object, `this` references `ninja`, which has a property `swung` with a value of `true`.

5. What will the following code log out and why?
```JavaScript
let ninja;
function Ninja() {
  this.swung = true;
}

ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());
```

This will log a `TypeError`. `Ninja.prototype` now references a different object and although that object contains a `swingSword` function, the prototype of `ninja` object is the original `Ninja.prototype` object, which doesn't contain a `swingSword` function.

6. Implement the method described in the comments below:
```JavaScript
let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

// Add a swing method to the Ninja prototype which
// returns the calling object and modifies swung

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true
```

```JavaScript
let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

Ninja.prototype.swing = function() {
  this.swung = !this.swung;
  return this;
}

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true
```

7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:
```JavaScript
let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true
```

```JavaScript
let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

let ninjaB = new ninjaA.constructor;

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true
```
