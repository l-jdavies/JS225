// Read the following code carefully. What do you think is logged on line 7. Try to answer the question before you run the code.

const person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// `this` will reference the `window` object and `window.firstName + window.lastName` will return `NaN` as both operands will evaluate to `undefined`.
