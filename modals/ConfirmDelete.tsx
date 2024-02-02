import { View, Text } from "react-native";
import CustomButton from "../components/CustomButton";

export default function ConfirmDelete(props: any) {
  const deleteRecord = () => {
    props.deleteRecord(props.record.product_id);
    //props.hideModal();
  };

  const displayButtons = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 20,
          width: "100%",
        }}
      >
        {props.message != "" ? (
          <CustomButton
            style={{ marginRight: 20 }}
            flag="ok"
            type="text"
            //handleDelete={() => props.deleteCustomer(props.customerId, false)}
            handleOKpress={props.handleOKpress}
            hideModal={props.hideModal}
          />
        ) : (
          <>
            <CustomButton
              style={{ marginRight: 20 }}
              flag="cancel"
              type="text"
              hideModal={props.hideModal}
            />
            <CustomButton
              flag="delete"
              type="text"
              hideModal={props.hideModal}
              handleDelete={deleteRecord}
            />
          </>
        )}
      </View>
    );
  };

  //console.log(props.record);

  const displayMessage = () => {
    if (props.message != "")
      return (
        <Text style={{ marginBottom: 10, marginLeft: 5 }}>
          {props.message}
          <Text style={{ color: "blue" }}>{props.record.last_name}</Text> from
          the database.
        </Text>
      );

    if (props.flag == "transaction")
      return (
        <Text style={{ marginBottom: 10, marginLeft: 5 }}>
          Are you sure you want to delete this sale:{" "}
          <Text style={{ color: "blue" }}>
            {props.record.last_name} {props.record.cost} {props.record.date}
          </Text>{" "}
          from the database?
        </Text>
      );

    return (
      <Text style={{ marginBottom: 10, marginLeft: 5 }}>
        Are you sure you want to delete{" "}
        <Text style={{ color: "blue" }}>{props.record.last_name}</Text> from the
        database?
      </Text>
    );
  };

  return (
    <View>
      {displayMessage()}

      {displayButtons()}
    </View>
  );
}
