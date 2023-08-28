import { StyleSheet, Text, View, Pressable } from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function TransactionDetailsCard(props: any) {
  const getIcon = () => {
    if (!props.icon) return;

    switch (props.icon) {
      case "chart":
        return "stats-chart";
      case "year":
        return "time";
      case "total":
        return "archive";
      case "month":
        return "calendar";
      case "unpaid":
        return "cash";
      default:
        return "search";
    }
  };

  return (
    <Card style={styles.card}>
      <Ionicons name="card" size={42} color="#791f87" />

      <Text style={styles.pieTitle}>
        {props.data.first_name == "na"
          ? props.data.last_name
          : props.data.first_name + " " + props.data.last_name}
      </Text>

      <Text style={{ fontSize: 16 }}>
        {moment(props.data.date).format("MMM DD, YYYY")}
      </Text>

      <Text>Paid: {formatDollarEntry(props.data.cost)}</Text>
      <Text>Commission: {formatDollarEntry(props.data.commission)}</Text>
      <Text>
        <Text>Received: </Text>
        <Text style={{ color: "blue", fontWeight: "600" }}>
          {props.data.is_comm_received}
        </Text>
      </Text>

      <Pressable style={{ alignSelf: "flex-end" }} onPress={props.hideCard}>
        <Text style={{ color: "grey", fontWeight: "700" }}>CLOSE</Text>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    alignSelf: "center",
    height: 300,
    width: 450,
    backgroundColor: "#ECE6FF",
    margin: 8,
    padding: 20,
    borderRadius: 5,
  },
  pieTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
  },
});
