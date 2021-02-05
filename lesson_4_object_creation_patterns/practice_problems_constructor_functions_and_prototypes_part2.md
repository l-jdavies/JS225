1. Follow the steps below:

Create an object called shape that has a getType method.
Define a Triangle constructor function whose prototype is shape. Objects created with Triangle should have four own properties: a, b, c (representing the sides of a triangle), and type.
Add a new method to the prototype called getPerimeter.

Test your implementation with the following code:
```JavaScript
let t = new Triangle(3, 4, 5);
t.constructor;                 // Triangle(a, b, c)
shape.isPrototypeOf(t);        // true
t.getPerimeter();              // 12
t.getType();                   // "triangle"
```

```JavaScript
let shape = {
  getType() {
    return this.type;
  }
}

function Triangle(a, b, c) {
  this.a = a,
  this.b = b,
  this.c = c,
  this.type = 'triangle'
}

Triangle.prototype = shape;
Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
}

// because the Triangle.prototype has been assigned a new object, the constructor needs to be explicitly reset
Triangle.prototype.constructor = Triangle;


let t = new Triangle(3, 4, 5);
t.constructor;                 // Triangle(a, b, c)
shape.isPrototypeOf(t);        // true
t.getPerimeter();              // 12
t.getType();                   // "triangle"
```

2. Since a constructor is just a function, it can be called without the new operator, and this can lead to unexpected results and errors especially for inexperienced programmers.

Write a constructor function that can be used with or without the new operator, and return the same result in either form. Use the code below to check your solution:
```JavaScript
function User(first, last) {
  // ...
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
```

```JavaScript
function User(first, last) {
  if (this instanceof User === false) {
    return new User(first, last);
  }

  this.name = `${first} ${last}`;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
```

3. Create a function that can create an object with a given object as its prototype, without using Object.create.


```JavaScript
function createObject(obj) {
  let newObj = {};
  Object.setPrototypeOf(newObj, obj);
  return newObj;
}

let foo = {
  a: 1
};

let bar = createObject(foo);
foo.isPrototypeOf(bar);         // true
```

4. Similar to the problem above, without using Object.create, create a begetObject method that you can call on any object to create an object inherited from it:
```JavaScript
let foo = {
  a: 1,
};

let bar = foo.begetObject();
foo.isPrototypeOf(bar);         // true
```

```JavaScript
Object.prototype.begetObject = function() {
  function Inherit() {};
  Inherit.prototype = this'
  return new Inherit();
}
```

5. Create a function neww, so that it works like the new operator. For this practice problem, you may use Object.create.

```JavaScript
function neww(constructor, args) {
  // ..
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
john.constructor;         // Person(firstName, lastName) {...}
```

```JavaScript
function neww(constructor, args) {
  let newObj = Object.create(constructor.prototype);
  let constructorReturnVal = constructor.apply(newObj, args);

  return (typeof constructorReturnVal === 'object') ? constructorReturnVal : newObj;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
john.constructor;         // Person(firstName, lastName) {...}
```
