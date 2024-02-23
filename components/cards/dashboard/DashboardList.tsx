import { View, Text } from "react-native";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function DashboardList(props: any) {
  return props.type == "destinations" ? (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "grey" }}>{props.destination.name},&nbsp;</Text>
      <Text style={{ color: "grey" }}>{props.destination.airport}&nbsp;</Text>
      <Text style={{ color: "grey" }}>{props.destination.count}</Text>
    </View>
  ) : (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ color: "grey" }}>{props.customer.last_name},&nbsp;</Text>
      {props.customer.first_name.toLowerCase() == "na" ? null : (
        <Text style={{ color: "grey" }}>{props.customer.first_name}&nbsp;</Text>
      )}
      <Text style={{ color: "green", fontWeight: "bold" }}>
        {formatDollarEntry(props.customer.commission.toFixed(2))}&nbsp;
      </Text>
      <Text style={{ color: "blue" }}>-&nbsp;{props.customer.date}</Text>
    </View>
  );
}
