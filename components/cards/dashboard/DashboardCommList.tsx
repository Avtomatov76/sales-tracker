import { View, Text } from "react-native";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function DashboardCommList(props: any) {
  let lastName = props.customer.last_name;
  let firstName = props.customer.first_name;
  let commission = formatDollarEntry(props.customer.commission.toFixed(2));

  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "grey" }}>{lastName},&nbsp;</Text>
      {firstName.toLowerCase() == "na" ? null : (
        <Text style={{ color: "grey" }}>{firstName}&nbsp;</Text>
      )}
      <Text style={{ color: "green", fontWeight: "bold" }}>
        {commission}&nbsp;
      </Text>
      <Text style={{ color: "blue" }}>-&nbsp;{props.customer.date}</Text>
    </View>
  );
}
