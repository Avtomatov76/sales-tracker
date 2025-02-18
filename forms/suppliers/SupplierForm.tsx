import { useState } from "react";
import { View } from "react-native";
import CustomButton from "../../components/CustomButton";
import AddUpdateSupplier from "./AddUpdateSupplier";
import ConfirmDelete from "../../modals/ConfirmDelete";
import { validateSupplier } from "../../functions/supplierFunctions";

export default function SupplierForm(props: any) {
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({
    id: props.initialValues.id,
    name: props.initialValues.name,
    phone: props.initialValues.phone,
  });

  const handleOnChange = (e: any, name: any) => {
    setError(false);

    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const submitForm = () => {
    let { validSupplier, error } = validateSupplier(
      formValues,
      props.suppliers
    );

    if (!validSupplier) {
      setError(error);
      console.log("There are erorrs in your form!!");
      return;
    }

    let values = formValues;
    values.id = formValues.id.toUpperCase();
    props.handleSubmit(values);
  };

  return (
    <View>
      {props.flag === "delete" ? (
        <ConfirmDelete
          flag="destination"
          message={props.message}
          hideModal={props.hideModal}
          recordId={props.formValues.code}
          record={props.customer}
          deleteRecord={props.deleteCustomer}
          handleOKpress={props.handleOKpress}
        />
      ) : (
        <AddUpdateSupplier
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
          <CustomButton
            submitForm={submitForm}
            flag={props.flag == "edit" ? "update" : "add"}
            type="text"
          />
        </View>
      ) : null}
    </View>
  );
}
