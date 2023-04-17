export function getCustomersNames(customers: any) {
  if (!customers) return;

  let custArray: any[] = [];
  let namesAndIDs: any[] = [];

  customers.forEach((customer: any) => {
    let name =
      customer.first_name.toLowerCase() +
      " " +
      customer.last_name.toLowerCase();
    custArray.push(name);

    let custObj = {
      name: name,
      id: customer.customer_id,
    };

    namesAndIDs.push(custObj);
  });

  return namesAndIDs;
}

export const displayName = (customer: any, flag: any) => {
  if (!customer) return;

  let firstName = customer.first_name;
  let lastName = "";

  if (flag === "details") {
    if (firstName === "na") {
      lastName = customer.last_name;
      return lastName.toUpperCase();
    } else {
      lastName = customer.last_name;
      return firstName.toUpperCase() + " " + lastName.toUpperCase();
    }
  } else {
    if (customer.last_name.length > 25)
      lastName = customer.last_name.substring(0, 25) + "...";
    else lastName = customer.last_name;

    if (firstName === "na") return lastName.toUpperCase();
    else return firstName.toUpperCase() + " " + lastName.toUpperCase();
  }
};

export const displayPhone = (customer: any) => {
  if (!customer || customer.cust_phone === "na") return;

  let phone = "";

  if (customer.cust_phone[0] === "1") phone = customer.cust_phone.substring(1);
  else phone = customer.cust_phone;

  phone =
    "(" +
    phone.substring(0, 3) +
    ") " +
    phone.substring(3, 6) +
    "-" +
    phone.substring(6);

  return phone;
};

export const displayAddress = (customer: any) => {
  if (!customer) return;
  let address = "";

  address =
    customer.street_address + "\n" + customer.city + ", " + customer.state;

  return address;
};

export const checkNameForDupes = (
  fName: any,
  lName: any,
  customerArray: any
) => {
  if (!customerArray || !fName || !lName) return;

  let firstName = fName.trim().toLowerCase();
  let lastName = lName.trim().toLowerCase();

  let dupeFound = false;
  customerArray.forEach((x: any) => {
    if (
      x.first_name.trim().toLowerCase() === firstName &&
      x.last_name.trim().toLowerCase() === lastName
    )
      dupeFound = true;
  });

  if (dupeFound) return true;

  return false;
};

export const findCustomerById = (id: any, data: any) => {
  let customer = data.find((x) => x.customer_id == id);
  return customer;
};

export const formatDollarEntry = (amount: any) => {
  if (!amount) return "0";

  let decimalStr = "";
  let dollarAmount = "";
  let amountAsStr = amount.toString();

  let intStr =
    amountAsStr.substring(0, amountAsStr.indexOf(".")) || amountAsStr;

  if (amountAsStr.indexOf(".") != -1)
    decimalStr = amountAsStr.slice(amountAsStr.indexOf("."));
  else decimalStr = ".00";

  if (intStr.length > 3 && intStr.length < 7) {
    dollarAmount =
      "$" +
      intStr.slice(0, intStr.length - 3) +
      "," +
      intStr.slice(intStr.length - 3) +
      decimalStr;
  } else if (intStr.length > 6) {
    dollarAmount =
      "$" +
      intStr.slice(0, intStr.length - 6) +
      "," +
      intStr.slice(intStr.length - 6, intStr.length - 3) +
      "," +
      intStr.slice(intStr.length - 3) +
      decimalStr;
  } else {
    dollarAmount = "$" + intStr + decimalStr;
  }

  return dollarAmount;
};
