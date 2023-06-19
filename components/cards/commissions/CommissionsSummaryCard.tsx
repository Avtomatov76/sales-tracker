import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function CommissionsSummaryCard(props: any) {
  const getIcon = () => {
    if (!props.icon) return;

    switch (props.icon) {
      case "chart":
        return "stats-chart";
      case "total":
        return "time";
      case "year":
        return "archive";
      case "month":
        return "calendar";
      default:
        return "search";
    }
  };

  //
  console.log("SEARCHED COMMISSIONS: ", props.commissions);
  //

  return (
    <Card style={[styles.card, { backgroundColor: props.color }]}>
      <Ionicons name={getIcon()} size={42} color={props.iconColor} />

      {props.icon == "search" ? (
        !props.commissions || props.commissions == 0 ? (
          <Text
            style={[
              styles.pieTitle,
              { fontSize: 14, fontWeight: "100", color: "blue" },
            ]}
          >
            Select a date range above
          </Text>
        ) : (
          <Text style={styles.pieTitle}>
            {formatDollarEntry(props.commissions)}
          </Text>
        )
      ) : (
        <Text style={styles.pieTitle}>
          {!props.data || props.data[0].commissions == null
            ? 0
            : formatDollarEntry(props.data[0].commissions)}
        </Text>
      )}

      {props.icon == "search" ? (
        props.commissions ? (
          <Text style={{ fontSize: 16 }}>
            <Text style={{ fontSize: 14, color: "blue" }}>
              {moment(props.startDate).format("MM/DD/YYYY")}
            </Text>{" "}
            -{" "}
            <Text style={{ fontSize: 14, color: "blue" }}>
              {" "}
              {moment(props.endDate).format("MM/DD/YYYY")}
            </Text>
          </Text>
        ) : null
      ) : props.icon == "total" ? (
        <Text style={{ fontSize: 16 }}>{props.title}</Text>
      ) : (
        <Text style={{ fontSize: 16 }}>
          {props.title} &#40;{moment().format(props.type)}&#41;
        </Text>
      )}

      {props.icon == "search" ? null : (
        <Text style={{ marginTop: 10, fontSize: 12, color: "blue" }}>
          This is an increase of 10%
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  pieTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 2,
  },
  card: {
    display: "flex",
    //flex: 1,
    height: 200,
    width: 200,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: 20,
    marginBottom: 20,
    padding: 15,
  },
});
