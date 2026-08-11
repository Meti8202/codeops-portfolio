This file outlines the project requirements and your self-check list.
# Habesha Eatery Order Module Exercise

## Objective
Build a module of pure functions and a closure-based receipt maker to price eatery orders [2].

## Requirements
- **subtotal**: Use `...rest` parameters and `reduce` [2].
- **discountBy**: Implement as a function factory (HOF + Closure) [2].
- **withVat & toETB**: Implement as pure arrow functions [2].
- **makeReceiptMaker**: Use a closure to track a private `orderNo` [2].

## Implementation Tips
- Test each small function individually (e.g., ensure `subtotal(100, 200)` returns `300`) before wiring them together [1].
- Remember that arrow functions are preferred for consistency in modern JavaScript [7, 8].
- Use `let` for the `orderNo` to allow reassignment, but `const` for function definitions [9, 10].