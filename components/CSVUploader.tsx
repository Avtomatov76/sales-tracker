import { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";
import Papa from "papaparse";
import { nanoid } from "nanoid";
import GetConfiguration from "../constants/Config";
import { getCustomersNames } from "../functions/customerFunctions";
import { customerAPI, customersAPI } from "../api/endPoints";
import { Button } from "react-native-paper";
import ErrorModal from "../modals/ErrorModal";
import { getCustomerData } from "../functions/csvUploaderFunctions";
import InfoModal from "../modals/InfoModal";
import CSVTable from "./CSVTable";
import { getSupplierOpts, getTvlTypeOpts } from "../constants/TableRows";

// Ignore number before last name
// handle missing first name,
// handle commas between multipe names, count multiple name as party - otherwise grab the firs one only
// parse phone from '(555) 555-5555' to numbers only
// parse 'Paid' and 'Comm' into floats for the DB
// write func to get name(s) and phone number to insert into 'Customers' (validate before inserting)
// write func to get rest info to insert into 'Product' and 'Transaction' tables with drop downs of customers, etc.

export default function CSVUploader(props: any) {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [customers, setCustomers] = useState<any>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  //const [dupeCustomers, setDupeCustomers] = useState([]);

  const baseURL = GetConfiguration().baseUrl;
  console.log(parsedData);

  let names = [];
  let id = nanoid();
  console.log("ID: ", id);

  useEffect(() => {
    const getCustomersFromDB = async () => {
      await axios(baseURL + customerAPI).then((response) => {
        let data = Object.values(response.data);
        setCustomers(data);
      });
    };

    getCustomersFromDB();
    // test
    const supplierOpts = getSupplierOpts();
    const tvlTypeOpts = getTvlTypeOpts();
    console.log(tvlTypeOpts);
    console.log(supplierOpts);
  }, []);

  if (customers) names = getCustomersNames(customers);

  let { customerData, uniqueCustomers, dupeCustomers } = getCustomerData(
    parsedData,
    names
    //dupeCustomers,
    //uniqueCustomers
  );
  console.log(customerData);
  console.log(names);
  console.log("Unique customers: ", uniqueCustomers);
  console.log("Duplicate customers: ", dupeCustomers);

  const displayModal = () => {
    if (dupeCustomers.length > 0) {
      setShowErrorModal(true);
      return;
    }

    setShowInfoModal(true);
  };

  const uploadCustomers = async () => {
    alert("About to Upload these customers!");

    // try {
    //   await axios.post(
    //     "http://localhost:8080" + customersAPI,
    //     Object.values(customerData)
    //   );
    // } catch (err) {
    //   console.log(err);
    // }
  };

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

      {values.length === 0 ? null : (
        <CSVTable
          tableRows={tableRows}
          values={values}
          displayModal={displayModal}
        />
      )}

      <ErrorModal
        visible={showErrorModal}
        hideModal={() => setShowErrorModal(false)}
        list={dupeCustomers || []}
        recordType="customers"
      />
      <InfoModal
        visible={showInfoModal}
        upload={uploadCustomers}
        hideModal={() => setShowInfoModal(false)}
        list={uniqueCustomers || []}
        recordType="customers"
      />
    </ScrollView>
  );
}
