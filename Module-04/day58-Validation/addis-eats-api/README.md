# Addis Eats API

**Track:** Laravel (PHP) — Module 4, Days 55–57

A REST API for dishes, restaurants and orders in Addis Eats — a food delivery capstone for Addis Ababa.

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API will be available at `http://127.0.0.1:8000/api/v1`.

## Endpoints

See [API_DESIGN.md](./API_DESIGN.md) for the full resource table, including non-CRUD actions.

Quick reference:

| Resource | List | Show | Create | Update | Delete |
|---|---|---|---|---|---|
| Dishes | `GET /dishes` | `GET /dishes/{dish}` | `POST /dishes` | `PATCH /dishes/{dish}` | `DELETE /dishes/{dish}` |
| Restaurants | `GET /restaurants` | `GET /restaurants/{slug}` | `POST /restaurants` | `PATCH /restaurants/{slug}` | `DELETE /restaurants/{slug}` |
| Orders | `GET /orders` | `GET /orders/{order}` | `POST /orders` | — | — |
| Menu | `GET /menu` | — | — | — | — |

## Filter Contract

Every list endpoint honours the same query-string convention. Unknown parameters are ignored.

| Parameter | Type | Applies to | Default | Notes |
|---|---|---|---|---|
| `area` | string | dishes, restaurants | — | Must be a configured delivery zone. |
| `max_price` | integer (santim) | dishes | — | Inclusive. |
| `fasting` | boolean | dishes | — | `1`, `true`, `on`, `yes` accepted. |
| `q` | string | dishes, restaurants | — | Matches the name, case-insensitive. |
| `sort` | string | all lists | `price` (dishes), `name` (restaurants) | `name`, `price`, `created_at`. Prefix `-` for descending. |
| `page` | integer | all offset-paginated lists | `1` | Out of range returns empty `data`. |
| `per_page` | integer | all lists | `15` | Capped at `100`. |
| `cursor` | string | orders list | — | Opaque cursor for cursor pagination. |
| `include` | string | restaurants | — | `dishes` loads nested dishes. |

## Money

All amounts are stored and transmitted as **integers in santim** (1 ETB = 100 santim). The field `price_etb` is a formatted string for display only — never parse it.

## Error Envelope

Every error uses the same shape:

```json
{
  "error": {
    "code": "not_found",
    "message": "No dish with id 9999.",
    "meta": { "id": 9999 }
  }
}
```

## REST vs GraphQL vs gRPC

### REST
An architectural style built on HTTP verbs, resources identified by URIs, and stateless requests. Strengths: cacheable, simple, universally understood, tooling everywhere. Weaknesses: over-fetching, multiple round trips for nested data, rigid shape. Best for: public APIs, CRUD-heavy services, teams that want broad compatibility. Addis Eats uses REST because its resources are well-defined, its clients are known, and its data shape is stable.

### GraphQL
A query language where the client specifies exactly what fields it wants in one request. Strengths: no over-fetching, one round trip for nested data, strongly typed schema. Weaknesses: caching is hard, complexity shifts to the server, query cost must be guarded, learning curve. Best for: mobile apps with varied UI needs, deeply nested data, rapidly evolving frontends. Cost for Addis Eats: overkill — the data shape is fixed, and the caching story would fight our existing HTTP cache layer.

### gRPC
A high-performance RPC framework using Protocol Buffers over HTTP/2. Strengths: fast, strongly typed, streaming, efficient binary encoding. Weaknesses: not browser-friendly (needs gRPC-Web), not human-readable, requires code generation. Best for: internal service-to-service communication, streaming workloads, latency-sensitive systems. Cost for Addis Eats: wrong fit — our clients are a browser and a mobile app, not other services, and we need human-readable debugging.