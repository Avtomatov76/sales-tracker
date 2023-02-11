import { useState, useEffect } from "react";
import axios from "axios";
import { customerAPI } from "../api/endPoints";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { Button, Menu, Divider } from "react-native-paper";
import GetConfiguration from "../constants/Config";
import CustomerModal from "../modals/CustomerModal";
import { displayName } from "../functions/customerFunctions";
import DetailsForm from "../forms/form-parts/DetailsForm";
import Searchbar from "./Searchbar";
import CustomerCard from "./cards/CustomerCard";
import CustomerList from "./CustomerList";

export default function Customers(props: any) {
  const [customers, setCustomers] = useState<any>();
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [customerIndex, setCustomerIndex] = useState<any>();
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [foundCustomers, setFoundCustomers] = useState<any>([]);
  //
  const [testCustomers, setTestCustomers] = useState<any>([]);
  const [showDetails, setShowDetails] = useState(false);

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

  if (customers)
    customers.sort((a: any, b: any) => a.last_name.localeCompare(b.last_name));

  console.log(customers);

  const showCustomerDetails = (index: any) => {
    setCustomerIndex(index);
    displayCustomerModal("details");
  };

  const displayCustomerModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const displayMenu = (index: any) => {
    setCustomerIndex(index);
    setShowCustomerMenu(true);
  };

  const editCustomer = (id: string) => {
    console.log("Editing: ", id);
    setShowCustomerMenu(false);
    displayCustomerModal("edit");
  };

  const deleteCustomer = (id: string) => {
    console.log("Removing: ", id);
    setShowCustomerMenu(false);
    displayCustomerModal("delete");
  };

  const showSearchResults = (e: any) => {
    // let customerArray = customers.filter((c: any) =>
    //   c.last_name.toLowerCase().includes(e.target.value)
    // );

    let options = [];

    let customerArray = customers.forEach((c: any) => {
      if (c.last_name.toLowerCase().includes(e.target.value))
        options.push(c.last_name.toUpperCase());
    });

    console.log(e.target.value);
    console.log(customerArray);

    //setFoundCustomers(customerArray.slice());
    setFoundCustomers(options.slice());
    setDisplayResults(true);
  };

  console.log(foundCustomers);
  console.log(testCustomers);

  const handleSelection = (value: any) => {
    console.log("Handling selection: ", value);

    // APP BREAKING HERE!!
    let customerArr = customers.filter((c) =>
      c.last_name.toLowerCase().includes(value.toLowerCase())
    );

    setTestCustomers(customerArr.slice());
    setShowDetails(true);
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 35 }}>Customers</Text>

        {/* <View style={styles.searchContainer}>
          <Pressable
            //onPress={() => setDisplayResults(true)}
            style={{ paddingTop: 10, margin: 0 }}
          >
            <Image
              style={styles.searchIcon}
              source={require("../assets/icons/search.png")}
            />
          </Pressable>

          <TextInput
            placeholder="Search by last name"
            style={styles.searchInput}
            onChange={(e) => showSearchResults(e)}
          />
          <Menu
            visible={displayResults}
            onDismiss={() => setDisplayResults(false)}
            anchor={
              <Pressable
                //onPress={() => setDisplayResults(true)}
                style={{ paddingTop: 10, margin: 0 }}
              >
                <Image
                  style={styles.searchIcon}
                  source={require("../assets/icons/search.png")}
                />
              </Pressable>
            }
            //contentStyle={{ alignItems: "center" }}
          >
            {!foundCustomers
              ? null
              : foundCustomers.map((c: any, index: any) => (
                  <Pressable onPress={() => showCustomerDetails(index)}>
                    <Menu.Item key={index} title={c.last_name} />
                  </Pressable>
                ))}
          </Menu>
        </View> */}

        <Searchbar
          options={foundCustomers}
          onChange={(e: any) => showSearchResults(e)}
          handleSelection={handleSelection}
        />

        <View>
          <Button
            mode="contained"
            //color="#f27d42"
            //buttonColor="#f27d42"
            style={styles.addBtn}
            onPress={() => displayCustomerModal("add")}
          >
            Add
          </Button>
        </View>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>Total Customers: {customers ? customers.length : 0}</Text>
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
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginBottom: 20, fontSize: 18, marginRight: 15 }}>
              Show All
            </Text>
            <Pressable
              onPress={() => setShowAllCustomers(!showAllCustomers)}
              //onBlur={() => setShowAllCustomers(false)}
            >
              <Image
                source={require("../assets/icons/plus-orange.png")}
                style={{ height: 24, width: 24 }}
              />
            </Pressable>
          </View>
          {!showAllCustomers ? null : (
            <CustomerList
              customers={customers}
              customerIndex={customerIndex}
              showCustomerMenu={showCustomerMenu}
              showCustomerDetails={showCustomerDetails}
              dismiss={() => setShowCustomerMenu(false)}
              displayName={displayName}
              displayMenu={displayMenu}
              editCustomer={editCustomer}
              deleteCustomer={deleteCustomer}
            />
            // <ScrollView>
            //   <View style={{ height: 400 }}>
            //     {!customers
            //       ? null
            //       : customers.map((customer: any, index: any) => (
            //           <Pressable
            //             key={index}
            //             style={{
            //               width: "100%",
            //               marginBottom: 10,
            //               //borderTopWidth: 1,
            //               borderBottomWidth: 1,
            //               borderColor: "grey",
            //               marginRight: 10,
            //               paddingRight: 5,
            //               paddingBottom: 5,
            //               flexDirection: "row",
            //               justifyContent: "space-between",
            //               alignItems: "center",
            //             }}
            //             onPress={() => showCustomerDetails(index)}
            //           >
            //             <Text
            //               //key={index}
            //               style={{ color: "blue" }}
            //               //onPress={() => alert("You clicked on an entry!!!!")}
            //             >
            //               {displayName(customer, "default")}
            //             </Text>
            //             {/* <hr style={{ width: "100%" }} /> */}
            //             <Menu
            //               visible={
            //                 index === customerIndex ? showCustomerMenu : null
            //               }
            //               onDismiss={() => setShowCustomerMenu(false)}
            //               anchor={
            //                 <Pressable
            //                   onPress={() => displayMenu(index)}
            //                   style={{ padding: 0, margin: 0 }}
            //                 >
            //                   <Image
            //                     style={styles.more}
            //                     source={require("../assets/icons/more.png")}
            //                   />
            //                 </Pressable>
            //               }
            //             >
            //               <Menu.Item
            //                 onPress={() => editCustomer(customer.customer_id)}
            //                 title="Edit"
            //                 trailingIcon={require("../assets/icons/edit.png")}
            //               />
            //               <Divider />
            //               <Menu.Item
            //                 onPress={() => deleteCustomer(customer.customer_id)}
            //                 title="Delete"
            //                 trailingIcon={require("../assets/icons/trash.png")}
            //               />
            //             </Menu>
            //           </Pressable>
            //         ))}
            //   </View>
            // </ScrollView>
          )}
        </View>

        <View style={{ marginBottom: 20 }}>
          {/* <Text>Customer Info: </Text> */}
          {!showDetails ? null : (
            <DetailsForm
              //customer={!foundCustomers ? null : foundCustomers[customerIndex]}
              customer={!testCustomers ? null : testCustomers}
            />
          )}
        </View>

        <CustomerCard />

        {/* <View style={{ marginBottom: 20 }}>
          <Text>Customer Details</Text>
        </View> */}
      </View>
      <CustomerModal
        flag={flag}
        //initialValues={initialValues} <== initial values should be passed from this component or other separate component
        index={customerIndex}
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
    backgroundColor: "#f27d42",
  },
  more: {
    width: 20,
    height: 20,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginRight: "2rem",
    paddingLeft: ".75rem",
    paddingRight: ".75rem",
    borderColor: "purple",
    borderWidth: 1,
    borderRadius: 30,
  },
  searchIcon: {
    height: 18,
    width: 18,
  },
  searchInput: {
    fontSize: 14,
    placeholderTextColor: "grey",
    padding: ".5rem",
    marginLeft: ".5rem",
    outlineStyle: "none",
  },
});
