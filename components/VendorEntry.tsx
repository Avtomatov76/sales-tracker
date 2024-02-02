import moment from "moment";
import { View, Text, StyleSheet } from "react-native";
import { formatDollarEntry } from "../functions/customerFunctions";

export default function VendorEntry(props: any) {
  return (
    <View style={styles.entry}>
      <View style={styles.mainText}>
        <Text style={styles.lastName}>{props.vendor.vendor_name}</Text>
        <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 16,
          }}
        >
          {moment(props.productDate).format("MMM DD, YYYY")}
        </Text>
      </View>
      {/* <View style={styles.subText}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "grey" }}>Paid: </Text>
          <Text style={styles.amount}>
            {formatDollarEntry(props.productCost)}
          </Text>

          <Text style={{ paddingLeft: 20, color: "grey" }}>Comm: </Text>
          <Text style={styles.amount}>
            {formatDollarEntry(props.productCommission)}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "grey", fontSize: 14 }}>Received: </Text>
          <Text
            style={{
              color: props.isCommReceived == "Y" ? "blue" : "red",
              fontWeight: "700",
              paddingLeft: 5,
            }}
          >
            {props.isCommReceived}
          </Text>
        </View>
      </View> */}
      <View style={styles.hairline} />
    </View>
  );
}

const styles = StyleSheet.create({
  transaction: {
    height: 65,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  entry: {
    display: "flex",
    height: "100%",
    width: "90%",
    flexDirection: "column",
    paddingRight: 10,
    justifyContent: "space-between",
  },
  mainText: {
    display: "flex",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subText: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastName: {
    alignSelf: "flex-end",
    width: 350,
    fontSize: 16,
    fontWeight: "700",
  },
  amount: {
    color: "green",
    fontWeight: "600",
  },
  hairline: {
    display: "flex",
    backgroundColor: "rgb(240, 240, 240)",
    width: "100%",
    height: 1,
  },
});
