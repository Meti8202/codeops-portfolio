export const VAT = 0.15;

export const withVat = (n) => n * (1 + VAT);

export function format(n) {
  return `${n.toFixed(2)} ETB`;
}

export function total({ items }) {
  return items.reduce(
    (sum, { price, quantity }) => sum + price * quantity,
    0
  );
}