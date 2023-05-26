import { StyleSheet } from "react-native";
import { Button as Btn } from "react-native-paper";

export default function CustomButton(props: any) {
  const renderBtn = () => {
    if (props.flag === "add")
      return (
        <Btn
          mode="contained"
          style={props.btnStyles ? props.btnStyles : styles.submitBtn}
          onPress={props.submitForm}
        >
          {props.title ? props.title : "Submit"}
        </Btn>
      );

    if (props.flag === "delete")
      return (
        <Btn
          mode="contained"
          style={styles.deleteBtn}
          onPress={props.handleDelete}
        >
          Delete
        </Btn>
      );

    if (props.flag === "cancel")
      return (
        <Btn style={styles.cancelBtn} onPress={props.hideModal}>
          Cancel
        </Btn>
      );
  };

  return <>{renderBtn()}</>;
}

const styles = StyleSheet.create({
  submitBtn: {
    marginBottom: 10,
    color: "#FFFFFF",
    backgroundColor: "#368cbf",
  },
  deleteBtn: {
    marginBottom: 10,
    backgroundColor: "red",
  },
  cancelBtn: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
});
