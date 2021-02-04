1. What will the code below log to the console?
```JavaScript
let foo = {};
let bar = Object.create(foo);

foo.a = 1;

console.log(bar.a);
```

`1`. The `bar` object doesn't contain a property called `a` so JS will look up the prototypal chain to `foo`, which does have a property `a` and the value of that property will be returned.

2. What will the code below log to the console?
```JavaScript
let foo = {};
let bar = Object.create(foo);

foo.a = 1;
bar.a = 2;
console.log(bar.a);
```

`2` because `bar` has a property called `a` so that value will be returned.

3. Given the code below, do we know for certain that on the last line we are ultimately referencing a property owned by boo? How can we test that far is not delegating to boo?
```JavaScript
let boo = {};
boo.myProp = 1;

let far = Object.create(boo);

// lots of code

far.myProp;       // 1
```

`far.hasOwnProperty('myProp')`, will test if the property is owned by `far`.
