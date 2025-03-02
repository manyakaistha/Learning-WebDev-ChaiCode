// JavaScript Core Concepts and Data Types

// 1. Basic Data Types
const stringExample = "Hello JavaScript";
const numberExample = 42.5;
const booleanExample = true;
const nullExample = null;
let undefinedExample;

// 2. Arrays
const skills = ["HTML", "CSS", "JavaScript"];

// 3. Objects
const studentProfile = {
    name: "John Doe",
    age: 25,
    isPaid: true,
    skills: ["HTML", "CSS", "JavaScript"],
    favoriteClass: null
};

// 4. Type Checking
console.log('String type:', typeof stringExample);    // string
console.log('Number type:', typeof numberExample);    // number
console.log('Boolean type:', typeof booleanExample);  // boolean
console.log('Null type:', typeof nullExample);       // object
console.log('Undefined type:', typeof undefinedExample); // undefined
console.log('Array type:', typeof skills);           // object
console.log('Object type:', typeof studentProfile);   // object

// 5. Array Methods
const fruits = ["apple", "banana", "cherry"];
console.log('Original array:', fruits);

// Adding elements
fruits.push("date");           // Add to end
fruits.unshift("apricot");     // Add to beginning

// Removing elements
fruits.pop();                  // Remove from end
fruits.shift();               // Remove from beginning

console.log('Modified array:', fruits);

// 6. Template Literals
const name = "JavaScript";
const message = `Hello ${name}! Welcome to programming.`;
console.log(message);