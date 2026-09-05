# CodeOps Portfolio — Meti Guda

**IBT College Canada · Full Stack Software Development**  
**Program:** CodeOps · 9 modules · 24 weeks · 120 days · 480 hours  
**Cohort:** Ethiopia  
**Status:** Day 30 of 120 · Module 03 in progress

Daily classwork, practice, notes and mini-projects from the CodeOps Full Stack Software Development curriculum.

---

## About

This repository is my public learning log and software development portfolio for the **CodeOps** program at IBT College Canada.

I am building practical skills across frontend development, backend development, databases, testing, DevOps, software architecture and professional portfolio development.

- **Entry baseline:** Variables, conditionals, loops and functions
- **Learning path:** Python fundamentals → HTML, CSS, JavaScript → React and Next.js → backend development → databases → QA → DevOps → architecture → market-ready projects
- **Practice habit:** Every exercise and project is committed and pushed to GitHub from day one
- **Current focus:** React component design, hooks, state management, data fetching and reusable frontend patterns

---

## Progress overview

| Module | Title | Days | Hours | Status |
|---|---|---:|---:|---|
| 01 | Foundation: Git, Terminal, Python, OOP & DSA | 1–10 | 40 | ✅ Complete |
| 02 | Frontend: HTML, CSS & JavaScript | 11–25 | 60 | ✅ Complete |
| 03 | Frontend: React & Next.js | 26–50 | 100 | 🔄 In progress — Day 30 |
| 04 | Backend Track: Node/Nest, Go, or .NET | 51–75 | 100 | ⏳ Upcoming |
| 05 | Databases: PostgreSQL, MongoDB & Neo4j | 76–85 | 40 | ⏳ Upcoming |
| 06 | QA & Testing | 86–90 | 20 | ⏳ Upcoming |
| 07 | DevOps & CI/CD | 91–100 | 40 | ⏳ Upcoming |
| 08 | Software Architecture & Design | 101–105 | 20 | ⏳ Upcoming |
| 09 | Market Ready Sprint | 106–120 | 60 | ⏳ Upcoming |

**Current focus:** Module 03 — React hooks deep dive and Week 1 mini-project: **Addis Eats**  
**Next:** Additional React patterns, React Router, Next.js and the rest of Module 03

---

## Repository structure

```text
codeops-portfolio/
├── Module-01/                                  # Foundation: Python, Git, OOP, DSA
│   ├── day01-...
│   └── day10-...
│
├── Module-02/                                  # Frontend: HTML, CSS, JavaScript
│   ├── day11-HTML/
│   ├── day12-Forms/
│   ├── day13-CSS/
│   ├── day14-Layout/
│   ├── day15-Responsive-Animations/
│   ├── day16-JavaScript/
│   ├── day17-Functions/
│   └── day18-... / day25-...
│
├── Module-03/                                  # Frontend: React & Next.js
│   ├── day26-React-Setup-JSX/
│   ├── day27-Props-Rendering-Patterns/
│   ├── day28-State-Events-useState/
│   ├── day29-Side-Effects-useEffect-useRef/
│   └── day30-Hooks-Deep-Dive/
│       └── addis-eats/                         # Week 1 React mini-project
│
├── Module-04/                                  # Added as the program progresses
├── Module-05/
├── Module-06/
├── Module-07/
├── Module-08/
├── Module-09/
├── README.md
└── .gitignore
```

### File conventions

| Context | In-class work | Practice | Mini-project |
|---|---|---|---|
| Python — Module 01 | `main.py` | `practice.py` | `project.py` |
| HTML, CSS & JavaScript — Module 02 | `/exercise` | `/practice` | `/project` |
| React — Module 03+ | Vite project in daily folder | Components and hook practice | Full React application |

---

## Module 01 — Foundation

**Days 1–10 · 40 hours · ✅ Complete**

**Topics:** Git, terminal, Python fundamentals, collections, files, errors, object-oriented programming, SOLID principles, design patterns, data structures and algorithms and Big-O notation.

### Larger project — Addis Bank

The Addis Bank project grew day by day from a basic encapsulated bank account into a small object-oriented banking system.

