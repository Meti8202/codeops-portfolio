const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

function updateTotal() {
  let sum = 0;
  list.querySelectorAll("li").forEach((li) => {
    sum += Number(li.dataset.price);
  });
  totalEl.textContent = `Total: ${sum.toFixed(2)} ETB`;
}

function addRow(itemName, itemPrice) {
  const li = document.createElement("li");
  li.dataset.price = itemPrice;

  const mark = document.createElement("span");
  mark.className = "mark";
  mark.textContent = "[]";

  const span = document.createElement("span");
  span.className = "item-name";
  span.textContent = `${itemName} = ${itemPrice.toFixed(2)} ETB`;

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "del";
  delBtn.textContent = "×";

  li.append(mark, span, delBtn);
  list.appendChild(li);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const n = nameInput.value.trim();
  const p = Number(priceInput.value);

  if (!n || !p) return;

  addRow(n, p);
  form.reset();
  updateTotal();
});

list.addEventListener("click", (e) => {
  if (e.target.matches(".del")) {
    e.target.closest("li").remove();
    updateTotal();
    return;
  }

  const li = e.target.closest("li");
  if (!li) return;

  li.classList.toggle("done");
  const mark = li.querySelector(".mark");
  if (mark) mark.textContent = li.classList.contains("done") ? "✓" : "[]";
});
