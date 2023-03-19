import { View, Text } from "react-native";
import CustomButton from "../../components/CustomButton";

export default function ConfirmDelete(props: any) {
  const deleteCustomer = () => {
    props.deleteCustomer(props.customerId);
    props.hideModal();
  };

  return (
    <View>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>Confirm Delete</Text>
      <Text style={{ marginBottom: 20 }}>
        Are you sure you want to delete{" "}
        <Text style={{ color: "blue" }}>{props.customer.last_name}</Text> from
        the database?
      </Text>
      <View
        style={{
          width: "100%",
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CustomButton flag="cancel" hideModal={props.hideModal} />
        <CustomButton
          flag="delete"
          hideModal={props.hideModal}
          handleDelete={deleteCustomer}
        />
      </View>
    </View>
  );
}
