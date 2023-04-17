// GET
const getCustomer = (id) => `
SELECT * from customer
WHERE customer_id = ${id}
`;

const getAllCustomers = `
SELECT * FROM customer
`;

// Get total sales, total commissions, num of products per customer
const getCustomerSales = (id) => `
SELECT CAST(SUM(product_cost) AS DECIMAL(10, 2)) AS all_sales, CAST(SUM(product_comm) AS DECIMAL(10, 2)) AS all_commissions, COUNT(product_id) AS num_sales
FROM product p JOIN transaction t 
ON p.product_id = t.fk_product_id 
WHERE t.fk_customer_id = '${id}'
`;

// Get the latest customer sale/product
const getCustomerLatestSale = (id) => `
SELECT p.fk_type_id, p.fk_vendor_id, p.fk_supplier_id, p.size_of_party, p.product_cost, p.product_comm, p.is_comm_received, MAX(p.travel_start_date) as date
FROM product p JOIN transaction t 
ON p.product_id = t.fk_product_id 
WHERE t.fk_customer_id = '${id}'
`;

const getCustomerCommissions = (id) => `
SELECT CAST(SUM(product_comm) AS DECIMAL(6, 2)) AS all_commissions 
FROM product p JOIN transaction t 
ON p.product_id = t.fk_product_id 
WHERE t.fk_customer_id = '${id}';
`;

const getCustomerProductcs = (id) => `
// SELECT * from customer
// WHERE customer_id = ${id}
`;

const getCustomerRecentSales = (id) => `
// SELECT * from customer
// WHERE customer_id = ${id}
`;

// DELETE
const deleteCustomer = (id) => `
DELETE FROM customer 
WHERE customer_id = '${id}'
`;

// POST
const postCustomer = () => `
INSERT INTO customer (customer_id, first_name, last_name, street_address, city, state, cust_phone, email) 
 VALUES (99, 'Jacky', 'Chan', '123 Jacky Ln', 'Los Angeles', 'CA', '323-255-5885', 'jchan@hotmail.com')
`;

const updateCustomer = (customer) =>
  `UPDATE customer SET first_name = '${customer.firstName}', last_name = '${customer.lastName}', street_address = '${customer.address}', city = '${customer.city}', state = '${customer.state}', cust_phone = '${customer.phone}', email = '${customer.email}' WHERE customer_id = '${customer.id}'`;

const postCustomers = (customers) => {
  if (!customers) return;

  let valuesStr = "";

  customers.forEach((c, index) => {
    if (index === customers.length - 1) {
      valuesStr += `('${c.id}', '${c.fName}', '${c.lName}', '${
        c.address ? c.address : "na"
      }', '${c.city ? c.city : "na"}', '${c.state ? c.state : "na"}', '${
        c.phone
      }', '${c.email ? c.email : "na"}')`;
    } else {
      valuesStr += `('${c.id}', '${c.fName}', '${c.lName}', '${
        c.address ? c.address : "na"
      }', '${c.city ? c.city : "na"}', '${c.state ? c.state : "na"}', '${
        c.phone
      }', '${c.email ? c.email : "na"}'),`;
    }
  });

  return valuesStr;
};

module.exports = {
  getAllCustomers,
  getCustomer,
  getCustomerSales,
  getCustomerLatestSale,
  getCustomerCommissions,
  postCustomer,
  postCustomers,
  updateCustomer,
  deleteCustomer,
};
