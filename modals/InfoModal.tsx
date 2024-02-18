import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from "react-native";
import { getProductsAsStrings } from "../functions/csvUploaderFunctions";
import CustomButton from "../components/CustomButton";

export default function InfoModal(props: any) {
  const hideModal = () => {
    props.hideModal();
  };

  let uniqueCustomers = props.uniqueCustomers;
  let dupeCustomers = props.dupeCustomers;
  let uniqueProducts = getProductsAsStrings(props.productData) || [];
  let dupeProducts = props.dupeProducts;

  const displayData = (arrayOfDupes: any, arrayOfUniques: any, title: any) => {
    if (!arrayOfDupes || !arrayOfUniques) return null;

    return (
      <ScrollView style={styles.scrollView}>
        <Text style={styles.modalSubtitle}>{title}</Text>
        {arrayOfDupes.length != 0
          ? arrayOfDupes.map((entry: any, index: any) => (
              <View key={index} style={{ flexDirection: "row" }}>
                <Text style={{ color: "red" }}>{entry}</Text>
              </View>
            ))
          : null}
        {arrayOfUniques.map((entry: any, index: any) => (
          <View key={index} style={{ display: "flex" }}>
            <Text style={{ color: "green" }}>{entry}</Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  const handleSubmit = () => {
    props.upload();
    hideModal();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.visible}
        onRequestClose={hideModal}
      >
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", height: "100%" }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.modalTitle}>Confirmation</Text>
                <Pressable onPress={props.hideModal}>
                  <Text style={{ color: "grey" }}>&#10005;</Text>
                </Pressable>
              </View>

              <View
                style={{ width: "100%", paddingTop: 10, paddingBottom: 10 }}
              >
                {displayData(dupeCustomers, uniqueCustomers, "Customers")}

                {displayData(dupeProducts, uniqueProducts, "Products")}
                <Text
                  style={{
                    marginTop: 5,
                    color: "grey", //"rgb(54, 140, 191)",
                    fontSize: 12,
                  }}
                >
                  &#42; Entries in <Text style={{ color: "red" }}>RED</Text>{" "}
                  will not be uploaded because they are already present in the
                  database.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 40,
                  width: "100%",
                }}
              >
                <View style={{ marginRight: 20 }}>
                  <CustomButton
                    flag="cancel"
                    hideModal={() => props.hideModal()}
                  />
                </View>
                <CustomButton
                  flag="add"
                  type="text"
                  submitForm={handleSubmit}
                />
              </View>
            </View>
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
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "600",
  },
  modalSubtitle: {
    color: "grey",
    fontSize: 18,
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 200,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
});
