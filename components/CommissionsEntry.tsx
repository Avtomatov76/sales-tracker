import { View, Text } from "react-native";
import moment from "moment";

let entryObj = {
  cust_phone: "5092184275",
  email: "gnatenkovalentyn3@gmail.com",
  first_name: "VALENTIN",
  fk_destination_id: "CUN",
  fk_type_id: "package",
  is_comm_received: "N",
  last_name: "GNATENKO",
  product_comm: 602.93,
  product_cost: 4970.72,
  transaction_date: "2025-01-07T08:00:00.000Z",
  transaction_type: "CC",
  vendor_name: "Funjet Vacations",
};

export default function CommissionsEntry(props: any) {
  let commissionEntry = props.entry;

  return (
    <View style={{ flexDirection: "column", marginTop: 5, marginBottom: 5 }}>
      <View style={{ flexDirection: "row" }}>
        <Text>{commissionEntry.first_name}&nbsp;</Text>
        <Text>{commissionEntry.last_name}&nbsp;</Text>
        <Text>
          {moment(commissionEntry.transaction_date).format("MMM DD, YYYY")}
        </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text>Cost:&nbsp;{commissionEntry.product_cost}&nbsp;</Text>
        <Text>Commission:&nbsp;{commissionEntry.product_comm}&nbsp;</Text>
      </View>
    </View>
  );
}
