import { Text, View, TextInput, StyleSheet } from "react-native";

export default function AddForm(props: any) {
  return (
    <View style={{ width: "100%" }}>
      {props.error && !props.formValues.firstName ? (
        <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
          {props.errors.firstName}
        </Text>
      ) : null}
      <TextInput
        onBlur={props.handleBlur("firstName")}
        value={props.formValues.firstName}
        placeholder="First name"
        placeholderTextColor="grey"
        onChange={(e) => props.handleOnChange(e, "firstName")}
        style={styles.textInput}
      />
      {props.error && !props.formValues.lastName ? (
        <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
          {props.errors.lastName}
        </Text>
      ) : null}
      <TextInput
        onBlur={props.handleBlur("lastName")}
        value={props.formValues.lastName}
        placeholder="Last name"
        placeholderTextColor="grey"
        onChange={(e) => props.handleOnChange(e, "lastName")}
        style={styles.textInput}
      />

      <TextInput
        //onBlur={handleBlur("address")}
        value={props.formValues.address}
        placeholder="Address"
        placeholderTextColor="grey"
        onChange={(e) => props.handleOnChange(e, "address")}
        style={styles.textInput}
      />

      <TextInput
        //onBlur={handleBlur("city")}
        value={props.formValues.city}
        placeholder="City"
        placeholderTextColor="grey"
        onChange={(e) => props.handleOnChange(e, "city")}
        style={styles.textInput}
      />

      <TextInput
        //onBlur={handleBlur("state")}
        value={props.formValues.state}
        placeholder="State, ex: 'OR'"
        placeholderTextColor="grey"
        onChange={(e) => props.handleOnChange(e, "state")}
        style={styles.textInput}
      />
      {props.error && !props.formValues.phone ? (
        <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
          {props.errors.phoneEmpty}
        </Text>
      ) : (props.error && props.formValues.phone.length < 10) ||
        props.formValues.phone.length > 11 ? (
        <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
          {props.errors.phoneWrong}
        </Text>
      ) : null}
      <TextInput
        onBlur={props.handleBlur("phone")}
        value={props.formValues.phone}
        placeholder="(888) 777-9999"
        placeholderTextColor="grey"
        onChange={(e) => props.handleOnChange(e, "phone")}
        style={styles.textInput}
      />

      <TextInput
        //onBlur={handleBlur("email")}
        value={props.formValues.email}
        placeholder="some@email.com"
        placeholderTextColor="grey"
        onChange={(e) => props.handleOnChange(e, "email")}
        style={styles.textInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "purple",
  },
});
