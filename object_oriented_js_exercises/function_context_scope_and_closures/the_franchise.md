The method franchise.allMovies is supposed to return the following array:
```JavaScript
[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]
```
Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.
```JavaScript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    });
  },
};
```

The inner function passed to the `map` method loses the execution context of the outer object. Therefore `this.name` references the `window` object. This can be fixed by passing an arrow function into `map` as arrow functions retain the execution context of the outer object:

```JavaScript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(number => `${this.name} ${number}`);
  },
};
```

Alternative solution using lexical scoping rules:
```JavaScript
const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  },
};
```
