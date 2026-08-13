## Week-2 Project — Interactive DOM Application
This is the main deliverable. The Week-2 project begins today and grows over the coming sessions — you will add browser storage and a live API later this week. Build the foundation now, purely with the DOM and events, no framework.
### What you will build
An Addis Market shopping list: a single-page interactive app where a user adds items they need to buy, marks them as bought, removes them, and sees a live running total of the ETB prices. It is built entirely with today’s tools — selection, manipulation, events and delegation.
### Today’s requirements
- [x] Add an item — a name and an ETB price — from a form, using preventDefault on submit and
validating that both fields are filled.
- [x]  Render each item as a row in the list using createElement and append (do not rebuild the whole
list from a string).
- [x]  Delete any item using a single delegated listener on the list container.
- [ ]  Toggle an item’s "bought" state by toggling a CSS class on its row (style the bought state in
CSS).
- [ ]  Show a live running total of the ETB prices that updates whenever items are added or removed.
### A worked start
Cache your elements, then wire the form and a delegated listener on the list:
```
const form = document.querySelector("#add-form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

form.addEventListener("submit", (e) => {
     e.preventDefault();
     const n = name.value.trim();
     const p = Number(price.value);
     if (!n || !p) return;
     addRow(n, p);
     form.reset();
     updateTotal();
});

list.addEventListener("click", (e) => { //Delegation
     if (e.target.matches(".del")) { e.target.closest("li").remove(); updateTotal(); }
     else if (e.target.matches("li")) e.target.classList.toggle("bought");
});
```
