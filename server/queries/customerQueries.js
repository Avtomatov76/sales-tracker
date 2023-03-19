// GET
const getCustomer = (id) => `
SELECT * from customer
WHERE customer_id = ${id}
`;

const getAllCustomers = `
SELECT * FROM customer
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
  postCustomer,
  postCustomers,
  updateCustomer,
  deleteCustomer,
};
