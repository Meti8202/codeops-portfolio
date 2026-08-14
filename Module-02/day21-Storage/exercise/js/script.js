const PHONE = /^(?:\+251|0)9\d{8}$/;
const EMAIL = /^[\w.-]+@[\w.-]+\.\w+$/;
const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;

// console.log(PASSWORD.test("abcdefG89*"));
// console.log(PASSWORD.test("abcdefG89"));
// console.log(PASSWORD.test("abcdefGsdfhj"));
// console.log(PASSWORD.test("abcdefsdfhj9**"));
// console.log(PHONE.test("0911111111"));
// console.log(PHONE.test("0711111111"));
// console.log(PHONE.test("+251911111111"));
// console.log(EMAIL.test("ibt.college@gmail.com"));
// console.log(EMAIL.test("ibt.college@yahoo.com"));
// console.log(EMAIL.test("ibt.college@yahoocom"));
// console.log(EMAIL.test("ibtcollegeyahoo.com"));

const form = document.getElementById("signup");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error");
const successMessage = document.getElementById("success");
const count = document.getElementById("count");

const STORAGE_KEY = "signups";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  errorMessage.textContent = "";
  successMessage.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value;

  const error = validate({ name, email, phone, password });
  if (error) {
    errorMessage.textContent = error;
    return;
  }

  const entry = { name, email, phone };

  const list = loadSignups();
  list.push(entry);
  saveSignups(list);

  form.reset();
  successMessage.textContent = "Signup successful.";
  showCount();
});

function validate({ name, email, phone, password }) {
  if (name.length < 2) return "Name must be at least 2 characters.";
  if (!EMAIL.test(email)) return "Enter a valid email address.";
  if (!PHONE.test(phone))
    return "Enter a valid Ethiopian phone (09… or +2519…).";
  if (!PASSWORD.test(password))
    return "Password needs 8+ chars, upper, lower, and a special character.";
  return "";
}

function saveSignups(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function loadSignups() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function showCount() {
  const list = loadSignups();
  const n = list.length;
  count.textContent = n === 0 ? "0 people signed up" : `${n} people signed up`;
}

showCount();
