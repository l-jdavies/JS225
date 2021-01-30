// The code below is expected to output the following when run:
// > const helloVictor = createGreeter('Victor');
//> helloVictor.greet('morning');
//= Good Morning Victor
//
// However, it instead results in an error. What is the problem with the code? Why isn't it producing the expected results?

function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }

      console.log(msg);
    },
  };
}

// the error is because `this` isn't used within the switch statement to reference the object in which the object properties such as `morning`, `name` etc have been declared. 
