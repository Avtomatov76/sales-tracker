import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { nanoid } from "nanoid";
import { Button } from "react-native-paper";
import AddUpdateForm from "./form-parts/AddUpdateForm";
import DetailsForm from "./form-parts/DetailsForm";
import CustomerCard from "../components/cards/CustomerCard";
import { checkNameForDupes } from "../functions/customerFunctions";
import ConfirmDelete from "./form-parts/ConfirmDelete";
import CustomButton from "../components/CustomButton";

export default function CustomerForm(props: any) {
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({
    id: props.initialValues.id,
    firstName: props.initialValues.firstName,
    lastName: props.initialValues.lastName,
    address: props.initialValues.address,
    city: props.initialValues.city,
    state: props.initialValues.state,
    phone: props.initialValues.phone,
    email: props.initialValues.email,
  });

  const customersNames = props.customersNames;
  // console.log(customersNames);
  // console.log(props.index);
  // console.log(props.flag);
  console.log(props.customers);

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
    console.log(props.flag);
    //if (props.flag === "delete") props.handleSubmit({});

    let isValid = validateForm();
    if (!isValid) {
      console.log("There are erorrs in your form!!");
      return;
    }

    let values = formValues;

    if (props.flag === "add") {
      let id = nanoid();
      values.id = id;
    }

    props.handleSubmit(values);
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

    let isDupe = checkNameForDupes(
      formValues.firstName,
      formValues.lastName,
      props.customers
    );
    if (isDupe) {
      alert(
        `${formValues.firstName} ${formValues.lastName} - is already in the database.  Please update the customer instead of adding a duplicate record!`
      );
      return false;
    }

    return true;
  };

  const handleBlur = (field: any) => {
    // if (!formValues[field]) {
    //   console.log(field);
    //   setError(errors[field]);
    // }
    //setError(true);
  };

  const displayFormContent = () => {
    if (props.flag === "details")
      return <CustomerCard customer={props.customer} />;

    if (props.flag === "delete")
      return (
        <ConfirmDelete
          hideModal={props.hideModal}
          customerId={props.customerId}
          customer={props.customer}
          //submitForm={submitForm()}
          deleteCustomer={props.deleteCustomer}
        />
      );

    if (props.flag === "add" || props.flag === "edit")
      return (
        <AddUpdateForm
          formValues={formValues}
          error={error}
          errors={errors}
          handleBlur={handleBlur}
          handleOnChange={handleOnChange}
          submitForm={submitForm}
          hideModal={props.hideModal}
        />
      );
  };

  //console.log(formValues);
  //console.log(error);

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

      {displayFormContent()}
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
    paddingLeft: 30, //35
    paddingRight: 30, //35
    paddingBottom: 30, //35
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
