import moment from "moment";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { formatDollarEntry } from "../functions/customerFunctions";

export default function TransactionEntry(props: any) {
  const displayName = (product: any) => {
    let nameStr = "";

    if (product.first_name == "na") nameStr = product.last_name;
    if (product.first_name != "na")
      nameStr = product.first_name + " " + product.last_name;

    return nameStr.length > 20 ? nameStr.substring(0, 20) + "..." : nameStr;
  };

  return (
    <Pressable
      style={styles.transaction}
      onPress={() => props.displayTransactionCard(props.product)}
    >
      <Text
        style={{
          color: "blue",
          marginLeft: 10,
          fontSize: 16,
          width: 120,
        }}
      >
        {moment(props.product.date).format("MMM DD, YYYY")}
      </Text>
      <View
        style={{
          //display: "flex",
          flex: 1,
          flexDirection: "row",
          // justifyContent: "center",
        }}
      >
        <Text style={{ width: 200, fontWeight: "700", marginRight: 10 }}>
          {displayName(props.product)}
        </Text>
        <View style={styles.amountLabel}>
          <Text style={{ color: "grey", marginRight: 10 }}>Paid: </Text>
          <Text style={styles.amount}>
            {formatDollarEntry(props.product.cost)}
          </Text>
        </View>
        <View style={styles.amountLabel}>
          <Text style={{ color: "grey", marginRight: 10 }}>Comm:</Text>
          <Text style={styles.amount}>
            {formatDollarEntry(props.product.commission)}
          </Text>
        </View>
        <View style={styles.amountLabel}>
          <Text style={{ color: "grey" }}>Received: </Text>
          <Text
            style={{
              color: props.product.is_comm_received == "Y" ? "blue" : "red",
              fontWeight: "700",
              paddingLeft: 5,
            }}
          >
            {props.product.is_comm_received}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  transaction: {
    height: 50,
    marginTop: 2,
    paddingLeft: 10,
    marginBottom: 2,
    flexDirection: "row",
    backgroundColor: "rgb(240, 240, 240)",
    alignItems: "center",
  },
  amount: {
    fontWeight: "700",
    color: "green",
  },
  amountLabel: {
    flexDirection: "row",
    width: 150,
    marginRight: 10,
  },
});
