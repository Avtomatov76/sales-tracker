import { Text, View, TextInput, StyleSheet, Picker } from "react-native";

export default function AddUpdateVendor(props: any) {
  return (
    <View style={{ display: "flex", flexDirection: "row", paddingBottom: 20 }}>
      <View style={{ width: "50%" }}>
        <Text
          style={
            (props.error && !props.formValues.code) ||
            (props.error && props.formValues.code.length < 3)
              ? [styles.legend, { color: "red" }]
              : styles.legend
          }
        >
          Vendor Code
        </Text>
        <TextInput
          maxLength={3}
          placeholderTextColor="grey"
          style={[
            styles.textInput,
            {
              borderColor:
                props.error && !props.formValues.code ? "red" : "#CCC",
            },
          ]}
          value={
            !props.formValues || !props.formValues.code
              ? ""
              : props.formValues.code
          }
          onChange={(e) => props.handleOnChange(e, "code")}
        />
      </View>

      <View style={{ width: "50%" }}>
        <Text
          style={
            props.error && !props.formValues.name
              ? [styles.legend, { color: "red" }]
              : styles.legend
          }
        >
          Name
        </Text>
        <TextInput
          inputMode="text"
          placeholderTextColor="grey"
          style={[
            styles.textInput,
            {
              borderColor:
                props.error && !props.formValues.name ? "red" : "#CCC",
            },
          ]}
          onChange={(e) => props.handleOnChange(e, "name")}
          value={
            !props.formValues || !props.formValues.name
              ? ""
              : props.formValues.name
          }
        />
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
