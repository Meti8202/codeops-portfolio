
# Addis Eats API

**Track:** Laravel (PHP) — Module 4, Day 55

A REST API for dishes and restaurants in Addis Eats.

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

## API Endpoints

Base URL: `http://127.0.0.1:8000/api/v1`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/dishes` | List dishes |
| POST | `/dishes` | Create a dish |
| GET | `/dishes/{dish}` | Show a dish |
| PUT/PATCH | `/dishes/{dish}` | Update a dish |
| DELETE | `/dishes/{dish}` | Delete a dish |
| GET | `/restaurants` | List restaurants |
| GET | `/restaurants/{restaurant}` | Show a restaurant by slug |

## Dish Filters

The dishes endpoint supports optional `area`, `max_price`, and `fasting` query parameters.

Example:

`GET /api/v1/dishes?area=Bole&max_price=25000&fasting=1`
