import { useState } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CustomerForm from "../forms/customers/CustomerForm";
import { customersAPI } from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import { getCustomersNames } from "../functions/customerFunctions";
import { useQueryClient } from "react-query";

export default function CustomerModal(props: any) {
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

  let customersNames = getCustomersNames(props.customers);
  let baseUrl = GetConfiguration().baseUrl;

  const initialValues = {
    id: props.flag === "edit" ? props.customer.customer_id : "",
    firstName: props.flag === "edit" ? props.customer.first_name : "",
    lastName: props.flag === "edit" ? props.customer.last_name : "",
    address: props.flag === "edit" ? props.customer.street_address : "",
    city: props.flag === "edit" ? props.customer.city : "",
    state: props.flag === "edit" ? props.customer.state : "",
    phone: props.flag === "edit" ? props.customer.cust_phone : "",
    email: props.flag === "edit" ? props.customer.email : "",
  };

  const hideModal = () => {
    props.hideModal();
  };

  const handleOKpress = () => {
    setMessage("");
    hideModal();
  };

  const deleteCustomer = async (id: any) => {
    try {
      const res = await axios.post(baseUrl + customersAPI + `/${id}`);
      console.log(res.data.result);
      if (res.data) setMessage("Could not delete customer ");
    } catch (err) {
      console.log(err);
    }

    await queryClient.invalidateQueries(["customers"]);
  };

  const handleSubmit = async (formdata: any) => {
    hideModal();

    try {
      if (props.flag === "edit")
        await axios.put(baseUrl + customersAPI, formdata);
      else if (props.flag === "add") {
        await axios.post(baseUrl + customersAPI, Object.values(formdata));
      }
    } catch (err) {
      console.log(err);
    }

    await queryClient.invalidateQueries(["customers"]);
  };

  return (
    <Modal
      isVisible={props.visible}
      style={styles.modal}
      backdropColor="rgba(0, 0, 0, 0.3)"
      onBackdropPress={hideModal}
    >
      <CustomerForm
        flag={props.flag}
        index={props.index}
        message={message}
        customerId={props.customerId}
        customers={props.customers}
        customer={props.customer}
        initialValues={initialValues}
        customersNames={customersNames}
        handleSubmit={handleSubmit}
        deleteCustomer={deleteCustomer}
        hideModal={hideModal}
        handleOKpress={handleOKpress}
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
