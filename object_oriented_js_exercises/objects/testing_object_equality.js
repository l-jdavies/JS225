// In JavaScript, comparing two objects either with == or === checks for object identity. In other words, the comparison evaluates to true if it's the same object on either side of == or ===. This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and returns true or false depending on whether the objects have the same key/value pairs.

function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  return allKeysMatch(obj1, obj2) && allValuesMatch(obj1, obj2);
}

function sameArrayContents(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let idx = 0; idx < arr1.length; idx++) {
    if (arr1[idx] !== arr2[idx]) {
      return false;
    }
  }
  return true;
}

function allKeysMatch(obj1, obj2) {
  let obj1Keys = Object.keys(obj1);
  let obj2Keys = Object.keys(obj2);

  return sameArrayContents(obj1Keys, obj2Keys);
}

function allValuesMatch(obj1, obj2) {
  let obj1Values = Object.values(obj1);
  let obj2Values = Object.values(obj2);

  return sameArrayContents(obj1Values, obj2Values);
}


console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
