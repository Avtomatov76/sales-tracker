import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Button } from "react-native-paper";

export default function InfoModal(props: any) {
  const hideModal = () => {
    props.hideModal();
  };

  let list = props.list;

  const displayList = () => {
    return (
      <View>
        {list.map((entry: any, index: any) => (
          <Text key={index} style={{ color: "green" }}>
            {entry}
          </Text>
        ))}
      </View>
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
              <Pressable
                style={{
                  alignSelf: "flex-end",
                  //marginTop: 10,
                  //marginBottom: 20,
                  marginRight: -20,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
                onPress={props.hideModal}
              >
                <Text>&#10005;</Text>
              </Pressable>
              <Text
                style={{
                  color: "purple",
                  marginBottom: 10,
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                CONFIRMATION
              </Text>
              <Text
                style={{
                  color: "grey",
                  fontSize: 12,
                  textAlign: "center",
                }}
              >
                Do you want to upload the following {props.recordType}?
              </Text>
              <View
                style={{ width: "100%", paddingTop: 10, paddingBottom: 10 }}
              >
                <Text style={styles.text}>{displayList()}</Text>
              </View>

              <View
                style={{
                  //flexDirection: "row",
                  //justifyContent: "center",
                  marginTop: 20,
                  width: "100%",
                }}
              >
                <Button
                  mode="contained"
                  //color="#f27d42"
                  //buttonColor="#f27d42"
                  style={styles.btn}
                  onPress={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  mode="contained"
                  //color="#f27d42"
                  //buttonColor="#f27d42"
                  style={[
                    styles.btn,
                    { marginTop: 10, backgroundColor: "red" },
                  ]}
                  onPress={() => props.hideModal()}
                >
                  Cancel
                </Button>
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
    borderRadius: 20,
    paddingTop: 15,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btn: {
    //width: 100,
    //width: 100,
    //backgroundColor: "#ffffff",
  },
  text: {
    //height: "80%",
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "purple",
    overflow: "hidden",
  },
});
