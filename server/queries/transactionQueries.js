const getAllTransactions = `
SELECT * FROM transaction`;

const getYearToDateSalesQuery = `
SELECT ROUND(SUM(transaction_amount), 2) AS sales FROM transaction WHERE EXTRACT(YEAR FROM transaction_date) = 2021;
`;

const getCurrentMonthSalesQuery = `
SELECT ROUND(SUM(transaction_amount), 2) AS sales FROM transaction WHERE EXTRACT(MONTH FROM transaction_date) = 6;
`;

// POST
const postTravelType = () => `
INSERT INTO travel_type (type_id) 
 VALUES ('cruise')
`;

const updateTransaction = (values) => `
UPDATE transaction SET transaction_type='${values.transactionType}', transaction_amount='${values.transactionAmount}',
transaction_date='${values.transactionDate}'
WHERE transaction_id='${values.id}'
`;

module.exports = {
  getAllTransactions,
  getYearToDateSalesQuery,
  getCurrentMonthSalesQuery,
  updateTransaction,
};
