"use strict";

const billRaw = "500"; // let bill = "5000";
const bill = Number(billRaw); // bill = Number(bill);

const partySize = 4;

let tip;
if (bill > 300) {
  tip = bill * 0.10;
  // console.log(tip);
} else {

  tip = bill * 0.05;
  // console.log(tip);
}
const total = bill + tip;
let perPerson = total / partySize;

console.log(`Bill Total = ${total}ETB, ${perPerson}ETB each`);

let serviceFee = "cbe";
switch (serviceFee) {
  case "cbe":
    const fee = total * 0.005;
    const newTotal = total + fee;
    perPerson = newTotal / partySize;
    console.log(
      `CBE Birr service fee = ${fee}ETB, Total bill is ${newTotal}ETB, ${perPerson}ETB each`,
    );
    break;
  case "telebirr":
    console.log(`Can not use Telebirr.`);
    break;
  default:
    console.log("No service fee.");
}
