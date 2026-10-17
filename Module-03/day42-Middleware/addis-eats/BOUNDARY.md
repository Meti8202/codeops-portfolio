# Server / Client Boundary

| File / Component          | Side   | Why |
|---------------------------|--------|-----|
| `app/layout.js`           | Server | Root shell; passes children |
| `app/page.js`             | Server | Static landing, no interactivity |
| `app/menu/page.js`        | Server | Awaits dishes from data source |
| `app/menu/MenuClient.jsx` | Client | Holds active category state |
| `app/menu/CategorySidebar.jsx` | Client | Selection state (`onSelect`) |
| `app/menu/Dishlist.jsx`   | Server | Markup only; receives dishes as props |
| `app/menu/[id]/page.js`  | Server | Static params + `notFound()` |
| `AddToCartButton`         | Client | `onClick` writes to cart store |
| `app/cart/page.js`        | Client | Reads/writes cart store, running total |
| `app/checkout/page.js`    | Client | `useActionState` + form |
| `app/providers.jsx`       | Client | Cart context needs state |
| `app/actions.js`          | Server | `"use server"` – placeOrder / cancelOrder |
| `app/api/**/route.js`     | Server | Route handlers |

Client components in the whole application: **5**  
(MenuClient, CategorySidebar, AddToCartButton, Cart page, Providers/Checkout form)