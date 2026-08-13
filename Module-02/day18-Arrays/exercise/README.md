## Build an Addis Market order summary
### DELIVERABLE
A pricing module plus a script that takes an array of orders and produces a per-order total and a grand total in ETB, using map, filter,
reduce, destructuring and spread.
### Steps
- [X] Export withVat and format from pricing.js.
- [x] Import them into summary.js.
- [x] Use reduce to total each order’s items (destructure { price, qty }).
- [x] Use map + spread to attach a total field to each order.
- [x] Use filter to list only orders over 500 ETB.
- [] Print a formatted summary and the grand total