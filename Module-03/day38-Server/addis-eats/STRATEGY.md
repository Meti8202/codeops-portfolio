# Rendering Strategy

| Route        | Strategy                          | Why                                      |
|--------------|-----------------------------------|------------------------------------------|
| /            | Static                            | Content never changes between builds     |
| /menu        | ISR (revalidate = 3600)           | Dishes change occasionally               |
| /menu/[id]   | Static via generateStaticParams   | All dishes known at build time           |
| /cart        | Static (for now)                  | No personal data yet                     |
| /checkout    | Dynamic (force-dynamic)           | Will read session cookie                 |