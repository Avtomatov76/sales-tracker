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
  let firstName = customer.first_name;
  let lastName =
    flag === "details"
      ? customer.last_name
      : customer.last_name.length > 25
      ? customer.last_name.substring(0, 25) + "..."
      : customer.last_name;

  if (firstName === "na") return lastName.toUpperCase();

  return firstName.toUpperCase() + " " + lastName.toUpperCase();
};
