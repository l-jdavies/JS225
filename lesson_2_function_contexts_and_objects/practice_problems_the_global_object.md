1. With strict mode not enabled, what object serves as the implicit execution context? What happens when strict mode is enabled?

No strict mode - the window object is the implicit execution context
With strict mode - there is no implicit execution context as the window object isn't implicitly available.

2. What does the code below log?
```javascript
a = 10;

console.log(window.a === a);
```

true.

3. In strict mode, what does the code in the previous question log?

It will throw a ReferenceError, stating that `a` hasn't been declared.

4. What does the code below do?
```javascript
function func() {
  let b = 1;
}

func();

console.log(b);
```

`func()` will return `undefined` and `console.log(b)` will throw a ReferenceError because `b` has function scope.

5. What does the code below do?
```javascript
function func() {
  b = 1;
}

func();

console.log(b);
```

It will log `1` (as long as the code isn't using strict mode). The variable `b` wasn't explicitly declared, so it was implicitly added as a property of the `window` object.

6. What does the code below log?
```javascript
"use strict"

function func() {
  b = 1;
}

func();

console.log(b);
```

This will log a ReferenceError message because `b` hasn't been declared.
