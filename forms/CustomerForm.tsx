import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { Button } from "react-native-paper";

export default function CustomerForm(props: any) {
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: props.initialValues.firstName,
    lastName: props.initialValues.lastName,
    address: props.initialValues.address,
    city: props.initialValues.city,
    state: props.initialValues.state,
    phone: props.initialValues.phone,
    email: props.initialValues.email,
  });

  const customersNames = props.customersNames;
  console.log(customersNames);

  const errors = {
    firstName: "You must enter customer's first name!",
    lastName: "You must enter customer's last name!",
    phoneEmpty: "You musr enter customer's phone number!",
    phoneWrong: "Phone number must be 10 or 11 numbers long!",
  };

  const handleOnChange = (e: any, name: any) => {
    setError(false);
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const submitForm = () => {
    let isValid = validateForm();
    if (!isValid) {
      console.log("There are erorrs in your form!!");
      return;
    }

    props.handleSubmit(formValues);
  };

  const validateForm = () => {
    if (!formValues.firstName || !formValues.lastName || !formValues.phone) {
      setError(true);
      return false;
    }

    if (formValues.phone.length < 10 || formValues.phone.length > 11) {
      setError(true);
      return false;
    }

    let isDupe = checkNameForDupes(formValues.firstName, formValues.lastName);
    if (isDupe) {
      alert(
        `${formValues.firstName} ${formValues.lastName} - is already in the database.  Please update the customer instead of adding a duplicate record!`
      );
      return false;
    }

    return true;
  };

  const checkNameForDupes = (fName: any, lName: any) => {
    let name = fName.trim().toLowerCase() + " " + lName.trim().toLowerCase();
    if (customersNames.includes(name)) return true;

    return false;
  };

  const handleBlur = (field: any) => {
    // if (!formValues[field]) {
    //   console.log(field);
    //   setError(errors[field]);
    // }
    //setError(true);
  };

  console.log(formValues);
  console.log(error);

  return (
    <View style={styles.modalView}>
      <Pressable
        style={{
          alignSelf: "flex-end",
          marginTop: 10,
          marginBottom: 20,
          marginRight: -20,
          paddingLeft: 5,
          paddingRight: 5,
        }}
        onPress={props.hideModal}
      >
        <Text>&#10005;</Text>
      </Pressable>
      <View style={{ width: "100%" }}>
        {error && !formValues.firstName ? (
          <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
            {errors.firstName}
          </Text>
        ) : null}
        <TextInput
          onBlur={() => handleBlur("firstName")}
          value={formValues.firstName}
          placeholder="First name"
          placeholderTextColor="grey"
          onChange={(e) => handleOnChange(e, "firstName")}
          style={styles.textInput}
        />
        {error && !formValues.lastName ? (
          <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
            {errors.lastName}
          </Text>
        ) : null}
        <TextInput
          onBlur={() => handleBlur("lastName")}
          value={formValues.lastName}
          placeholder="Last name"
          placeholderTextColor="grey"
          onChange={(e) => handleOnChange(e, "lastName")}
          style={styles.textInput}
        />

        <TextInput
          //onBlur={handleBlur("address")}
          value={formValues.address}
          placeholder="Address"
          placeholderTextColor="grey"
          onChange={(e) => handleOnChange(e, "address")}
          style={styles.textInput}
        />

        <TextInput
          //onBlur={handleBlur("city")}
          value={formValues.city}
          placeholder="City"
          placeholderTextColor="grey"
          onChange={(e) => handleOnChange(e, "city")}
          style={styles.textInput}
        />

        <TextInput
          //onBlur={handleBlur("state")}
          value={formValues.state}
          placeholder="State, ex: 'OR'"
          placeholderTextColor="grey"
          onChange={(e) => handleOnChange(e, "state")}
          style={styles.textInput}
        />
        {error && !formValues.phone ? (
          <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
            {errors.phoneEmpty}
          </Text>
        ) : (error && formValues.phone.length < 10) ||
          formValues.phone.length > 11 ? (
          <Text style={{ color: "red", fontSize: 12, marginBottom: 5 }}>
            {errors.phoneWrong}
          </Text>
        ) : null}
        <TextInput
          onBlur={() => handleBlur("phone")}
          value={formValues.phone}
          placeholder="(888) 777-9999"
          placeholderTextColor="grey"
          onChange={(e) => handleOnChange(e, "phone")}
          style={styles.textInput}
        />

        <TextInput
          //onBlur={handleBlur("email")}
          value={formValues.email}
          placeholder="some@email.com"
          placeholderTextColor="grey"
          onChange={(e) => handleOnChange(e, "email")}
          style={styles.textInput}
        />
      </View>

      <View style={{ marginTop: 20, width: "100%" }}>
        <Button
          mode="contained"
          //color="#f27d42"
          //buttonColor="#f27d42"
          style={styles.addBtn}
          onPress={submitForm}
        >
          Submit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: 300,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 35,
    paddingRight: 35,
    paddingBottom: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addBtn: {
    width: "100%",
    //width: 100,
    //backgroundColor: "#ffffff",
  },
  textInput: {
    //display: "flex",
    //flex: 1,
    //width: "100%",
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
