import { useState } from "react";
import axios from "axios";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { suppliersAPI } from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import ModalHeader from "./ModalHeader";
import SupplierForm from "../forms/suppliers/SupplierForm";

export default function SupplierModal(props: any) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  console.log(props.supplier);

  const initialValues = {
    id: props.flag === "edit" ? props.supplier.supplier_id : "",
    name: props.flag === "edit" ? props.supplier.supplier_name : "",
    phone: props.flag === "edit" ? props.supplier.supplier_phone : "",
  };

  let baseUrl = GetConfiguration().baseUrl;

  const hideModal = () => {
    props.hideModal();
  };

  const handleSubmit = async (formData: any) => {
    hideModal();

    console.log("about to submit stuff -- ", formData, props.flag);

    // if (props.flag === "edit") formData.id = props.id;
    if (props.flag === "edit") formData.prevId = props.id;

    try {
      if (props.flag === "edit")
        await axios.put(baseUrl + suppliersAPI, formData);
      else if (props.flag === "add") {
        await axios.post(baseUrl + suppliersAPI, formData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      isVisible={props.visible}
      style={styles.modal}
      backdropColor="rgba(0, 0, 0, 0.3)"
      onBackdropPress={hideModal}
    >
      <View style={styles.modalView}>
        <ModalHeader flag={props.flag} title="Supplier" onPress={hideModal} />

        <View style={{ display: "flex", flexDirection: "column" }}>
          <SupplierForm
            flag={props.flag}
            error={error}
            message={message}
            id={props.id}
            suppliers={props.suppliers}
            initialValues={initialValues}
            hideModal={hideModal}
            handleSubmit={handleSubmit}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: 450,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
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
