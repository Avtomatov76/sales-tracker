import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { nanoid } from "nanoid";
//import AddUpdateCustomer from "./AddUpdateCustomer";
import CustomerCard from "../../components/cards/customers/CustomerCard";
import { validateVendor } from "../../functions/vendorFunctions";
//import ConfirmDelete from "./ConfirmDelete";
import CustomButton from "../../components/CustomButton";
import ModalHeader from "../../modals/ModalHeader";
import AddUpdateVendor from "./AddUpdateVendor";
import ConfirmDelete from "../../modals/ConfirmDelete";

export default function VendorForm(props: any) {
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({
    code: props.initialValues.code,
    name: props.initialValues.name,
  });

  //
  console.log("On change: ", formValues);

  const handleOnChange = (e: any, name: any) => {
    setError(false);

    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const submitForm = () => {
    if (
      formValues.code == "" ||
      formValues.name == "" ||
      formValues.code.length < 3
    ) {
      console.log("ERROR!!!");
      setError(true);
      return;
    }

    let { validVendor, error } = validateVendor(formValues, props.vendors);

    if (!validVendor) {
      setError(error);
      console.log("There are erorrs in your form!!");
      return;
    }

    let values = formValues;
    values.code = formValues.code.toUpperCase();
    props.handleSubmit(values);
  };

  // const displayFormContent = () => {
  //   if (props.flag === "details")
  //     return <CustomerCard customer={props.customer} />;

  //   // if (props.flag === "delete")
  //   //   return (
  //   //     <ConfirmDelete
  //   //       message={props.message}
  //   //       hideModal={props.hideModal}
  //   //       customerId={props.customerId}
  //   //       customer={props.customer}
  //   //       deleteCustomer={props.deleteCustomer}
  //   //       handleOKpress={props.handleOKpress}
  //   //     />
  //   //   );

  //   if (props.flag === "add" || props.flag === "edit")
  //     return (
  //       <AddUpdateVendor
  //         formValues={formValues}
  //         error={error}
  //         handleOnChange={handleOnChange}
  //         hideModal={props.hideModal}
  //       />
  //     );
  // };

  // return (
  //   <View style={styles.modalView}>
  //     <ModalHeader flag={props.flag} title="Vendor" onPress={props.hideModal} />

  //     {/* {displayFormContent()} */}

  //     {props.flag == "edit" || props.flag == "add" ? (
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "flex-end",
  //           marginTop: 20,
  //           width: "100%",
  //         }}
  //       >
  //         <View style={{ marginRight: 20 }}>
  //           <CustomButton
  //             hideModal={props.hideModal}
  //             flag="cancel"
  //             type="text"
  //           />
  //         </View>
  //         <CustomButton submitForm={submitForm} flag="add" type="text" />
  //       </View>
  //     ) : null}
  //   </View>
  // );

  return (
    <View>
      {props.flag === "delete" ? (
        <ConfirmDelete
          flag="vendor"
          message={props.message}
          hideModal={props.hideModal}
          recordId={props.formValues.code}
          record={props.vendor}
          deleteRecord={props.deleteVendor}
          handleOKpress={props.handleOKpress}
        />
      ) : (
        <AddUpdateVendor
          flag={props.flag}
          error={error}
          formValues={formValues}
          handleOnChange={handleOnChange}
        />
      )}

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
