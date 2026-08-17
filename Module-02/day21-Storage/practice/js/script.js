const themeBtn = document.getElementById("theme-btn");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});

const ITEMS_KEY = "practice-items";

function save(list) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(list));
}

function load() {
  try {
    const raw = localStorage.getItem(ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

document.getElementById("test-storage").addEventListener("click", function () {
  save([{ name: "Almaz" }, { name: "Dawit" }]);
  const result = load();
  document.getElementById("storage-result").textContent =
    "Loaded: " + JSON.stringify(result);
  console.log(result);
});

const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.getElementById("signup");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorEl = document.getElementById("error");
const countEl = document.getElementById("count");

const SIGNUPS_KEY = "practice-signups";

function loadSignups() {
  try {
    const raw = localStorage.getItem(SIGNUPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveSignups(list) {
  localStorage.setItem(SIGNUPS_KEY, JSON.stringify(list));
}

function showCount() {
  const n = loadSignups().length;
  countEl.textContent =
    n === 0 ? "0 people signed up" : n + " people signed up";
}

function validate(name, phone) {
  if (name.length < 2) return "Enter your full name.";
  if (!PHONE.test(phone)) return "Enter a valid phone.";
  return "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  errorEl.textContent = "";

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const error = validate(name, phone);
  if (error) {
    errorEl.textContent = error;
    return;
  }

  const list = loadSignups();
  list.push({ name: name, phone: phone });
  saveSignups(list);

  form.reset();
  showCount();
});

showCount();
