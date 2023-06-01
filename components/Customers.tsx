import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-paper";
import GetConfiguration from "../constants/Config";
import CustomerModal from "../modals/CustomerModal";
import { displayName, findCustomerById } from "../functions/customerFunctions";
import Searchbar from "./Searchbar";
import CustomerCard from "./cards/CustomerCard";
import CustomerList from "./CustomerList";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import SectionRenderer from "./SectionRenderer";

export default function Customers(props: any) {
  const [customerId, setCustomerId] = useState("");
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [customerIndex, setCustomerIndex] = useState<any>();
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [foundCustomers, setFoundCustomers] = useState<any>([]);
  //
  const [customer, setCustomer] = useState<any>();
  const [showDetails, setShowDetails] = useState(false);
  const [customerObjects, setCustomerObjects] = useState<any>([]);

  console.log("------------------ customers -------------------");

  const baseURL = GetConfiguration().baseUrl;

  // Implement submenu with edit/delete
  // Query DB for all customers and do validation to see if cusotmer alread exists
  // sort customers by name/last name
  // find customer by nam/last name/phone/email
  // find 5 best paying customers
  // find customers who pucrahsed recently
  // categorize cuatomers by locality

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["customers"],
    () => axios.get(baseURL + "/api/customers").then((res) => res.data) // HCANGE BACK TO CORRECT VALUE!!
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="customers" />;
  if (data)
    data.sort((a: any, b: any) => a.last_name.localeCompare(b.last_name));

  const showCustomerDetails = (id: any) => {
    //console.log(id);
    let customer = findCustomerById(id, data); //data.find((x) => x.customer_id == id);
    setCustomer(customer);
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
    //console.log("EDITING: ", id);
    let customer = findCustomerById(id, data);
    setCustomer(customer);
    setShowCustomerMenu(false);
    displayCustomerModal("edit");
  };

  const deleteCustomer = (id: string) => {
    let customer = findCustomerById(id, data);
    setCustomerId(id);
    setCustomer(customer);
    setShowCustomerMenu(false);
    displayCustomerModal("delete");
  };

  const showSearchResults = (e: any) => {
    let results = [];
    let custObjects = [];

    data.forEach((c: any) => {
      if (c.last_name.toLowerCase().includes(e.target.value)) {
        let customerObj = {
          id: c.customer_id,
          lastName: c.last_name.toUpperCase(),
        };

        results.push(c.last_name.toUpperCase());
        custObjects.push(customerObj);
      }
    });

    setFoundCustomers(results.slice());
    setCustomerObjects(custObjects.slice());
    setDisplayResults(true);
  };

  const handleSelection = (value: any) => {
    if (!value) return;

    let customer = data.find(
      (c: any) => c.last_name.toLowerCase() === value.toLowerCase()
    );

    setCustomer(customer);
    setShowDetails(true);
  };

  //
  if (data)
    data.sort((a: any, b: any) => {
      a.last_name.localeCompare(b.last_name);
    });
  // console.log("DATA: ", data);
  // console.log("Customer objects: ", customerObjects);
  // console.log("Found csutomers: ", foundCustomers);

  //

  return (
    // <View>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       marginBottom: 10,
    //     }}
    //   >
    //     <Text style={{ fontSize: 35 }}>Customers</Text>

    //     <Searchbar
    //       options={foundCustomers}
    //       objects={customerObjects}
    //       onChange={(e: any) => showSearchResults(e)}
    //       handleSelection={handleSelection}
    //     />

    //     <View>
    //       <Button
    //         mode="contained"
    //         //color="#f27d42"
    //         //buttonColor="#f27d42"
    //         style={styles.addBtn}
    //         onPress={() => displayCustomerModal("add")}
    //       >
    //         Add
    //       </Button>
    //     </View>
    //   </View>
    //   <View style={{ marginBottom: 10 }}>
    //     <Text>Total Customers: {data ? data.length : 0}</Text>
    //   </View>
    //   <hr
    //     style={{
    //       width: "100%",
    //       backgroundColor: "grey",
    //       border: "none",
    //       height: 1,
    //     }}
    //   />

    //   <View
    //     style={{
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       marginTop: 40,
    //       marginBottom: 20,
    //     }}
    //   >
    //     <View style={{}}>
    //       <View style={{ flexDirection: "row" }}>
    //         <Text style={{ marginBottom: 20, fontSize: 18, marginRight: 15 }}>
    //           Show All
    //         </Text>
    //         <Pressable onPress={() => setShowAllCustomers(!showAllCustomers)}>
    //           <Image
    //             source={require("../assets/icons/plus-orange.png")}
    //             style={{ height: 24, width: 24 }}
    //           />
    //         </Pressable>
    //       </View>
    //       {!showAllCustomers ? null : (
    //         <CustomerList
    //           customers={data}
    //           customerIndex={customerIndex}
    //           showCustomerMenu={showCustomerMenu}
    //           showCustomerDetails={showCustomerDetails}
    //           dismiss={() => setShowCustomerMenu(false)}
    //           displayName={displayName}
    //           displayMenu={displayMenu}
    //           editCustomer={editCustomer}
    //           deleteCustomer={deleteCustomer}
    //         />
    //       )}
    //     </View>

    //     {!customer ? null : (
    //       <CustomerCard
    //         flag={flag}
    //         customer={customer}
    //         editCustomer={editCustomer}
    //         deleteCustomer={deleteCustomer}
    //       />
    //     )}
    //   </View>
    //   <CustomerModal
    //     flag={flag}
    //     customerId={customerId}
    //     index={customerIndex}
    //     customers={data}
    //     customer={!customer ? null : customer}
    //     visible={showModal}
    //     hideModal={() => setShowModal(false)}
    //   />
    // </View>

    <>
      <SectionRenderer
        title="Customers"
        type="customer"
        flag={flag}
        entry={customer}
        entryIndex={customerIndex}
        data={data}
        editEntry={editCustomer}
        deleteEntry={deleteCustomer}
        showAll={showAllCustomers}
        foundEntries={foundCustomers}
        entryObjects={customerObjects}
        showSearchResults={showSearchResults}
        showDetails={showCustomerDetails}
        showMenu={showCustomerMenu}
        displayMenu={displayMenu}
        dismissMenu={() => setShowCustomerMenu(false)}
        handleSelection={handleSelection}
        displayName={displayName}
        displayModal={() => displayCustomerModal("add")}
        toggleShowAll={() => setShowAllCustomers(!showAllCustomers)}
      />
      <CustomerModal
        flag={flag}
        customerId={customerId}
        index={customerIndex}
        customers={data}
        customer={!customer ? null : customer}
        visible={showModal}
        hideModal={() => setShowModal(false)}
      />
    </>
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
