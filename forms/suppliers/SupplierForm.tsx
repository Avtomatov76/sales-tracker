import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { nanoid } from "nanoid";
//import AddUpdateCustomer from "./AddUpdateCustomer";
import CustomerCard from "../../components/cards/customers/CustomerCard";
import { validateCustomer } from "../../functions/customerFunctions";
//import ConfirmDelete from "./ConfirmDelete";
import CustomButton from "../../components/CustomButton";
import ModalHeader from "../../modals/ModalHeader";
import AddUpdateSupplier from "./AddUpdateSupplier";

export default function SupplierForm(props: any) {
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

  const handleOnChange = (e: any, name: any) => {
    setError(false);

    if (name == "state")
      setFormValues({
        ...formValues,
        [name]: e,
      });
    else
      setFormValues({
        ...formValues,
        [name]: e.target.value,
      });
  };

  const submitForm = () => {
    let { validCustomer, error } = validateCustomer(
      formValues,
      props.customers
    );

    if (!validCustomer) {
      setError(error);
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

  const displayFormContent = () => {
    if (props.flag === "details")
      return <CustomerCard customer={props.customer} />;

    // if (props.flag === "delete")
    //   return (
    //     <ConfirmDelete
    //       message={props.message}
    //       hideModal={props.hideModal}
    //       customerId={props.customerId}
    //       customer={props.customer}
    //       deleteCustomer={props.deleteCustomer}
    //       handleOKpress={props.handleOKpress}
    //     />
    //   );

    if (props.flag === "add" || props.flag === "edit")
      return (
        <AddUpdateSupplier
          formValues={formValues}
          error={error}
          handleOnChange={handleOnChange}
          hideModal={props.hideModal}
        />
      );
  };

  return (
    <View style={styles.modalView}>
      <ModalHeader
        flag={props.flag}
        title="Supplier"
        onPress={props.hideModal}
      />

      {displayFormContent()}

      {props.flag == "edit" || props.flag == "add" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
            width: "100%",
          }}
        >
          <View style={{ marginRight: 20 }}>
            <CustomButton
              hideModal={props.hideModal}
              flag="cancel"
              type="text"
            />
          </View>
          <CustomButton submitForm={submitForm} flag="add" type="text" />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: 450,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
