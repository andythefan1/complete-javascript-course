// Object.create() allows manually setting the prototype of an object to any other object

// const Person = class {
//   constructor(name, year) {
//     this.name = name;
//     this.year = year;
//   }
// };

// Object literal
const PersonProtoype = {
  calcAge: function () {
    console.log(`year is ${this.year}`);
  },

  // does not get called on object instantiation
  init(name, year) {
    this.name = name;
    this.year = year;
  },
};

// create an empty object, then assign its prototype
const steven = Object.create(PersonProtoype);
steven.name = 'Steven';
steven.year = 2003;
steven.calcAge();

console.log(steven.__proto__ === PersonProtoype);

const sarah = Object.create(PersonPrototype);
sarah.init('sarah', 2008);
