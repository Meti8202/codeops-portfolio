const orderForm = document.querySelector("#order");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const checked = [
    ...orderForm.querySelectorAll('input[name="items"]:checked'),
  ].map((el) => el.value);

  console.log("Name:", name);
  console.log("Phone:", phone);
  console.log("Items:", checked);
});

// no 1
const title = document.querySelector("#title");
title.textContent = "Day 19 - DOM Practice";
title.classList.toggle("highlight");

// no 2
const cities = ["Addis Ababa", "Gondar", "Bahir Dar"];
const citiesList = document.querySelector("#cities");

cities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  citiesList.appendChild(li);
});


// no 4
const itemsList = document.querySelector("#items");

itemsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    const li = e.target.closest("li");
    if (li) li.remove();
  }
});

// no 5
const form = document.querySelector("#add-form");
const input = document.querySelector("#item-input");
const formList = document.querySelector("#form-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.textContent = value;
  formList.appendChild(li);

  input.value = "";
});