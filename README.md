# CodeOps Portfolio — Meti Guda

**IBT College Canada · Full Stack Software Development**  
**Program:** CodeOps · 9 modules · 24 weeks · 120 days · 480 hours  
**Cohort:** Ethiopia  
**Status:** Day 17 of 120 · Module 02 in progress

Daily work from the CodeOps curriculum is pushed here. This README is updated as modules progress.

---

### About

This repository is my public learning log and project portfolio for **CodeOps** (IBT College Canada).

- **Entry baseline:** variables, conditionals, loops, functions  
- **Path:** Python fundamentals → HTML / CSS / JavaScript → React & Next.js → one backend track (Node/Nest, Go, or .NET) → databases → QA → DevOps → architecture → market-ready sprint  
- **Habit:** every exercise and project is committed and pushed to GitHub from day one  

---

### Progress overview

| Module | Title | Days | Hours | Status |
|--------|--------|------|-------|--------|
| 01 | Foundation: Git, Terminal, Python, OOP & DSA | 1–10 | 40 | ✅ Complete |
| 02 | Frontend: HTML, CSS & JavaScript | 11–25 | 60 | 🔄 In progress (Day 17) |
| 03 | Frontend: React & Next.js | 26–50 | 100 | ⏳ Upcoming |
| 04 | Backend Track (Node/Nest · Go · .NET) | 51–75 | 100 | ⏳ Upcoming |
| 05 | Databases (PostgreSQL, MongoDB, Neo4j) | 76–85 | 40 | ⏳ Upcoming |
| 06 | QA & Testing | 86–90 | 20 | ⏳ Upcoming |
| 07 | DevOps & CI/CD | 91–100 | 40 | ⏳ Upcoming |
| 08 | Software Architecture & Design | 101–105 | 20 | ⏳ Upcoming |
| 09 | Market Ready Sprint | 106–120 | 60 | ⏳ Upcoming |

**Current focus:** Module 02 — Functions, closures & higher-order functions (Day 17)  
**Next:** Arrays, objects & modern JavaScript → DOM & events → async / APIs → weekly projects

---

### Repository structure

```
codeops-portfolio/
├── Module-01/                          # Foundation (Python, Git, OOP, DSA)
│   └── day01-… / day10-…               # dayXX-TopicName
│       ├── main.py                     # in-class exercise
│       ├── practice.py                 # practice drills
│       └── project.py                  # mini-project (single file)
│
├── Module-02/                          # Frontend: HTML, CSS, JavaScript
│   ├── day11-HTML/
│   ├── day12-Forms/
│   ├── day13-CSS/
│   ├── day14-Layout/
│   │   ├── exercise/                   # in-class
│   │   │   ├── images/
│   │   │   ├── styles/
│   │   │   └── index.html
│   │   ├── practice/                   # practice drills
│   │   │   ├── images/
│   │   │   ├── styles/
│   │   │   └── index.html
│   │   ├── project/                    # mini-project
│   │   │   ├── images/
│   │   │   ├── styles/
│   │   │   ├── index.html
│   │   │   └── README.md
│   │   └── README.md
│   ├── day15-Responsive-Animations/
│   ├── day16-Javascript/
│   └── day17-Functions/
│       ├── exercise/js/order.js        # Habesha Eatery order module
│       ├── practice/script.js          # vat, counter, discountBy, HOF drills
│       └── project/script.js           # TeleBirr loyalty points module
│
├── Module-03/ … Module-09/             # added as the program advances
├── README.md
└── .gitignore
```

#### Conventions

| Context | In-class | Practice | Mini-project |
|---------|----------|----------|--------------|
| **Python** (Module 01) | `main.py` | `practice.py` | `project.py` |
| **HTML / CSS / JS** (Module 02+) | `/exercise` | `/practice` | `/project` |

Each of `exercise/`, `practice/`, and `project/` keeps its own assets:

- `index.html` (or other `.html` pages) inside that folder  
- `images/` for media  
- `styles/` (or `css/`) for CSS  
- `js/` for JavaScript (from Day 16 onward)  

---

### Module 01 — Foundation (Days 1–10) ✅

**Topics:** Git & terminal · Python fundamentals · collections, files, errors · OOP (encapsulation, inheritance, polymorphism, abstraction) · SOLID & design patterns (Singleton, Factory, Observer) · DSA (linear structures, recursion, search/sort, trees/graphs/heaps) · Big-O

