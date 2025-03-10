# JavaScript Core - Day 3

## Table of Contents

1. [DOM Manipulation](#dom-manipulation)
2. [Event Handling](#event-handling)
3. [Advanced JavaScript Concepts](#advanced-javascript-concepts)
4. [JavaScript Event Loop and Queues](#javascript-event-loop-and-queues)
5. [Practice Exercises](#practice-exercises)
6. [Interview Focus Points](#interview-focus-points)
7. [Additional Resources](#additional-resources)

## DOM Manipulation

### Understanding the DOM Tree
The Document Object Model (DOM) is a programming interface for web documents. It represents the page as a tree of objects that can be manipulated with JavaScript.

```javascript
// The document object is the entry point to the DOM
console.log(document); // Entire document object
console.log(document.documentElement); // The <html> element
console.log(document.head); // The <head> element
console.log(document.body); // The <body> element

// Visualizing the DOM tree structure
function displayDOMTree(element, indent = 0) {
  console.log(' '.repeat(indent) + element.nodeName);
  for (let i = 0; i < element.children.length; i++) {
    displayDOMTree(element.children[i], indent + 2);
  }
}

// Usage: displayDOMTree(document.body);
```

### Selecting Elements

```javascript
// getElementById - returns a single element by its ID
const mainHeader = document.getElementById('main-header');
console.log(mainHeader); // Returns the element with id="main-header"

// querySelector - returns the first element that matches a CSS selector
const firstParagraph = document.querySelector('p');
const navigationLink = document.querySelector('.nav-link');
const submitButton = document.querySelector('#submit-btn');
const specificElement = document.querySelector('div.container > p.intro');

// querySelectorAll - returns all elements that match a CSS selector as a NodeList
const allParagraphs = document.querySelectorAll('p');
console.log(allParagraphs.length); // Number of paragraphs in the document
allParagraphs.forEach(paragraph => {
  console.log(paragraph.textContent);
});

// Other selection methods
const elementsByClass = document.getElementsByClassName('item'); // HTMLCollection
const elementsByTagName = document.getElementsByTagName('div'); // HTMLCollection

// Difference between NodeList and HTMLCollection:
// - NodeList is static (except for document.querySelectorAll)
// - HTMLCollection is live (automatically updates when the DOM changes)
// - NodeList has forEach method, HTMLCollection doesn't

// Converting HTMLCollection to Array for more methods
const itemsArray = Array.from(elementsByClass);
itemsArray.map(item => item.textContent);
```

### Modifying Elements

```javascript
// innerHTML vs textContent
const element = document.querySelector('.content');

// innerHTML - parses content as HTML
element.innerHTML = '<strong>Bold text</strong> and <em>italic text</em>';
// Result: Bold text and italic text (with actual HTML formatting)

// textContent - treats content as plain text
element.textContent = '<strong>Bold text</strong> and <em>italic text</em>';
// Result: <strong>Bold text</strong> and <em>italic text</em> (literal text)

// Security note: innerHTML can be vulnerable to XSS attacks if used with user input
// Always sanitize user input before using innerHTML

// classList operations
const box = document.querySelector('.box');

// Adding classes
box.classList.add('highlight');
box.classList.add('large', 'rounded'); // Add multiple classes

// Removing classes
box.classList.remove('large');

// Toggling classes (adds if absent, removes if present)
box.classList.toggle('active'); // Adds 'active'
box.classList.toggle('active'); // Removes 'active'

// Checking if an element has a class
if (box.classList.contains('highlight')) {
  console.log('Box is highlighted');
}

// Replacing a class
box.classList.replace('rounded', 'square');

// setAttribute
const link = document.querySelector('a');
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');
link.setAttribute('data-custom', 'value'); // Custom data attribute

// Getting attributes
console.log(link.getAttribute('href')); // https://example.com

// Removing attributes
link.removeAttribute('target');

// Directly accessing properties
link.href = 'https://newexample.com';
link.id = 'main-link';
link.style.color = 'blue';
link.style.fontWeight = 'bold';
link.style.backgroundColor = '#f0f0f0';
```

### Creating and Removing Elements

```javascript
// createElement - creates a new element
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This is a dynamically created paragraph.';
newParagraph.classList.add('dynamic-content');

// appendChild - adds a node to the end of the parent's children
const container = document.querySelector('.container');
container.appendChild(newParagraph);

// insertBefore - inserts a node before a reference node
const referenceNode = document.querySelector('.container .existing-element');
const newElement = document.createElement('div');
newElement.textContent = 'Inserted before the reference element';
container.insertBefore(newElement, referenceNode);

// Modern insertion methods
const anotherElement = document.createElement('span');
anotherElement.textContent = 'Using modern insertion methods';

// append - can append multiple nodes and text
container.append(anotherElement, ' Some text after the element');

// prepend - inserts at the beginning of the parent's children
container.prepend('First child: ', document.createElement('strong'));

// after/before - inserts adjacent to the element
referenceNode.after('After reference');
referenceNode.before('Before reference');

// Removing elements
const elementToRemove = document.querySelector('.remove-me');

// Old way: removeChild
if (elementToRemove && elementToRemove.parentNode) {
  elementToRemove.parentNode.removeChild(elementToRemove);
}

// Modern way: remove
const anotherElementToRemove = document.querySelector('.also-remove-me');
if (anotherElementToRemove) {
  anotherElementToRemove.remove();
}

// Creating a complex element structure
function createCard(title, content, imageUrl) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const cardImage = document.createElement('img');
  cardImage.src = imageUrl;
  cardImage.alt = title;
  
  const cardTitle = document.createElement('h3');
  cardTitle.textContent = title;
  
  const cardContent = document.createElement('p');
  cardContent.textContent = content;
  
  const cardButton = document.createElement('button');
  cardButton.textContent = 'Read more';
  cardButton.addEventListener('click', () => alert(`You clicked on ${title}`));
  
  card.append(cardImage, cardTitle, cardContent, cardButton);
  return card;
}

// Usage
const cardContainer = document.querySelector('.card-container');
if (cardContainer) {
  const newCard = createCard(
    'JavaScript DOM', 
    'Learn how to manipulate the DOM with JavaScript', 
    'images/js-dom.jpg'
  );
  cardContainer.appendChild(newCard);
}
```

## Event Handling

### Types of Events

```javascript
// Common DOM events:

// Mouse events
// - click: when an element is clicked
// - dblclick: when an element is double-clicked
// - mousedown/mouseup: when mouse button is pressed/released
// - mouseover/mouseout: when mouse enters/leaves an element
// - mousemove: when mouse moves over an element

// Keyboard events
// - keydown: when a key is pressed down
// - keyup: when a key is released
// - keypress: when a key is pressed (character keys only)

// Form events
// - submit: when a form is submitted
// - change: when an input element's value changes
// - input: when the value of an input/textarea changes (real-time)
// - focus/blur: when an element gains/loses focus

// Document/Window events
// - load: when the page finishes loading
// - resize: when the window is resized
// - scroll: when the document or element is scrolled
// - DOMContentLoaded: when the HTML is loaded and parsed

// Touch events (mobile)
// - touchstart: when a touch point is placed on the touch surface
// - touchmove: when a touch point is moved along the touch surface
// - touchend: when a touch point is removed from the touch surface
```

### Event Listeners

```javascript
// Adding event listeners
const button = document.querySelector('#myButton');

// Method 1: addEventListener
button.addEventListener('click', function() {
  console.log('Button was clicked!');
});

// With arrow function
button.addEventListener('click', () => {
  console.log('Button was clicked (arrow function)!');
});

// Named function reference
function handleClick(event) {
  console.log('Button was clicked (named function)!');
  console.log('Event object:', event);
  console.log('Target element:', event.target);
}

button.addEventListener('click', handleClick);

// Method 2: DOM property (older, limited to one handler)
button.onclick = function() {
  console.log('Button was clicked (onclick property)!');
};

// Removing event listeners
button.removeEventListener('click', handleClick); // Works with named function

// Note: You cannot remove anonymous functions with removeEventListener
button.addEventListener('click', function() {
  console.log('This cannot be removed easily');
});
// The above cannot be removed because the function reference is lost

// One-time event listener
button.addEventListener('click', function oneTimeHandler() {
  console.log('This will only run once');
  button.removeEventListener('click', oneTimeHandler);
});

// Or use the options parameter
button.addEventListener('click', function() {
  console.log('This will only run once (using options)');
}, { once: true });
```

### Event Bubbling and Capturing

```javascript
// HTML structure for this example:
// <div id="outer">
//   <div id="middle">
//     <button id="inner">Click me</button>
//   </div>
// </div>

const outer = document.getElementById('outer');
const middle = document.getElementById('middle');
const inner = document.getElementById('inner');

// Event bubbling (default): inner → middle → outer
outer.addEventListener('click', function(event) {
  console.log('Outer div clicked (bubbling)');
});

middle.addEventListener('click', function(event) {
  console.log('Middle div clicked (bubbling)');
});

inner.addEventListener('click', function(event) {
  console.log('Button clicked (bubbling)');
});

// Event capturing: outer → middle → inner
outer.addEventListener('click', function(event) {
  console.log('Outer div clicked (capturing)');
}, true); // true enables capturing phase

middle.addEventListener('click', function(event) {
  console.log('Middle div clicked (capturing)');
}, true);

inner.addEventListener('click', function(event) {
  console.log('Button clicked (capturing)');
}, true);

// Stopping propagation
middle.addEventListener('click', function(event) {
  console.log('Middle div clicked - propagation stopped');
  event.stopPropagation(); // Prevents the event from bubbling up further
});

// Immediate propagation stop (stops other handlers on the same element)
inner.addEventListener('click', function(event) {
  console.log('Button clicked - first handler');
  event.stopImmediatePropagation(); // Prevents other handlers on this element
});

inner.addEventListener('click', function(event) {
  console.log('Button clicked - second handler (will not run)');
});
```

### Event Delegation

```javascript
// Event delegation allows you to attach a single event listener to a parent element
// that will fire for all descendants matching a selector

// HTML structure for this example:
// <ul id="todo-list">
//   <li>Task 1</li>
//   <li>Task 2</li>
//   <li>Task 3</li>
// </ul>

const todoList = document.getElementById('todo-list');

// Without event delegation (inefficient for many items)
// const items = document.querySelectorAll('#todo-list li');
// items.forEach(item => {
//   item.addEventListener('click', function() {
//     console.log('Clicked on:', this.textContent);
//   });
// });

// With event delegation (efficient)
todoList.addEventListener('click', function(event) {
  // Check if the clicked element is an li
  if (event.target.tagName === 'LI') {
    console.log('Clicked on:', event.target.textContent);
    event.target.classList.toggle('completed');
  }
});

// Adding new items dynamically (event delegation handles them automatically)
function addNewTask(taskText) {
  const newTask = document.createElement('li');
  newTask.textContent = taskText;
  todoList.appendChild(newTask);
}

addNewTask('Task 4'); // This will automatically work with the event delegation
```

### Preventing Default Behavior

```javascript
// HTML structure for this example:
// <a href="https://example.com" id="link">Click me</a>
// <form id="myForm">
//   <input type="text" name="username">
//   <button type="submit">Submit</button>
// </form>

// Preventing default link behavior
const link = document.getElementById('link');
link.addEventListener('click', function(event) {
  event.preventDefault(); // Prevents the browser from navigating to the URL
  console.log('Link clicked, but default behavior was prevented');
});

// Preventing form submission
const form = document.getElementById('myForm');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the form from submitting
  
  // Form validation example
  const username = this.elements.username.value;
  if (username.