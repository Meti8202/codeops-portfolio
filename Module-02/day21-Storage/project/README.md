## Mini-Project · A Validated, Persistent Signup Form
> **Tip What you build**
A signup form that validates a name and an Ethiopian phone number with regex, shows clear errors, and saves valid entries to localStorage as JSON — restored on reload. It brings together all four of today’s skills (storage, JSON, forms, regex) in one small app, and is the exact pattern behind tomorrow’s Week 3 project.
### Requirements
- [ ]  A form with labelled name and phone inputs, a submit button, and a dedicated error area.
- [ ]  preventDefault on submit; values trimmed before use.
- [ ]  Validation: name at least two characters; phone matches /^(?:\+251|0)9\d{8}$/.
- [ ]  Clear, specific error messages shown with textContent (never innerHTML).
- [ ]  Valid entries saved to localStorage as JSON and restored on reload, with null and corrupt data
handled.
### A worked start
Get the validate-and-report loop working first, then add persistence:
```
const PHONE = /^(?:\+251|0)9\d{8}$/;
function validate(name, phone) {
     if (name.trim().length < 2) return "Enter your full name.";
     if (!PHONE.test(phone)) return "Enter a valid phone."; 
     return "";
    }
```
