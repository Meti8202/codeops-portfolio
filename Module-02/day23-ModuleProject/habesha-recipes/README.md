# Habesha Recipes

Browse Ethiopian (Habesha) recipes, search and filter them and save  favorites with a live prep-time total.

**CodeOps Module 2 · Day 23 — Module Project (frontend capstone)**

## What it does

- Loads recipes from a local JSON file
- Renders a responsive card grid from a single state object
- Live search by recipe name
- Filter by category (Main, Vegetarian, Breakfast, Bread)
- Save / remove  favorites
- Summary: number of  favorites + total prep minutes (`reduce`)
-  favorites survive a page reload (`localStorage`)
- Loading, empty and error status messages

## Data source

Local file: `data/recipes.json`

Each recipe includes:

| Field         | Example        |
|---------------|----------------|
| `id`          | `1`            |
| `name`        | `"Doro Wat"`   |
| `category`    | `"Main"`       |
| `prepMinutes` | `90`           |
| `spicy`       | `true`         |
| `vegetarian`  | `false`        |
| `description` | short text     |
| `image`       | path under `images/` |

## How to run

1. Open the project folder in VS Code.
2. Start **Live Server** on `index.html`  
   (or any local static server — `fetch` needs `http://`, not `file://`).
3. Browse, search, filter and save  favorites.


## Files

| File              | Role                                      |
|-------------------|-------------------------------------------|
| `index.html`      | Semantic layout: header, grid,  favorites |
| `js/app.js`       | State, fetch, render, filter, storage     |
| `data/recipes.json` | Recipe data                             |
| `images/`         | Recipe photos                             |

## How it works
load  favorites from localStorage → fetch recipes.json into state → render() draws grid +  favorites panel → search / category update state → re-render → save / remove favourite → update state → save → re-render

State is the single source of truth. The DOM is only output.

## Day 23 checklist

- [x] Semantic, responsive layout (mobile + desktop)
- [x] Data fetched into state with loading / error handling
- [x] `render()` driven by state
- [x] Live search + category filter (empty state included)
- [x]  favorites add / remove
- [x] Total prep minutes with `reduce`
- [x] `localStorage` persistence