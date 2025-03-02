// Event Handling and User Interactions

// 1. Basic Event Handling
const attachBasicEvents = () => {
    const button = document.querySelector('.action-button');
    
    // Click event
    button.addEventListener('click', (event) => {
        console.log('Button clicked:', event.target);
    });
    
    // Mouse events
    button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#e0e0e0';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '';
    });
};

// 2. Event Object Properties
const handleEvent = (event) => {
    // Event properties
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Current target:', event.currentTarget);
    
    // Mouse/Keyboard properties
    if (event.type.startsWith('mouse')) {
        console.log('Mouse position:', {
            clientX: event.clientX,
            clientY: event.clientY,
            pageX: event.pageX,
            pageY: event.pageY
        });
    } else if (event.type.startsWith('key')) {
        console.log('Key details:', {
            key: event.key,
            code: event.code,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey
        });
    }
};

// 3. Event Propagation
const setupEventPropagation = () => {
    const container = document.querySelector('.container');
    const button = document.querySelector('.action-button');
    
    // Capturing phase
    container.addEventListener('click', (event) => {
        console.log('Container clicked - Capturing phase');
    }, true);
    
    // Bubbling phase
    button.addEventListener('click', (event) => {
        console.log('Button clicked - Bubbling phase');
        // Stop propagation if needed
        // event.stopPropagation();
    });
};

// 4. Event Delegation
const implementEventDelegation = () => {
    const teaList = document.querySelector('.tea-list');
    
    teaList.addEventListener('click', (event) => {
        // Check if clicked element is a tea item
        if (event.target.matches('.tea-item')) {
            console.log('Tea item clicked:', event.target.textContent);
        }
    });
};

// 5. Form Events
const handleFormEvents = () => {
    const form = document.querySelector('.tea-form');
    
    // Form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        console.log('Form data:', Object.fromEntries(formData));
    });
    
    // Input validation
    const teaNameInput = form.querySelector('input[name="teaName"]');
    teaNameInput.addEventListener('input', (event) => {
        const value = event.target.value;
        const isValid = value.length >= 3;
        teaNameInput.classList.toggle('invalid', !isValid);
    });
};

// 6. Custom Events
const createCustomEvent = () => {
    const teaSelected = new CustomEvent('teaSelected', {
        detail: {
            name: 'Green Tea',
            type: 'Caffeinated'
        },
        bubbles: true,
        cancelable: true
    });
    
    const teaElement = document.querySelector('.tea-item');
    teaElement.addEventListener('teaSelected', (event) => {
        console.log('Custom event data:', event.detail);
    });
    
    teaElement.dispatchEvent(teaSelected);
};

// 7. Keyboard Events
const handleKeyboardEvents = () => {
    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            console.log('Save shortcut detected');
        }
    });
    
    const searchInput = document.querySelector('.search-input');
    let debounceTimeout;
    
    searchInput.addEventListener('input', (event) => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            console.log('Search for:', event.target.value);
        }, 300);
    });
};

// 8. Window Events
const handleWindowEvents = () => {
    // Resize event
    window.addEventListener('resize', () => {
        console.log('Window dimensions:', {
            width: window.innerWidth,
            height: window.innerHeight
        });
    });
    
    // Scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            console.log('Scroll position:', {
                x: window.scrollX,
                y: window.scrollY
            });
        }, 150);
    });
    
    // Page lifecycle events
    window.addEventListener('load', () => {
        console.log('Page fully loaded');
    });
    
    window.addEventListener('beforeunload', (event) => {
        // Prompt user before leaving
        event.preventDefault();
        event.returnValue = '';
    });
};