// inheritance between classes
// constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // object binding: calling another function's method to reuse code
  // ex: calls Person constructor and specify 'this' keyword
  // these properties are defined in Person
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// specifying that Student's prototype is a Person
// Object.create() returns an empty object with an assigned prototype
Student.prototype = Object.create(Person.prototype);

// Object.create() must be placed before adding methods to prototype object
// otherwise they will be overwritten
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('mike', 2009, 'biology');
console.log(mike);

mike.introduce();
mike.calcAge();

console.log(mike.__proto__);

// verify an object is an instance of an object or any of its prototype objects
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

// required for some reason?
Student.prototype.constructor = Student;
