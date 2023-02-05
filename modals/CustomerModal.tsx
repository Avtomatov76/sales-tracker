import { Formik } from "formik";
import axios from "axios";
import {
  View,
  Text,
  //Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Button } from "react-native-paper";
import CustomerForm from "../forms/CustomerForm";
import { customerAPI } from "../api/endPoints";
import { getCustomersNames } from "../functions/customerFunctions";

export default function CustomerModal(props: any) {
  let customersNames = getCustomersNames(props.customers);
  console.log(customersNames);

  const initialValues = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  };

  const hideModal = () => {
    props.hideModal();
  };

  const handleSubmit = async (formdata: any) => {
    console.log(`Submitted: `, formdata);
    hideModal();

    try {
      if (formdata.customer_id)
        await axios.put("http://localhost:8080" + customerAPI, formdata);
      else
        await axios.post(
          "http://localhost:8080" + customerAPI,
          Object.values(formdata)
        );
    } catch (err) {
      console.log(err);
    }
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
              flag="add"
              initialValues={initialValues}
              customersNames={customersNames}
              handleSubmit={handleSubmit}
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
