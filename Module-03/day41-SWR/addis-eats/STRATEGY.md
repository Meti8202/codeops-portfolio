# Rendering Strategy

| Route        | Strategy              | One-line reasoning                                      |
|--------------|-----------------------|---------------------------------------------------------|
| `/`          | Static (○)            | Landing page; same for every visitor, no request data   |
| `/menu`      | ISR (`revalidate=1500`) | Dishes change a few times a day; shared across users  |
| `/menu/[id]` | Static via params (●) | All dish ids known at build time (`generateStaticParams`) |
| `/cart`      | Client                | Private to the browser tab; cart never leaves the client until checkout |
| `/checkout`  | Dynamic (λ)           | Server action + form; must not be cached                |

API routes:
- `GET /api/dishes` – public feed (may be cached)
- `GET /api/dishes/[id]` – 404 for unknown id
- `POST /api/orders` – never cached (mutation)