import { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import axios from "axios";
import Papa from "papaparse";
import GetConfiguration from "../constants/Config";
import { getCustomersNames } from "../functions/customerFunctions";
import {
  customerAPI,
  getProductHashes,
  saveCustomersAPI,
  saveProductsAPI,
  saveTransactionsAPI,
} from "../api/endPoints";
import ErrorModal from "../modals/ErrorModal";
import { processParsedData } from "../functions/csvUploaderFunctions";
import InfoModal from "../modals/InfoModal";
import CSVTable from "./CSVTable";
import { getHashesArray } from "../functions/productFunctions";

export default function CSVUploader(props: any) {
  const [customers, setCustomers] = useState<any>();
  const [productHashes, setProductHashes] = useState<any>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [error, setError] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [data, setData] = useState<any>({
    parsedData: [],
    tableRows: [],
    customerData: [],
    values: [],
    productData: [],
    transactionData: [],
    uniqueCustomers: [],
    dupeCustomers: [],
    dupeProducts: [],
  });

  //console.log("_____________________RESTARTED___________________________");

  const baseURL = GetConfiguration().baseUrl;

  let customersInDB = [];
  let hashesArray = [];

  useEffect(() => {
    async function getCustomersProductsFromDB() {
      let endpoints = [baseURL + customerAPI, baseURL + getProductHashes];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([{ data: customers }, { data: productHashes }]) => {
          setCustomers(customers);
          setProductHashes(productHashes);
        }
      );
    }

    getCustomersProductsFromDB();

    // const getCustomersFromDB = async () => {
    //   await axios(baseUrl + customerAPI).then((response) => {
    //     let data = Object.values(response.data);
    //     setCustomers(data);
    //   });
    // };

    // getCustomersFromDB();
  }, []);

  console.log("CUSTOMERS: ", customers);
  console.log("HASHES: ", productHashes);

  const displayModal = () => {
    // if (data.dupeCustomers.length > 0) {
    //   setShowErrorModal(true);
    //   return;
    // }

    setShowInfoModal(true);
  };

  const uploadData = async () => {
    console.log("DATA??????? ", data);
    if (
      data.customerData.length == 0 &&
      data.productData.length == 0 &&
      data.transactionData.length == 0
    ) {
      setError("No data to upload!");
      setShowErrorModal(true);
      return;
    }

    alert("About to Upload these customers!");

    // console.log("IS THERE CUSTOMERS??? ", Object.values(data.customerData));
    // console.log("IS THERE PRODUCTS??? ", Object.values(data.productData));

    // IF SAME DATA - DO NOT UPLOAD!!

    // axios
    //   .all([
    //     axios.post(
    //       baseURL + saveCustomersAPI,
    //       Object.values(data.customerData)
    //     ),
    //     axios.post(baseURL + saveProductsAPI, Object.values(data.productData)),
    //     axios.post(
    //       baseURL + saveTransactionsAPI,
    //       Object.values(data.transactionData)
    //     ),
    //   ])
    //   .then(
    //     axios.spread((data1, data2, data3) => {
    //       // output of req.
    //       console.log("data1", data1, "data2", data2, "data3", data3);
    //     })
    //   );
  };

  const changeHandler = (event: any) => {
    if (customers) customersInDB = getCustomersNames(customers);
    if (productHashes) hashesArray = getHashesArray(productHashes);

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

        let {
          customerData,
          uniqueCustomers,
          dupeCustomers,
          dupeProducts,
          productData,
          transactionData,
        } = processParsedData(results.data, customersInDB, hashesArray);

        setData({
          ...data,
          parsedData: results.data,
          tableRows: rowsArray[0],
          values: valuesArray,
          customerData: customerData,
          uniqueCustomers: uniqueCustomers,
          dupeCustomers: dupeCustomers,
          dupeProducts: dupeProducts,
          productData: productData,
          transactionData: transactionData,
        });
      },
    });
  };

  console.log("Customer Data: ", data.customerData);
  console.log("Product Data: ", data.productData);
  console.log("Transaction Data: ", data.transactionData);

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

      {data.values.length === 0 ? null : (
        <CSVTable
          tableRows={data.tableRows}
          values={data.values}
          displayModal={displayModal}
        />
      )}

      <ErrorModal
        visible={showErrorModal}
        hideModal={() => setShowErrorModal(false)}
        error={error}
        //list={data.dupeCustomers || []}
        //recordType="customers"
      />
      <InfoModal
        visible={showInfoModal}
        upload={uploadData}
        hideModal={() => setShowInfoModal(false)}
        uniqueCustomers={data.uniqueCustomers || []}
        dupeCustomers={data.dupeCustomers || []}
        productData={data.productData || []}
        dupeProducts={data.dupeProducts || []}
        recordType="customers"
      />
    </ScrollView>
  );
}
