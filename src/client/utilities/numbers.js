export const formatNumber = (num) =>
  num.toLocaleString('en', {
    minimumFractionDigits: 2,
  });

export const getSubTotalFromCollection = (collection, key) =>
  collection.reduce(
    (previousValue, nextValue) => previousValue + nextValue[key],
    0,
  );

export const getUnpaidBalanceFromCollection = (collection, key) =>
  collection.reduce(
    (previousValue, nextValue) =>
      !nextValue.isPaid ? previousValue + nextValue[key] : previousValue,
    0,
  );

export const getLeftOverBalance = (totalBudget, subtotal) =>
  totalBudget - subtotal;