| Day | Feature added |
|---:|---|
| 4 | `Account` class with private balance, `@property`, validated deposits and withdrawals and account statements |
| 5 | `SavingsAccount` with interest and `CurrentAccount` with overdraft support using inheritance and polymorphism |
| 6 | SOLID refactor, `AccountFactory`, Observer alerts with `SMSAlert` and `AuditLog`, plus a `BankConfig` Singleton |
| 7 | `AccountRegistry` using dictionary lookup, transaction history stack and `undo_last()` functionality |

### Notable exercises

- Bill split calculator with tip support
- Temperature label program
- Receipt loop and discount calculator
- TeleBirr-style customer tier report
- Transaction file summary with dictionaries, sorting and `try/except`
- Pharmacy inventory manager with low-stock reporting
- Big-O notes and list-versus-dictionary comparison
- Stack, queue, linked list, recursion, search, sort, trees, graphs and heaps practice

---

## Module 02 — Frontend

**Days 11–25 · 60 hours · ✅ Complete**

**Stack:** HTML5, CSS3, Flexbox, CSS Grid, responsive design, transitions, Tailwind CSS and vanilla JavaScript.

### Days completed

| Folder | Focus | Highlights |
|---|---|---|
| `day11-HTML` | How the web works and HTML foundations | Semantic HTML structure |
| `day12-Forms` | Forms, tables, media, accessibility | Inputs, ARIA basics, SEO basics |
| `day13-CSS` | CSS foundations | Selectors, box model, variables, typography |
| `day14-Layout` | Flexbox and Grid | Complex layouts using exercise, practice and project folders |
| `day15-Responsive-Animations` | Responsive design, animation, Tailwind | Media queries, transitions, utility-first CSS |
| `day16-JavaScript` | JavaScript foundations | Types, coercion, template literals, conditions, loops |
| `day17-Functions` | Functions, closures, higher-order functions | Declarations, arrows, callbacks, factories, private state |
| `day18`–`day25` | JavaScript continuation | Arrays, objects, DOM, events, async JavaScript, APIs |

### Projects

| Project | Description |
|---|---|
| **EthioAirlines — Results** | Flight results interface with a sticky navbar, filter sidebar, card grid and responsive layout |
| **Habesha Eatery** | Restaurant website for Bole, Addis Ababa, with menu cards, hero section, about section and reservation form |
| **Habesha Eatery — Order module** | Receipt maker with private order number, membership discount, VAT and ETB currency formatting |
| **TeleBirr loyalty points** | Closure-based points balance with swappable earning rules such as standard and holiday-double points |

---

## Module 03 — React & Next.js

**Days 26–50 · 100 hours · 🔄 In progress**

**Stack so far:** React 19, Vite, PropTypes, CSS Grid, Flexbox, `useState`, `useEffect`, `useRef`, `useContext`, `useReducer`, `useMemo` and custom hooks.

### Days completed

| Day | Focus | Highlights |
|---:|---|---|
| 26 | React setup and JSX | Vite + React project, JSX, header and dish components, rendering menu data with `map`, stable keys |
| 27 | Props and rendering patterns | PropTypes, default props, reusable `Card` component with `children`, conditional spicy badge, category filter, empty state |
| 28 | State and events with `useState` | Local dish count, lifted category state, running order total, controlled TeleBirr delivery form with validation |
| 29 | Side effects with `useEffect` and `useRef` | Fetching menu data, loading and error states, `AbortController` cleanup patterns |
| 30 | Hooks deep dive and Week 1 mini-project | Custom `useFetch`, `cartReducer`, `CartProvider`, `useContext`, `useMemo`, quantity-aware cart |

---

## Addis Eats mini-project

**Week 1 mini-project · Day 30**

Addis Eats is a React food-ordering application that brings together the React concepts learned during the first week of Module 03.

### Features

