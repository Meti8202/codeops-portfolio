const form = document.getElementById("search-form");
const input = document.getElementById("country");
const out = document.getElementById("facts");

const API_KEY = "rc_live_a0855e7c42794c79b6ad803289d69e62";
const API_URL = "https://api.restcountries.com/countries/v5";

function render(parent, label, value) {
  const p = document.createElement("p");
  p.textContent = label + ": " + value;
  parent.appendChild(p);
}

async function showCountry(name) {
  out.textContent = "Loading…";

  try {
    const res = await fetch(API_URL + "?q=" + name + "&api-key=" + API_KEY);
    if (!res.ok) throw new Error("Country not found");

    const json = await res.json();
    const list = json.data && json.data.objects;
    if (!list || list.length === 0) throw new Error("Country not found");

    const c = list[0];
    out.innerHTML = "";

    if (c.flag && c.flag.url_png) {
      const img = document.createElement("img");
      img.src = c.flag.url_png;
      img.alt = "Flag of " + c.names.common;
      img.width = 120;
      out.appendChild(img);
    }

    render(
      out,
      "Capital",
      c.capitals && c.capitals[0] ? c.capitals[0].name : "—",
    );
    render(
      out,
      "Population",
      c.population != null ? Number(c.population).toLocaleString() : "—",
    );
    render(out, "Region", c.region || "—");

    const currencies = (c.currencies || [])
      .map(function (cur) {
        return cur.name + " (" + cur.code + ")";
      })
      .join(", ");
    render(out, "Currencies", currencies || "—");
  } catch (err) {
    out.textContent = err.message;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = input.value.trim();
  if (!name) return;
  showCountry(name);
});

showCountry("ethiopia");
