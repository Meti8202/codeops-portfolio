const PHONE = /^(?:\+251|0)9\d{8}$/;

const form = document.getElementById("signup");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorEl = document.getElementById("error");
const countEl = document.getElementById("count");

const STORAGE_KEY = "signups";

function validate(name, phone) {
  if (name.trim().length < 2) return "Enter your full name.";
  if (!PHONE.test(phone)) return "Enter a valid phone.";
  return "";
}

function loadSignups() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function saveSignups(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function showCount() {
  const list = loadSignups();
  const n = list.length;
  countEl.textContent =
    n === 0 ? "0 people signed up" : n + " people signed up";
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