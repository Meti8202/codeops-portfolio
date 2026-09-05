### Exercises
Complete these in your Day 20 folder and push them to GitHub. Run each against a real public API and confirm the behaviour.
1. Write an async function that fetches the USD→ETB rate from a public exchange-rate API,
checks res.ok, and returns the rate.
2. Rewrite a three-step .then chain (fetch → json → render) as an async function using await and try/catch.
3. Fetch a deliberately wrong URL and confirm your catch block runs; then fetch a real URL that returns 404 and show why you also need res.ok.
4. Fetch a list from a public API and use Promise.all to fetch details for the first two items in parallel.
5. Build a tiny page that shows "Loading…", then either the fetched data or an error message — all three states visible by toggling the network.S