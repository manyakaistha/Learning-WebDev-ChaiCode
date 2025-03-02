# JavaScript Objects and Memory Management

## Table of Contents
1. [Objects Fundamentals](#objects-fundamentals)
2. [Memory Management](#memory-management)
3. [Object Manipulation](#object-manipulation)
4. [Best Practices](#best-practices)

## Objects Fundamentals

### Basic Object Structure
```javascript
const person = {
    firstName: "John",
    lastName: "Doe",
    hobbies: ["Coding", "Reading"],
    address: {
        street: "123 Main St",
        city: "Tech City",
        country: "Codeland"
    }
};
```

### Key Characteristics
- Objects are collections of key-value pairs
- Properties can store any valid JavaScript data type
- Keys are strings or symbols (even if written without quotes)
- Objects are reference types (stored in heap memory)

## Memory Management

### Value vs Reference Types
```javascript
// Value types (primitives)
let a = 10;
let b = a;     // Creates a new copy
b = 20;        // Only changes b

// Reference types (objects)
let obj1 = { x: 10 };
let obj2 = obj1;    // Creates a reference
obj2.x = 20;        // Changes both obj1 and obj2
```

### Garbage Collection
- JavaScript uses automatic garbage collection
- Objects are collected when they become unreachable
- Common memory leak sources:
  1. Global variables
  2. Forgotten event listeners
  3. Circular references
  4. Closures holding references

## Object Manipulation

### Property Access
```javascript
// Dot notation
console.log(person.firstName);      // "John"
console.log(person.address.city);   // "Tech City"

// Bracket notation
console.log(person["firstName"]);   // "John"
console.log(person.address["city"]); // "Tech City"
```

### Memory Optimization
1. Reuse objects when possible
2. Clear unused object references
3. Avoid creating objects in loops
4. Use appropriate data structures

## Best Practices

### Code Organization
1. Use const for object declarations
2. Group related properties
3. Use meaningful property names
4. Consider freezing objects when immutability is needed

### Memory Leak Prevention
```javascript
// Clean up event listeners
element.addEventListener('click', handler);
// Later:
element.removeEventListener('click', handler);

// Clear intervals
const intervalId = setInterval(callback, 1000);
// Later:
clearInterval(intervalId);

// Use WeakMap for volatile references
const cache = new WeakMap();
cache.set(user, userData);  // Automatically cleaned up
```

### Performance Tips
1. Avoid deep nesting of objects
2. Use flat data structures when possible
3. Consider using Maps for large sets of key-value pairs
4. Profile memory usage in development

## Additional Resources
1. [MDN Web Docs: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
2. [JavaScript.info: Objects](https://javascript.info/object)
3. [V8 Blog: Memory Management](https://v8.dev/blog/trash-talk)

## Practice Exercises
1. Create a deep clone function for objects
2. Implement a memory-efficient cache system
3. Build an object pool for performance optimization

Remember to use the Chrome DevTools Memory panel for monitoring memory usage and detecting leaks in your applications.