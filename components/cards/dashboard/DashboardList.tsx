import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function DashboardList(props: any) {
  const colors = [
    "#1F6F9F",
    "#7D3C98",
    "#F27D42",
    "#237A57",
    "#D99A25",
    "#C75272",
    "#168C8C",
    "#8A5A44",
    "#7597B3",
    "#9C7FB0",
    "#E4A177",
  ];

  const showTotal = (total: any) => {
    let totalStr = formatDollarEntry(total);

    return totalStr.substring(1);
  };

  return props.type == "destinations" ? (
    <View>
      <View style={styles.entryView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 12,
              backgroundColor: colors[props.index],
              marginRight: 12,
            }}
          ></View>
          <Text style={styles.entryText}>{props.destination.name},&nbsp;</Text>
          <Text style={styles.entryText}>
            {props.destination.airport}&nbsp;
          </Text>
        </View>

        <Text style={styles.entryValue}>
          {props.destination.count}
        </Text>
      </View>
      <Divider style={{ marginLeft: 40, marginRight: 10 }} />
    </View>
  ) : (
    <View>
      <View style={styles.entryView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 12,
              backgroundColor: colors[props.index],
              marginRight: 12,
            }}
          ></View>
          <Text style={styles.entryText}>{props.customer.last_name}</Text>
          {props.customer.first_name.toLowerCase() == "na" ? null : (
            <Text style={styles.entryText}>
              ,&nbsp;{props.customer.first_name}&nbsp;
            </Text>
          )}
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 14, marginTop: 2, color: "#506171" }}>
            &#36;&nbsp;
          </Text>
          <Text style={styles.entryValue}>
            {showTotal(props.customer.commission.toFixed(2))}
          </Text>
        </View>
      </View>
      <Divider style={{ marginLeft: 40, marginRight: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  entryView: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
  },
  entryText: {
    color: "#1F2933",
    fontSize: 16,
  },
  entryValue: {
    color: "#1F2933",
    fontSize: 17,
    fontWeight: "700",
  },
});
