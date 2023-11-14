const getAllProducts = `
SELECT * FROM product
`;

const getProductHashes = `
SELECT hash FROM product
`;

const getAllYearsProductSales = `
SELECT EXTRACT(YEAR FROM t.transaction_date) AS name, ROUND(SUM(p.product_cost), 2) AS total FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
GROUP BY EXTRACT(YEAR FROM t.transaction_date)
ORDER BY EXTRACT(YEAR FROM t.transaction_date);
`;

const getAllProductData = `
SELECT p.product_id, t.transaction_id, t.transaction_date AS date, p.travel_start_date AS start, 
p.travel_end_date AS end, ROUND(p.product_cost, 2) AS cost, t.transaction_type,
ROUND(p.product_comm, 2) AS commission, c.first_name, c.last_name, 
c.cust_phone AS phone, c.email, p.size_of_party AS party, p.is_comm_received, 
p.fk_type_id AS travel_type, p.fk_vendor_id AS vendor_id, v.vendor_name AS vendor, 
p.fk_supplier_id AS supplier, s.supplier_name, p.fk_destination_id AS destination, p.party_info AS notes  
FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
JOIN supplier s ON p.fk_supplier_id=s.supplier_id
JOIN customer c ON t.fk_customer_id=c.customer_id
ORDER BY t.transaction_date DESC 
`;

const getProductsByName = (name) => `
SELECT p.product_id, t.transaction_date AS date, ROUND(p.product_cost, 2) AS cost, 
ROUND(p.product_comm, 2) AS commission, c.first_name, c.last_name, 
c.cust_phone AS phone, c.email, p.size_of_party AS party, p.is_comm_received, 
p.fk_type_id AS travel_type, p.fk_vendor_id AS vendor_id, v.vendor_name AS vendor, 
p.fk_supplier_id, s.supplier_name  FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
JOIN supplier s ON p.fk_supplier_id=s.supplier_id
JOIN customer c ON t.fk_customer_id=c.customer_id
WHERE c.last_name='${name}'
ORDER BY t.transaction_date DESC
`;

const getProductsById = (id) => `
SELECT p.product_id, t.transaction_date AS date, ROUND(p.product_cost, 2) AS cost, 
ROUND(p.product_comm, 2) AS commission, c.first_name, c.last_name, 
c.cust_phone AS phone, c.email, size_of_party AS party, is_comm_received, 
fk_type_id AS travel_type, fk_vendor_id AS vendor_id, v.vendor_name AS vendor, 
fk_supplier_id  FROM product p
JOIN transaction t ON p.product_id=t.fk_product_id
JOIN vendor v ON p.fk_vendor_id=v.vendor_id
JOIN customer c ON t.fk_customer_id=c.customer_id
WHERE c.customer_id='${id}'
ORDER BY t.transaction_date DESC
`;

const getProductsRange = (startDate, endDate) => `
SELECT p.product_id, t.transaction_date AS date, ROUND(p.product_cost, 2) AS cost, 
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

const getProductsBySupplier = (param) => `
SELECT p.product_id, product_cost, product_comm, fk_type_id, supplier_name 
FROM product p 
JOIN supplier s 
 ON p.fk_supplier_id=s.supplier_id  
WHERE fk_supplier_id='${param}'
`;

const updateProductField = (field, value, id) => `
UPDATE product SET ${field}='${value}' WHERE product_id='${id}'
`;

const updateProduct = (values) => `
UPDATE product SET fk_destination_id='${values.destinationID}', fk_type_id='${values.typeID}',
fk_vendor_id='${values.vendorID}', fk_supplier_id='${values.supplierID}', size_of_party='${values.partySize}',
party_info='${values.partyInfo}', product_cost='${values.productCost}', product_comm='${values.productComm}',
is_comm_received='${values.isCommReceived}', travel_start_date='${values.tvlStartDate}', travel_end_date='${values.tvlEndDate}' 
WHERE product_id='${values.id}'
`;

module.exports = {
  getAllProducts,
  getProductHashes,
  getAllProductData,
  getAllYearsProductSales,
  getProductsByName,
  getProductsById,
  getProductsBySupplier,
  getProductsRange,
  updateProductField,
  updateProduct,
};
