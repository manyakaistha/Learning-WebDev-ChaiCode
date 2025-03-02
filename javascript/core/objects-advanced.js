// Advanced Object Operations and Prototypes

// 1. Object Creation Patterns
const teaBasic = {
    name: "Green Tea",
    type: "Caffeinated",
    origin: "China"
};

// Factory Function Pattern
const createTea = (name, type, origin) => {
    return {
        name,
        type,
        origin,
        describe() {
            return `${this.name} is a ${this.type} tea from ${this.origin}`;
        }
    };
};

const greenTea = createTea("Green Tea", "Caffeinated", "China");
console.log('Factory created tea:', greenTea.describe());

// Constructor Function Pattern
function Tea(name, type, origin) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.created = new Date();
}

// Adding methods to prototype
Tea.prototype.describe = function() {
    return `${this.name} is a ${this.type} tea from ${this.origin}`;
};

Tea.prototype.age = function() {
    return Date.now() - this.created;
};

const blackTea = new Tea("Black Tea", "Caffeinated", "India");
console.log('Constructor created tea:', blackTea.describe());

// 2. Inheritance and Prototypes
function HerbalTea(name, origin, benefits) {
    // Call parent constructor
    Tea.call(this, name, "Herbal", origin);
    this.benefits = benefits;
}

// Set up prototype chain
HerbalTea.prototype = Object.create(Tea.prototype);
HerbalTea.prototype.constructor = HerbalTea;

// Add specialized method
HerbalTea.prototype.describeBenefits = function() {
    return `${this.name} is known for: ${this.benefits.join(', ')}`;
};

const chamomileTea = new HerbalTea(
    "Chamomile", 
    "Egypt", 
    ["Better sleep", "Stress relief", "Digestive aid"]
);

console.log('Inherited tea description:', chamomileTea.describe());
console.log('Specialized method:', chamomileTea.describeBenefits());

// 3. Object Property Descriptors
const teaProduct = {};

// Define property with getter/setter
Object.defineProperty(teaProduct, 'price', {
    value: 5.99,
    writable: false,
    enumerable: true,
    configurable: false
});

Object.defineProperty(teaProduct, 'discount', {
    get: function() {
        return this.price * 0.9;
    }
});

console.log('Fixed price:', teaProduct.price);
console.log('Discounted price:', teaProduct.discount);

// 4. Object Methods and Properties
const teaInventory = {
    stock: {
        green: 100,
        black: 150,
        herbal: 75
    },
    location: "Warehouse A"
};

// Object methods demonstration
console.log('Keys:', Object.keys(teaInventory));
console.log('Values:', Object.values(teaInventory));
console.log('Entries:', Object.entries(teaInventory));

// Freezing objects
Object.freeze(teaProduct);
console.log('Is frozen:', Object.isFrozen(teaProduct));

// 5. Modern Object Features
const teaDefaults = {
    temperature: "Hot",
    steepTime: "3 minutes"
};

const teaOrder = {
    name: "Earl Grey",
    quantity: 1
};

// Object spread and merge
const finalOrder = {
    ...teaDefaults,
    ...teaOrder,
    timestamp: new Date()
};

console.log('Final order:', finalOrder);

// Object destructuring
const { name, temperature, steepTime } = finalOrder;
console.log(`Preparing ${name} tea: ${temperature}, steep for ${steepTime}`);