- Fetches menu data from `public/dishes.json`
- Custom `useFetch` hook for reusable data-fetching logic
- Handles loading, error and successful data states
- Uses `AbortController` cleanup to cancel an unfinished request
- Category filter for menu items
- `useMemo` for filtering and preparing visible menu dishes
- Pure `cartReducer` with `add`, `remove` and `clear` actions
- Cart data shared through `CartContext`
- `CartProvider` powered by `useReducer`
- Memoised provider value to avoid unnecessary context updates
- Header cart badge showing item count and total price
- Sidebar checkout panel showing selected dishes and clear-cart action
- Quantity-aware cart behavior for repeated additions of the same dish
- Controlled delivery form with name, TeleBirr phone and address inputs
- Live TeleBirr phone validation
- Responsive desktop and mobile layout

### React concepts demonstrated

| Concept | Where it is used |
|---|---|
| `useState` | Selected category and delivery form state |
| `useEffect` | Fetch lifecycle inside `useFetch` |
| `useRef` | Covered during the Day 29 fetching and effects exercises |
| Custom hook | `src/hooks/useFetch.js` |
| `useReducer` | Cart transitions inside `CartProvider` |
| `useContext` | Header, menu dish cards and sidebar checkout |
| `useMemo` | Filtered menu dishes and memoised provider value |
| PropTypes | Dish component props |
| Component composition | `Card`, `Dish`, `CategoryBar`, `Sidebar`, `Header`, `Footer` |

### Project structure

```text
addis-eats/
├── public/
│   ├── dishes.json
│   └── images/
│
├── src/
│   ├── cart/
│   │   ├── CartContext.js
│   │   ├── CartProvider.jsx
│   │   ├── cartReducer.js
│   │   └── useCart.js
│   │
│   ├── hooks/
│   │   └── useFetch.js
│   │
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   │
│   │   ├── Main/
│   │   │   ├── Main.jsx
│   │   │   ├── Main.css
│   │   │   │
│   │   │   ├── Menu/
│   │   │   │   ├── Menu.jsx
│   │   │   │   ├── Menu.css
│   │   │   │   ├── CategoryBar.jsx
│   │   │   │   ├── CategoryBar.css
│   │   │   │   ├── Dish.jsx
│   │   │   │   ├── Dish.css
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Card.css
│   │   │   │
│   │   │   └── Sidebar/
│   │   │       ├── Sidebar.jsx
│   │   │       ├── Sidebar.css
│   │   │       ├── OrderForm.jsx
│   │   │       └── OrderForm.css
│   │   │
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

### Cart architecture

The cart uses a reducer so that all cart state transitions are defined in one predictable, testable place.

```js
{
  items: [
    {
      id: 1,
      name: "Doro Wat",
      price: 240,
      category: "Main",
      quantity: 2
    }
  ]
}
```

Supported cart actions:

```js
dispatch({ type: "add", dish });
dispatch({ type: "remove", id: dish.id });
dispatch({ type: "clear" });
```

The total is derived from current cart state:

```js
const total = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
```

### Run locally

From the Addis Eats project directory:

```bash
npm install
npm run dev
```

Then open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```


## How the program is taught

- Concepts are taught in class and reinforced with reading assignments
- Every reading assignment includes exercises or a mini-project
- Homework is assigned daily
- Larger projects grow throughout each module
- Git and GitHub are used from the beginning
- Work is committed and pushed regularly to build a public development record

---

## About me

**Meti Guda**  
Software engineering student and frontend developer in training  
CodeOps student · IBT College Canada · Ethiopia

I am building practical frontend and full-stack development skills with HTML, CSS, JavaScript, React, Next.js, Python and Git. I am especially interested in creating responsive, user-friendly web applications and developing a strong professional software portfolio.

Feedback, collaboration and constructive suggestions are welcome.

---

## Git workflow

Typical daily workflow:

```bash
git status
git add .
git commit -m "feat: complete Day 30 Addis Eats hooks mini-project"
git push
```

Example documentation update commit:

```bash
git add README.md
git commit -m "docs: update portfolio README to Day 30 Module 03"
git push
```

---

*Last updated: Day 30 — Hooks Deep Dive · Week 1 mini-project: Addis Eats*  
*Curriculum: CodeOps Full Stack Software Development · Version 2.0 · 2026*