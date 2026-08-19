const grid = document.getElementById("recipe-grid");
const search = document.getElementById("search");
const favList = document.getElementById("fav-list");
const category = document.getElementById("category");
const summary = document.getElementById("summary");
const status = document.getElementById("status");

const KEY = "favorites-habesha-recipe";

const state = {
  recipes: [],
  favorites: [],
  search: "",
  category: "all",
};

function setStatus(message) {
  status.textContent = message || "";
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

function isFavorite(id) {
  return state.favorites.includes(id);
}

function recipeCard(r) {
  const fav = isFavorite(r.id);

  let pills =
    '<span class="inline-block text-xs font-medium bg-amber-800 text-amber-50 px-2.5 py-0.5 rounded-full">' +
    r.category +
    "</span>" +
    '<span class="inline-block text-xs font-medium bg-amber-200 text-amber-950 px-2.5 py-0.5 rounded-full">' +
    r.prepMinutes +
    " min</span>";

  if (r.spicy) {
    pills +=
      '<span class="inline-block text-xs font-medium bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">Spicy</span>';
  }

  return (
    '<article class="bg-[#fffdf8] rounded-2xl border border-amber-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow" data-id="' +
    r.id +
    '">' +
    '<img src="' +
    (r.image || "") +
    '" alt="' +
    r.name +
    '" class="h-40 w-full object-cover bg-amber-100" />' +
    '<div class="p-5 flex flex-col gap-3 flex-1">' +
    '<h2 class="font-serif text-2xl text-amber-950">' +
    r.name +
    "</h2>" +
    '<div class="flex flex-wrap gap-1.5">' +
    pills +
    "</div>" +
    '<p class="text-sm text-stone-600 line-clamp-2">' +
    r.description +
    "</p>" +
    '<button type="button" class="fav-btn mt-auto self-start text-sm font-medium px-4 py-2 rounded-full ' +
    (fav
      ? "bg-amber-200 text-amber-950 hover:bg-amber-300"
      : "bg-amber-800 text-amber-50 hover:bg-amber-900") +
    '">' +
    (fav ? "★ Favorite" : "☆ Save") +
    "</button>" +
    "</div>" +
    "</article>"
  );
}
function renderRecipes() {
  const list = getFiltered();

  if (state.recipes.length === 0) {
    grid.innerHTML = "";
    return;
  }

  if (list.length === 0) {
    grid.innerHTML =
      '<p class="text-stone-500 col-span-full">No recipes found.</p>';
    return;
  }

  grid.innerHTML = list.map(recipeCard).join("");
}

function renderFavorites() {
  const favRecipes = state.favorites
    .map(function (id) {
      return state.recipes.find(function (r) {
        return r.id === id;
      });
    })
    .filter(Boolean);

  const totalMins = favRecipes.reduce(function (sum, r) {
    return sum + r.prepMinutes;
  }, 0);

  summary.textContent =
    favRecipes.length + " saved · " + totalMins + " min total prep";

  if (favRecipes.length === 0) {
    favList.innerHTML = '<li class="text-stone-400">No favorites yet</li>';
    return;
  }

  favList.innerHTML = favRecipes
    .map(function (r) {
      return (
        '<li class="flex items-center justify-between gap-2 py-1.5 border-b border-amber-100 last:border-0" data-id="' +
        r.id +
        '">' +
        "<span>" +
        r.name +
        ' <span class="text-stone-400">(' +
        r.prepMinutes +
        " min)</span></span>" +
        '<button type="button" class="rm-fav text-amber-700/50 hover:text-red-600 text-lg leading-none" title="Remove">×</button>' +
        "</li>"
      );
    })
    .join("");
}

function render() {
  renderRecipes();
  renderFavorites();
}

function getFiltered() {
  const term = state.search.toLowerCase();
  return state.recipes.filter(function (r) {
    const matchName = r.name.toLowerCase().includes(term);
    const matchCat = state.category === "all" || r.category === state.category;
    return matchName && matchCat;
  });
}

search.addEventListener("input", function (e) {
  state.search = e.target.value.trim();
  renderRecipes();
});

category.addEventListener("change", function (e) {
  state.category = e.target.value;
  renderRecipes();
});

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

grid.addEventListener("click", function (e) {
  const btn = e.target.closest(".fav-btn");
  if (!btn) return;
  const id = Number(btn.closest("article").dataset.id);
  toggleFav(id);
});

favList.addEventListener("click", function (e) {
  const btn = e.target.closest(".rm-fav");
  if (!btn) return;
  const id = Number(btn.closest("li").dataset.id);
  toggleFav(id);
});

function save() {
  localStorage.setItem(KEY, JSON.stringify(state.favorites));
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) state.favorites = parsed;
  } catch (err) {
    state.favorites = [];
  }
}

async function init() {
  load();
  await loadRecipes();
}

init();
