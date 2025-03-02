// DOM Manipulation and Traversal

// 1. Selecting Elements
const getElement = () => {
    // By ID
    const mainContent = document.getElementById('main-content');
    
    // By Class Name
    const teaItems = document.getElementsByClassName('tea-item');
    
    // By Tag Name
    const paragraphs = document.getElementsByTagName('p');
    
    // Query Selector (returns first match)
    const firstTeaItem = document.querySelector('.tea-item');
    
    // Query Selector All (returns all matches)
    const allTeaItems = document.querySelectorAll('.tea-item');
    
    return { mainContent, teaItems, paragraphs, firstTeaItem, allTeaItems };
};

// 2. Creating and Modifying Elements
const createTeaElement = (tea) => {
    // Create new element
    const teaDiv = document.createElement('div');
    teaDiv.className = 'tea-item';
    
    // Create and set text content
    const teaName = document.createElement('h3');
    teaName.textContent = tea.name;
    
    // Set attributes
    teaDiv.setAttribute('data-type', tea.type);
    
    // Add styles
    teaDiv.style.backgroundColor = '#f0f0f0';
    teaDiv.style.padding = '10px';
    teaDiv.style.margin = '5px';
    
    // Append child elements
    teaDiv.appendChild(teaName);
    
    return teaDiv;
};

// 3. DOM Traversal
const traverseDOM = (element) => {
    // Parent node
    const parent = element.parentNode;
    
    // Child nodes
    const children = element.children;
    const firstChild = element.firstElementChild;
    const lastChild = element.lastElementChild;
    
    // Siblings
    const nextSibling = element.nextElementSibling;
    const previousSibling = element.previousElementSibling;
    
    return { 
        parent, 
        children, 
        firstChild, 
        lastChild, 
        nextSibling, 
        previousSibling 
    };
};

// 4. Modifying Element Content
const updateContent = (element) => {
    // Set text content
    element.textContent = 'Updated content';
    
    // Set HTML content (careful with XSS!)
    element.innerHTML = '<span>Safe HTML content</span>';
    
    // Set class list
    element.classList.add('highlight');
    element.classList.remove('old-class');
    element.classList.toggle('active');
    
    // Check class existence
    const hasClass = element.classList.contains('highlight');
    
    return hasClass;
};

// 5. Working with Attributes
const manageAttributes = (element) => {
    // Get attribute
    const type = element.getAttribute('data-type');
    
    // Set attribute
    element.setAttribute('data-status', 'active');
    
    // Remove attribute
    element.removeAttribute('data-old');
    
    // Check attribute existence
    const hasAttribute = element.hasAttribute('data-type');
    
    // Dataset property
    element.dataset.price = '5.99';
    const price = element.dataset.price;
    
    return { type, hasAttribute, price };
};

// 6. DOM Manipulation Methods
const manipulateDOM = (container, element) => {
    // Append element
    container.appendChild(element);
    
    // Insert before another element
    const referenceElement = container.firstElementChild;
    container.insertBefore(element, referenceElement);
    
    // Replace element
    container.replaceChild(element, referenceElement);
    
    // Remove element
    container.removeChild(element);
    
    // Clone element
    const clone = element.cloneNode(true); // true for deep clone
    
    return clone;
};

// 7. Fragment for Better Performance
const createTeaList = (teas) => {
    const fragment = document.createDocumentFragment();
    
    teas.forEach(tea => {
        const teaElement = createTeaElement(tea);
        fragment.appendChild(teaElement);
    });
    
    return fragment;
};

// 8. Element Dimensions and Position
const getElementMetrics = (element) => {
    // Element dimensions
    const dimensions = element.getBoundingClientRect();
    
    // Scroll dimensions
    const scrollHeight = element.scrollHeight;
    const scrollWidth = element.scrollWidth;
    
    // Visible dimensions
    const clientHeight = element.clientHeight;
    const clientWidth = element.clientWidth;
    
    // Scroll position
    const scrollTop = element.scrollTop;
    const scrollLeft = element.scrollLeft;
    
    return {
        dimensions,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
        scrollTop,
        scrollLeft
    };
};