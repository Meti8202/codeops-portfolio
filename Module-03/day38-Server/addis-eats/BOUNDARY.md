# Component Boundary

| Component                | Runs on | Why                                      |
|--------------------------|---------|------------------------------------------|
| app/layout.js            | Server  | Passes children into Providers           |
| app/providers.jsx        | Client  | Will hold cart context                   |
| app/menu/page.js         | Server  | Fetches dishes, no interactivity         |
| app/menu/MenuClient.jsx  | Client  | Holds selected category state            |
| app/menu/CategorySidebar.jsx | Client | onClick handlers + active state      |
| app/menu/Dishlist.jsx    | Server* | Pure markup (becomes client only because imported by MenuClient) |
| app/menu/[id]/page.js   | Server  | Fetches one dish                         |
| app/menu/error.js        | Client  | Error boundary needs handlers            |
| app/cart/page.js         | Server  | Placeholder                              |
| app/checkout/page.js     | Server  | Placeholder                              |