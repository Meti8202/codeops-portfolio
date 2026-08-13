import { format, total, withVat } from "./pricing.js";

const orders = [
  {
    id: 1,
    customer: "Abebe",
    items: [
      { name: "Tibs", price: 320, quantity: 1 },
      { name: "Shiro", price: 200, quantity: 1 },
    ],
  },
  {
    id: 2,
    customer: "Chala",
    items: [
      { name: "Tea", price: 50, quantity: 1 },
      { name: "Shiro", price: 200, quantity: 1 },
    ],
  },
  {
    id: 3,
    customer: "Almaz",
    items: [
      { name: "Doro Wot", price: 520, quantity: 1 },
      { name: "Coca", price: 80, quantity: 1 },
    ],
  },
];

const withTotals = orders.map((order) => ({
  ...order,
  total: withVat(total(order)),
}));

const bigOrders = withTotals.filter((o) => o.total > 500);

const summary = bigOrders.map(
  (o) => `#${o.id} ${o.customer}: ${format(o.total)}`,
);

const subtotal = bigOrders.reduce((sum, o) => sum + o.total, 0);

summary.forEach((line) => console.log(line));
console.log("Subtotal:", format(subtotal));
