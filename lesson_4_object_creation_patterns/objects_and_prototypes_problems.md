1. Use the method we learned above to assign foo below to a new Object with prot as its prototype.
```JavaScript
let prot = {};

let foo = // ?
```

```JavaScript
let prot = {};

let foo = Object.create(prot);
```

2. Use getPrototypeOf to demonstrate the prototypal relationship between prot and foo.

```JavaScript
Object.getPrototypeOf(foo) === prot; // true
```

3. Use isPrototypeOf to demonstrate the prototypal relationship between prot and foo.

```JavaScript
prot.isPrototypeOf(foo); // true 
```

4. What will the last two lines of the code below return? Why?
```JavaScript
let prot = {};

let foo = Object.create(prot);

prot.isPrototypeOf(foo);
Object.prototype.isPrototypeOf(foo);
```

Both lines will return `true`. `foo = Object.create(prot)` means that a new object was created with `prot` as the prototype and the returned object was assigned to `foo`.

The last line is `true` because `Object.prototype` is at the end of the prototypal chain for all objects.

