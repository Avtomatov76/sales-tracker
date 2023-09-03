import moment from "moment";
import { Text, Pressable, StyleSheet } from "react-native";
import { formatDollarEntry } from "../functions/customerFunctions";

export default function TransactionEntry(props: any) {
  return (
    <Pressable
      style={styles.transaction}
      onPress={() => props.displayTransactionCard(props.product)}
    >
      <Text>{moment(props.product.date).format("MMM DD, YYYY")} -</Text>
      <Text>
        {" "}
        {props.product.first_name == "na" ? "" : props.product.first_name}{" "}
        {props.product.last_name}
      </Text>
      <Text> Total: {formatDollarEntry(props.product.cost)} - </Text>
      <Text> Commission: {formatDollarEntry(props.product.commission)}</Text>
      <Text> Received: {props.product.is_comm_received}</Text>

      {/* <Text> Party Size: {e.party}</Text>
        <Text> Phone: {e.phone}</Text>
        <Text> Email: {e.email}</Text>
        <Text> Travel Type: {e.travel_type}</Text>
        <Text> Vendor: {e.vendor}</Text> */}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  transaction: {
    height: 30,
    marginTop: 2,
    paddingLeft: 10,
    marginBottom: 2,
    flexDirection: "row",
    backgroundColor: "rgb(240, 240, 240)",
    alignItems: "center",
  },
});
