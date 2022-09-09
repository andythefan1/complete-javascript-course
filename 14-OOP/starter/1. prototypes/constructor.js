'use strict';

const Person = function (firstName, birthYear) {
  // this = {}

  // instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER do this, as it will create a copy of this method
  // for each instance of this prototype
  // use prototypical inheritance instead
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };

  // this = {firstName: 'bob, birthYear: 1991};
};

const foo = function () {
  console.log();
};

// use Constructor function to create a new object
// invoked by calling 'new' operator on function
const john = new Person('bob', 1991);
const jane = new Person('mary', 2014);

/* When 'new' operator is invoked on a function, 
  the following happpens:
  
  1. new empty object {} is created
  2. function is called, this = {}
  3. {} is linked to prototype
  4. function automatically returns {}
*/

john instanceof Person === true;

// this method only exists in the prototype
Person.prototype.calcAge = function () {
  // 'this' is the calling object (John)
  console.log(2037 - this.birthYear);
};

// objects created from the above constructor function will
// inherit all methods and properties of prototype

john.calcAge();
jane.calcAge();

// can access an object's prototype using proto property
console.log(john.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(john));

Person.prototype.species = 'Homo sapiens';
console.log(john.species); // john gets an inherited property of species

console.log(john.hasOwnProperty('firstName'));
console.log(john.hasOwnProperty('species'));

const arr = [1, 2, 3, 45, 5, 3, 2];
Array.prototype.unique = function () {
  return [...new Set(this)];
};
