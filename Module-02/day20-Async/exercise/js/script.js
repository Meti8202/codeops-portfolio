const list = document.getElementById("list");
const loadingStatus = document.getElementById("status");
const refreshButton = document.getElementById("refresh");

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function load() {
  loadingStatus.textContent = "Loading…";
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const users = await res.json();

    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} — ${user.phone}`;
      list.appendChild(li);
    });

    loadingStatus.textContent = `${users.length} users loaded.`;
  } catch (err) {
    loadingStatus.textContent = "Couldn't load data. Please try again.";
    console.error(err);
  }
}

if (refreshButton) {
  refreshButton.addEventListener("click", load);
}

load();
