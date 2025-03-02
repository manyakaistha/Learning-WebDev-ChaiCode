# JavaScript Fundamentals - Day 7

## Introduction to JavaScript
JavaScript is a versatile programming language that enables interactive web pages and is an essential part of web applications.

## Variables and Data Types

### Variable Declaration
```javascript
// Using let (block-scoped)
let name = "John";

// Using const (constant)
const PI = 3.14159;

// Using var (function-scoped, not recommended)
var age = 25;
```

### Data Types
```javascript
// Numbers
let count = 42;
let price = 99.99;

// Strings
let greeting = "Hello, World!";
let message = 'Welcome';

// Booleans
let isActive = true;
let isLoggedIn = false;

// Undefined
let undefinedVar;

// Null
let emptyValue = null;

// Objects
let person = {
    name: "Jane",
    age: 30,
    isStudent: false
};

// Arrays
let colors = ["red", "green", "blue"];
```

## Basic Operations

### Arithmetic Operations
```javascript
let a = 10;
let b = 5;

let sum = a + b;      // Addition
let diff = a - b;     // Subtraction
let product = a * b;  // Multiplication
let quotient = a / b; // Division
let remainder = a % b;// Modulus
```

### String Operations
```javascript
let firstName = "John";
let lastName = "Doe";

// String concatenation
let fullName = firstName + " " + lastName;

// Template literals
let greeting = `Hello, ${firstName}!`;
```

## Control Flow

### Conditional Statements
```javascript
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
} else if (age >= 13) {
    console.log("You are a teenager");
} else {
    console.log("You are a child");
}
```

### Loops
```javascript
// For loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// While loop
let count = 0;
while (count < 5) {
    console.log(count);
    count++;
}
```

## Functions
```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrow function
const add = (a, b) => a + b;

// Function expression
const multiply = function(x, y) {
    return x * y;
};
```

## Best Practices
1. Use meaningful variable names
2. Use const by default, let when needed
3. Avoid var
4. Write clean, readable code
5. Use proper indentation

## Exercise
Create simple programs to practice:
- Variable declarations and data types
- Basic arithmetic operations
- String manipulation
- Control flow statements
- Function creation and usage