import { useState } from "react";
import axios from "axios";
import GetConfiguration from "../constants/Config";

const baseURL = GetConfiguration().baseUrl;

// export const getCustomersFromDB = async () => {
//   const [customers, setCustomers] = useState<any>();
//   //await axios(baseUrl + customerAPI).then((response) => {
//   return await axios(baseURL + "/api/customers").then((response) => {
//     let data = Object.values(response.data);
//     return data;
//     //setCustomers(data);
//   });
//   //return customers;
// };

export function getCustomersNames(customers: any) {
  if (!customers) return;

  console.log(customers);

  let custArray: any[] = [];

  customers.forEach((customer: any) => {
    let name =
      customer.first_name.toLowerCase() +
      " " +
      customer.last_name.toLowerCase();
    custArray.push(name);
  });

  return custArray;
}
