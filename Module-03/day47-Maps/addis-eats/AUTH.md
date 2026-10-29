# Authentication layers

## Protected routes

| Route / action | Layer(s) | What it proves |
|----------------|----------|----------------|
| `/checkout` | Middleware | Cookie exists; redirect to sign-in if missing |
| `/orders/[id]` | Middleware + page + ownership | Cookie exists; only own order (or staff) |
| `placeOrder` | Action (session check) | Write only for a signed-in user |
| `cancelOrder` | Action (session + ownership) | Only the owner can cancel — real security |
| `/kitchen` | Page (session + role) | Signed in and `role === "staff"` |
| `/menu`, `/` | None | Public |

## Cookie

- Name: `session`
- Flags: `httpOnly`, `secure` (production), `sameSite: "lax"`
- Holds only a user id; server looks up the user on each `getSession()`

## Open redirect

After sign-in, `next` is accepted only if it starts with `/` and not `//`.
Test: `/signin?next=https://evil.example` → lands on `/`.

## Demo accounts

| Phone | Role |
|-------|------|
| 0911121314 | customer |
| 0911223344 | customer |
| 0900000000 | staff |

## Attack checks

1. Call `cancelOrder` while signed out → error.
2. Call `cancelOrder` as another user → "Not yours".
3. Craft `/signin?next=https://evil.com` → rejected, redirect to `/`.

## Three attacks (verified)

| # | Attack | Result | Stopped by |
|---|--------|--------|------------|
| 1 | Signed out → `/checkout` or `/orders/...` | Redirect to `/signin?next=...` | Middleware + page `getSession` |
| 2 | `/signin?next=https://evil.com` then sign in | Stayed on site home `/`, not external URL | `signIn` only allows `next` starting with `/` and not `//` |
| 3 | Bereket opens Almaz’s `/orders/<id>` | 404 Not Found | Page ownership (`order.userId !== user.id`) |

**Notes**
- Order create + status poll verified with local `npm run start` (shared in-memory Map).
- On Vercel, in-memory orders may 404 across serverless instances; auth layers still hold on the deploy.
- Production URL: https://codeops-portfolio-eight.vercel.app