import menuData from "@/data/menu.json";

const dishes = menuData.data ?? menuData;

export async function getDish(idOrSlug) {
  return dishes.find((d) => d.id === idOrSlug || d.slug === idOrSlug) ?? null;
}

export const db = {
  dish: {
    async findMany() {
      return dishes;
    },
  },
};

const globalForOrders = globalThis;

if (!globalForOrders.__addisOrders) {
  globalForOrders.__addisOrders = new Map();
}

const orders = globalForOrders.__addisOrders;

const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa", "CMC"];

function makeId() {
  return `ord_${Math.floor(Math.random() * 900) + 100}`;
}

function priceForDish(dishId) {
  const dish = dishes.find((d) => d.id === dishId);
  return dish?.priceETB ?? 250;
}


function ensureSeed() {
  if (globalForOrders.__addisOrdersSeeded) return;
  globalForOrders.__addisOrdersSeeded = true;

  const samples = [
    {
      name: "Almaz",
      phone: "0911121314",
      userId: "u1",
      area: "Bole",
      total: 450,
      daysAgo: 0,
    },
    {
      name: "Almaz",
      phone: "0911121314",
      userId: "u1",
      area: "Bole",
      total: 320,
      daysAgo: 1,
    },
    {
      name: "Bereket",
      phone: "0911223344",
      userId: "u2",
      area: "Kazanchis",
      total: 280,
      daysAgo: 1,
    },
    {
      name: "Bereket",
      phone: "0911223344",
      userId: "u2",
      area: "Megenagna",
      total: 510,
      daysAgo: 2,
    },
    {
      name: "Almaz",
      phone: "0911121314",
      userId: "u1",
      area: "Piassa",
      total: 190,
      daysAgo: 2,
    },
    {
      name: "Guest",
      phone: "0911000000",
      userId: "u1",
      area: "CMC",
      total: 600,
      daysAgo: 3,
    },
    {
      name: "Bereket",
      phone: "0911223344",
      userId: "u2",
      area: "Bole",
      total: 350,
      daysAgo: 3,
    },
    {
      name: "Almaz",
      phone: "0911121314",
      userId: "u1",
      area: "Kazanchis",
      total: 420,
      daysAgo: 4,
    },
    {
      name: "Bereket",
      phone: "0911223344",
      userId: "u2",
      area: "Megenagna",
      total: 275,
      daysAgo: 5,
    },
    {
      name: "Almaz",
      phone: "0911121314",
      userId: "u1",
      area: "Bole",
      total: 800,
      daysAgo: 6,
    },
  ];

  for (const s of samples) {
    const id = makeId();
    const created = new Date();
    created.setDate(created.getDate() - s.daysAgo);
    orders.set(id, {
      id,
      name: s.name,
      phone: s.phone,
      dishId: dishes[0]?.id,
      quantity: 1,
      notes: undefined,
      userId: s.userId,
      area: s.area,
      total: s.total,
      status: "pending",
      createdAt: created.toISOString(),
    });
  }
}

export async function createOrder(data) {
  ensureSeed();
  const id = makeId();
  const qty = data.quantity ?? 1;
  const unit = priceForDish(data.dishId);
  const order = {
    id,
    name: data.name,
    phone: data.phone,
    dishId: data.dishId,
    quantity: qty,
    notes: data.notes,
    userId: data.userId ?? null,
    area: data.area ?? AREAS[Math.floor(Math.random() * AREAS.length)],
    total: data.total ?? unit * qty,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  orders.set(id, order);
  return order;
}

export async function getOrder(id) {
  ensureSeed();
  return orders.get(id) ?? null;
}

export async function markCancelled(id) {
  ensureSeed();
  const order = orders.get(id);
  if (!order) return null;
  order.status = "cancelled";
  orders.set(id, order);
  return order;
}

export async function listOrdersFor(userId) {
  ensureSeed();
  return [...orders.values()].filter((o) => o.userId === userId);
}

export async function listAllOrders() {
  ensureSeed();
  return [...orders.values()];
}

export { AREAS };
