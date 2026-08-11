"use strict";

function pointsFromSpend(etb) {
  return Math.floor(etb / 10);
}

function doublePoints(etb) {
  return pointsFromSpend(etb) * 2;
}

function createLoyalty(earnRule) {
  let points = 0;

  function earn(etb) {
    points += earnRule(etb);
  }

  function redeem(amount) {
    if (amount > points) {
      points = 0;
    } else {
      points -= amount;
    }
  }

  function balance() {
    return points;
  }

  return { earn, redeem, balance };
}

const card = createLoyalty(pointsFromSpend);
card.earn(250);
card.redeem(10);
console.log("Standard balance:", card.balance()); 

const holiday = createLoyalty(doublePoints);
holiday.earn(250);
holiday.redeem(10);
console.log("Holiday balance:", holiday.balance());