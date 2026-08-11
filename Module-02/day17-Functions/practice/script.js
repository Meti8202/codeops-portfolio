// 1. Write a vat(amount, rate = 0.15) function using a default parameter, then write the same logic as an arrow function with an implicit return.

function vat(amount, rate = 0.15) {
  const total = amount + amount * rate;
  return total;
}

console.log(`Your total is ${vat(350)}ETB.`);

const vat2 = (amount, rate = 0.2) => {
  const total = amount + amount * rate;
  return total;
};
console.log(`Your total is ${vat2(350)}ETB.`);
console.log("-".repeat(30));
// 2. Write a makeCounter closure that returns a function incrementing a private count. Call it several times and, in a comment, explain why count stays private.
function makeCounter() {
  let count = 0; // Because count is declared inside makeCounter's scope. The returned function "closes over" it, but nothing outside can access count directly. Only the increment function can read or change it, that's the closure.
  return function increment() {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());

console.log("-".repeat(30));
// 3. Write a discountBy(rate) factory and create memberPrice (10%) and salePrice (30%) from it. Apply both to a price of 1000 ETB.
function discountBy(rate) {
  return function (price) {
    return price * (1 - rate);
  };
}

const memberPrice = discountBy(0.1);
const salePrice = discountBy(0.3);

console.log(`Member price (10% off): ${memberPrice(1000)} ETB`);
console.log(`Sale price (30% off): ${salePrice(1000)} ETB`);

console.log("-".repeat(30));
// 4. Write a higher-order applyToAll(list, fn) that runs fn over every item and returns the results, then use it to add VAT to an array of prices.
function applyToAll(list, fn) {
  const results = [];
  for (const item of list) {
    results.push(fn(item));
  }
  return results;
}

const prices = [200, 350, 120, 480, 600];
const withVat = applyToAll(prices, (price) => price * 1.15);

console.log("Original prices:", prices);
console.log("Prices with VAT:", withVat);

console.log("-".repeat(30));
// 5. Use forEach (a callback) to print each Ethiopian city in an array with its index, e.g. "1. Addis Ababa"
const ethiopianCities = [
  "Addis Ababa",
  "Adama",
  "Bahir Dar",
  "Gondar",

  "Harar",
  "Dire Dawa",
  "Jimma",
];

ethiopianCities.forEach((city, index) => {
  console.log(`${index + 1}. ${city}`);
});

console.log("-".repeat(30));


// Closure drills
// Build a makeCounter and a once() wrapper from scratch, and explain in a comment what each closure remembers.
console.log("-".repeat(30));



// Callback practice
// Write your own forEach and a simple map using only a for…of loop and a callback parameter.
function myForEach(list, callback) {
  for (const item of list) {
    callback(item);
  }
}

const fruits = ["Mango", "Banana", "Avocado", "Papaya"];
myForEach(fruits, (fruit) => {
  console.log(`Fruit: ${fruit}`);
});

console.log("-".repeat(30));



// normal fun
function numberSquare(number) {
  squared = number * number;
  return squared;
}

console.log(numberSquare(2));

// arrow function
(number) => (squared = number * number);
const number = 2;
console.log(squared);

// closure

function numberCubed(num) {
  return function numberSquared(number) {
    const numberSquared = number * number;
    return num * numberSquared;
  };
}

const num5 = numberCubed(5);

console.log(num5(5));
console.log("-".repeat(30));
function myFunction(newPhrase) {
  console.log("hello");
  newPhrase();
}

function newPhrase() {
  console.log("printing something else!");
}

myFunction(newPhrase);

let amount = 200;
function total(amount, callback) {
  console.log(`your total is ${amount}`);
  callback();
}
function callback() {
  let amount = 10000;
  console.log(`your new total is ${amount}`);
}
total(amount, callback);
