import { View, Text, StyleSheet } from "react-native";
import { Button as Btn } from "react-native-paper";

export default function CustomButton(props: any) {
  const renderBtn = () => {
    if (props.flag === "search")
      return (
        <Btn
          mode="contained"
          style={styles.searchBtn}
          onPress={props.submitForm}
        >
          Search
        </Btn>
      );

    if (props.flag == "add" && props.type == "text")
      return (
        <Text
          style={{ color: "#F27D42", fontWeight: "700", marginRight: 15 }}
          //onPress={() => console.log("Adding transaction...")}
          onPress={props.submitForm}
        >
          ADD
        </Text>
      );

    if (props.flag == "add" && props.type == "button")
      return (
        <Btn
          mode="contained"
          style={styles.submitBtn}
          //style={props.btnStyles ? props.btnStyles : styles.submitBtn}
          onPress={props.submitForm}
        >
          {props.title ? props.title : "SUBMIT"}
        </Btn>
      );

    if (props.flag == "delete")
      return (
        <Btn
          mode="contained"
          style={styles.deleteBtn}
          onPress={props.handleDelete}
        >
          DELETE
        </Btn>
      );

    if (props.flag == "cancel")
      return (
        // <Btn
        //   textColor="#368cbf"
        //   style={styles.cancelBtn}
        //   onPress={props.hideModal}
        // >
        //   CANCEL
        // </Btn>

        <View style={{ marginRight: 25 }}>
          {/* <CustomButton hideModal={props.hideModal} flag="cancel" /> */}
          <Text
            style={{ color: "grey", fontWeight: "700" }}
            onPress={props.hideModal}
            //onPress={() => console.log("Cancelling transaction...")}
          >
            CANCEL
          </Text>
        </View>
      );
  };

  return <>{renderBtn()}</>;
}

const styles = StyleSheet.create({
  searchBtn: {
    display: "flex",
    justifyContent: "center",
    height: 35,
    color: "#FFFFFF",
    backgroundColor: "#F27D42", //"#368cbf",
    borderRadius: 5, //12,
  },
  submitBtn: {
    display: "flex",
    justifyContent: "center",
    height: 35,
    color: "#FFFFFF",
    backgroundColor: "#F27D42", //"#368cbf", //"#F27D42", //"#368cbf",
    borderRadius: 5, //12,
  },
  deleteBtn: {
    display: "flex",
    backgroundColor: "red",
    borderRadius: 5, //12,
  },
  cancelBtn: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#368cbf",
    borderRadius: 5, //12,
  },
});
