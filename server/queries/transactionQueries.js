// REPLACE ALL HARD-CODED VALUES LIKE YEAR AND MONTH TO DYNAMICALLY EXTRACTED VALS!!!!!!!!!!
const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

// GET
const getYearToDateSalesQuery = `
SELECT ROUND(SUM(transaction_amount), 2) AS sales FROM transaction WHERE EXTRACT(YEAR FROM transaction_date) = 2021;
`;

const getCurrentMonthSalesQuery = `
SELECT ROUND(SUM(transaction_amount), 2) AS sales FROM transaction WHERE EXTRACT(MONTH FROM transaction_date) = 6;
`;

const getYearToDateCommissions = `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE EXTRACT(YEAR FROM t.transaction_date) = 2021;
`;

const getCurrentMonthCommissions = `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE EXTRACT(MONTH FROM t.transaction_date) = 6;
`;

// POST
const postTravelType = () => `
INSERT INTO travel_type (type_id) 
 VALUES ('cruise')
`;

module.exports = {
  getYearToDateSalesQuery,
  getCurrentMonthSalesQuery,
  getYearToDateCommissions,
  getCurrentMonthCommissions,
  currentMonth, // take off after testing
  currentYear, // take off after testing
};
