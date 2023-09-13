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

    if (
      (props.flag == "add" && props.type == "text") ||
      (props.flag == "update" && props.type == "text")
    )
      return (
        <Text
          style={{ color: "#F27D42", fontWeight: "700", marginRight: 15 }}
          onPress={props.submitForm}
        >
          {props.flag.toUpperCase()}
        </Text>
      );

    if (props.flag == "add" && props.type == "button")
      return (
        <Btn
          mode="contained"
          style={styles.submitBtn}
          onPress={props.submitForm}
        >
          {props.title ? props.title : "SUBMIT"}
        </Btn>
      );

    if (props.flag == "delete")
      return (
        <Text
          style={{ color: "#F27D42", fontWeight: "700", marginRight: 15 }}
          onPress={props.handleDelete}
        >
          {props.flag.toUpperCase()}
        </Text>

        // <Btn
        //   mode="contained"
        //   style={styles.deleteBtn}
        //   onPress={props.handleDelete}
        // >
        //   DELETE
        // </Btn>
      );

    if (props.flag == "cancel" || props.flag == "ok")
      return (
        // <Btn
        //   textColor="#368cbf"
        //   style={styles.cancelBtn}
        //   onPress={props.hideModal}
        // >
        //   CANCEL
        // </Btn>

        <View style={{ marginRight: 25 }}>
          <Text
            style={{ color: "grey", fontWeight: "700" }}
            onPress={props.hideModal}
          >
            {props.flag.toUpperCase()}
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
    borderRadius: 5,
  },
  submitBtn: {
    display: "flex",
    justifyContent: "center",
    height: 35,
    color: "#FFFFFF",
    backgroundColor: "#F27D42", //"#368cbf", //"#F27D42", //"#368cbf",
    borderRadius: 5,
  },
  deleteBtn: {
    display: "flex",
    backgroundColor: "red",
    borderRadius: 5,
  },
  cancelBtn: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#368cbf",
    borderRadius: 5,
  },
});
