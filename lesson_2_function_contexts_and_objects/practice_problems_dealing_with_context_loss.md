1. Our desired output for the code below is: Christopher Turk is a Surgeon. What will the code output, and what explains the difference, if any, between the actual and desired outputs?
```JavaScript
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
```

This will log `undefined undefined is a undefined`. This is because the `logReturnVal` function, was invoked with the `getDescription` function as an argument. Within the `logReturnVal` function, the function argument (`getDescription`) is invoked. Because `getDescription` is being invoked from a function that is part of the global object and no execution context was explicitly supplied, within the `getDescription` `this` references `window`, within which the variables `firstName`, `lastName` and `occupation` have not been defined.


2. Alter logReturnVal such that it takes an additional context argument, and use one of the methods we've learned in this lesson to invoke func inside of logReturnVal with context as its function execution context. Alter the invocation of logReturnVal and supply turk as the context argument.
```JavaScript
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);
```

3. Suppose that we want to extract getDescription from turk, but always have it execute with turk as context. Use one of the methods we've learned in the last lesson to assign such a permanently bound function to a new variable, getTurkDescription.

```JavaScript
let getTurkDescription = turk.getDescription.bind(turk);
```

4. Consider the code below, and our desired output:
```JavaScript
let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();
```

Desired output:
```JavaScript
The Elder Scrolls Arena
The Elder Scrolls Daggerfall
The Elder Scrolls Morrowind
The Elder Scrolls Oblivion
The Elder Scrolls Skyrim
```
Will this code log our desired output? Why or why not?

No. The function supplied to `forEach` does not have an explicit execution context, therefore `this` will reference `window`. The code will log `undefined Arena` etc, etc.

5. Use an arrow function so that the code logs our desired output.
```JavaScript
let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

TESgames.listGames();
```

6. Use the `let self = this` fix to alter TESgames.listGames such that it logs our desired output to the console.
```JavaScript
let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
};
```

7. If we don't want to rely on let self = this, forEach provides us with an alternative means of supplying execution context to the inner function. Use this means to achieve our desired output.
```JavaScript
let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    }, this);
  }
};
```

8. Consider the code below:
```JavaScript
let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
```
What will the value of `foo.a` be after this code has executed?

It will still be `0` because the execution context of `incrementA()` is `window`, not the `foo` object.

9. Use one of the methods we learned in this lesson to invoke increment with explicit context such that foo.a is incremented with each invocation of incrementA.
```JavaScript
let foo = {
  a: 0,
  incrementA() {
    let self = this;
    function increment() {
      self.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
```

10. We decide that we want each invocation of foo.incrementA to increment foo.a by 3, rather than 1, and alter our code accordingly:
```JavaScript
let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.apply(this);
    increment.apply(this);
    increment.apply(this);
  }
};
```
Calling apply three times seems repetitive, though. Use bind to permanently set foo as increment's execution context.
```JavaScript
let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    let invokeIncrement = increment.bind(this);
    invokeIncrement();
      }
};
```

