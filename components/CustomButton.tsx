import { StyleSheet } from "react-native";
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

    if (props.flag === "add")
      return (
        <Btn
          mode="contained"
          style={props.btnStyles ? props.btnStyles : styles.submitBtn}
          onPress={props.submitForm}
        >
          {props.title ? props.title : "SUBMIT"}
        </Btn>
      );

    if (props.flag === "delete")
      return (
        <Btn
          mode="contained"
          style={styles.deleteBtn}
          onPress={props.handleDelete}
        >
          DELETE
        </Btn>
      );

    if (props.flag === "cancel")
      return (
        <Btn
          textColor="#368cbf"
          style={styles.cancelBtn}
          onPress={props.hideModal}
        >
          CANCEL
        </Btn>
      );
  };

  return <>{renderBtn()}</>;
}

const styles = StyleSheet.create({
  searchBtn: {
    display: "flex",
    color: "#FFFFFF",
    backgroundColor: "#F27D42", //"#368cbf",
    borderRadius: 12,
  },
  submitBtn: {
    display: "flex",
    color: "#FFFFFF",
    backgroundColor: "#368cbf", //"#F27D42", //"#368cbf",
    borderRadius: 12,
  },
  deleteBtn: {
    display: "flex",
    backgroundColor: "red",
    borderRadius: 12,
  },
  cancelBtn: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#368cbf",
    borderRadius: 12,
  },
});
