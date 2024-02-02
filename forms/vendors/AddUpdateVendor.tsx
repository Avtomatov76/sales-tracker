import { Text, View, TextInput, StyleSheet, Picker } from "react-native";

export default function AddUpdateVendor(props: any) {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <Text
            style={
              props.error && !props.formValues.firstName
                ? [styles.legend, { color: "red" }]
                : styles.legend
            }
          >
            Vendor ID
          </Text>
          <TextInput
            placeholderTextColor="grey"
            style={[
              styles.textInput,
              {
                borderColor:
                  props.error && !props.formValues.firstName ? "red" : "#CCC",
              },
            ]}
            onChange={(e) => props.handleOnChange(e, "firstName")}
            value={
              !props.formValues || !props.formValues.firstName
                ? ""
                : props.formValues.firstName
            }
          />
        </View>

        <View style={{ width: "50%" }}>
          <Text
            style={
              props.error && !props.formValues.lastName
                ? [styles.legend, { color: "red" }]
                : styles.legend
            }
          >
            Vendor Name
          </Text>
          <TextInput
            placeholderTextColor="grey"
            style={[
              styles.textInput,
              {
                borderColor:
                  props.error && !props.formValues.lastName ? "red" : "#CCC",
              },
            ]}
            value={
              !props.formValues || !props.formValues.lastName
                ? ""
                : props.formValues.lastName
            }
            onChange={(e) => props.handleOnChange(e, "lastName")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    margin: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#CCC",
    fontWeight: "400",
  },
  legend: {
    display: "flex",
    width: "fit-content",
    position: "relative",
    fontSize: 10,
    marginBottom: -13,
    marginLeft: 12,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#368cbf",
    backgroundColor: "#FFFFFF",
  },
});
