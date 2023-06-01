const moment = require("moment");

const currYear = 2022; //new Date().getFullYear();
const currMonthStart = "2022-01-18"; //moment().startOf("month").format("YYYY-MM-DD");
const currMonthEnd = "2022-01-24"; //moment().endOf("month").format("YYYY-MM-DD");

// GET all commissions
const getAllCommissions = `
SELECT CONCAT("$", ROUND(SUM(product_comm),2)) as sum FROM product
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

// GET all commissions per vendor
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
};
