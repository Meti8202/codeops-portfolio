"use strict";

/**
 * TODO: Write subtotal(...prices) using a for loop.
 * Use rest parameters to accept any number of prices.
 */
const subtotal = (...prices) => {
  let sum = 0;
  for (const price of prices) {
    sum += price;
  }
  return sum;
};

/**
 * TODO: Write discountBy(rate) as a factory returning an arrow function.
 * This is a Higher-Order Function (HOF) that creates a closure over the rate.
 */
const discountBy = (rate) => (n) => n * (1 - rate);

/**
 * TODO: Add withVat as a small pure helper.
 * It should add 15% VAT to a given amount.
 */
const withVat = (n) => n * 1.15;

/**
 * TODO: Add toETB as a small pure helper.
 * It should format a number to 2 decimal places followed by " ETB".
 */
const toETB = (n) => `${n.toFixed(2)} ETB`;

/**
 * TODO: Build makeReceiptMaker() with a private order number.
 * This function uses a closure to maintain the state of orderNo across calls.
 * Inside, it should pre-build a 10% member discount function using discountBy(0.10).
 */
function makeReceiptMaker() {
  let orderNo = 0;
  const memberDiscount = discountBy(0.1);
  return function (...items) {
    orderNo++;
    const total = subtotal(...items);
    const discounted = memberDiscount(total);
    const net = withVat(discounted);
    return `#81026${orderNo}: ${toETB(net)}`;
  };
}

const receipt = makeReceiptMaker();

console.log(receipt(220, 180, 120));
console.log(receipt(140, 60));
console.log(receipt(340, 460, 120, 60, 140));

// Export for run.js
// if (typeof module !== "undefined") {
//   module.exports = { subtotal, discountBy, withVat, toETB, makeReceiptMaker };
// }