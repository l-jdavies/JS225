While working through these practice problems, assume that the code runs within a web page.

1. What does `this` point to in the code below, and what does the method return?
```JavaScript
let myObject = {
  count: 1,
  myChildObject: {
    myMethod() {
      return this.count;
    },
  },
};

myObject.myChildObject.myMethod();
```

It will return `undefined` because `this` in the `myMethod` function will reference `myChildObject`, which doesn't have a property called `count`.

2. In the previous problem, how would you change the context, or the value of this, to be the parent myObject?
```JavaScript
let myObject = {
  count: 1,
  myChildObject: {
    myMethod() {
      return this.count;
    },
  },
};

myObject.myChildObject.myMethod.call(myObject);
```

3. What does the following code log to the console?
```JavaScript
let person = {
  firstName: 'Peter',
  lastName: 'Parker',
  fullName() {
    console.log(this.firstName + ' ' + this.lastName +
                ' is the Amazing Spiderman!');
  },
};

let whoIsSpiderman = person.fullName.bind(person);
whoIsSpiderman();
```

`Peter Parker is the Amazing Spiderman` because the `person` object has been explictly bound to the `person.fullName` function using the `bind` method.

4. What does the following code log to the console?
```JavaScript
let computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    function specialDiscount() {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

console.log(computer.total());
```
If you want this program to log 34000, how would you fix it?

Currently, it will log `35000` because in the `specialDiscount` function, `this` references the `window` object and `window.price` will evaluate to `undefined`, which will return `0`. Therefore, `return this.price + this.shipping + tax - specialDiscount();` will be `30000 + 2000 + 3000 - 0`.

To fix the code, the execution context of `specialDiscount` can be explictly set to the `computer` object:

```
return this.price + this.shipping + tax - specialDiscount.call(this);
```

