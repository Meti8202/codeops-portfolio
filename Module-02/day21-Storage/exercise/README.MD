## Build a validated, persistent signup form
### DELIVERABLE
A signup form that validates a name and an Ethiopian phone number
with regex, shows clear errors, and saves valid entries to localStorage
as JSON — restored on reload.
### Steps
- [ ]  Build the form: labelled name and phone inputs, a submit button, and an error area.
- [ ]  On submit, preventDefault and read the trimmed field values.
- [ ]  Validate: name at least two characters; phone against the Ethiopian regex.
- [ ]  Show a clear, specific message for the first problem found.
- [ ]  On success, save the entry to localStorage as JSON and clear the form.
- [ ]  On load, read storage and show how many people have signed up
- [ ]  