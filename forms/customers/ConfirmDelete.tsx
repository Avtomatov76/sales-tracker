import { View, Text } from "react-native";
import CustomButton from "../../components/CustomButton";

export default function ConfirmDelete(props: any) {
  const deleteCustomer = () => {
    props.deleteCustomer(props.customerId);
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
              handleDelete={deleteCustomer}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <View>
      {props.message != "" ? (
        <Text style={{ marginBottom: 10, marginLeft: 5 }}>
          {props.message}
          <Text style={{ color: "blue" }}>{props.customer.last_name}</Text> from
          the database.
        </Text>
      ) : (
        <Text style={{ marginBottom: 10, marginLeft: 5 }}>
          Are you sure you want to delete{" "}
          <Text style={{ color: "blue" }}>{props.customer.last_name}</Text> from
          the database?
        </Text>
      )}

      {displayButtons()}
    </View>
  );
}
