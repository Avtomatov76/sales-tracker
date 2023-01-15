const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const db = require("./db");
const {
  getAllCustomers,
  getCustomer,
  getCommissions,
  postCustomer,
} = require("./queries/customerQueries");
const {
  getYearToDateSalesQuery,
  getCurrentMonthSalesQuery,
  getYearToDateCommissions,
  getCurrentMonthCommissions,
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

app.get("/api/customers", async (req, res) => {
  //console.log("Inside customers API!!");
  try {
    const result = await db.pool.query(getAllCustomers);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// POST Customer
app.post("/api/customers", async (req, res) => {
  let sql = `INSERT INTO customer (first_name, last_name, street_address, city, state, cust_phone, email) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const customer = req.body;

  console.log(customer);

  await db.pool.query(sql, customer, function (err, data) {
    if (err) throw err;
    console.log("User data is inserted successfully");
  });

  res.send({ result: "ok" });
});

// UPDATE Customer
app.put("/api/customers", async (req, res) => {
  const customer = req.body;
  console.log(customer);
  let sql = `UPDATE customer SET first_name = '${customer.firstName}', last_name = '${customer.lastName}', street_address = '${customer.address}', city = '${customer.city}', state = '${customer.state}', cust_phone = '${customer.phone}', email = '${customer.email}' WHERE customer_id = ${customer.customer_id}`;

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

app.get("/api/commissions-year", async (req, res) => {
  try {
    const result = await db.pool.query(getYearToDateCommissions);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/api/commissions-month", async (req, res) => {
  try {
    const result = await db.pool.query(getCurrentMonthCommissions);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

app.get("/api/commissions", async (req, res) => {
  try {
    const result = await db.pool.query(getCommissions);
    res.send(result);
  } catch (err) {
    throw err;
  }
});

// GET Product
app.get("/api/products", async (req, res) => {
  try {
    const result = await db.pool.query(getAllProducts);
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
