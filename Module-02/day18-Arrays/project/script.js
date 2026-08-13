import { transactions } from "./transactions.js";
import { totalByType, receipts, updateAmount } from "./report.js";

console.log("\nReceipts:");
receipts(transactions).forEach((line) => console.log(line));

console.log("\nTotals:");
console.log(`Credits: ${totalByType(transactions, "credit")} ETB`);
console.log(`Debits:  ${totalByType(transactions, "debit")} ETB`);

const fixed = updateAmount(transactions[0], 275);
console.log("\nCorrect transaction:");
console.log("original:", transactions[0]);
console.log("updated: ", fixed);
