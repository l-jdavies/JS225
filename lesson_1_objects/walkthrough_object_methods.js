let me = {
  firstName: 'Jane',
  lastName: 'Doe',
};

function fullName(person) {
  console.log(person.firstName + ' ' + person.lastName);
}

fullName(me);

let friend = {
  firstName: 'John',
  lastName: 'Smith',
}

fullName(friend);

let mother = {
  firstName: 'Amber',
  lastName: 'Doe',
};

let father = {
  firstName: 'Shane',
  lastName: 'Doe',
};

fullName(mother); // => Amber Doe
fullName(father); // => Shane Doe

let people = [];

people.push(me);
people.push(friend);
people.push(mother);
people.push(father);

function rollCall(collection) {
  let length;
  let i;
  for (i = 0, length = collection.length; i < length; i += 1) {
    fullName(collection[i]);
  }
}

rollCall(people);

// use forEach as alternative to loop
// pass in fullName as callback function to forEach

function rollCall(collection) {
  collection.forEach(fullName);
}

rollCall(people);

// collection of objects and functions can be packaged together in an object

people = {
  collection: [me, friend, mother, father],
  fullName: function (person) {
    console.log(person.firstName + ' ' + person.lastName);
  },

  rollCall: function () {
    //people.collection.forEach(people.fullName);
    this.collection.forEach(people.fullName);
  },
};

// rollCall is now invoked as a method on the people object

people.rollCall();

// create an add method that adds a new person to the collection array in the people object.

people.add = function (person) {
  this.collection.push(person);
}

// creating a method to remove a person
// will abstract the complexity by creating a function getIndex that will return 
// the index of the object which matches the firstName and lastName values, passed into the getIndex method as arguments
// if no matching object, getIndex will return -1

people.getIndex = function (person) {
  return this.collection.indexOf(person);
}

// start constructing the remove method

people.remove = function (person) {
  let index = this.getIndex(person);
  console.log(index);
}

people.remove(mother);
// logs 2

// works if the original object is passed in to the remove function 
// however, if an Object is passed into indexOf, it tests whether the same Object is present in the collection (rather than value equality)
// if an object with identical key-value pairs as one of the original objects is passed in, indexOf will return -1 because the objects are in different memory locations

// for example
people.getIndex({firstName: 'Amber', lastName: 'Doe'});
// logs -1

// to account for this issue, getIndex function needs to be modified to test for object property equality, not object equality 


people.getIndex = function (person) {
  let index = -1;
  this.collection.forEach(function (comparator, i) {
    if (comparator.firstName === person.firstName &&
      comparator.lastName === person.lastName) {
      index = i;
    }
  })

  return index;
}

people.getIndex({firstName: 'Amber', lastName: 'Doe'});
// 2

// update remove method to remove the located record from the collection

people.remove = function (person) {
  let index = this.getIndex(person);

  if (index === -1) {
    return;
    // nothing will happen
  }

  this.collection.splice(index, 1);
}

console.log(people.getIndex(friend)); // => 1
people.remove(friend);
console.log(people.getIndex(friend)); // => -1

// also need a method that validates the object passed into the remove method 

people.isValidPerson = function (person) {
  return typeof person.firstName === 'string' && typeof person.lastName === 'string';
}

// update remove method to include validation via the isValidPerson helper function

people.remove = function (person) {
  let index;
  if (!this.isValidPerson(person)) {
    return;
  }

  index = this.getIndex(person);
  if (index === -1) {
    return;
  }

  this.collection.splice(index, 1);
}

// currently isValidPerson is a bit confusing - if the method returns false, the remove method exits
// easier to understand the logic if isInvalidPerson is used instead

people.isInvalidPerson = function (person) {
  return typeof person.firstName !== 'string' || typeof person.lastName !== 'string';
};

people.remove = function (person) {
  if (this.isInvalidPerson(person)) {
    return;
  }
};

// now we have the logic, we will update the add method to prevent an invalid object being added

people.add = function (person) {
  if (this.isInvalidPerson(person)) {
    return;
  }

  this.collection.push(person);
}

// add function to return a person's info and another function to update info

people.get = function (person) {
  if (this.isInvalidPerson(person)) {
    return;
  }

  return this.collection[this.getIndex(person)];
}

// create the update method

people.update = function (person) {
  if (this.isInvalidPerson(person)) {
    return;
  }

  let existingPersonId = this.getIndex(person);
  if (existingPersonId === -1) {
    this.add(person);
  } else {
    this.collection[existingPersonId] = person;
  }
}
