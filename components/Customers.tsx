import { useState, useEffect } from "react";
import axios from "axios";
import { customerAPI } from "../api/endPoints";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import GetConfiguration from "../constants/Config";
import CustomerModal from "../modals/CustomerModal";

export default function Customers(props: any) {
  const [customers, setCustomers] = useState<any>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const baseURL = GetConfiguration().baseUrl;
  console.log(baseURL);

  // Implement submenu with edit/delete
  // Query DB for all customers and do validation to see if cusotmer alread exists
  // sort customers by name/last name
  // find customer by nam/last name/phone/email
  // find 5 best paying customers
  // find customers who pucrahsed recently
  // categorize cuatomers by locality

  // Example code...
  const fetchCustomers = async () => {
    //await axios(baseUrl + customerAPI).then((response) => {
    await axios(baseURL + "/api/customers").then((response) => {
      let data = Object.values(response.data);
      setCustomers(data);
    });
  };

  console.log(customers);

  const handleAddCustomer = () => {
    setShowModal(true);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text>Total Customers: {customers ? customers.length : 0}</Text>
        </View>
        <View>
          <Button
            mode="contained"
            //color="#f27d42"
            //buttonColor="#f27d42"
            style={styles.addBtn}
            onPress={() => handleAddCustomer()}
          >
            Add
          </Button>
        </View>
      </View>
      <hr style={{ width: "100%", color: "grey" }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <View style={{}}>
          <Text style={{ marginBottom: 20, fontSize: 18 }}>All Customers:</Text>
          <ScrollView>
            <View style={{ height: 400 }}>
              {!customers
                ? null
                : customers.map((customer, index) => (
                    <Text key={index} style={{ color: "blue" }}>
                      {customer.first_name} {customer.last_name}
                    </Text>
                  ))}
            </View>
          </ScrollView>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text>5 Highest Paying customers: </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text>Customers by state: </Text>
        </View>
      </View>
      <CustomerModal
        //flag="add" // or "edit"
        //initialValues={initialValues} <== initial values should be passed from this component or other separate component
        customers={customers}
        visible={showModal}
        hideModal={() => setShowModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    marginBottom: 10,
    //width: 100,
    //backgroundColor: "#ffffff",
  },
});
