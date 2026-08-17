## Mini-Project — Country Facts Page
### What you will build
A single-page app where the user enters a country name (default it to Ethiopia) and the page fetches and displays facts about it — capital, population, region, currencies and a flag — from the free restcountries.com API. No framework; just fetch, async/await and the DOM.
### Requirements
- [x] Use an async function with fetch to call https://restcountries.com/v3.1/name/{country} from a search input.
- [x] Show a "Loading…" indicator while the request is in flight, and remove it when done.
- [x] Check res.ok and handle both network and HTTP errors with try/catch, showing a friendly
message (e.g. "Country not found").
- [x] On success, render the capital, population (formatted with commas), region and currencies into the DOM with createElement.
- [x] Default the page to showing Ethiopia’s facts on first load — capital Addis Ababa.
### A worked start
Wire the fetch with all three states in one function, then call it on load and on search:
```
const out = document.querySelector("#facts");
async function showCountry(name) {
     out.textContent = "Loading…";
     try {
          const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
          if (!res.ok) throw new Error("Country not found");
          const [c] = await res.json();
          out.innerHTML = "";
          render(out, "Capital", c.capital[0]); // "Addis Ababa"
          render(out, "Population", c.population.toLocaleString());
          render(out, "Region", c.region);
         } catch (err) {
          out.textContent = err.message; // friendly error  
     }
}
showCountry("ethiopia"); // default on load
     
```
<!--  -->