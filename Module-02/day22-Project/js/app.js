const API_KEY = "6e69d8e5cbb4216261ad2d1b";
const API = "https://v6.exchangerate-api.com/v6/" + API_KEY + "/latest/ETB";
const KEY = "birrwatch";

const state = {
  rates: {},
  history: [], 
  amount: 100,
  currency: "USD",
};

const etbInput = document.getElementById("etb");
const resultInput = document.getElementById("result");
const select = document.getElementById("currency");
const historyUl = document.getElementById("watchlist");
const refreshBtn = document.getElementById("refreshButton");
const convertBtn = document.getElementById("convertBtn");
const statusEl = document.getElementById("status");

function setStatus(msg) {
  statusEl.textContent = msg || "";
}

function save() {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      history: state.history,
      currency: state.currency,
    }),
  );
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.history)) state.history = saved.history;
    if (saved.currency) state.currency = saved.currency;
  } catch (err) {
  }
}

async function loadRates() {
  setStatus("Loading rates...");
  try {
    const res = await fetch(API);
    const data = await res.json();

    if (data.result === "error") {
      throw new Error(data["error-type"] || "API error");
    }
    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    state.rates = data.conversion_rates || {};
    setStatus("Rates updated.");

    setTimeout(function () {
      if (statusEl.textContent === "Rates updated.") setStatus("");
    }, 2000);
  } catch (err) {
    setStatus("Could not load rates. " + (err.message || ""));
    console.error(err);
  }
}

function convert() {
  const amt = Number(etbInput.value);

  if (!amt || amt <= 0 || isNaN(amt)) {
    setStatus("Enter a valid amount.");
    resultInput.value = "0.00";
    return;
  }

  state.amount = amt;
  state.currency = select.value.toUpperCase();

  const rate = state.rates[state.currency];
  if (!rate) {
    setStatus("Rate not available for " + state.currency + ".");
    resultInput.value = "0.00";
    return;
  }

  const out = (amt * rate).toFixed(2);
  resultInput.value = out;
  setStatus("");

  const entry = amt + " ETB → " + out + " " + state.currency;

  if (!state.history.includes(entry)) {
    state.history.unshift(entry);
    renderHistory();
  }

  save();
}

function renderHistory() {
  if (state.history.length === 0) {
    historyUl.innerHTML =
      '<li class="py-3 px-4 text-gray-500">No conversions yet</li>';
    return;
  }

  historyUl.innerHTML = state.history
    .map(function (item) {
      return (
        '<li class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg" data-key="' +
        item +
        '">' +
        '<span class="font-medium">' +
        item +
        "</span>" +
        '<button type="button" class="rm text-gray-400 hover:text-red-500" title="Remove">' +
        '<span class="material-symbols-outlined text-[20px]">delete</span>' +
        "</button>" +
        "</li>"
      );
    })
    .join("");
}

convertBtn.addEventListener("click", convert);

select.addEventListener("change", function () {
  state.currency = select.value.toUpperCase();
  save();
});

historyUl.addEventListener("click", function (e) {
  const btn = e.target.closest(".rm");
  if (!btn) return;
  const li = btn.closest("li");
  if (!li) return;
  const key = li.dataset.key;
  state.history = state.history.filter(function (x) {
    return x !== key;
  });
  save();
  renderHistory();
});

refreshBtn.addEventListener("click", loadRates);

etbInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    convert();
  }
});

async function init() {
  load();
  select.value = state.currency;
  renderHistory();
  await loadRates();
}

init();
