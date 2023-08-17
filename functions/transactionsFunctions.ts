import moment from "moment";
import { nanoid } from "nanoid";

// Sort array alphabetically (asc)
export function sortArray(array: any, field: any) {
  if (array.length == 0) return;

  let sortedArray = [];

  sortedArray = array.sort((a: any, b: any) =>
    a[field].localeCompare(b[field])
  );

  return sortedArray;
}

// This needs to be re-written for products/transactions!!
// Validate a new sale before writing to the DB
export const validateTransaction = (formValues: any, products: any) => {
  if (!formValues || !products) return;

  if (
    !formValues.total ||
    !formValues.commission ||
    !formValues.start ||
    !formValues.status ||
    !formValues.partySize ||
    !formValues.payment ||
    !formValues.destination ||
    !formValues.travelType ||
    !formValues.vendor ||
    !formValues.supplier
  ) {
    return { validTransaction: false, transError: true };
  }

  let isDupe = false;

  if (isDupe) {
    alert(
      `${formValues.firstName} ${formValues.lastName} - is already in the database.  Please update the customer instead of adding a duplicate record!`
    );
    return { validTransaction: false, transError: false };
  }

  return { validTransaction: true, transError: false };
};

export function createProductEntry(formData: any) {
  if (!formData) {
    console.log("No form data!!!");
    return;
  }

  let product = {};
  let transaction = {};
  let productID = nanoid();

  let prodHash =
    formData.start +
    formData.lastName +
    formData.firstName +
    formData.phone +
    formData.vendor +
    formData.total +
    formData.travelType +
    formData.commission;

  prodHash = prodHash.replace(/\s+/g, "").toLowerCase();

  product = {
    id: productID,
    destinationID: formData.destination.toUpperCase(),
    typeID: formData.travelType,
    vendorID: formData.vendor,
    supplierID: formData.supplier,
    partySize: parseInt(formData.partySize),
    partyInfo: formData.notes ? formData.notes.trim() : "n/a",
    productCost: parseFloat(formData.total),
    productComm: parseFloat(formData.commission),
    isCommReceived: formData.status,
    tvlStartDate: formData.start,
    tvlEndDate: !formData.end ? null : formData.end,
    hash: prodHash,
  };

  transaction = createTransactionEntry(formData, productID);

  return { product, transaction };
}

function createTransactionEntry(formData: any, productID: any) {
  let transaction = {
    customerID: formData.id,
    productID: productID,
    transactionType: formData.payment,
    transactionAmount: parseFloat(formData.total),
    transactionDate: !formData.saleDate
      ? moment(Date.now()).format("YYYY-MM-DD")
      : formData.saleDate,
  };

  return transaction;
}
