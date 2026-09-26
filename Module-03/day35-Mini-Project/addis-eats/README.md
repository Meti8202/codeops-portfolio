## Addis Eats — Week 1 Mini-Project

### DELIVERABLE
One React application bringing together the whole week: a fetched menu,
a category filter, a cart shared through context, a reducer owning the cart
transitions, and your own useFetch hook — committed to GitHub.
### Steps
- [ ] Extract your Day 29 fetching logic into a useFetch hook in its own file.
- [x] Write a cartReducer handling add, remove and clear, and test it on its own.
- [x] Build a CartProvider holding the reducer and providing items, dispatch and
total.
- [x] Read the cart from a header badge and from the checkout panel with
useContext.
- [x] Memoise the provider value so consumers do not re-render on unrelated
changes.
- [x] Sort or filter the dish list with useMemo, and confirm in the Profiler that it
helps

### Features
- Custom `useFetch` hook (loading, error, AbortController cleanup)
- Menu fetched from `/dishes.json`
- Category filter (All / Main / Side) with `useMemo`
- Cart managed by `useReducer` + Context
- Quantity-aware cart (add same dish increases quantity)
- Header cart badge and Sidebar order panel via `useCart`
- Controlled delivery form with TeleBirr validation
- Responsive layout (menu left, order panel right)

## Project structure
```
├───📁 public/
│   ├───📁 images/
│   ├─── dishes.json
├───📁 src/
│   ├───📁 cart/
│   │   ├─── CartContext.js
│   │   ├─── CartProvider.jsx
│   │   ├─── cartReducer.js
│   │   └─── useCart.js
│   ├───📁 components/
│   │   ├───📁 Footer/
│   │   │   ├─── Footer.css
│   │   │   └─── Footer.jsx
│   │   ├───📁 Header/
│   │   │   ├───📁 OrderCounter/
│   │   │   │   ├─── OrderCounter.css
│   │   │   │   └─── OrderCounter.jsx
│   │   │   ├─── Header.css
│   │   │   └─── Header.jsx
│   │   └───📁 Main/
│   │       ├───📁 Menu/
│   │       │   ├───📁 Card/
│   │       │   │   └───...
│   │       │   ├───📁 CategoryBar/
│   │       │   │   └───...
│   │       │   ├───📁 Dish/
│   │       │   │   └───...
│   │       │   ├───📁 OrderButton/
│   │       │   │   └───...
│   │       │   ├─── Menu.css
│   │       │   └─── Menu.jsx
│   │       ├───📁 Sidebar/
│   │       │   ├───📁 OrderForm/
│   │       │   │   └───...
│   │       │   ├─── Sidebar.css
│   │       │   └─── Sidebar.jsx
│   │       ├─── Main.css
│   │       └─── Main.jsx
│   ├───📁 hooks/
│   │   └─── useFetch.js
│   ├─── App.css
│   ├─── App.jsx
│   ├─── index.css
│   └─── main.jsx
└───README.md


```


## How to run
``` 
npm install
npm run dev
```