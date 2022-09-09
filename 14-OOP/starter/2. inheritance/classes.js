// Class declaration
const Person1 = class {};

// Class expression
class Person {
  constructor(fullName, birthYear) {
    // good convention to prevent setter and constructor conflict
    // on instance property
    this._fullName = fullName;
    this.birthYear = birthYear;
  }

  // INSTANCE METHODS

  // Method will be added to Object's prototype not to this class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  get age() {
    console.log(this.birthYear);
  }

  get fullName() {
    console.log(this._fullName);
  }

  // accessors can be used for validation

  // if setter has same name as property in constructor, this
  // will be called when the object is created (this.fullName = name)
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} does not include a space `);
  }

  //static method
  static hey() {
    console.log(`hello 😌`);
  }
}

// equivalent to above
Person.prototype.greet = function () {
  console.log(`hello, ${this.name}`);
};

const john = new Person('john smith', 1991);
john.fullName; // "john smith"

// ACCESSORS (getters and setters)
const account = {
  owner: 'jonas',
  movements: [1, 2, 3],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(movement) {
    this.movements.push(movement);
  },
};

// is a property, can do logic without calling a method
console.log(account.latest);
// assigning setter like a property
account.latest = 50;
console.log(account.latest);

// STATIC METHODS
Person.hey = function () {
  console.log(`hey there 🤣`);
};

// 'extends' keyword links the prototypes behind the scenes
class Student extends Person {
  constructor(fullName, birthYear, course) {
    // calls constructor function of the parent class (vs. call())
    super(fullName, birthYear);
    // super creates 'this' keyword, needs to be called before anything else
    this.course = course;
  }

  introduce = function () {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  };

  calcAge() {
    console.log(`I am ${2022 - this.birthYear} years old.`);
  }
}

const martha = new Student('Martha Jones', 2002, 'Computer Science');
