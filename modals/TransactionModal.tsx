import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import GetConfiguration from "../constants/Config";
import { getCustomersNames } from "../functions/customerFunctions";
import TransactionForm from "../forms/transactions/TransactionForm";
import {
  customersAPI,
  vendorsAPI,
  suppliersAPI,
  travelTypesAPI,
  transactionsAPI,
  productsAPI,
  destinationsAPI,
  saveTransactionsAPI,
  saveProductsAPI,
} from "../api/endPoints";
import { createProductEntry } from "../functions/transactionsFunctions";

export default function TransactionModal(props: any) {
  const [customers, setCustomers] = useState<any>([]);
  const [vendors, setVendors] = useState<any>();
  const [suppliers, setSuppliers] = useState<any>();
  const [travelTypes, setTravelTypes] = useState<any>();
  const [destinations, setDestinations] = useState<any>();
  const [transactions, setTransactions] = useState<any>();
  const [products, setProducts] = useState<any>();

  const baseURL = GetConfiguration().baseUrl;

  useEffect(() => {
    async function getData() {
      let endpoints = [
        baseURL + customersAPI,
        baseURL + vendorsAPI,
        baseURL + suppliersAPI,
        baseURL + travelTypesAPI,
        baseURL + transactionsAPI,
        baseURL + productsAPI,
        baseURL + destinationsAPI,
      ];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([
          { data: customers },
          { data: vendors },
          { data: suppliers },
          { data: travelTypes },
          { data: transactions },
          { data: products },
          { data: destinations },
        ]) => {
          setCustomers(customers), setVendors(vendors);
          setSuppliers(suppliers);
          setTravelTypes(travelTypes);
          setTransactions(transactions);
          setProducts(products);
          setDestinations(destinations);
        }
      );
    }

    getData();
  }, []);

  let customersNames = getCustomersNames(customers);

  const hideModal = () => {
    props.hideModal();
  };

  const checkForDupeDestination = (code: any) => {
    let isFound = false;

    destinations.forEach((dest: any) => {
      if (code.toLowerCase() == dest.destination_id.toLowerCase())
        isFound = true;
    });

    return isFound;
  };

  const handleSubmit = async (formData: any) => {
    if (formData && !formData.id) {
      formData.id = nanoid();

      // save customer to DB
      let updatedPhone = formData.phone.replace(/[- )(]/g, "");

      let customer = {
        id: formData.id,
        fName: formData.firstName.trim().toUpperCase(),
        lName: formData.lastName.trim().toUpperCase(),
        address: formData.address ? formData.address.trim() : "",
        city: formData.city ? formData.city.trim() : "",
        state: formData.state ? formData.state : "",
        phone: !updatedPhone ? "na" : updatedPhone.trim(),
        email: formData.email ? formData.email.trim() : "",
      };

      try {
        await axios.post(baseURL + customersAPI, Object.values(customer));
      } catch (err) {
        console.log(err);
      }
    }

    let isFoundDest = checkForDupeDestination(formData.destination);
    console.log("DEST found: ", isFoundDest);

    if (!isFoundDest) {
      // Save destination to DB
      let destination = {
        id: formData.destination.toUpperCase(),
        name: "",
      };

      try {
        await axios.post(baseURL + destinationsAPI, Object.values(destination));
      } catch (err) {
        console.log(err);
      }
    }

    // Save product and transaction to DB
    let { product, transaction } = createProductEntry(formData);

    try {
      await axios.post(baseURL + saveProductsAPI, product);
      await axios.post(baseURL + saveTransactionsAPI, transaction);
    } catch (err) {
      console.log(err);
    }

    hideModal();
  };

  return (
    <Modal
      isVisible={props.visible}
      style={styles.modal}
      backdropColor="rgba(0, 0, 0, 0.3)"
      onBackdropPress={hideModal}
    >
      <TransactionForm
        flag={props.flag}
        index={props.index}
        customerId={props.customerId}
        customer={!props.customer ? null : props.customer}
        customers={!customers ? null : customers}
        vendors={!vendors ? null : vendors}
        suppliers={!suppliers ? null : suppliers}
        travelTypes={!travelTypes ? null : travelTypes}
        transactions={!transactions ? null : transactions}
        products={!products ? null : products}
        destinations={!destinations ? null : destinations}
        customersNames={customersNames}
        handleSubmit={handleSubmit}
        hideModal={hideModal}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
});
