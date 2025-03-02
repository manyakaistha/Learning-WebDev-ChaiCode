// Advanced Array Operations and Loops

// 1. Array Creation and Initialization
const teas = [
    "Green tea",
    "Black tea",
    "Oolong tea",
    "White tea",
    "Herbal Tea"
];

// 2. Array Modification Methods
console.log('Original teas:', teas);

// Adding elements
teas.push("Chamomile Tea");     // Add to end
console.log('After push:', teas);

// Removing elements by value
const removeTeaByName = (teaArray, teaName) => {
    const index = teaArray.indexOf(teaName);
    if (index > -1) {
        teaArray.splice(index, 1);
    }
    return teaArray;
};

removeTeaByName(teas, "Oolong tea");
console.log('After removal:', teas);

// 3. Array Filtering
const getCaffeinatedTeas = (teaArray) => {
    return teaArray.filter(tea => tea !== "Herbal Tea");
};

const caffeinatedTeas = getCaffeinatedTeas(teas);
console.log('Caffeinated teas:', caffeinatedTeas);

// 4. Array Transformation
const getUppercaseTeas = (teaArray) => {
    const uppercaseTeas = [];
    for (let i = 0; i < teaArray.length; i++) {
        uppercaseTeas.push(teaArray[i].toUpperCase());
    }
    return uppercaseTeas;
};

console.log('Uppercase teas:', getUppercaseTeas(teas));

// 5. Finding Elements
const findLongestTeaName = (teaArray) => {
    let longestTea = "";
    for (let i = 0; i < teaArray.length; i++) {
        if (teaArray[i].length > longestTea.length) {
            longestTea = teaArray[i];
        }
    }
    return longestTea;
};

console.log('Longest tea name:', findLongestTeaName(teas));

// 6. Array Reversal
const reverseArray = (array) => {
    const reversed = [];
    for (let i = array.length - 1; i >= 0; i--) {
        reversed.push(array[i]);
    }
    return reversed;
};

console.log('Reversed teas:', reverseArray(teas));

// 7. Array Summation Example
const numbers = [1, 4, 2, 3, 5, 6];

const calculateSum = (numbers) => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
};

console.log(`Sum of numbers: ${calculateSum(numbers)}`);