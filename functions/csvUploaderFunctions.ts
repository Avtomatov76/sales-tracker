import moment from "moment";
import { nanoid } from "nanoid";
import {
  getSupplierOpts,
  getTvlTypeOpts,
  getVendorOpts,
} from "../constants/TableRows";

let strNumerals = ["2", "3", "4", "5", "6", "7", "8", "9"];

// Creates Customer, Product, and Transaction objects
export function processParsedData(
  parsedData: any,
  customersInDB: any,
  productHashes: any
) {
  if (!parsedData && !customersInDB) return;
  let customerData = [];
  let uniqueNames = [];
  let dupeCustomers = [];
  let dupeProducts = [];
  let uniqueCustomers = [];

  let productData = [];
  let transactionData = [];

  parsedData.forEach((row: any) => {
    let custName = row.NAME;
    let numCustomers = custName[0];
    let isNumeral = strNumerals.includes(numCustomers);
    let partySize = 0;

    let prodHash =
      row.DATE +
      row.NAME +
      row.PHONE +
      row.DESC +
      row.VENDOR +
      row.PAID +
      row.CODE +
      row.COMM;

    prodHash = prodHash.replace(/\s+/g, "").toLowerCase();

    if (isNumeral && custName.includes(",")) {
      partySize = custName.split(",").length - 1 + parseInt(numCustomers);
    } else if (isNumeral) {
      custName = custName.substring(1);
      partySize = parseInt(numCustomers);
    } else {
      partySize = custName.split(",").length;
    }

    let fullName = "na " + custName;

    let foundCustomer = customersInDB.find(
      (x: any) => x.name === fullName.toLowerCase()
    );

    if (!foundCustomer && !uniqueNames.includes(fullName)) {
      uniqueNames.push(fullName);

      let customerID = nanoid();
      let updatedPhone = row.PHONE.replace(/[- )(]/g, "");

      let customerObj = {
        id: customerID,
        fName: "na",
        lName: custName,
        address: row.ADDRESS ? row.ADDRESS : "",
        city: row.CITY ? row.CITY : "",
        state: row.STATE ? row.STATE : "",
        phone: !updatedPhone ? "na" : updatedPhone,
        email: row.EMAIL ? row.EMAIL : "",
      };

      customerData.push(customerObj);

      let { product, transaction } = createProductEntry(
        row,
        customerID,
        partySize,
        prodHash,
        productHashes
      );

      if (!checkIfObjEmpty(product)) productData.push(product);
      else dupeProducts.push(prodHash);

      if (!checkIfObjEmpty(transaction)) transactionData.push(transaction);
    } else if (!foundCustomer && uniqueNames.includes(fullName)) {
      let customer = customerData.find((x: any) => x.lName === custName);
      let customerID = customer.id;
      let { product, transaction } = createProductEntry(
        row,
        customerID,
        partySize,
        prodHash,
        productHashes
      );

      if (!checkIfObjEmpty(product)) productData.push(product);
      else dupeProducts.push(prodHash);

      if (!checkIfObjEmpty(transaction)) transactionData.push(transaction);
    } else if (foundCustomer) {
      dupeCustomers.push(fullName);
      let { product, transaction } = createProductEntry(
        row,
        foundCustomer.id,
        partySize,
        prodHash,
        productHashes
      );

      if (!checkIfObjEmpty(product)) productData.push(product);
      else dupeProducts.push(prodHash);

      if (!checkIfObjEmpty(transaction)) transactionData.push(transaction);
    }
  });
  uniqueCustomers = uniqueNames.slice();

  return {
    customerData,
    uniqueCustomers,
    dupeCustomers,
    dupeProducts,
    productData,
    transactionData,
  };
}

// Creates a Product entry based on a row of parsed data
function createProductEntry(
  row: any,
  customerID: any,
  partySize: any,
  prodHash: any,
  productHashes: any
) {
  let product = {};
  let transaction = {};

  if (productHashes.includes(prodHash)) {
    return { product, transaction };
  }

  let supplier = findEntryName(row.PROVIDER, "supplier");
  let travelType = findEntryName(row.DESC, "type");
  let vendor = findEntryName(row.VENDOR, "vendor");
  let productID = nanoid();

  let cost = row.PAID.replace(/[$,]/g, "");
  let comm = row.COMM.replace(/[$,]/g, "");

  product = {
    id: productID,
    destinationID: "N/A",
    typeID: travelType,
    vendorID: vendor,
    supplierID: supplier,
    partySize: parseInt(partySize),
    partyInfo: "n/a",
    productCost: parseFloat(cost),
    productComm: parseFloat(comm),
    isCommReceived: row.STATUS == "PAID" ? "Y" : "N",
    tvlStartDate: moment(row.DATE).format("YYYY-MM-DD"),
    tvlEndDate: moment(row.DATE).format("YYYY-MM-DD"),
    hash: prodHash,
  };

  transaction = createTransactionEntry(
    row,
    customerID,
    productID,
    parseFloat(cost)
  );

  return { product, transaction };
}

function createTransactionEntry(
  row: any,
  customerID: any,
  productID: any,
  tripCost: any
) {
  let transaction = {
    customerID: customerID,
    productID: productID,
    transactionType: row.CODE,
    transactionAmount: tripCost,
    transactionDate: moment(row.DATE).format("YYYY-MM-DD"),
  };

  return transaction;
}

// Returns an appropriate abbreviation for a given category
function findEntryName(rawEntry: any, flag: any) {
  let options = {};

  if (flag === "supplier") options = getSupplierOpts();
  if (flag === "type") options = getTvlTypeOpts();
  if (flag === "vendor") options = getVendorOpts();

  let found = Object.keys(options).find((x: any) => rawEntry.includes(x));
  console.log(`FOUND: ${flag}`, found);

  return !found ? "TBD" : options[found];
}

function checkIfObjEmpty(obj: any) {
  if (!obj) return;

  if (Object.keys(obj).length > 0) return false;

  return true;
}

export function getProductsAsStrings(productsArray: any) {
  if (!productsArray) return;

  let productsAsStrings = [];

  productsArray.forEach((entry: any) => {
    let prodStr = entry.hash;
    productsAsStrings.push(prodStr);
  });

  return productsAsStrings;
}
