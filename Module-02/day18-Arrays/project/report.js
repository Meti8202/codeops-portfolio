export const totalByType = (txns, type) =>
  txns
    .filter((t) => t.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);

export const receipts = (txns) =>
  txns.map(
    ({ customer, amount, type }) =>
      `${customer}: ${amount} ETB (${type})`
  );

export const updateAmount = (txn, newAmount) => ({
  ...txn,
  amount: newAmount,
});