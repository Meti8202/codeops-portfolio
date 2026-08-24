const grid = document.getElementById("recipe-grid");
const search = document.getElementById("search");
const category = document.getElementById("category");
const favList = document.getElementById("fav-list");
const summary = document.getElementById("summary");
const statusEl = document.getElementById("status");

const detailEl = document.getElementById("detail");
const detailBody = document.getElementById("detail-body");
const detailClose = document.getElementById("detail-close");

const requestForm = document.getElementById("request-form");
const nameInput = document.getElementById("req-name");
const phoneInput = document.getElementById("req-phone");
const recipeInput = document.getElementById("req-recipe");
const formError = document.getElementById("form-error");
const formSuccess = document.getElementById("form-success");

const KEY = "favorites-habesha-recipe";
const PHONE = /^(?:\+251|0)9\d{8}$/;

const state = {
  recipes: [],
  favorites: [],
  search: "",
  category: "all",
  selectedId: null,
};

function setStatus(message) {
  statusEl.textContent = message || "";
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(state.favorites));
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data)) state.favorites = data;
  } catch (err) {
    state.favorites = [];
  }
}

async function loadRecipes() {
  setStatus("Loading recipes…");
  try {
    const res = await fetch("data/recipes.json");
    if (!res.ok) throw new Error("HTTP " + res.status);
    state.recipes = await res.json();
    setStatus("");
    render();
  } catch (err) {
    setStatus("Couldn't load recipes. Check data/recipes.json.");
    console.error(err);
  }
}

function getFiltered() {
  const term = state.search.toLowerCase();
  return state.recipes.filter(function (r) {
    const nameOk = r.name.toLowerCase().includes(term);
    const catOk = state.category === "all" || r.category === state.category;
    return nameOk && catOk;
  });
}

function isFavorite(id) {
  return state.favorites.includes(id);
}

function recipeCard(r) {
  const fav = isFavorite(r.id);
  const spicy = r.spicy ? " · Spicy" : "";
  const btnLabel = fav ? "★ Favorite" : "☆ Save";
  const btnClass = fav
    ? "bg-amber-200 text-amber-950"
    : "bg-amber-800 text-white";

  return `
    <article class="bg-white border border-amber-100 rounded-lg overflow-hidden" data-id="${r.id}">
      <img src="${r.image || ""}" alt="${r.name}" class="h-40 w-full object-cover bg-amber-100" />
      <div class="p-4">
        <h2 class="text-xl font-semibold text-amber-950">${r.name}</h2>
        <p class="text-xs text-stone-500 mt-1">${r.category} · ${r.prepMinutes} min${spicy}</p>
        <p class="text-sm text-stone-600 mt-2">${r.description}</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <button type="button" class="fav-btn text-sm px-3 py-1.5 rounded ${btnClass}">${btnLabel}</button>
          <button type="button" class="view-btn text-sm px-3 py-1.5 rounded border border-amber-800">View recipe</button>
        </div>
      </div>
    </article>
  `;
}

function listHtml(items) {
  if (!items || items.length === 0) {
    return '<p class="text-sm text-stone-400">Not added yet.</p>';
  }
  let html = '<ul class="list-disc list-inside text-sm text-stone-600">';
  for (let i = 0; i < items.length; i++) {
    html += "<li>" + items[i] + "</li>";
  }
  html += "</ul>";
  return html;
}

function renderRecipes() {
  const list = getFiltered();

  if (state.recipes.length === 0) {
    grid.innerHTML = "";
    return;
  }
  if (list.length === 0) {
    grid.innerHTML = '<p class="text-stone-500">No recipes found.</p>';
    return;
  }
  grid.innerHTML = list.map(recipeCard).join("");
}

