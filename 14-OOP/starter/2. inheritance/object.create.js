// Object.create() allows manually setting the prototype of an object to any other object

// const Person = class {
//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//   }
// };

// Object literal
const Person = {
  calcAge: function () {
    console.log(`I am ${2022 - this.year} years old `);
  },

  // does not get called on object instantiation
  init(name, year) {
    this.name = name;
    this.year = year;
  },
};

const Student = Object.create(Person);

Student.init = function (firstName, birthYear, course) {
  Person.init.call(this, firstName, birthYear);
  this.course = course;
};

Student.introduce = function () {
  console.log(`My name is ${this.fullName} and I study ${this.course}`);
};

const jay = Object.create(Student);
jay.init('Jay', 2010, 'Math');
