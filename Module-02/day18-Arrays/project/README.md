## Mini-Project — TeleBirr Transaction Report

### What you will build
A small report generator over a list of TeleBirr transactions for an Addis shop. Each transaction is an object; you summarise and format them using the array methods and modern syntax from today,
with the logic split into reusable modules.
### Requirements
- [x]  Model each transaction as an object: { id, customer, amount, type } where type is "credit" or "debit" and amount is in ETB.
- [x]  Use filter to separate credits from debits and reduce to total each.
- [x] Use map with destructuring in the callback ({ customer, amount }) to build a list of formatted receipt strings.
- [x]  Use spread to produce an updated copy of one transaction (e.g. correcting an amount) without mutating the original.
- [x]  Split the code into modules: a transactions.js exporting the data, a report.js exporting the summary functions, and an app.js that imports both and prints the report.

### A worked start
Define the data and one summary function, then wire the modules together:
```
// transactions.js
export const transactions = [
     { id: 1, customer: "Almaz", amount: 250, type: "debit" },
     { id: 2, customer: "Dawit", amount: 600, type: "credit" },
     { id: 3, customer: "Tigist", amount: 180, type: "debit" },
];

// report.js
export const totalByType = (txns, type) =>
     txns.filter(t => t.type === type)
.reduce((sum, { amount }) => sum + amount, 0);

// app.js
import { transactions } from "./transactions.js";
import { totalByType } from "./report.js";
console.log(`Debits: ${totalByType(transactions, "debit")} ETB`);
```

W## Modules

| File | Responsibility |
|------|----------------|
| `transactions.js` | Holds the sample TeleBirr transaction data (array of objects). |
| `report.js` | Summary helpers — `totalByType`, `receipts`, and `updateAmount` (no data, only logic). |
| `script.js` | Entry point. Imports data + helpers, prints the report. |
