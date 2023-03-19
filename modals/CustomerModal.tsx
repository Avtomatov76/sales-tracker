import axios from "axios";
import { View, StyleSheet, Modal } from "react-native";
import { Button } from "react-native-paper";
import CustomerForm from "../forms/CustomerForm";
import { customerAPI } from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import { getCustomersNames } from "../functions/customerFunctions";
import { useQueryClient } from "react-query";

export default function CustomerModal(props: any) {
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

  const deleteCustomer = async (id: any) => {
    try {
      await axios.post(baseUrl + customerAPI + `/${id}`);
    } catch (err) {
      console.log(err);
    }

    await queryClient.invalidateQueries(["customers"]);
  };

  const handleSubmit = async (formdata: any) => {
    hideModal();

    try {
      if (props.flag === "edit")
        await axios.put(baseUrl + customerAPI, formdata);
      else if (props.flag === "add") {
        await axios.post(baseUrl + customerAPI, Object.values(formdata));
      }
    } catch (err) {
      console.log(err);
    }

    await queryClient.invalidateQueries(["customers"]);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        //visible={true}
        onRequestClose={hideModal}
      >
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", height: "100%" }}>
          <View style={styles.centeredView}>
            <CustomerForm
              flag={props.flag}
              index={props.index}
              customerId={props.customerId}
              customers={props.customers}
              customer={props.customer}
              initialValues={initialValues}
              customersNames={customersNames}
              handleSubmit={handleSubmit}
              deleteCustomer={deleteCustomer}
              hideModal={hideModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
