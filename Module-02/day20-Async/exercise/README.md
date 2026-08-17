## Fetch & display live data
### DELIVERABLE
A page that fetches a list of dishes (or any JSON) from a public API, shows a loading message, renders the results on the page, and displays a friendly message if the request fails.
### Steps
- [x]  Write an async load() that shows "Loading…" first.
- [x]  await fetch the endpoint; throw if !res.ok.
- [x]  await res.json() and render each item to the list.
- [x]  Wrap the awaits in try / catch; show an error message on failure.
- [x]  Use finally (or the catch) to clear the loading state.
- [x]  Bonus: add a refresh button that calls load() again.