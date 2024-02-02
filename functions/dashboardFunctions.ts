export const getSumOfEntries = (entries: any, fieldName: any) => {
  if (!entries || entries.length == 0) return;

  let sum = 0;

  entries.forEach((e: any) => {
    sum += e[fieldName];
  });

  return Math.round(sum);
};

export const getYearToDateSales = (entries: any) => {
  if (!entries || entries.length == 0) return;
  let sum = 0;

  const date = new Date();
  let year = date.getFullYear();

  entries.forEach((e: any) => {
    let eYear = e.transaction_date.substring(0, 4);

    if (eYear == year) sum += e.transaction_amount;
  });

  return Math.round(sum);
};

export const getYearToDateCommissions = (products: any, transactions: any) => {
  if (!products || !transactions) return;
  let sum = 0;
  let transactionsArr = [];

  const date = new Date();
  let year = date.getFullYear();

  transactions.forEach((t: any) => {
    let tYear = t.transaction_date.substring(0, 4);

    if (tYear == year) transactionsArr.push(t.fk_product_id);
  });

  products.forEach((p: any) => {
    if (transactionsArr.includes(p.product_id)) sum += p.product_comm;
  });

  return Math.round(sum);
};
