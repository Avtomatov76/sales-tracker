const getAllProducts = `
SELECT * FROM product
`;

const getProductHashes = `
SELECT hash FROM product
`;

// GET all product data
const getAllProductData = `
SELECT t.transaction_date AS date, ROUND(p.product_cost, 2) AS cost, 
ROUND(p.product_comm, 2) AS commission, c.first_name, c.last_name, 
c.cust_phone AS phone, c.email, size_of_party AS party, is_comm_received, 
fk_type_id AS travel_type, fk_vendor_id AS vendor_id, v.vendor_name AS vendor, 
fk_supplier_id  FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
JOIN customer c ON t.fk_customer_id=c.customer_id
ORDER BY t.transaction_date DESC 
`;

// GET products for a specified range
const getProductsRange = (startDate, endDate) => `
SELECT t.transaction_date AS date, ROUND(p.product_cost, 2) AS cost, 
ROUND(p.product_comm, 2) AS commission, c.first_name, c.last_name, 
c.cust_phone AS phone, c.email, size_of_party AS party, is_comm_received, 
fk_type_id AS travel_type, fk_vendor_id AS vendor_id, v.vendor_name AS vendor, 
fk_supplier_id FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
JOIN customer c ON t.fk_customer_id=c.customer_id
WHERE t.transaction_date BETWEEN '${startDate}' AND '${endDate}'
ORDER BY t.transaction_date DESC
`;

function getProductsBySupplier(param) {
  return `SELECT product_cost, product_comm, fk_type_id, supplier_name 
            FROM product p 
            JOIN supplier s 
            ON p.fk_supplier_id = s.supplier_id  
            WHERE fk_supplier_id = '${param}'`;
}

module.exports = {
  getAllProducts,
  getProductHashes,
  getAllProductData,
  getProductsBySupplier,
  getProductsRange,
};
