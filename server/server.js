const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const db = require("./db");
var JSONbig = require("json-bigint");
const { getProductsBySupplier } = require("./queries/productQueries");
const {
  getAllCustomers,
  getCustomer,
  getCustomerSales,
  getCustomerCommissions,
  updateCustomer,
  postCustomer,
  postCustomers,
  deleteCustomer,
  getCustomerLatestSale,
} = require("./queries/customerQueries");
const {
  getAllCommissions,
  getCommissionsForDateRange,
  getCommissionsYearToDate,
  getCommissionsCurrMonth,
  getAllCommTopSuppliers,
  getYearToDateCommTopSuppliers,
} = require("./queries/commissionQueries");
const {
  getYearToDateSalesQuery,
  getCurrentMonthSalesQuery,
  postTravelType,
} = require("./queries/transactionQueries");
const { getAllVendors } = require("./queries/vendorQueries");

const app = express();
const port = process.env.PORT || 8080; //19006; //...http://192.168.0.223:19006 const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// POST Travel Type
app.post("/api/travel/types", async (req, res) => {
  let sql = `INSERT INTO travel_type (type_id)
  VALUES (?)`;

  const travelType = req.body;

  console.log(travelType);

  await db.pool.query(sql, travelType, function (err, data) {
    if (err) throw err;
    console.log("User data is inserted successfully");
  });

  res.redirect("/");
});

