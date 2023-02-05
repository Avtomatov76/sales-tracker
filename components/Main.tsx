import { useState, useEffect } from "react";
import axios from "axios";
import { customerAPI } from "../api/endPoints";
import { View, Text, StyleSheet } from "react-native";
import Customers from "./Customers";
import CSVUploader from "./CSVUploader";

export default function Main(props: any) {
  const [customers, setCustomers] = useState<any>();

  //let baseUrl = "http://localhost:8080"; //"http://localhost:8080"; //"http://127.0.0.1:8080";

  // useEffect(() => {
  //   fetchCustomers();
  //   //fetchCustomer(5);
  // }, []);

  // Example code...
  // const fetchCustomers = async () => {
  //   //await axios(baseUrl + customerAPI).then((response) => {
  //   await axios(baseUrl + "/api/customers").then((response) => {
  //     let data = Object.values(response.data);
  //     setCustomers(data);
  //   });
  // };

  console.log("Customers: ", customers);

  return (
    <View style={styles.container}>
      {/* <Customers customers={customers} /> */}
      <CSVUploader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    paddingTop: 40,
    paddingLeft: 60,
    paddingRight: 60,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
});
