## Exercises
Work these in order and commit as you go. Each is small and testable on its own.
1. Add a language or theme toggle to an earlier project and make it remember the choice with localStorage (save on change, restore on load).
2. Write save() and load() helpers that stringify an array to localStorage and parse it back, guarding null and corrupt data with try / catch.
3. Build a signup form with labelled name and phone inputs, a submit button, and an error area.
4. On submit, preventDefault, read the trimmed values, and validate: name at least two characters, phone against the Ethiopian regex.
5. Show a clear, specific message for the first problem found, using textContent.
6. On success, save the entry to localStorage as JSON, clear the form, and on load show how many people have signed up.