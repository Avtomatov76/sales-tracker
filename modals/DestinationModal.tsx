import { useState } from "react";
import axios from "axios";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { destinationsAPI } from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import ModalHeader from "./ModalHeader";
import DestinationForm from "../forms/destinations/DestinationForm";

export default function DestinationModal(props: any) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const initialValues = {
    code: props.flag === "edit" ? props.destination.destination_id : "",
    location: props.flag === "edit" ? props.destination.destination_name : "",
  };

  let baseUrl = GetConfiguration().baseUrl;

  const hideModal = () => {
    props.hideModal();
  };

  const handleSubmit = async (formData: any) => {
    hideModal();

    if (props.flag === "edit") formData.id = props.id;

    try {
      if (props.flag === "edit")
        await axios.put(baseUrl + destinationsAPI, formData);
      else if (props.flag === "add") {
        await axios.post(baseUrl + destinationsAPI, formData);
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
        <ModalHeader
          flag={props.flag}
          title="Destination"
          onPress={hideModal}
        />

        <View style={{ display: "flex", flexDirection: "column" }}>
          <DestinationForm
            flag={props.flag}
            error={error}
            message={message}
            id={props.id}
            destinations={props.destinations}
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
