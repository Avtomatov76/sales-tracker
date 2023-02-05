let strNumerals = ["2", "3", "4", "5", "6", "7", "8", "9"];

export function getCustomerData(parsedCustomers: any, names: any) {
  if (!parsedCustomers && !names) return;
  let customerData = [];
  let uniqueNames = [];
  let dupeCustomers = [];
  let uniqueCustomers = [];

  parsedCustomers.forEach((customer: any) => {
    let custName = customer.NAME;
    let index = custName.indexOf(",");

    let isNumeral = strNumerals.includes(custName[0]);

    if (isNumeral) {
      // if isNumeral => assign it to size_party
      // if !isNumeral && no ',' => asign '1' to size_party
      // else => count num of ',' and add '1' to size_party
      // add this to 'Product' table
      custName = custName.substring(1);
    }

    let fullName = "na " + custName;

    if (
      !names.includes(fullName.toLowerCase()) &&
      !uniqueNames.includes(fullName)
    ) {
      uniqueNames.push(fullName);
      let updatedPhone = customer.PHONE.replace(/[- )(]/g, "");

      let customerObj = {
        fName: "na",
        lName: custName,
        address: customer.ADDRESS ? customer.ADDRESS : "",
        city: customer.CITY ? customer.CITY : "",
        state: customer.STATE ? customer.STATE : "",
        phone: !updatedPhone ? "na" : updatedPhone,
        email: customer.EMAIL ? customer.EMAIL : "",
      };

      customerData.push(customerObj);
    } else if (names.includes(fullName.toLowerCase())) {
      dupeCustomers.push(fullName);
    }
  });
  uniqueCustomers = uniqueNames.slice();

  return { customerData, uniqueCustomers, dupeCustomers };
}

export function getProductData() {
  //
}

export function getTransactionData() {
  //
}
