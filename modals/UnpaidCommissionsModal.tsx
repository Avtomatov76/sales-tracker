import { View, Text, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CommissionsEntry from "../components/CommissionsEntry";
import ErrorMessage from "../components/ErrorMessage";

export default function UpdaidCommissionsModal(props: any) {
  const hideModal = () => {
    props.hideModal();
  };

  return (
    <Modal
      isVisible={props.visible}
      style={styles.modal}
      backdropColor="rgba(0, 0, 0, 0.3)"
      onBackdropPress={hideModal}
    >
      <View style={styles.modalView}>
        <View
          style={{ display: "flex", flexDirection: "column", marginTop: 20 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "blue", fontSize: 20, fontWeight: "400" }}>
              Unpaid Commissions
            </Text>
            &nbsp;
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              {props.data.length}
            </Text>
          </View>
          {props.data.length ? (
            <ScrollView style={styles.scrollView}>
              {props.data.map((entry: any, index: any) => (
                <CommissionsEntry key={index} entry={entry} />
              ))}
            </ScrollView>
          ) : (
            <ErrorMessage
              error="No commission information found in the database!"
              type="server"
            />
          )}
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
    width: 550,
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
  scrollView: {
    display: "flex",
    maxHeight: 550,
    //width: 450, //"50%",
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
