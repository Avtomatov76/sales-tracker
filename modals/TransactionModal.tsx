import axios from "axios";
import { nanoid } from "nanoid";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import GetConfiguration from "../constants/Config";
import { getCustomersNames } from "../functions/customerFunctions";
import TransactionForm from "../forms/transactions/TransactionForm";
import {
  customersAPI,
  destinationsAPI,
  saveTransactionsAPI,
  saveProductsAPI,
  updateProduct,
  updateTransaction,
} from "../api/endPoints";
import {
  checkForDupeDestination,
  createProductEntry,
} from "../functions/transactionsFunctions";

export default function TransactionModal(props: any) {
  const baseURL = GetConfiguration().baseUrl;

  let customersNames = getCustomersNames(props.customers);

  const hideModal = () => {
    props.hideModal();
  };

  // const checkForDupeDestination = (code: any) => {
  //   let isFound = false;

  //   props.destinations.forEach((dest: any) => {
  //     if (code.toLowerCase() == dest.destination_id.toLowerCase())
  //       isFound = true;
  //   });

  //   return isFound;
  // };

  const handleSubmit = async (formData: any) => {
    if (props.flag == "edit") {
      // Update product and transaction in the DB
      let { product, transaction } = createProductEntry(formData, props.flag);

      console.log("STUFF: ", product, transaction);

      try {
        await axios.post(baseURL + updateProduct, product);
        await axios.post(baseURL + updateTransaction, transaction);
      } catch (err) {
        console.log(err);
      }
    }

    if (props.flag == "add") {
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

      // Save product and transaction to DB
      let { product, transaction } = createProductEntry(formData, props.flag);

      try {
        await axios.post(baseURL + saveProductsAPI, product);
        await axios.post(baseURL + saveTransactionsAPI, transaction);
      } catch (err) {
        console.log(err);
      }
    }

    //  re-work this --> currently it is not adding a new airport code !!!!!!!!!!!
    let isFoundDest = checkForDupeDestination(
      formData.destination,
      props.destinations
    );

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

    props.refresh();

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
        transaction={props.transaction}
        index={props.index}
        customerId={props.customerId}
        customer={!props.customer ? null : props.customer}
        customers={!props.customers ? null : props.customers}
        vendors={!props.vendors ? null : props.vendors}
        suppliers={!props.suppliers ? null : props.suppliers}
        travelTypes={!props.travelTypes ? null : props.travelTypes}
        transactions={!props.transactions ? null : props.transactions}
        products={!props.products ? null : props.products}
        destinations={!props.destinations ? null : props.destinations}
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