function renderFavorites() {
  const favRecipes = [];
  for (let i = 0; i < state.favorites.length; i++) {
    const id = state.favorites[i];
    const recipe = state.recipes.find(function (r) {
      return r.id === id;
    });
    if (recipe) favRecipes.push(recipe);
  }

  let totalMins = 0;
  for (let i = 0; i < favRecipes.length; i++) {
    totalMins += favRecipes[i].prepMinutes;
  }

  summary.textContent =
    favRecipes.length + " saved · " + totalMins + " min total";

  if (favRecipes.length === 0) {
    favList.innerHTML = '<li class="text-stone-400">No favorites yet</li>';
    return;
  }

  let html = "";
  for (let i = 0; i < favRecipes.length; i++) {
    const r = favRecipes[i];
    html +=
      '<li class="flex justify-between gap-2 border-b border-amber-100 py-1" data-id="' +
      r.id +
      '">' +
      "<span>" +
      r.name +
      " (" +
      r.prepMinutes +
      " min)</span>" +
      '<button type="button" class="rm-fav text-red-600">×</button>' +
      "</li>";
  }
  favList.innerHTML = html;
}

function renderDetail() {
  if (state.selectedId == null) {
    detailEl.classList.add("hidden");
    detailBody.innerHTML = "";
    return;
  }

  const r = state.recipes.find(function (x) {
    return x.id === state.selectedId;
  });

  if (!r) {
    detailEl.classList.add("hidden");
    return;
  }

  detailEl.classList.remove("hidden");
  detailBody.innerHTML =
    '<img src="' +
    (r.image || "") +
    '" alt="' +
    r.name +
    '" class="w-full sm:w-48 h-40 object-cover rounded mb-4 bg-amber-100" />' +
    '<h2 class="text-2xl font-semibold text-amber-950 mb-2">' +
    r.name +
    "</h2>" +
    '<p class="text-sm text-stone-600 mb-2">' +
    r.description +
    "</p>" +
    '<p class="text-xs text-stone-500 mb-4">' +
    r.category +
    " · " +
    r.prepMinutes +
    " min</p>" +
    '<h3 class="font-semibold mb-1">Ingredients</h3>' +
    listHtml(r.ingredients) +
    '<h3 class="font-semibold mt-3 mb-1">Steps</h3>' +
    listHtml(r.steps);
}

function render() {
  renderRecipes();
  renderFavorites();
  renderDetail();
}

function toggleFav(id) {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(function (x) {
      return x !== id;
    });
  } else {
    state.favorites.push(id);
  }
  save();
  render();
}

function validateRequest(name, phone, recipe) {
  if (name.trim().length < 2) return "Please enter your full name.";
  if (!PHONE.test(phone.trim()))
    return "Enter a valid Ethiopian phone (09… or +2519…).";
  if (recipe.trim().length < 2)
    return "Enter the name of the recipe you want us to add.";
  return "";
}

search.addEventListener("input", function (e) {
  state.search = e.target.value.trim();
  renderRecipes();
});

category.addEventListener("change", function (e) {
  state.category = e.target.value;
  renderRecipes();
});

grid.addEventListener("click", function (e) {
  const favBtn = e.target.closest(".fav-btn");
  if (favBtn) {
    const id = Number(favBtn.closest("article").dataset.id);
    toggleFav(id);
    return;
  }
  const viewBtn = e.target.closest(".view-btn");
  if (viewBtn) {
    state.selectedId = Number(viewBtn.closest("article").dataset.id);
    renderDetail();
  }
});

detailClose.addEventListener("click", function () {
  state.selectedId = null;
  renderDetail();
});

favList.addEventListener("click", function (e) {
  const btn = e.target.closest(".rm-fav");
  if (!btn) return;
  toggleFav(Number(btn.closest("li").dataset.id));
});

requestForm.addEventListener("submit", function (e) {
  e.preventDefault();
  formError.textContent = "";
  formSuccess.textContent = "";

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const recipe = recipeInput.value.trim();

  const error = validateRequest(name, phone, recipe);
  if (error) {
    formError.textContent = error;
    return;
  }

  formSuccess.textContent =
    "Thanks, " + name + "! We got your request for “" + recipe + "”.";
  requestForm.reset();
});

async function init() {
  load();
  await loadRecipes();
}

init();
