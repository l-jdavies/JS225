// In this exercise, you'll make an extend function and use it to add a mixin to the previous exercise. The mixin adds invoice and payTax methods.
//
// Check out the example run and note how the Professional mixin is applied to the Doctor and Professor constructors via extend:

function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function () {
  console.log(this.firstName + ' ' + this.lastName);
}

Person.prototype.communicate = function () {
  console.log('Communicating');
}

Person.prototype.eat = function () {
  console.log('Eating');
}

Person.prototype.sleep = function () {
  console.log('Sleeping');
}


function Doctor(firstName, lastName, age, gender, specialist) {
  Person.call(this, firstName, lastName, age, gender);

  this.specialist = specialist;
}

Doctor.prototype = Object.create(Person.prototype);
Object.defineProperty(Doctor.prototype, 'constructor', {
  value: Doctor,
  enumerable: false,
  writable: true,
});

Doctor.prototype.diagnose = function () {
  console.log('Diagnosing');
}


function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Object.defineProperty(Student.prototype, 'constructor', {
  value: Student,
  enumerable: false,
  writable: true,
});

Student.prototype.study = function () {
  console.log('Studying');
}

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
Object.defineProperty(GraduateStudent.prototype, 'constructor', {
  value: GraduateStudent,
  enumerable: false,
  writable: true,
});

GraduateStudent.prototype.research = function () {
  console.log('Researching');
}

const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender)
}

Professor.prototype = Object.create(Person.prototype);
Object.defineProperty(Professor.prototype, 'constructor', {
  value: Professor,
  enumerable: false,
  writable: true,
});

Professor.prototype.teach = function () {
  console.log('Teaching');
}

let Professional = {
  invoice() {
    console.log(`${this.fullName()} is Asking customer to pay`);
  },

  payTax() {
    console.log(`${this.fullName()} is paying taxes`);
  },
}

function delegate(callingObj, methodOwningObj, methodName) {
  return function () {
    return methodOwningObj[methodName].apply(callingObj);
  }
}

// extend function copies methods from mixin to object
function extend(obj, mixin) {
  allMethodNames = Object.keys(mixin);

  allMethodNames.forEach(key => obj[key] = delegate(obj, mixin, key));

  return obj;
}

const doctor = extend(new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics'), Professional);
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'S
doctor.diagnose();                         // logs 'Diagnosing'

const professor = extend(new Professor('foo', 'bar', 21, 'gender', 'Systems Engineering'), Professional);
console.log(professor instanceof Person);     // logs true
console.log(professor instanceof Professor);  // logs true
professor.eat();                              // logs 'Eating'
professor.communicate();                      // logs 'Communicating'
professor.sleep();                            // logs 'Sleeping'
console.log(professor.fullName());            // logs 'foo bar'
professor.teach();                            // logs 'Teaching'

doctor.invoice();                          // logs 'foo bar is Billing customer'
doctor.payTax();                           // logs 'foo bar Paying taxes'

Professional.invoice = function () {
  console.log(`${this.fullName()} is Asking customer to pay`);
};

doctor.invoice();                          // logs 'foo bar is Asking customer to pay'
professor.invoice();                       // logs 'foo bar is Asking customer to pay'
professor.payTax();                        // logs 'foo bar Paying taxes'
