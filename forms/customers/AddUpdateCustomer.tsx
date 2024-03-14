import { Text, View, TextInput, StyleSheet, Picker } from "react-native";
import { STATES } from "../../constants/States";

export default function AddUpdateCustomer(props: any) {
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
            First Name
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
            Last Name
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

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <Text style={styles.legend}>Email</Text>
          <TextInput
            inputMode="email"
            placeholderTextColor="grey"
            style={styles.textInput}
            value={
              !props.formValues || !props.formValues.email
                ? ""
                : props.formValues.email
            }
            onChange={(e) => props.handleOnChange(e, "email")}
          />
        </View>

        <View style={{ width: "50%" }}>
          <Text
            style={
              props.error && !props.formValues.phone
                ? [styles.legend, { color: "red" }]
                : styles.legend
            }
          >
            Phone
          </Text>
          <TextInput
            inputMode="tel"
            maxLength={10}
            placeholderTextColor="grey"
            style={[
              styles.textInput,
              {
                borderColor:
                  props.error && !props.formValues.phone ? "red" : "#CCC",
              },
            ]}
            value={
              !props.formValues || !props.formValues.phone
                ? ""
                : props.formValues.phone
            }
            onChange={(e) => props.handleOnChange(e, "phone")}
          />
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <Text style={styles.legend}>Address</Text>
          <TextInput
            placeholderTextColor="grey"
            style={styles.textInput}
            value={
              !props.formValues || !props.formValues.address
                ? ""
                : props.formValues.address
            }
            onChange={(e) => props.handleOnChange(e, "address")}
          />
        </View>

        <View style={{ width: "50%" }}>
          <Text style={styles.legend}>City</Text>
          <TextInput
            placeholderTextColor="grey"
            style={styles.textInput}
            value={
              !props.formValues || !props.formValues.city
                ? ""
                : props.formValues.city
            }
            onChange={(e) => props.handleOnChange(e, "city")}
          />
        </View>
      </View>

      <View style={{ width: "25%" }}>
        <Text style={styles.legend}>State</Text>

        <Picker
          value={props.formValues.state || "na"}
          style={[
            styles.textInput,
            { fontSize: 14, paddingLeft: 10, backgroundColor: "#FFFFFF" },
          ]}
          onValueChange={(itemValue, itemIndex) =>
            props.handleOnChange(itemValue, "state")
          }
        >
          {STATES.map((v: any, index: any) => (
            <Picker.Item label={v} value={v} key={index} />
          ))}
        </Picker>
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
