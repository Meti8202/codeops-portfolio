async function getUsdToEtb() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) throw new Error("HTTP " + res.status);

  const data = await res.json();
  return data.rates.ETB;
}

getUsdToEtb()
  .then((rate) => console.log("1 USD =", rate, "ETB"))
  .catch((err) => console.error(err));

// no 2

fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((res) => res.json())
  .then((user) => {
    console.log(user.name);
  })
  .catch((err) => console.error(err));

async function loadUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) throw new Error("HTTP " + res.status);

    const user = await res.json();
    console.log(user.name);
  } catch (err) {
    console.error(err);
  }
}

loadUser();

// no 3
// A) Network / DNS failure → goes to catch
async function badHost() {
  try {
    const res = await fetch("https://this-api-does-not-exist-abcxyz.com/data");
    console.log("ok?", res.ok);
  } catch (err) {
    console.log("catch ran (network error):", err.message);
  }
}

// B) Real host, missing path → fetch "succeeds", res.ok is false
async function notFound() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/99999");
    console.log("status:", res.status, "ok?", res.ok);
    if (!res.ok) {
      throw new Error("HTTP " + res.status); // you must check this
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("handled:", err.message);
  }
}

badHost();
notFound();

// no 4
async function loadUsersWithDetails() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);

    const users = await res.json();
    const firstTwo = users.slice(0, 2);

    // parallel detail fetches
    const details = await Promise.all(
      firstTwo.map((u) =>
        fetch(`https://jsonplaceholder.typicode.com/users/${u.id}`).then(
          (r) => {
            if (!r.ok) throw new Error("HTTP " + r.status);
            return r.json();
          },
        ),
      ),
    );

    console.log(details); // full objects for user 1 and 2
  } catch (err) {
    console.error(err);
  }
}

loadUsersWithDetails();

// no 5

const statusEl = document.getElementById("status");
const list = document.getElementById("list");

async function load() {
  statusEl.textContent = "Loading…";
  list.innerHTML = "";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) throw new Error("HTTP " + res.status);

    const users = await res.json();

    users.forEach((u) => {
      const li = document.createElement("li");
      li.textContent = `${u.name} — ${u.email}`;
      list.appendChild(li);
    });

    statusEl.textContent = `${users.length} users loaded.`;
  } catch (err) {
    statusEl.textContent = "Could not load data. Please try again.";
    console.error(err);
  }
}

load();
