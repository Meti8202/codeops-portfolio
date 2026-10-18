import { cookies } from "next/headers";

const COOKIE_NAME = "session";

const USERS = [
  { id: "u1", name: "Almaz", phone: "0911121314", role: "customer" },
  { id: "u2", name: "Bereket", phone: "0911223344", role: "customer" },
  { id: "staff1", name: "Kitchen", phone: "0900000000", role: "staff" },
];

export async function getSession() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    const user = USERS.find((u) => u.id === parsed.id);
    return user ?? null;
  } catch {
    return null;
  }
}

export async function createSession(phone) {
  const user = USERS.find((u) => u.phone === phone);
  if (!user) return null;

  const store = await cookies();
  store.set(COOKIE_NAME, JSON.stringify({ id: user.id }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return user;
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export { USERS };
