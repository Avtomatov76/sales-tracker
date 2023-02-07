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
