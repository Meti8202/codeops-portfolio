# Birr Watch

Live ETB exchange-rate converter built with HTML, CSS (Tailwind) and JavaScript.

Part of **CodeOps Module 2 · Day 22 — JavaScript Project: Data-Driven App**.

## What it does

- Fetches live exchange rates with **ETB** as the base currency
- Converts a user amount from ETB into a chosen currency (USD, EUR, GBP, KES, AED)
- Logs each conversion into a **history list** (e.g. `1000 ETB → 6.20 USD`)
- Skips duplicates with `includes` — the same conversion is not added twice
- Lets you remove history items with event delegation
- Saves history and last currency choice in **localStorage** so they survive a reload
- Shows **loading**, **success**, and **error** messages on the status line

## API

[ExchangeRate-API v6](https://www.exchangerate-api.com/)


Rates are stored in `conversion_rates`. The app checks `result === "error"` and `res.ok` before using the data.

## How to run

1. Open the project folder.
2. Open `index.html` in a browser **or** use Live Server in VS Code.
3. You need an internet connection for live rates.




## How it works

1. **State** holds rates, history, amount, and currency.
2. **`loadRates()`** fetches live data, updates state, and sets status.
3. **Convert** validates the amount, looks up the rate, shows the result, and adds a history entry if it is new.
4. **History** is rendered from state; delete uses one delegated listener on the list.
5. **`save()` / `load()`** persist history and last currency with `JSON.stringify` / `JSON.parse` (rates are refetch again each visit).