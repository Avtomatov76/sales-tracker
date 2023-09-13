import { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { validateCustomer } from "../../functions/customerFunctions";
import CustomButton from "../../components/CustomButton";
import AddUpdateTransaction from "./AddUpdateTransaction";
import CustomersDropdown from "../../dropdowns/CustomersDropdown";
import ModalHeader from "../../modals/ModalHeader";
import { validateTransaction } from "../../functions/transactionsFunctions";
import OutsideClickHandler from "react-outside-click-handler";
import moment from "moment";

export default function TransactionForm(props: any) {
  const [customerOptions, setCustomerOptions] = useState(false);
  const [error, setError] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>();
  const [formValues, setFormValues] = useState<any>();

  const addCustomerFromDB = () => {
    setCustomerOptions(true);
  };

  const handleCancel = () => {
    props.hideModal();
  };

  console.log("********** transactions **********  : ", props.transaction);

  useEffect(() => {
    if (props.flag == "edit")
      setFormValues({
        product_id: props.transaction.product_id,
        transaction_id: props.transaction.transaction_id,
        total: props.transaction.cost,
        commission: props.transaction.commission,
        payment: props.transaction.transaction_type,
        status: props.transaction.is_comm_received,
        start: moment(props.transaction.start).format("YYYY-MM-DD"),
        end: moment(props.transaction.end).format("YYYY-MM-DD"),
        saleDate: moment(props.transaction.date).format("YYYY-MM-DD"),
        partySize: props.transaction.party,
        destination: props.transaction.destination,
        travelType: props.transaction.travel_type,
        vendor: props.transaction.vendor_id,
        supplier: props.transaction.supplier,
        //supplier_name: props.transaction.supplier_name,
        notes: props.transaction.notes,
      });
  }, []);

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

  //
  console.log("UPDATED FORM VALUES!!!! ", formValues, props.flag);
  //

  const submitForm = () => {
    console.log("customer: ", formValues);
    if (!formValues) {
      alert(`Form is empty - Please enter required data!`);
      return;
    }

    if (props.flag == "add") {
      let { validCustomer, error } = validateCustomer(
        formValues,
        props.customers
      );

      if (!validCustomer) {
        setError(error);
        console.log("There are erorrs in your form!!");
        return;
      }
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
          flag={props.flag}
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

  return (
    <View style={styles.modalView}>
      <ModalHeader
        flag={props.flag}
        title="Transaction"
        onPress={props.hideModal}
      />

      {props.flag == "edit" ? null : (
        <View style={{ marginLeft: 5, zIndex: 1, marginBottom: 5 }}>
          {!customerOptions ? (
            <View style={{ height: 20 }}>
              <Text
                style={{ color: "blue" }}
                onPress={() => addCustomerFromDB()}
              >
                &#43; Add customer from DB
              </Text>
            </View>
          ) : (
            <OutsideClickHandler
              onOutsideClick={() => setCustomerOptions(false)}
            >
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
      )}

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
        <CustomButton
          submitForm={submitForm}
          flag={props.flag == "edit" ? "update" : "add"}
          type="text"
        />
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
