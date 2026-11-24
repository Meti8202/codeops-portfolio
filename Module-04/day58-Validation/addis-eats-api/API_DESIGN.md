# Addis Eats API — Resource Design

This document describes every resource the capstone will expose, including URIs, methods, success and failure codes.

## Conventions
- All amounts are in **santim** (integer). `price_etb` is a formatted string for display only.
- All list endpoints support: `?sort=`, `?per_page=` (default 15, max 100), `?page=` (offset) or `?cursor=` (cursor).
- Unknown query parameters are ignored, not rejected.
- All responses use the envelope: `{"data": ..., "meta": ..., "links": ...}`.
- All errors use the envelope: `{"error": {"code": "...", "message": "...", "meta": {...}}}`.

---

## Resources

### Dishes
| Method | URI | Success | Failure | Notes |
|---|---|---|---|---|
| GET | `/api/v1/dishes` | 200 | — | Public. Filters: `area`, `max_price`, `fasting`, `q`, `sort`, `page`, `per_page`. |
| GET | `/api/v1/dishes/{dish}` | 200 | 404 | Public. |
| POST | `/api/v1/dishes` | 201 + Location | 422 | Manager only. |
| PATCH | `/api/v1/dishes/{dish}` | 200 | 404 · 422 | Manager only. |
| DELETE | `/api/v1/dishes/{dish}` | 204 | 404 | Manager only. |

### Restaurants
| Method | URI | Success | Failure | Notes |
|---|---|---|---|---|
| GET | `/api/v1/restaurants` | 200 | — | Public. Filters: `area`, `sort`, `page`, `per_page`, `include=dishes`. |
| GET | `/api/v1/restaurants/{restaurant}` | 200 | 404 | Bound on `slug`. `?include=dishes`. |
| POST | `/api/v1/1/restaurants` | 201 + Location | 422 · 409 | Manager only. |
| PATCH | `/api/v1/restaurants/{restaurant}` | 200 | 404 · 422 | Manager only. |
| DELETE | `/api/v1/restaurants/{restaurant}` | 204 | 404 | Manager only. |
| GET | `/api/v1/restaurants/{restaurant}/dishes` | 200 | 404 | Public. Nested list. |
| POST | `/api/v1/restaurants/{restaurant}/dishes` | 201 + Location | 404 · 422 | Manager only. |

### Orders
| Method | URI | Success | Failure | Notes |
|---|---|---|---|---|
| GET | `/api/v1/orders` | 200 | — | **Cursor pagination**. Own only (customer), assigned only (driver), all (manager). |
| POST | `/api/v1/orders` | 201 + Location | 422 · 409 | Authenticated. |
| GET | `/api/v1/orders/{order}` | 200 | 404 | Owner or manager only. |

### Menu
| Method | URI | Success | Failure | Notes |
|---|---|---|---|---|
| GET | `/api/v1/menu` | 200 | 422 | Public. Query: `area`, `budget`. |

---

## Non-CRUD Actions

### 1. Cancel an order
```http
POST /api/v1/orders/{order}/cancellation
Body: { "reason": "customer_unreachable" }
Success: 200 + updated order
Failure: 409 if status is not `placed`