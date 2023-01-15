// Customers GET
const getAllCustomers = `
SELECT * FROM customer
`;

const getCustomer = (id) => `
SELECT * from customer
WHERE customer_id = ${id}
`;

// Customers POST
const postCustomer = () => `
INSERT INTO customer (customer_id, first_name, last_name, street_address, city, state, cust_phone, email) 
 VALUES (99, 'Jacky', 'Chan', '123 Jacky Ln', 'Los Angeles', 'CA', '323-255-5885', 'jchan@hotmail.com')
`;

const getCommissions = `
SELECT CONCAT("$", ROUND(SUM(product_comm),2)) as sum FROM product
`;

module.exports = {
  getAllCustomers,
  getCustomer,
  getCommissions,
  postCustomer,
};
