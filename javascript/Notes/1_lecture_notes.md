# JavaScript Core - Day 1

## Table of Contents

1. [Introduction to JavaScript](#introduction-to-javascript)
2. [Variables and Data Types](#variables-and-data-types)
3. [Control Structures](#control-structures)
4. [JavaScript Execution Model](#javascript-execution-model)
5. [Practice Exercises](#practice-exercises)
6. [Interview Focus Points](#interview-focus-points)
7. [Additional Resources](#additional-resources)

## Introduction to JavaScript

### What is JavaScript?
JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It was originally created to make web pages interactive and is now used for both client-side and server-side development.

```javascript
// This is a simple JavaScript code that displays an alert in the browser
console.log("Hello, World!"); // Outputs to the console
alert("Welcome to JavaScript!"); // Shows a popup in the browser
```

### Role in Web Development
JavaScript is one of the core technologies of the web, alongside HTML and CSS:
- **HTML**: Provides the structure of web pages
- **CSS**: Controls the presentation and layout
- **JavaScript**: Adds interactivity and dynamic behavior

```javascript
// Example of JavaScript interacting with HTML
document.getElementById("demo").innerHTML = "JavaScript changed this content!";

// Example of JavaScript modifying CSS
document.getElementById("demo").style.color = "blue";
```

### JavaScript Engines
JavaScript engines are programs that execute JavaScript code. Different browsers use different engines:

- **V8**: Used by Google Chrome and Node.js
- **SpiderMonkey**: Used by Firefox
- **JavaScriptCore**: Used by Safari
- **Chakra**: Used by older versions of Microsoft Edge

These engines compile JavaScript into machine code for faster execution using Just-In-Time (JIT) compilation techniques.

### Setting Up Development Environment

1. **Text Editor/IDE**: Use a code editor like Visual Studio Code, Sublime Text, or Atom
2. **Browser**: Modern browsers have built-in developer tools (F12 or Ctrl+Shift+I)
3. **Node.js**: For running JavaScript outside the browser

```javascript
// You can run this in browser console or Node.js
console.log("Your development environment is ready!");

// Check JavaScript version in Node.js
console.log(process.version); // Shows Node.js version
```

## Variables and Data Types

### Variable Declaration

JavaScript has three ways to declare variables:

```javascript
// var - function scoped, can be redeclared and updated
var age = 25;
var age = 26; // Valid redeclaration

// let - block scoped, can be updated but not redeclared in the same scope
let name = "John";
name = "Jane"; // Valid update
// let name = "Jim"; // Invalid redeclaration in same scope

// const - block scoped, cannot be updated or redeclared
const PI = 3.14159;
// PI = 3.14; // Invalid - cannot update a constant
```

#### Scope Demonstration

```javascript
function scopeExample() {
  var functionScoped = "I am function scoped";
  
  if (true) {
    var sameVar = "I am also function scoped";
    let blockScoped = "I am block scoped";
    const alsoBlockScoped = "I am also block scoped";
    
    console.log(blockScoped); // Accessible here
  }
  
  console.log(sameVar); // Accessible outside the if block
  // console.log(blockScoped); // Error - not accessible outside the block
}
```

### Primitive Data Types

#### Number
```javascript
let integer = 42;
let float = 3.14;
let scientific = 2.998e8; // Scientific notation
let binary = 0b1010; // Binary (10)
let octal = 0o744; // Octal (484)
let hexadecimal = 0xFF; // Hexadecimal (255)

// Special number values
let infinity = Infinity;
let negativeInfinity = -Infinity;
let notANumber = NaN; // Result of undefined mathematical operations

console.log(10 / 0); // Infinity
console.log(Math.sqrt(-1)); // NaN
```

#### String
```javascript
// String creation
let singleQuotes = 'Hello';
let doubleQuotes = "World";
let backticks = `Hello World`;

// String methods
let text = "JavaScript is amazing";
console.log(text.length); // 22
console.log(text.toUpperCase()); // JAVASCRIPT IS AMAZING
console.log(text.indexOf("is")); // 11
console.log(text.slice(0, 10)); // JavaScript
console.log(text.replace("amazing", "awesome")); // JavaScript is awesome

// String concatenation
let firstName = "John";
let lastName = "Doe";
let fullName1 = firstName + " " + lastName; // John Doe
let fullName2 = `${firstName} ${lastName}`; // John Doe (template literal)
```

#### Boolean
```javascript
let isActive = true;
let isLoggedIn = false;

// Boolean operations
console.log(!isActive); // false (NOT)
console.log(isActive && isLoggedIn); // false (AND)
console.log(isActive || isLoggedIn); // true (OR)

// Truthy and falsy values
console.log(Boolean(0)); // false
console.log(Boolean(""));  // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(false)); // false

console.log(Boolean(1)); // true (any non-zero number)
console.log(Boolean("hello")); // true (any non-empty string)
console.log(Boolean([])); // true (any array, even empty)
console.log(Boolean({})); // true (any object, even empty)
```

#### Undefined
```javascript
// Variable declared but not assigned a value
let undefinedVar;
console.log(undefinedVar); // undefined

// Function with no return statement
function noReturn() {
  // No return statement
}
console.log(noReturn()); // undefined
```

#### Null
```javascript
// Null represents intentional absence of any object value
let emptyValue = null;
console.log(emptyValue); // null

// Difference between null and undefined
console.log(typeof null); // "object" (this is a historical bug in JavaScript)
console.log(typeof undefined); // "undefined"
console.log(null === undefined); // false
console.log(null == undefined); // true (loose equality)
```

#### Symbol
```javascript
// Symbols are unique and immutable
let sym1 = Symbol("description");
let sym2 = Symbol("description");

console.log(sym1 === sym2); // false, each Symbol is unique

// Use case: unique object keys
let user = {};
let idSymbol = Symbol("id");
user[idSymbol] = 12345;

console.log(user[idSymbol]); // 12345
```

### Type Coercion and Conversion

```javascript
// Implicit coercion (automatic)
console.log("5" + 2); // "52" (string concatenation)
console.log("5" - 2); // 3 (numeric subtraction)
console.log("5" * 2); // 10 (numeric multiplication)
console.log("5" / 2); // 2.5 (numeric division)

// Explicit conversion
console.log(Number("5")); // 5
console.log(String(5)); // "5"
console.log(Boolean(5)); // true

// Equality operators
console.log(5 == "5"); // true (loose equality, with type coercion)
console.log(5 === "5"); // false (strict equality, no type coercion)
```

### Template Literals

```javascript
let name = "Alice";
let age = 30;

// Old way (string concatenation)
let message1 = "My name is " + name + " and I am " + age + " years old.";

// Template literals (ES6+)
let message2 = `My name is ${name} and I am ${age} years old.`;

console.log(message1); // My name is Alice and I am 30 years old.
console.log(message2); // My name is Alice and I am 30 years old.

// Multi-line strings
let multiLine = `This is line 1.
This is line 2.
This is line 3.`;
console.log(multiLine);
// Output:
// This is line 1.
// This is line 2.
// This is line 3.

// Expressions in template literals
let a = 5;
let b = 10;
console.log(`Sum: ${a + b}, Product: ${a * b}`); // Sum: 15, Product: 50
```

## Control Structures

### Conditional Statements

#### if...else
```javascript
let hour = 14;
let greeting;

if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 18) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

console.log(greeting); // "Good afternoon"

// Nested if statements
let score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else {
  if (score >= 80) {
    grade = "B";
  } else {
    if (score >= 70) {
      grade = "C";
    } else {
      grade = "F";
    }
  }
}

console.log(grade); // "B"
```

#### switch
```javascript
let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  case 7:
    dayName = "Sunday";
    break;
  default:
    dayName = "Invalid day";
}

console.log(dayName); // "Wednesday"

// Grouping cases
let month = 7;
let season;

switch (month) {
  case 12:
  case 1:
  case 2:
    season = "Winter";
    break;
  case 3:
  case 4:
  case 5:
    season = "Spring";
    break;
  case 6:
  case 7:
  case 8:
    season = "Summer";
    break;
  case 9:
  case 10:
  case 11:
    season = "Fall";
    break;
  default:
    season = "Invalid month";
}

console.log(season); // "Summer"
```

#### Ternary Operator
```javascript
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
console.log(canVote); // "Yes"

// Nested ternary operators (use with caution for readability)
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade); // "B"

// Ternary with multiple expressions (using commas)
let authenticated = true;
let nextAction = authenticated ? (console.log("Welcome back!"), "dashboard") : (console.log("Please sign in"), "login");
console.log(nextAction); // Logs "Welcome back!" then "dashboard"
```

### Loops

#### for
```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}
// Output:
// Iteration 0
// Iteration 1
// Iteration 2
// Iteration 3
// Iteration 4

// Looping through an array
let fruits = ["Apple", "Banana", "Cherry", "Date"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`Fruit ${i+1}: ${fruits[i]}`);
}
// Output:
// Fruit 1: Apple
// Fruit 2: Banana
// Fruit 3: Cherry
// Fruit 4: Date

// Nested for loops (creating a multiplication table)
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} × ${j} = ${i * j}`);
  }
}
// Output:
// 1 × 1 = 1
// 1 × 2 = 2
// 1 × 3 = 3
// 2 × 1 = 2
// 2 × 2 = 4
// 2 × 3 = 6
// 3 × 1 = 3
// 3 × 2 = 6
// 3 × 3 = 9
```

#### while
```javascript
// Basic while loop
let count = 0;
while (count < 5) {
  console.log(`Count: ${count}`);
  count++;
}
// Output:
// Count: 0
// Count: 1
// Count: 2
// Count: 3
// Count: 4

// Using while for user input validation (pseudocode)
/*
let userInput;
while (!isValid(userInput)) {
  userInput = promptUser("Enter a valid input:");
}
*/

// Infinite loop with break
let i = 0;
while (true) {
  console.log(`Iteration ${i}`);
  i++;
  if (i >= 3) {
    break; // Exit the loop
  }
}
```

## JavaScript Execution Model

JavaScript is a single-threaded language, which means it can only execute one piece of code at a time. However, it can handle asynchronous operations through its event-driven architecture and execution model.

### Call Stack

The call stack is a data structure that records where in the program we are. If we step into a function, we push it onto the stack. If we return from a function, we pop it off the stack.

```javascript
function firstFunction() {
  console.log("Inside first function");
  secondFunction();
  console.log("Back to first function");
}

function secondFunction() {
  console.log("Inside second function");
}

firstFunction();
// Output:
// Inside first function
// Inside second function
// Back to first function
```

### Event Loop

The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.

```
┌───────────────────────────┐
│           Call Stack       │
└───────────────────────────┘
           ↑    ↓
┌───────────────────────────┐
│        JavaScript Engine   │
└───────────────────────────┘
           ↑    ↓
┌───────────────────────────┐     ┌───────────────────────────┐
│        Event Loop          │←────│    Callback Queue         │
└───────────────────────────┘     └───────────────────────────┘
           ↑                                  ↑
           │                                  │
┌───────────────────────────┐     ┌───────────────────────────┐
│     Microtask Queue       │     │  Web APIs / Node APIs     │
└───────────────────────────┘     └───────────────────────────┘
```

#### How the Event Loop Works

1. Execute code in the call stack
2. When the call stack is empty, check the microtask queue
3. Execute all tasks in the microtask queue until it's empty
4. Render any UI updates (in browsers)
5. Check the callback (task) queue
6. Take the first task from the callback queue and push it to the call stack
7. Repeat the process

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise callback");
});

console.log("End");

// Output:
// Start
// End
// Promise callback
// Timeout callback
```

### Task Queue (Macrotask Queue)

The task queue (also known as the callback queue or macrotask queue) holds callbacks from events, timeouts, and intervals.

Common sources of tasks:
- `setTimeout()`
- `setInterval()`
- `setImmediate()` (Node.js)
- I/O operations
- UI rendering
- Event listeners (click, keypress, etc.)

```javascript
console.log("Before setTimeout");

setTimeout(() => {
  console.log("Inside setTimeout callback");
}, 1000);

console.log("After setTimeout");

// Output:
// Before setTimeout
// After setTimeout
// (after 1 second) Inside setTimeout callback
```

### Microtask Queue

The microtask queue has higher priority than the task queue. All microtasks are processed after the current task and before the next task.

Common sources of microtasks:
- Promises (`.then()`, `.catch()`, `.finally()`)
- `queueMicrotask()`
- `process.nextTick()` (Node.js, higher priority than other microtasks)
- `MutationObserver` (browser)

```javascript
console.log("Script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
}).then(() => {
  console.log("Promise 2");
});

console.log("Script end");

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout
```

### Priority of Execution

The order of execution priority in JavaScript is:

1. Synchronous code in the call stack
2. Microtasks (Promise callbacks, queueMicrotask, etc.)
3. Tasks (setTimeout, setInterval, event callbacks, etc.)

### Practical Example: Multiple Queues in Action

```javascript
console.log("1. Script starts");

setTimeout(() => {
  console.log("2. setTimeout callback");
  
  Promise.resolve().then(() => {
    console.log("3. Promise inside setTimeout");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("4. First Promise callback");
  
  setTimeout(() => {
    console.log("5. setTimeout inside Promise");
  }, 0);
});

console.log("6. Script ends");

// Output:
// 1. Script starts
// 6. Script ends
// 4. First Promise callback
// 2. setTimeout callback
// 3. Promise inside setTimeout
// 5. setTimeout inside Promise
```

### Common Misconceptions

1. **Misconception**: `setTimeout(fn, 0)` executes the callback immediately.
   **Reality**: It still goes through the event loop and executes after all synchronous code and microtasks.

2. **Misconception**: Promises execute asynchronously.
   **Reality**: Promise creation is synchronous; only the callbacks (`.then()`, `.catch()`) are asynchronous.

3. **Misconception**: The event loop is part of JavaScript.
   **Reality**: The event loop is provided by the environment (browser, Node.js), not by the JavaScript engine itself.

### Interview Focus: Event Loop Questions

1. **What is the output of this code and why?**

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Output: A, D, C, B
```

2. **How would you implement a function that returns a promise but executes after all other microtasks?**

```javascript
function afterAllMicrotasks(callback) {
  return Promise.resolve()
    .then(() => Promise.resolve())
    .then(() => callback());
}
```

3. **What's the difference between `process.nextTick()` and `setImmediate()` in Node.js?**
   - `process.nextTick()` adds to the microtask queue and runs before other microtasks
   - `setImmediate()` adds to the task queue and runs after the current poll phase

### Real-world Applications

1. **Debouncing and Throttling**

```javascript
// Debounce function (executes after a delay of inactivity)
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle function (executes at most once per specified time)
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

2. **Handling UI Updates**

```javascript
// Bad practice (blocking the main thread)
function processLargeData(data) {
  for (let i = 0; i < data.length; i++) {
    // Heavy processing
  }
  updateUI();
}

// Better practice (chunking with setTimeout)
function processLargeDataChunked(data, chunkSize = 100) {
  let index = 0;
  
  function processChunk() {
    const chunk = data.slice(index, index + chunkSize);
    // Process chunk
    index += chunkSize;
    
    if (index < data.length) {
      setTimeout(processChunk, 0); // Yield to the event loop
    } else {
      updateUI();
    }
  }
  
  processChunk();
}
```

### Common Misconceptions

1. **Misconception**: `setTimeout(fn, 0)` executes the callback immediately.
   **Reality**: It still goes through the event loop and executes after all synchronous code and microtasks.

2. **Misconception**: Promises execute asynchronously.
   **Reality**: Promise creation is synchronous; only the callbacks (`.then()`, `.catch()`) are asynchronous.

3. **Misconception**: The event loop is part of JavaScript.
   **Reality**: The event loop is provided by the environment (browser, Node.js), not by the JavaScript engine itself.

### Interview Focus: Event Loop Questions

1. **What is the output of this code and why?**

```javascript
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// Output: A, D, C, B
```

2. **How would you implement a function that returns a promise but executes after all other microtasks?**

```javascript
function afterAllMicrotasks(callback) {
  return Promise.resolve()
    .then(() => Promise.resolve())
    .then(() => callback());
}
```

3. **What's the difference between `process.nextTick()` and `setImmediate()` in Node.js?**
   - `process.nextTick()` adds to the microtask queue and runs before other microtasks
   - `setImmediate()` adds to the task queue and runs after the current poll phase

### Real-world Applications

1. **Debouncing and Throttling**

```javascript
// Debounce function (executes after a delay of inactivity)
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle function (executes at most once per specified time)
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

2. **Handling UI Updates**

```javascript
// Bad practice (blocking the main thread)
function processLargeData(data) {
  for (let i = 0; i < data.length; i++) {
    // Heavy processing
  }
  updateUI();
}

// Better practice (chunking with setTimeout)
function processLargeDataChunked(data, chunkSize = 100) {
  let index = 0;
  
  function processChunk() {
    const chunk = data.slice(index, index + chunkSize);
    // Process chunk
    index += chunkSize;
    
    if (index < data.length) {
      setTimeout(processChunk, 0); // Yield to the event loop
    } else {
      updateUI();
    }
  }
  
  processChunk();
}
```