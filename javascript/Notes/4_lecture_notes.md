# JavaScript Objects and Memory Management

## Table of Contents
1. [Objects Fundamentals](#objects-fundamentals)
2. [Object Prototypes and Inheritance](#object-prototypes-and-inheritance)
3. [Memory Management](#memory-management)
4. [Object Manipulation](#object-manipulation)
5. [Advanced Object Techniques](#advanced-object-techniques)
6. [Best Practices](#best-practices)
7. [Memory Profiling](#memory-profiling)
8. [Additional Resources](#additional-resources)
9. [Practice Exercises](#practice-exercises)

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
    },
    greet: function() {
        return `Hello, my name is ${this.firstName} ${this.lastName}`;
    }
};
```

### Object Creation Methods

#### 1. Object Literals
```javascript
const car = {
    make: "Toyota",
    model: "Corolla",
    year: 2022
};
```

#### 2. Constructor Functions
```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function() {
        return `${this.firstName} ${this.lastName}`;
    };
}

const john = new Person("John", "Doe");
console.log(john.fullName()); // "John Doe"
```

#### 3. Object.create()
```javascript
const personProto = {
    greet: function() {
        return `Hello, my name is ${this.name}`;
    }
};

const mary = Object.create(personProto);
mary.name = "Mary";
console.log(mary.greet()); // "Hello, my name is Mary"
```

#### 4. ES6 Classes
```javascript
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    
    getDescription() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

const myCar = new Vehicle("Honda", "Civic", 2023);
console.log(myCar.getDescription()); // "2023 Honda Civic"
```

### Key Characteristics
- Objects are collections of key-value pairs (properties and methods)
- Properties can store any valid JavaScript data type
- Keys are strings or symbols (even if written without quotes)
- Objects are reference types (stored in heap memory)
- Objects can have methods (functions as properties)
- Properties can be added, modified, or deleted dynamically

### Property Descriptors
```javascript
const product = {};

// Define a property with custom descriptor
Object.defineProperty(product, 'name', {
    value: 'Laptop',
    writable: true,      // Can be changed
    enumerable: true,    // Shows up in for...in loops
    configurable: true   // Can be deleted or modified
});

// Define a read-only property
Object.defineProperty(product, 'id', {
    value: 'P1001',
    writable: false,     // Cannot be changed
    enumerable: true,
    configurable: false  // Cannot be deleted or reconfigured
});

// Get property descriptors
console.log(Object.getOwnPropertyDescriptor(product, 'name'));
```

## Object Prototypes and Inheritance

### Prototype Chain
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.makeSound = function() {
    return "Some generic sound";
};

function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override parent method
Dog.prototype.makeSound = function() {
    return "Woof!";
};

// Add new method
Dog.prototype.fetch = function() {
    return `${this.name} is fetching!`;
};

const rex = new Dog("Rex", "German Shepherd");
console.log(rex.name);        // "Rex"
console.log(rex.makeSound());  // "Woof!"
console.log(rex.fetch());      // "Rex is fetching!"
```

### Inheritance Patterns

#### 1. Prototypal Inheritance
```javascript
const vehicle = {
    type: "Generic",
    start: function() {
        return `${this.type} vehicle started`;
    }
};

const car = Object.create(vehicle);
car.type = "Car";
car.wheels = 4;

console.log(car.start()); // "Car vehicle started"
```

#### 2. Class Inheritance (ES6)
```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    eat() {
        return `${this.name} is eating`;
    }
}

class Bird extends Animal {
    constructor(name, wingspan) {
        super(name); // Call parent constructor
        this.wingspan = wingspan;
    }
    
    fly() {
        return `${this.name} is flying with a wingspan of ${this.wingspan}cm`;
    }
}

const eagle = new Bird("Eagle", 200);
console.log(eagle.eat()); // "Eagle is eating"
console.log(eagle.fly()); // "Eagle is flying with a wingspan of 200cm"
```

#### 3. Mixin Pattern
```javascript
// Mixins for composition
const swimMixin = {
    swim: function() {
        return `${this.name} is swimming`;
    }
};

const flyMixin = {
    fly: function() {
        return `${this.name} is flying`;
    }
};

class Duck {
    constructor(name) {
        this.name = name;
    }
}

// Apply mixins
Object.assign(Duck.prototype, swimMixin, flyMixin);

const donald = new Duck("Donald");
console.log(donald.swim()); // "Donald is swimming"
console.log(donald.fly());  // "Donald is flying"
```

## Memory Management

### Value vs Reference Types
```javascript
// Value types (primitives)
let a = 10;
let b = a;     // Creates a new copy
b = 20;        // Only changes b
console.log(a); // 10
console.log(b); // 20

// Reference types (objects)
let obj1 = { x: 10 };
let obj2 = obj1;    // Creates a reference
obj2.x = 20;        // Changes both obj1 and obj2
console.log(obj1.x); // 20
console.log(obj2.x); // 20

// Arrays (reference type)
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4]
```

### Memory Allocation
```javascript
// Stack memory (primitives)
let num = 42;       // Stored directly in stack
let str = "hello";  // Stored directly in stack

// Heap memory (objects)
let user = {        // Reference stored in stack, object in heap
    id: 1,
    name: "Alice"
};

let users = [];     // Array (object) stored in heap
for (let i = 0; i < 1000; i++) {
    users.push({ id: i, name: `User ${i}` }); // Each object stored in heap
}
```

### Garbage Collection
- JavaScript uses automatic garbage collection
- Objects are collected when they become unreachable
- Modern browsers use mark-and-sweep algorithm
- Common memory leak sources:
  1. Global variables
  2. Forgotten event listeners
  3. Circular references
  4. Closures holding references
  5. Detached DOM elements

#### Mark and Sweep Algorithm
1. Garbage collector identifies root objects (global objects, currently executing functions)
2. It marks all objects reachable from roots as "in use"
3. Any unmarked objects are considered garbage and are swept away

```javascript
// Example of creating unreachable objects
function createObjects() {
    let obj1 = { data: "some data" };
    let obj2 = { data: "more data" };
    
    // Create circular reference
    obj1.ref = obj2;
    obj2.ref = obj1;
    
    // Return nothing, making objects unreachable after function exits
    return;
}

createObjects(); // After this call, obj1 and obj2 become eligible for garbage collection
```

### Memory Leaks

#### 1. Global Variables
```javascript
// Bad practice - creates global variable
function leakyFunction() {
    leakyVar = []; // Missing 'let', 'const', or 'var'
    for (let i = 0; i < 10000; i++) {
        leakyVar.push(new Array(10000).fill("x"));
    }
}

// Better practice
function betterFunction() {
    const localVar = [];
    for (let i = 0; i < 10000; i++) {
        localVar.push(new Array(10000).fill("x"));
    }
    // localVar is eligible for garbage collection after function exits
}
```

#### 2. Forgotten Event Listeners
```javascript
// Memory leak - event listener keeps reference to bigData
const bigData = new Array(10000).fill("x");

function addHandler() {
    const button = document.getElementById("myButton");
    button.addEventListener("click", function() {
        // This closure references bigData
        console.log("Button clicked", bigData.length);
    });
}

// Better approach - remove event listener when done
function addHandlerWithCleanup() {
    const button = document.getElementById("myButton");
    const handler = function() {
        console.log("Button clicked");
    };
    
    button.addEventListener("click", handler);
    
    // Store cleanup function
    return function cleanup() {
        button.removeEventListener("click", handler);
    };
}

const cleanup = addHandlerWithCleanup();
// Later when no longer needed:
// cleanup();
```

## Object Manipulation

### Property Access
```javascript
// Dot notation
console.log(person.firstName);      // "John"
console.log(person.address.city);   // "Tech City"

// Bracket notation
console.log(person["firstName"]);   // "John"
console.log(person.address["city"]); // "Tech City"

// Dynamic property access
const prop = "firstName";
console.log(person[prop]);          // "John"

// Optional chaining (ES2020)
const user = {};
console.log(user.address?.city);    // undefined (no error)
```

### Object Copying

#### Shallow Copy
```javascript
// Using Object.assign()
const original = { a: 1, b: { c: 2 } };
const shallowCopy1 = Object.assign({}, original);

// Using spread operator
const shallowCopy2 = { ...original };

// Modify nested object
shallowCopy1.b.c = 3;
console.log(original.b.c);    // 3 (nested objects are shared)
console.log(shallowCopy2.b.c); // 3 (affected by the change)
```

#### Deep Copy
```javascript
// Using JSON (with limitations)
const original = { a: 1, b: { c: 2 }, d: new Date() };
const deepCopy = JSON.parse(JSON.stringify(original));

// Modify nested object
deepCopy.b.c = 3;
console.log(original.b.c);  // 2 (unchanged)
console.log(deepCopy.b.c);  // 3 (independent)

// Note: JSON method doesn't handle functions, undefined, symbols, or circular references
console.log(deepCopy.d);    // String (lost Date object type)

// Custom deep clone function
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    // Handle Array
    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item));
    }
    
    // Handle Object
    const cloned = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    
    return cloned;
}

const complexObj = {
    a: 1,
    b: { c: 2 },
    d: new Date(),
    e: [1, 2, { f: 3 }]
};

const properDeepCopy = deepClone(complexObj);
```

### Object Transformation

#### Object.keys(), Object.values(), Object.entries()
```javascript
const person = {
    name: "Alice",
    age: 30,
    city: "Wonderland"
};

// Get all keys
const keys = Object.keys(person);
console.log(keys); // ["name", "age", "city"]

// Get all values
const values = Object.values(person);
console.log(values); // ["Alice", 30, "Wonderland"]