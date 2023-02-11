import { View, Text } from "react-native";
import { Divider } from "react-native-paper";
import {
  displayAddress,
  displayName,
  displayPhone,
} from "../../functions/customerFunctions";

export default function CustomerCard(props: any) {
  let customer = props.customer;

  console.log(customer);

  if (!customer) return null;

  return (
    <View>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20 }}>
          Details
        </Text>
        {/* <Text style={{ marginBottom: 5 }}>Name&#40;s&#41;:</Text> */}
        <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 20 }}>
          {displayName(customer, "details")}
        </Text>
        <Text style={{ fontSize: 20, marginBottom: 5, color: "#368cbf" }}>
          {displayPhone(customer)}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {!customer.email || customer.email === "na" ? null : customer.email}
        </Text>
        <Text>
          {customer.street_address === "na" ? null : displayAddress(customer)}
        </Text>
      </View>
      <Divider style={{ marginTop: 10, marginBottom: 20 }} />
      <Text>Number of Sales for this customer</Text>
      <Text>Total dollar value per customer</Text>
      <Text>Total commissions per customer</Text>
      <Text>Latest sale info with commission</Text>
    </View>
  );
}
