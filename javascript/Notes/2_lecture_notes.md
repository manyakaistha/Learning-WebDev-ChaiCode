# JavaScript Core - Day 2

## Table of Contents

1. [Functions in JavaScript](#functions-in-javascript)
2. [Objects and Arrays](#objects-and-arrays)
3. [Practice Exercises](#practice-exercises)
4. [Interview Focus Points](#interview-focus-points)
5. [Additional Resources](#additional-resources)

## Functions in JavaScript

### Function Declaration
A function declaration defines a named function that is hoisted (available before its actual declaration in the code).

```javascript
// Function Declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function can be called before declaration due to hoisting
console.log(sayHello("Alice")); // "Hello, Alice!"

function sayHello(name) {
  return `Hello, ${name}!`;
}
```

### Function Expression
A function expression defines a function as part of an expression, typically by assigning it to a variable. These are not hoisted.

```javascript
// Function Expression
const greet = function(name) {
  return `Hello, ${name}!`;
};

console.log(greet("Bob")); // "Hello, Bob!"

// This would cause an error if called before declaration
// console.log(farewell("Charlie")); // Error: farewell is not a function

const farewell = function(name) {
  return `Goodbye, ${name}!`;
};
```

### Arrow Functions
Arrow functions provide a shorter syntax for writing function expressions and do not have their own `this`, `arguments`, `super`, or `new.target`.

```javascript
// Arrow Function (concise syntax)
const greet = name => `Hello, ${name}!`;
console.log(greet("Dave")); // "Hello, Dave!"

// Arrow Function with multiple parameters
const add = (a, b) => a + b;
console.log(add(5, 3)); // 8

// Arrow Function with function body
const calculateArea = (width, height) => {
  const area = width * height;
  return area;
};
console.log(calculateArea(4, 5)); // 20

// Arrow functions and lexical 'this'
function Counter() {
  this.count = 0;
  
  // Traditional function loses 'this' context
  setInterval(function() {
    // 'this' refers to the global object, not Counter instance
    // this.count++; // Would not work as expected
  }, 1000);
  
  // Arrow function preserves 'this' context
  setInterval(() => {
    this.count++; // 'this' refers to the Counter instance
    console.log(this.count);
  }, 1000);
}

// new Counter(); // Would start counting if uncommented
```

### Parameters and Arguments

```javascript
// Basic parameters
function greet(firstName, lastName) {
  return `Hello, ${firstName} ${lastName}!`;
}
console.log(greet("John", "Doe")); // "Hello, John Doe!"

// Default parameters (ES6+)
function greetWithDefault(name = "Guest") {
  return `Hello, ${name}!`;
}
console.log(greetWithDefault()); // "Hello, Guest!"
console.log(greetWithDefault("Emily")); // "Hello, Emily!"

// Rest parameters (ES6+)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// Arguments object (older approach)
function oldSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(oldSum(1, 2, 3, 4, 5)); // 15
```

### Return Values

```javascript
// Explicit return
function multiply(a, b) {
  return a * b; // Function execution stops here
  console.log("This will never execute");
}
console.log(multiply(4, 5)); // 20

// Multiple return statements
function getAbsoluteValue(number) {
  if (number < 0) {
    return -number;
  }
  return number;
}
console.log(getAbsoluteValue(-10)); // 10
console.log(getAbsoluteValue(5)); // 5

// Returning objects
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet() {
      return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    }
  };
}
const person = createPerson("Frank", 25);
console.log(person.greet()); // "Hi, I'm Frank and I'm 25 years old."

// Returning functions (closures)
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Function Scope

```javascript
// Global scope
let globalVar = "I'm global";

function demonstrateScope() {
  // Function scope
  let functionVar = "I'm function-scoped";
  
  console.log(globalVar); // "I'm global"
  console.log(functionVar); // "I'm function-scoped"
  
  if (true) {
    // Block scope (with let/const)
    let blockVar = "I'm block-scoped";
    var functionScopedVar = "I'm function-scoped despite being in a block";
    
    console.log(blockVar); // "I'm block-scoped"
  }
  
  // console.log(blockVar); // Error: blockVar is not defined
  console.log(functionScopedVar); // "I'm function-scoped despite being in a block"
}

demonstrateScope();
// console.log(functionVar); // Error: functionVar is not defined
```

### Callback Functions
A callback function is a function passed as an argument to another function, which is then invoked inside the outer function.

```javascript
// Simple callback example
function processUserInput(callback) {
  const name = prompt("Please enter your name:");
  callback(name);
}

function greet(name) {
  console.log(`Hello, ${name}!`);
}

// processUserInput(greet); // Would prompt for name and then greet the user

// Callbacks with array methods
const numbers = [1, 2, 3, 4, 5];

// forEach with callback
numbers.forEach(function(number) {
  console.log(number * 2);
});
// Output: 2, 4, 6, 8, 10

// Asynchronous callback example
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData(function(data) {
  console.log(`Received data: ${data.name}, ${data.age}`);
});
// After 1 second: "Received data: John, 30"
```

### Higher-Order Functions
A higher-order function is a function that takes one or more functions as arguments and/or returns a function.

```javascript
// Function that returns a function
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayHi("Bob")); // "Hi, Bob!"

// Function that takes a function as an argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;

console.log(applyOperation(5, 3, add)); // 8
console.log(applyOperation(5, 3, subtract)); // 2
console.log(applyOperation(5, 3, multiply)); // 15

// Common higher-order functions in JavaScript
const numbers = [1, 2, 3, 4, 5];

// map: transforms each element and returns a new array
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter: creates a new array with elements that pass the test
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4]

// reduce: accumulates values into a single result
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // 15
```

## Objects and Arrays

### Object Literals

```javascript
// Basic object literal
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",
  isEmployed: true
};

// Accessing object properties
console.log(person.firstName); // "John"
console.log(person["lastName"]); // "Doe"

// Nested objects
const student = {
  name: "Alice",
  grades: {
    math: 95,
    science: 88,
    history: 92
  },
  address: {
    street: "123 Main St",
    city: "Anytown",
    zipCode: "12345"
  }
};

console.log(student.grades.math); // 95
console.log(student.address.city); // "Anytown"

// Computed property names (ES6+)
const propertyName = "favoriteColor";
const user = {
  name: "Bob",
  age: 25,
  [propertyName]: "blue" // Computed property name
};

console.log(user.favoriteColor); // "blue"
```

### Object Properties and Methods

```javascript
// Object with methods
const calculator = {
  value: 0,
  add(number) {
    this.value += number;
    return this; // For method chaining
  },
  subtract(number) {
    this.value -= number;
    return this; // For method chaining
  },
  multiply(number) {
    this.value *= number;
    return this; // For method chaining
  },
  getValue() {
    return this.value;
  }
};

console.log(calculator.add(5).multiply(2).subtract(3).getValue()); // 7

// Property shorthand (ES6+)
const name = "Charlie";
const age = 35;

const person = {
  name, // Same as name: name
  age,  // Same as age: age
  greet() { // Method shorthand
    return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
  }
};

console.log(person.greet()); // "Hello, my name is Charlie and I'm 35 years old."

// Property descriptors and Object.defineProperty
const product = {};

Object.defineProperty(product, 'name', {
  value: 'Laptop',
  writable: false, // Cannot be changed
  enumerable: true, // Shows up in loops
  configurable: false // Cannot be deleted or reconfigured
});

product.name = "Smartphone"; // Will not change the value
console.log(product.name); // "Laptop"
```

### Array Creation and Methods

```javascript
// Creating arrays
const fruits = ["Apple", "Banana", "Cherry"];
const numbers = new Array(1, 2, 3, 4, 5);
const mixed = [1, "two", true, null, {name: "object"}, [1, 2, 3]];

// Accessing array elements
console.log(fruits[0]); // "Apple"
console.log(fruits[fruits.length - 1]); // "Cherry" (last element)

// Basic array methods

// push: adds elements to the end
fruits.push("Date");
console.log(fruits); // ["Apple", "Banana", "Cherry", "Date"]

// pop: removes the last element
const lastFruit = fruits.pop();
console.log(lastFruit); // "Date"
console.log(fruits); // ["Apple", "Banana", "Cherry"]

// unshift: adds elements to the beginning
fruits.unshift("Apricot");
console.log(fruits); // ["Apricot", "Apple", "Banana", "Cherry"]

// shift: removes the first element
const firstFruit = fruits.shift();
console.log(firstFruit); // "Apricot"
console.log(fruits); // ["Apple", "Banana", "Cherry"]

// splice: changes array by removing or replacing elements
fruits.splice(1, 1, "Blueberry", "Blackberry");
console.log(fruits); // ["Apple", "Blueberry", "Blackberry", "Cherry"]

// slice: returns a shallow copy of a portion of an array
const berries = fruits.slice(1, 3);
console.log(berries); // ["Blueberry", "Blackberry"]
console.log(fruits); // Original array unchanged

// Advanced array methods
const numbers = [1, 2, 3, 4, 5];

// map: creates a new array with the results of calling a function on every element
const squared = numbers.map(num => num * num);
console.log(squared); // [1, 4, 9, 16, 25]