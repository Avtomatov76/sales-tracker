import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import GetConfiguration from "../constants/Config";
import CustomerModal from "../modals/CustomerModal";
import { displayName, findCustomerById } from "../functions/customerFunctions";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import TabHeader from "./TabHeader";
import CustomerSectionRenderer from "./CustomerSectionRenderer";
import SubHeader from "./SubHeader";

export default function Customers(props: any) {
  const [customerId, setCustomerId] = useState("");
  const [showAllCustomers, setShowAllCustomers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [customerIndex, setCustomerIndex] = useState<any>();
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);
  const [displayResults, setDisplayResults] = useState(false);
  const [foundCustomers, setFoundCustomers] = useState<any>([]);
  const [customer, setCustomer] = useState<any>();
  const [showDetails, setShowDetails] = useState(false);
  const [customerObjects, setCustomerObjects] = useState<any>([]);
  const [selected, setSelected] = useState(null);

  const baseURL = GetConfiguration().baseUrl;

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["customers"],
    () => axios.get(baseURL + "/api/customers").then((res) => res.data) // CHANGE BACK TO CORRECT VALUE!!
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="customers" />;
  if (data)
    data.sort((a: any, b: any) => a.last_name.localeCompare(b.last_name));

  const setSelection = (index: any) => {
    setSelected(index);
  };

  const showCustomerDetails = (id: any) => {
    let customer = findCustomerById(id, data);
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
      (c: any) => c.last_name.toLowerCase() == value.toLowerCase()
    );

    setCustomer(customer);
    setShowDetails(true);
  };

  if (data)
    data.sort((a: any, b: any) => {
      a.last_name.localeCompare(b.last_name);
    });

  return (
    <>
      <TabHeader
        name="Customers"
        foundEntries={foundCustomers}
        entryObjects={customerObjects}
        showSearchResults={showSearchResults}
        handleSelection={handleSelection}
        displayModal={() => displayCustomerModal("add")}
      />

      <SubHeader
        flag="vendors"
        selected={props.selected}
        numEntries={data.length}
        sortProducts={props.sortProducts}
        //submitForm={() => displayTransactionModal("add")}
      />
      <CustomerSectionRenderer
        title="Customers"
        type="customer"
        selected={selected}
        flag={flag}
        entry={customer}
        entryIndex={customerIndex}
        data={data}
        editEntry={editCustomer}
        deleteEntry={deleteCustomer}
        showAll={showAllCustomers}
        showDetails={showCustomerDetails}
        showMenu={showCustomerMenu}
        displayMenu={displayMenu}
        dismissMenu={() => setShowCustomerMenu(false)}
        setSelection={setSelection}
        displayName={displayName}
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