#### Larger project — Addis Bank

Grew day by day from a simple encapsulated account into a small banking system:

| Day | What was added |
|-----|----------------|
| 4 | `Account` — private balance, `@property`, validated deposit/withdraw, `statement()` |
| 5 | `SavingsAccount` (interest) & `CurrentAccount` (overdraft) + polymorphism |
| 6 | SOLID refactor · `AccountFactory` · Observer alerts (`SMSAlert`, `AuditLog`) · `BankConfig` Singleton |
| 7 | `AccountRegistry` (dict O(1) lookup + insertion order) · transaction history stack · `undo_last()` |

#### Notable exercises & mini-projects

- **Day 2:** Bill split with tip · temperature labels · receipt loop · discount function · TeleBirr-style customer tier report  
- **Day 3:** Transaction file summary (dict + sort + `try/except`) · pharmacy inventory with low-stock report  
- **Days 7–9:** Big-O notes · list vs dict · Stack / Queue / LinkedList · recursion, search, sort, trees (as covered in class)

---

### Module 02 — Frontend: HTML, CSS & JavaScript (Days 11–25) 🔄

**Stack so far:** HTML5 · CSS3 (Flexbox, Grid, responsive, transitions) · Tailwind · vanilla JavaScript (Days 16–17)

#### Days completed

| Folder | Focus | Highlights |
|--------|--------|------------|
| `day11-HTML` | How the web works & HTML foundations | Semantic structure · `hello.html`, `shop.html` in practice |
| `day12-Forms` | Forms, tables, media, accessibility | Inputs, ARIA, SEO basics |
| `day13-CSS` | CSS foundations | Selectors, box model, variables, typography |
| `day14-Layout` | Flexbox & Grid | Complex layouts · exercise / practice / project each with own `images/` + `styles/` |
| `day15-Responsive-Animations` | Responsive design, animation, Tailwind | Media queries, transitions, utility-first CSS |
| `day16-Javascript` | JavaScript foundations | Types, coercion, template literals, control flow, loops |
| `day17-Functions` | Functions, closures & higher-order functions | Declarations/arrows · private state · factories · callbacks |

#### Day 17 work

| Path | What it covers |
|------|----------------|
| `practice/script.js` | `vat` (default + arrow) · `makeCounter` closure · `discountBy` factory · `applyToAll` HOF · `forEach` / custom `myForEach` |
| `exercise/js/order.js` | Habesha Eatery order module — `subtotal` (rest + loop) · `discountBy` · `withVat` · `toETB` · `makeReceiptMaker` (private order number) |
| `project/script.js` | TeleBirr loyalty points — closure keeps balance private · `earn` / `redeem` / `balance` · earn-rule HOF (standard + holiday double) |

#### Projects

| Project | Location | Description |
|---------|----------|-------------|
| **EthioAirlines — Results** | Module-02 day project folders | Flight results UI: sticky navbar, filter sidebar, card grid, responsive layout, CSS variables |
| **Habesha Eatery** | Module-02 day project folders | Restaurant site (Bole, Addis Ababa): menu cards, hero, about, reservation form. Built in plain CSS and with **Tailwind** |
| **Habesha Eatery — Order module** | `day17-Functions/exercise` | Receipt maker with private order number, member discount, VAT, ETB formatting |
| **TeleBirr loyalty points** | `day17-Functions/project` | Points balance via closure; swappable earn rules (standard / holiday double) |

#### Day 16 practice

- Tip + service-fee calculator (ETB / CBE Birr)  
- FizzBuzz "Birr / TeleBirr" variant  

---

### How this program is taught

- Teach in class → deepen with a **reading assignment**  
- Every reading ships with **exercises or a mini-project** (never reading alone)  
- **Homework** every day (heavier early on to level a mixed intake)  
- One **larger project** grows across each module  
- **Git from day one** — daily push to GitHub  

---

### About me

**Meti Guda**  
CodeOps student · IBT College Canada (Ethiopia)

Feedback and collaboration welcome.

---

*Last updated: Day 17 — Functions, Closures & Higher-Order Functions*  
*Curriculum: CodeOps Full Stack Software Development · Version 2.0 · 2026*
