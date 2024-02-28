import { StyleSheet, Text, View } from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDollarEntry } from "../../functions/customerFunctions";
import { getIcon } from "../../functions/commissionsFunctions";

export default function SummaryCard(props: any) {
  const getComparisonData = () => {
    let currYear = props.data[0].commissions || null;
    let prevYear = props.compare[0].commissions || null;

    let diff = (Math.round((currYear - prevYear) * 100) / 100).toFixed(2);

    return (
      <View style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}>
        <Text
          style={{
            color: parseFloat(diff) < 0 ? "red" : "green",
            fontSize: 12,
          }}
        >
          {formatDollarEntry(diff)}
        </Text>
        <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
          {parseFloat(diff) < 0
            ? " less than last year"
            : " more than last year"}
        </Text>
      </View>
    );
  };

  return (
    <Card style={[styles.card, { backgroundColor: props.color }]}>
      <Ionicons name={getIcon(props.icon)} size={42} color={props.iconColor} />

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
      ) : props.tab == "dashboard" ? (
        <Text style={styles.pieTitle}>{props.data}</Text>
      ) : (
        <Text style={styles.pieTitle}>
          {!props.data || props.data[0].commissions == null
            ? 0
            : formatDollarEntry(props.data[0].commissions)}
        </Text>
      )}

      {props.tab == "dashboard" && props.date != "" ? (
        <Text style={{ color: "blue", fontWeight: "600" }}>{props.date}</Text>
      ) : null}

      {props.compare ? getComparisonData() : null}

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
      ) : props.tab == "dashboard" ||
        (props.tab == "commissions" && props.icon == "total") ? (
        <Text style={{ fontSize: 16 }}>{props.title}</Text>
      ) : (
        <Text style={{ fontSize: 16 }}>
          {props.title} &#40;{moment().format(props.type)}&#41;
        </Text>
      )}

      {!props.compare ? null : (
        <>
          <Text
            style={{
              marginTop: 10,
              fontSize: 12,
              color: "grey",
              fontWeight: "600",
            }}
          >
            Previous year-to-date:{" "}
            <Text style={{ color: "blue" }}>
              {formatDollarEntry(props.compare[0].commissions)}
            </Text>
          </Text>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  pieTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 2,
  },
  card: {
    display: "flex",
    flex: 1,
    height: 200,
    minWidth: 200,
    maxWidth: 250,
    width: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: 8,
    padding: 15,
    borderRadius: 5,
  },
});
