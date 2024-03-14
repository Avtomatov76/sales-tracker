import { useState } from "react";
import { View } from "react-native";
import CustomButton from "../../components/CustomButton";
import AddUpdateDestination from "./AddUpdateDestination";
import { validateDestination } from "../../functions/destinationFunctions";
import ConfirmDelete from "../../modals/ConfirmDelete";

export default function DestinationForm(props: any) {
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({
    code: props.initialValues.code,
    location: props.initialValues.location,
  });

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
      formValues.location == "" ||
      formValues.code.length < 3
    ) {
      console.log("ERROR!!!");
      setError(true);
      return;
    }

    let { validDestination, error } = validateDestination(
      formValues,
      props.destinations
    );

    if (!validDestination) {
      setError(error);
      console.log("There are erorrs in your form!!");
      return;
    }

    let values = formValues;
    values.code = formValues.code.toUpperCase();
    props.handleSubmit(values);
  };

  return (
    <>
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
        <AddUpdateDestination
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
    </>
  );
}
