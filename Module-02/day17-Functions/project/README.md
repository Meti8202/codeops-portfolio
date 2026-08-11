## Mini-Project — Loyalty Points Module
### What you will build
A loyalty-points module for a TeleBirr shop that tracks a customer’s points balance privately and lets you earn and redeem points. The balance must not be directly reachable from outside — only through the functions you expose.
### Requirements
- Use a closure to keep the points balance private — no outside code can read or change it directly.
- Expose three operations: earn(amount), redeem(amount), and balance() (a getter that returns the current points).
- earn should add points (e.g. 1 point per 10 ETB spent); redeem should subtract, but refuse to go below zero.
- Use a higher-order function to apply an "earn rule" passed in — so a holiday rule (double points) can be swapped in without changing the module.
- Keep the calculation functions pure; confine any console output to the edges.
#### A worked start
Begin with the closure that hides the balance, then add the operations:

```
function createLoyalty(earnRule = etb => Math.floor(etb / 10)) {
     let points = 0;     // private state (closure)
     return {
          earn(etb) { points += earnRule(etb); },      // HOF: rule passed in
          redeem(p) { points = Math.max(0, points - p); },
          balance() { return points; },
     };
}
const card = createLoyalty();
card.earn(250);     // +25 points
card.redeem(10);
console.log(card.balance());  // 15

// holiday rule: double points
const holiday = createLoyalty(etb => Math.floor(etb / 10) * 2);
```
