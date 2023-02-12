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

  // if (flag === "details" && firstName === "na") {
  //   lastName = customer.last_name;
  //   return lastName.toUpperCase();
  // } else if (flag === "details" && firstName !== "na")
  //   return firstName.toUpperCase() + " " + lastName.toUpperCase();

  // if (customer.last_name.length > 25)
  //   lastName = customer.last_name.substring(0, 25) + "...";
  // else lastName = customer.last_name;

  // if (firstName === "na") return lastName.toUpperCase();
  // else return firstName.toUpperCase() + " " + lastName.toUpperCase();
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
