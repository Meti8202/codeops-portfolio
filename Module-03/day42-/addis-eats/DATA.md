# Query keys & refresh rules

## 1. Order status poll

| Item            | Value                                      |
|-----------------|--------------------------------------------|
| **Key**         | `/api/orders/${id}`                        |
| **Fetcher**     | shared `fetcher` from `lib/fetcher.js`     |
| **refreshInterval** | `5000` (5 seconds)                     |
| **fallbackData**| server-rendered order from `getOrder(id)`  |
| **Why**         | Status changes after the order is placed. Polling must stay in the browser. Seeding with `fallbackData` removes the first-paint spinner. |

## 2. Menu search

| Item              | Value                                                |
|-------------------|------------------------------------------------------|
| **Key**           | `/api/dishes?q=${query}&page=${page}` (or null when empty if you choose conditional fetching) |
| **keepPreviousData** | `true`                                           |
| **Debounce**      | 300 ms in `SearchBox`                                |
| **Why**           | Search-as-you-type is client-side. Same key = shared cache + deduplication. Null key (or empty term) avoids useless requests. `keepPreviousData` stops the list flashing empty while the next response arrives. |

## 3. Menu paging

| Item     | Value                          |
|----------|--------------------------------|
| **Key**  | includes `page` query param    |
| **Why**  | Page number is part of the identity of the cache entry. Changing page changes the key → SWR fetches the new page. Previous page data is kept visible while loading. |

## Notes

- Two components with the same key share one network request (deduplication).
- Never wrap `useSWR` in an `if`. Pass `null` as the key to skip fetching.
- `staleTime` / `gcTime` are React Query concepts; SWR uses `revalidateOnFocus`, `refreshInterval`, `dedupingInterval`, etc.