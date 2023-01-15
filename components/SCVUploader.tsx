import { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import axios from "axios";
import Papa from "papaparse";
import GetConfiguration from "../constants/Config";
import { getCustomersNames } from "../functions/customerFunctions";

export default function CSVUploader(props: any) {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [customers, setCustomers] = useState<any>();

  const baseURL = GetConfiguration().baseUrl;
  console.log(parsedData);

  let strNumerals = ["2", "3", "4", "5", "6", "7", "8", "9"];

  let names = [] as any;

  useEffect(() => {
    const getCustomersFromDB = async () => {
      //await axios(baseUrl + customersAPI).then((response) => {
      await axios(baseURL + "/api/customers").then((response) => {
        let data = Object.values(response.data);
        setCustomers(data);
      });
    };

    getCustomersFromDB();
  }, []);

  if (customers) names = getCustomersNames(customers);

  let customerData = getCustomerData(parsedData, names);
  console.log(customerData);

  function getCustomerData(parsedCsutomers: any, names: any) {
    if (!parsedCsutomers && !names) return;
    let testArr = [];

    parsedCsutomers.forEach((customer: any) => {
      let custName = customer.NAME;
      let index = custName.indexOf(",");

      let isNumeral = strNumerals.includes(custName[0]);

      if (isNumeral) {
        custName = custName.substring(1);
      }

      let fullName = "na " + custName;

      if (!names.includes(fullName.toLowerCase())) {
        let updatedPhone = customer.PHONE.replace(/[- )(]/g, "");

        let customerObj = {
          fName: "na",
          lName: custName,
          phone: !updatedPhone ? "na" : updatedPhone,
        };

        testArr.push(customerObj);
      } else console.log("DUPE DETECTED!!");
    });
    return testArr;
  }

  console.log(customers);
  console.log(names);

  // Ignore number before last name
  // handle missing first name,
  // handle commas between multipe names, count multiple name as party - otherwise grab the firs one only
  // parse phone from '(555) 555-5555' to numbers only
  // parse 'Paid' and 'Comm' into floats for the DB
  // write func to get name(s) and phone number to insert into 'Customers' (validate before inserting)
  // write func to get rest info to insert into 'Product' and 'Transaction' tables with drop downs of customers, etc.

  const changeHandler = (event: any) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d: any) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  return (
    <ScrollView style={{ flexDirection: "column" }}>
      <View style={{ marginBottom: 40 }}>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          accept=".csv"
          style={{ display: "block", fontSize: 12 }}
        />
      </View>

      <View>
        <table
          style={{
            border: "solid",
            borderWidth: 1,
            borderColor: "grey",
            paddingBottom: 10,
          }}
        >
          <thead>
            <tr
              style={{
                border: "solid",
                borderWidth: 1,
                borderColor: "red",
                backgroundColor: "grey",
                color: "#ffffff",
              }}
            >
              {tableRows.map((rows, index) => {
                return <th key={index}>{rows}</th>;
              })}
            </tr>
            <br />
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr
                  key={index}
                  style={{ padding: 5, backgroundColor: "#f5f5f5" }} // "#fafafa"
                >
                  {value.map((val, i) => {
                    return (
                      <td style={{ paddingLeft: 5, paddingRight: 5 }} key={i}>
                        {val}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </View>
    </ScrollView>
  );
}
