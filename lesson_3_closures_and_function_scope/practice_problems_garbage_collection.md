1. Is JavaScript a garbage-collected language, and if so, what does this entail?

Yes, garbage-collection is used by JavaScript to automatically manage memory. GC monitors memory allocation, determines when a block of allocated memory is no longer required then reclaims the memory. In JavaScript this occurs using a mark-and-sweep algorithm, whereby the garbage collector starts at the root (the global object) and searches for all non-reachable objects.

2. Consider the code below:
```JavaScript
let myNum = 1;

function foo() {
  let myStr = 'A string';
  // what is eligible for GC here?
}

foo();

// what is eligible for GC here?

// more code
```
Are either of the values 1 or 'A string' eligible for garbage collection on line 5? What about on line 10?

On line 5, neither values are eligible for GC. On line 10, `A string` is eligible because the `myStr` variable is function scoped, therefore the variable's reference to `A string` is broken once the function has finished.

3. In the code below, is the value of outerFoo eligible for garbage collection on line 10?
```JavaScript
let outerFoo;

function bar() {
  let innerFoo = 'abc';
  outerFoo = innerFoo;
}

bar();

// can outerFoo's value be garbage collected here?

// more code
```

No. `outerFoo` is in the global scope but the `abc` string assigned to `innerFoo` can be GC.

4. Consider the code below:
```JavaScript
function makeString() {
  let index = 'abc';
  return function() {
    return index += 'xyz';
  };
}

let str = makeString();

// is 'abc' eligible for GC here?

// more code
```
is `abc` eligible for garbage collection on line 10?

No, because it is part of the `makeString` closure.

5. Consider the script below:
```JavaScript
let bash = "Some val";
```
Will the value "Some val" ever be eligible for garbage collection?

Yes, if the value of `bash` is reassigned or when the script finishes running.

