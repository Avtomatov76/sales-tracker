const moment = require("moment");

const prevYear = new Date().getFullYear() - 1;
const prevYearStart = `${prevYear}-01-01`;

const currMonthStartPrevYear = moment()
  .add(-1, "year")
  .startOf("month")
  .format("YYYY-MM-DD");
const currMonthEndPrevYear = moment()
  .add(-1, "year")
  .endOf("month")
  .format("YYYY-MM-DD");

const currYear = new Date().getFullYear();
const currMonthStart = moment().startOf("month").format("YYYY-MM-DD");
const currMonthEnd = moment().endOf("month").format("YYYY-MM-DD");

// GET commissions for all years
const getCommissionsAllYears = `
SELECT EXTRACT(YEAR FROM t.transaction_date) AS year, ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
GROUP BY EXTRACT(YEAR FROM t.transaction_date)
ORDER BY EXTRACT(YEAR FROM t.transaction_date)
`;

// GET last year's commissions
const getCommissionsLastYear = `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE EXTRACT(YEAR FROM t.transaction_date) = ${prevYear};
`;

// GET last year-to-date commissions
const getCommissionsLastYearToDate = `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE t.transaction_date BETWEEN '${prevYearStart}' AND '${currMonthEndPrevYear}';
`;

// GET commissions for the last year's current month
const getCommissionsLastYearCurrMonth = `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE t.transaction_date BETWEEN '${currMonthStartPrevYear}' AND '${currMonthEndPrevYear}';
`;

// GET year-to-date commissions for each month (previous year)
const getMonthlyCommissionsYTDPrevious = `
SELECT ROUND(SUM(p.product_comm), 0) AS commissions
FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE YEAR(t.transaction_date) = '${prevYear}' 
GROUP BY MONTH(t.transaction_date);
`;

// GET year-to-date commissions for each month (current year)
const getMonthlyCommissionsYTDCurrent = `
SELECT ROUND(SUM(p.product_comm), 0) AS commissions
FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE YEAR(t.transaction_date) = '${currYear}' 
GROUP BY MONTH(t.transaction_date);
`;

// GET all commissions
const getAllCommissions = `
SELECT CONCAT("$", ROUND(SUM(product_comm),2)) as commissions FROM product
`;

// GET commissions for a specified range
const getCommissionsForDateRange = (startDate, endDate) => `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE t.transaction_date BETWEEN '${startDate}' AND '${endDate}';
`;

// GET year-to-date commissions
const getCommissionsYearToDate = `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE EXTRACT(YEAR FROM t.transaction_date) = ${currYear};
`;

// GET all commissions per top suppliers
const getAllCommTopSuppliers = `
SELECT s.supplier_name AS name, ROUND(SUM(p.product_comm), 2) AS total FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN supplier s ON p.fk_supplier_id=s.supplier_id
WHERE s.supplier_id IN ('EXP', 'PIC', 'TPI')
GROUP BY s.supplier_name
ORDER BY s.supplier_name;
`;

// GET commissions for the current month
const getCommissionsCurrMonth = `
SELECT ROUND(SUM(p.product_comm), 2) AS commissions FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
WHERE t.transaction_date BETWEEN '${currMonthStart}' AND '${currMonthEnd}';
`;

// GET year-to-date commissions for top suppliers
const getYearToDateCommTopSuppliers = `
SELECT s.supplier_name AS name, ROUND(SUM(p.product_comm), 2) AS total FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN supplier s ON p.fk_supplier_id=s.supplier_id
WHERE s.supplier_id IN ('EXP', 'PIC', 'TPI') AND EXTRACT(YEAR FROM transaction_date) = '${currYear}'
GROUP BY s.supplier_name
ORDER BY s.supplier_name;
`;

// GET all commissions per vendor (historic)
const getAllCommVendors = `
SELECT v.vendor_name AS name, ROUND(SUM(p.product_comm), 2) AS total FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
GROUP BY v.vendor_name
ORDER BY v.vendor_name;
`;

// GET current month commissions per vendor
const getCurrMonthCommVendors = `
SELECT v.vendor_name AS name, ROUND(SUM(p.product_comm), 2) AS total FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
WHERE t.transaction_date BETWEEN '${currMonthStart}' AND '${currMonthEnd}'
GROUP BY v.vendor_name
ORDER BY v.vendor_name;
`;

// GET year-to-date commissions per vendor
const getYearToDateCommVendors = `
SELECT v.vendor_name AS name, ROUND(SUM(p.product_comm), 2) AS total FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
WHERE EXTRACT(YEAR FROM transaction_date) = ${currYear}
GROUP BY v.vendor_name
ORDER BY v.vendor_name;
`;

// GET unpaid commissions
const getUnpaidCommissions = `
SELECT CONCAT("$", ROUND(SUM(product_comm),2)) as commissions FROM product
WHERE is_comm_received = 'N';
`;

// GET all individual commission amounts
const getEveryCommissionEntry = `
SELECT DATE_FORMAT(t.transaction_date, '%Y-%m-%d') AS date, t.transaction_amount AS amount, p.product_comm AS commission FROM transaction t
JOIN product p ON t.fk_product_id=p.product_id;
`;

// GET all monthly commissions for all years
const getMonthlyCommAllYears = `
SELECT YEAR(t.transaction_date) AS year,
       MONTH(t.transaction_date) AS month,
       SUM(p.product_comm) AS monthly_sum
FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
GROUP BY YEAR(t.transaction_date), MONTH(t.transaction_date)
ORDER BY YEAR(t.transaction_date), MONTH(t.transaction_date);
`;

module.exports = {
  getAllCommissions,
  getCommissionsForDateRange,
  getCommissionsYearToDate,
  getCommissionsCurrMonth,
  getAllCommTopSuppliers,
  getYearToDateCommTopSuppliers,
  getAllCommVendors,
  getCurrMonthCommVendors,
  getYearToDateCommVendors,
  getCommissionsLastYear,
  getCommissionsLastYearToDate,
  getCommissionsLastYearCurrMonth,
  getUnpaidCommissions,
  getMonthlyCommissionsYTDPrevious,
  getMonthlyCommissionsYTDCurrent,
  getCommissionsAllYears,
  getEveryCommissionEntry,
  getMonthlyCommAllYears,
};
