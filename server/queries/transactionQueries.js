// GET
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

module.exports = {
  getAllTransactions,
  getYearToDateSalesQuery,
  getCurrentMonthSalesQuery,
};
