import { Text, View, TextInput, StyleSheet } from "react-native";
import { displayName } from "../../functions/customerFunctions";

export default function DetailsForm(props: any) {
  let customer = props.customer;
  console.log("Customer: ", customer);

  const displayPhone = () => {
    if (!customer.cust_phone || customer.cust_phone === "na") return null;
    let phone = "";

    if (customer.cust_phone[0] === "1")
      phone = customer.cust_phone.substring(1);
    else phone = customer.cust_phone;

    phone =
      "(" +
      phone.substring(0, 3) +
      ") " +
      phone.substring(3, 6) +
      "-" +
      phone.substring(6);

    return phone;
  };

  const displayAddress = () => {
    let address = "";

    address =
      customer.street_address + "\n" + customer.city + ", " + customer.state;

    return address;
  };

  if (!customer) return null;

  return (
    // <View>
    //   <Text>{customer.last_name}</Text>
    // </View>
    <View style={{ alignSelf: "flex-start" }}>
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20 }}>
        Details
      </Text>
      {/* <Text style={{ marginBottom: 5 }}>Name&#40;s&#41;:</Text> */}
      <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 20 }}>
        {displayName(customer, "details")}
      </Text>
      <Text style={{ fontSize: 20, marginBottom: 5, color: "#368cbf" }}>
        {displayPhone()}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        {customer.email === "na" ? null : customer.email}
      </Text>
      <Text>{customer.street_address === "na" ? null : displayAddress()}</Text>
    </View>
  );
}
