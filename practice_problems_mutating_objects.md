1. What will the code below output to the console?

```javascript
let message = 'Hello from the global scope!';

function func(message) {
  message = 'Hello from the function scope!';
  console.log(message);
}

func(message);
console.log(message);
```

'Hello from the function scope!'
'Hello from the global scope!'

2. What will the code below log to the console? What does this output demonstrate in relation to the output of problem one?

```javascript
let myObj = { message: 'Greetings from the global scope!' };

function func(obj) {
  obj.message = 'Greetings from the function scope!';
  console.log(obj.message);
}

func(myObj);

console.log(myObj.message);
```

'Greetings from the function scope!'
'Greetings from the function scope!'

3. What will the code below log to the console?

```javascript
let message = 'Hello from the global scope!';

function func() {
  message = 'Hello from the function scope!';
  console.log(message);
}

func();
console.log(message);
```

'Hello from the function scope!'
'Hello from the function scope!'

4. What will the code below log to the console?

```javascript
let a = 10;
let obj = {
  a
}

let newObj = obj;
newObj.a += 10;

console.log(obj.a === a);
console.log(newObj.a === obj.a);
```

false
true

5. Consider the code below:

```javascript
let animal = {
  name: 'Pumbaa',
  species: 'Phacochoerus africanus',
};

let menagerie = {
  warthog: animal,
};

animal = {
  name: 'Timon',
  species: 'Suricata suricatta',
};

menagerie.meerkat = animal;

menagerie.warthog === animal; // false
menagerie.meerkat === animal; // true
```

If objects are mutable, why does the second to last line return false?

Because after `menagerie.warthog` was assigned the value of animal, the variable animal was assigned a new object as a value. This means the objects referenced by the `animal` object and `menagerie.warthog` occupy different memory allocations and have different values. However, `menagerie.meerkat` was assigned the value of `animal` after the reassignment had occurred.
