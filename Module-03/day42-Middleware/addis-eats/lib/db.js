import menuData from "@/data/menu.json";

// dishes 
const dishes = menuData.data ?? menuData;

export async function getDish(idOrSlug) {
  return (
    dishes.find((d) => d.id === idOrSlug || d.slug === idOrSlug) ?? null
  );
}

export const db = {
  dish: {
    async findMany() {
      return dishes;
    },
  },
};

//  orders (globalThis so HMR / route handlers share one Map)
const globalForOrders = globalThis;

if (!globalForOrders.__addisOrders) {
  globalForOrders.__addisOrders = new Map();
}

const orders = globalForOrders.__addisOrders;

function makeId() {
  return `ord_${Math.floor(Math.random() * 900) + 100}`;
}

export async function createOrder(data) {
  const id = makeId();
  const order = {
    id,
    name: data.name,
    phone: data.phone,
    dishId: data.dishId,
    quantity: data.quantity ?? 1,
    notes: data.notes,
    userId: data.userId ?? null,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.set(id, order);
  return order;
}

export async function getOrder(id) {
  return orders.get(id) ?? null;
}

export async function markCancelled(id) {
  const order = orders.get(id);
  if (!order) return null;
  order.status = "cancelled";
  orders.set(id, order);
  return order;
}

export async function listOrdersFor(userId) {
  return [...orders.values()].filter((o) => o.userId === userId);
}

export async function listAllOrders() {
  return [...orders.values()];
}