import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { validateCustomer } from "../../functions/customerFunctions";
import CustomButton from "../../components/CustomButton";
import AddUpdateTransaction from "./AddUpdateTransaction";
import CustomersDropdown from "../../dropdowns/CustomersDropdown";
import ModalHeader from "../../modals/ModalHeader";
import { validateTransaction } from "../../functions/transactionsFunctions";
import OutsideClickHandler from "react-outside-click-handler";

export default function TransactionForm(props: any) {
  const [customerOptions, setCustomerOptions] = useState(false);
  const [error, setError] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [formValues, setFormValues] = useState<any>();

  const selectCustomer = (customer: any) => {
    setSelectedCustomer(customer);

    setFormValues({
      id: customer.customer_id,
      firstName: customer.first_name,
      lastName: customer.last_name,
      address: customer.street_address,
      city: customer.city,
      state: customer.state,
      phone: customer.cust_phone,
      email: customer.email,
    });
  };

  const handleOnChange = (e: any, name: any, flag = "") => {
    let arr = ["state", "start", "end", "saleDate"];

    if (arr.includes(name) || flag == "selected")
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
    console.log("customer: ", formValues);
    if (!formValues) {
      alert(`Form is empty - Please enter required data!`);
      return;
    }

    let { validCustomer, error } = validateCustomer(
      formValues,
      props.customers
    );

    if (!validCustomer) {
      setError(error);
      console.log("There are erorrs in your form!!");
      return;
    }

    let { validTransaction, transError } = validateTransaction(
      formValues,
      props.products
    );

    if (!validTransaction) {
      setError(transError);
      console.log("There are erorrs in your form!!");
      return;
    }

    let values = formValues;

    props.handleSubmit(values);
  };

  const displayFormContent = () => {
    if (props.flag === "add" || props.flag === "edit")
      return (
        <AddUpdateTransaction
          customer={selectedCustomer || {}}
          formValues={formValues || ""}
          vendors={!props.vendors ? null : props.vendors}
          suppliers={!props.suppliers ? null : props.suppliers}
          travelTypes={!props.travelTypes ? null : props.travelTypes}
          destinations={!props.destinations ? null : props.destinations}
          error={error}
          handleOnChange={handleOnChange}
          hideModal={props.hideModal}
        />
      );
  };

  const addCustomerFromDB = () => {
    setCustomerOptions(true);
  };

  const handleCancel = () => {
    props.hideModal();
  };

  return (
    <View style={styles.modalView}>
      <ModalHeader
        flag={props.flag}
        title="Transaction"
        onPress={props.hideModal}
      />

      <View style={{ marginLeft: 5, zIndex: 1, marginBottom: 5 }}>
        {!customerOptions ? (
          <View style={{ height: 20 }}>
            <Text style={{ color: "blue" }} onPress={() => addCustomerFromDB()}>
              &#43; Add customer from DB
            </Text>
          </View>
        ) : (
          <OutsideClickHandler onOutsideClick={() => setCustomerOptions(false)}>
            <View style={{ height: 20 }}>
              <CustomersDropdown
                flag="customer"
                customers={props.customers}
                selectCustomer={selectCustomer}
                hideDropdown={() => setCustomerOptions(false)}
              />
            </View>
          </OutsideClickHandler>
        )}
      </View>

      {displayFormContent()}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20,
          width: "100%",
        }}
      >
        <View style={{ marginRight: 20 }}>
          <CustomButton hideModal={handleCancel} flag="cancel" type="text" />
        </View>
        <CustomButton submitForm={submitForm} flag="add" type="text" />
      </View>
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
