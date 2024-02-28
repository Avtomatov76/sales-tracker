import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function DashboardList(props: any) {
  const colors = [
    "#660000",
    "#990000",
    "#CC0000",
    "#FF1919",
    "#FF1D1D",
    "#FF8080",
    "#FF9999",
    "#FEC9C9",
    "#FFCCCC",
    "#FFE6E6",
    "#FFEAEA",
  ];

  return props.type == "destinations" ? (
    <>
      <View style={styles.entryView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 50,
              backgroundColor: colors[props.index],
              marginRight: 10,
              opacity: 0.7,
            }}
          >
            {" "}
          </View>
          <Text style={{ fontSize: 18 }}>{props.destination.name},&nbsp;</Text>
          <Text style={{ fontSize: 18 }}>
            {props.destination.airport}&nbsp;
          </Text>
        </View>

        <Text style={{ fontSize: 18, color: "green", fontWeight: "bold" }}>
          {props.destination.count}
        </Text>
      </View>
      <Divider style={{ marginLeft: 40, marginRight: 10 }} />
    </>
  ) : (
    <>
      <View style={styles.entryView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 50,
              backgroundColor: colors[props.index],
              marginRight: 10,
              opacity: 0.7,
            }}
          >
            {" "}
          </View>
          <Text style={{ fontSize: 18 }}>{props.customer.last_name}</Text>
          {props.customer.first_name.toLowerCase() == "na" ? null : (
            <Text style={{ fontSize: 18 }}>
              ,&nbsp;{props.customer.first_name}&nbsp;
            </Text>
          )}
        </View>

        <Text style={{ fontSize: 18, color: "green", fontWeight: "bold" }}>
          {formatDollarEntry(props.customer.commission.toFixed(2))}&nbsp;
        </Text>
      </View>
      <Divider style={{ marginLeft: 40, marginRight: 15 }} />
    </>
  );
}

const styles = StyleSheet.create({
  entryView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 28,
  },
});