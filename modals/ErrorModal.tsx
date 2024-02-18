import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Button } from "react-native-paper";
import CustomButton from "../components/CustomButton";

export default function ErrorModal(props: any) {
  const hideModal = () => {
    props.hideModal();
  };

  //let list = props.list;

  // const displayList = () => {
  //   return (
  //     <View>
  //       {list.map((entry: any, index: any) => (
  //         <Text key={index} style={{ color: "red" }}>
  //           {entry}
  //         </Text>
  //       ))}
  //     </View>
  //   );
  // };

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
                  color: "red",
                  marginBottom: 10,
                  fontSize: 40,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                WARNING!
              </Text>

              <View>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 24,
                    textAlign: "center",
                    marginTop: 20,
                    marginBottom: 30,
                  }}
                >
                  {props.error}
                </Text>
              </View>

              {/* {props.recordType == "customers" ? (
                <>
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    Following {props.recordType} are already in the database
                  </Text>
                  <View
                    style={{ width: "100%", paddingTop: 10, paddingBottom: 10 }}
                  >
                    <Text style={styles.text}>{displayList()}</Text>
                  </View>
                </>
              ) : (
                <View>
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 12,
                      textAlign: "center",
                    }}
                  >
                    No date range has been selected!
                  </Text>
                </View>
              )} */}

              <View style={{ marginTop: 20 }}>
                <CustomButton
                  flag="cancel"
                  title="Close"
                  hideModal={() => props.hideModal()}
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
    borderRadius: 12,
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
});
