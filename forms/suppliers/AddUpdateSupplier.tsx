import { Text, View, TextInput, StyleSheet, Picker } from "react-native";

export default function AddUpdateSupplier(props: any) {
  console.log(props.error);

  function checkUserInput(entryType: any) {
    if (props.formValues["entryType"] === "") return false;

    if (entryType === "id" && props.formValues.id.length < 3) return false;

    if (entryType === "phone" && props.formValues.phone.length < 10)
      return false;
  }

  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <Text
            style={
              props.error && props.formValues.id.length < 3
                ? [styles.legend, { color: "red" }]
                : styles.legend
            }
          >
            Supplier ID
          </Text>
          <TextInput
            autoCapitalize="characters"
            maxLength={3}
            placeholderTextColor="grey"
            style={[
              styles.textInput,
              {
                borderColor:
                  props.error && props.formValues.id.length < 3
                    ? "red"
                    : "#CCC",
              },
            ]}
            onChange={(e) => props.handleOnChange(e, "id")}
            value={
              !props.formValues || !props.formValues.id
                ? ""
                : props.formValues.id
            }
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
            Supplier Name
          </Text>
          <TextInput
            placeholderTextColor="grey"
            style={[
              styles.textInput,
              {
                borderColor:
                  props.error && !props.formValues.name ? "red" : "#CCC",
              },
            ]}
            value={
              !props.formValues || !props.formValues.name
                ? ""
                : props.formValues.name
            }
            onChange={(e) => props.handleOnChange(e, "name")}
          />
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <Text
            style={
              props.error && props.formValues.phone.length < 10
                ? [styles.legend, { color: "red" }]
                : styles.legend
            }
          >
            Supplier Phone
          </Text>
          <TextInput
            maxLength={10}
            placeholderTextColor="grey"
            style={[
              styles.textInput,
              {
                borderColor:
                  props.error && props.formValues.phone.length < 10
                    ? "red"
                    : "#CCC",
              },
            ]}
            onChange={(e) => props.handleOnChange(e, "phone")}
            value={
              !props.formValues || !props.formValues.phone
                ? ""
                : props.formValues.phone
            }
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