// GET Customer
app.get("/api/customers/:id", async (req, res) => {
  try {
    const result = await db.pool.query(getCustomer(req.params["id"]));
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// Get num sales, commissions, total sales for customer
app.get("/api/customers/sales/:id", async (req, res) => {
  try {
    const result = await db.pool.query(getCustomerSales(req.params["id"]));

    var moddedResult = {
      all_sales: result[0].all_sales,
      all_commissions: result[0].all_commissions,
      num_sales: JSONbig.parse(result[0].num_sales),
    };

    res.send(moddedResult);
  } catch (err) {
    throw err;
  }
});

// Get the latest cusstomer sale info
app.get("/api/customers/sale/:id", async (req, res) => {
  try {
    const result = await db.pool.query(getCustomerLatestSale(req.params["id"]));
    //console.log("All latest sale info: ", result);

    // var moddedResult = {
    //   all_sales: result[0].all_sales,
    //   all_commissions: result[0].all_commissions,
    //   num_sales: JSONbig.parse(result[0].num_sales),
    // };

    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/api/customers/commissions/:id", async (req, res) => {
  try {
    const result = await db.pool.query(
      getCustomerCommissions(req.params["id"])
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/api/customers", async (req, res) => {
  try {
    const result = await db.pool.query(getAllCustomers);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// POST Customer
app.post("/api/customers", async (req, res) => {
  let sql = `INSERT INTO customer (customer_id, first_name, last_name, street_address, city, state, cust_phone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const customer = req.body;
  console.log(customer);

  await db.pool.query(sql, customer, function (err, data) {
    if (err) throw err;
    console.log("User data is inserted successfully");
  });

  res.send({ result: "ok" });
});

// DELETE Customer
app.post("/api/customers/:id", async (req, res) => {
  try {
    await db.pool.query(deleteCustomer(req.params["id"]));
    res.send({ result: "ok" });
  } catch (err) {
    throw err;
  }
});

// UPDATE Customer
app.put("/api/customers", async (req, res) => {
  const customer = req.body;
  console.log(customer);
  let sql = updateCustomer(customer);

  await db.pool.query(sql, function (err, data) {
    if (err) throw err;
    console.log("User data is updated successfully");
  });

  res.redirect("/customers");
});

// DELETE Customer
app.get("/api/customers/delete/:id", async (req, res) => {
  let id = req.params["id"];

  try {
    await db.pool.query("DELETE FROM customer WHERE customer_id = ?", [id]);
    res.redirect("/customers");
  } catch (err) {
    throw err;
  }
});

// POST Multiple customers
app.post("/api/customers/many", async (req, res) => {
  const customers = req.body;

  let values = postCustomers(customers);
  let sql = `INSERT INTO customer (customer_id, first_name, last_name, street_address, city, state, cust_phone, email) VALUES ${values}`;

  try {
    await db.pool.query(sql, customers, function (err, data) {
      if (err) throw err;
      console.log("User data was inserted successfully");
    });
    res.send({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.send({ result: "Insert Failed!" });
  }
});

// GET Vendor
app.get("/api/vendors", async (req, res) => {
  try {
    const result = await db.pool.query(getAllVendors);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET Transaction
app.get("/api/sales-year", async (req, res) => {
  try {
    const result = await db.pool.query(getYearToDateSalesQuery);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/api/sales-month", async (req, res) => {
  try {
    const result = await db.pool.query(getCurrentMonthSalesQuery);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET all Commissions
app.get("/api/commissions", async (req, res) => {
  //console.log("QUERY: ", res);
  try {
    const result = await db.pool.query(getAllCommissions);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/api/commissions-range", async (req, res) => {
  try {
    const result = await db.pool.query(
      getCommissionsForDateRange(req.query.start, req.query.end)
    );
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET year-to-date commissions
app.get("/api/commissions-year", async (req, res) => {
  try {
    const result = await db.pool.query(getCommissionsYearToDate);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET current month commissions
app.get("/api/commissions-month", async (req, res) => {
  try {
    const result = await db.pool.query(getCommissionsCurrMonth);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET all commissions for top suppliers
app.get("/api/commissions-suppliers-total", async (req, res) => {
  try {
    const result = await db.pool.query(getAllCommTopSuppliers);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET year-to-date commissions for top suppliers
app.get("/api/commissions-suppliers-year", async (req, res) => {
  try {
    const result = await db.pool.query(getYearToDateCommTopSuppliers);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET commissions for vendors
app.get("/api/commissions-vendors", async (req, res) => {
  // try {
  //   const result = await db.pool.query(getCommissionsCurrMonth);
  //   res.send(result);
  // } catch (err) {
  //   throw err;
  // }
});

// GET Products
app.get("/api/products", async (req, res) => {
  try {
    const result = await db.pool.query(getAllProducts);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/api/products/details", async (req, res) => {
  // get params off body
  // customize calls to DB based on params
  // handle results
  // try {
  //   const result = await db.pool.query(getAllProducts);
  //   res.send(result);
  // } catch (err) {
  //   throw err;
  // }
});

// POST Multiple products
app.post("/api/products/many", async (req, res) => {
  const products = req.body;
  //console.log("PRODUCTS: ", products);

  function insertValues(products) {
    let valuesStr = "";

    products.forEach((p, index) => {
      if (index === products.length - 1) {
        valuesStr += `('${p.id}', '${p.destinationID}', '${p.typeID}', '${p.vendorID}', '${p.supplierID}', '${p.partySize}', '${p.partyInfo}', '${p.productCost}', '${p.productComm}', '${p.isCommReceived}', '${p.tvlStartDate}', '${p.tvlEndDate}')`;
      } else {
        valuesStr += `('${p.id}', '${p.destinationID}', '${p.typeID}', '${p.vendorID}', '${p.supplierID}', '${p.partySize}', '${p.partyInfo}', '${p.productCost}', '${p.productComm}', '${p.isCommReceived}', '${p.tvlStartDate}', '${p.tvlEndDate}'),`;
      }
    });

    return valuesStr;
  }

  let values = insertValues(products);

  let sql = `INSERT INTO product (product_id, fk_destination_id, fk_type_id, fk_vendor_id, fk_supplier_id, size_of_party, party_info, product_cost, product_comm, is_comm_received, travel_start_date, travel_end_date) VALUES ${values}`;

  console.log(sql);

  try {
    await db.pool.query(sql, products, function (err, data) {
      if (err) throw err;
      console.log("Product data was inserted successfully");
    });
    res.send({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.send({ result: "Insert Failed!" });
  }
});

// POST Multiple transactions
app.post("/api/transactions/many", async (req, res) => {
  const transactions = req.body;
  //console.log("TRANSACTIONS: ", transactions);

  function insertValues(transactions) {
    let valuesStr = "";

    transactions.forEach((t, index) => {
      if (index === transactions.length - 1) {
        valuesStr += `('${t.customerID}', '${t.productID}', '${t.transactionType}', '${t.transactionAmount}', '${t.transactionDate}')`;
      } else {
        valuesStr += `('${t.customerID}', '${t.productID}', '${t.transactionType}', '${t.transactionAmount}', '${t.transactionDate}'),`;
      }
    });

    return valuesStr;
  }

  let values = insertValues(transactions);

  let sql = `INSERT INTO transaction (fk_customer_id, fk_product_id, transaction_type, transaction_amount, transaction_date) VALUES ${values}`;

  console.log(sql);

  try {
    await db.pool.query(sql, transactions, function (err, data) {
      if (err) throw err;
      console.log("Transactions data was inserted successfully");
    });
    res.send({ result: "ok" });
  } catch (err) {
    console.error(err);
    res.send({ result: "Insert Failed!" });
  }
});

// TEST queries
app.get("/api/test", async (req, res) => {
  try {
    const result = await db.pool.query(getProductsBySupplier("TPI"));
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// Server test route
app.get("/test", async (req, res) => {
  console.log("TESTING server!!!");
  res.send("TESTING server!!!");
});

// Setting up proxy
app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000",
    //target: "http://127.0.0.1:3000",
    changeOrigin: true,
    //secure: false,
  })
);
