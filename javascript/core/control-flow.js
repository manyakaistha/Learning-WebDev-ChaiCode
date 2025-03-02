// Control Flow and Functions in JavaScript

// 1. Basic Function Declaration
function printMessage(message) {
    console.log(message);
}

// 2. Function with Parameters and Template Literals
function bringItems(itemName, quantity) {
    console.log(`Here are your ${quantity} ${itemName}(s)`);
}

// 3. Function with Return Value
function add(num1, num2) {
    return num1 + num2;
}

// 4. Conditional Statements (if-else)
function determineWeather(condition) {
    if (condition === "rainy") {
        return "Take an umbrella";
    } else if (condition === "cloudy") {
        return "Take a jacket";
    } else if (condition === "sunny") {
        return "Take sunscreen";
    } else {
        return "Weather condition unknown";
    }
}

// 5. Grade Calculator Example
function calculateGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

// 6. Size Calculator Example
function calculateSize(quantity) {
    if (quantity <= 2) {
        return "small";
    } else if (quantity <= 5) {
        return "medium";
    } else {
        return "large";
    }
}

// Example Usage
printMessage("Hello JavaScript!");
bringItems("book", 3);
console.log(`Sum of 5 and 3 is: ${add(5, 3)}`);
console.log(`Weather advice: ${determineWeather("rainy")}`);
console.log(`Grade for 85: ${calculateGrade(85)}`);
console.log(`Size for group of 4: ${calculateSize(4)}`);