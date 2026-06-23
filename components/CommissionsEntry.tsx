import { View, Text, Pressable, StyleSheet } from "react-native";
import moment from "moment";
import { formatDollarEntry } from "../functions/customerFunctions";

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

  function handleEntryPress() {
    console.log("Pressing on UNPAID commissions entry!");
  }

  function handleStatusPress(id: any) {
    props.updateProductField("is_comm_received", "Y", id);
  }

  return (
    <Pressable style={styles.entry}>
      <View style={styles.mainRow}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            {commissionEntry.first_name}&nbsp;
          </Text>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            {commissionEntry.last_name}&nbsp;
          </Text>
        </View>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>
          {moment(commissionEntry.transaction_date).format("MMM DD, YYYY")}
        </Text>
      </View>

      <View style={styles.subRow}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "gray" }}>Cost:&nbsp;</Text>
            <Text style={styles.numericValue}>
              {formatDollarEntry(commissionEntry.product_cost)}&nbsp;&nbsp;
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "gray" }}>Comm:&nbsp;</Text>
            <Text style={styles.numericValue}>
              {formatDollarEntry(commissionEntry.product_comm)}&nbsp;
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              marginLeft: 30,
              marginRight: 10,
              color: "grey",
              alignSelf: "center",
            }}
          >
            Received:
          </Text>
          <Text
            style={{
              color: commissionEntry.is_comm_received == "Y" ? "blue" : "red",
              fontWeight: "600",
              alignSelf: "center",
            }}
          >
            {commissionEntry.is_comm_received == "N" ? "NO" : "YES"}
          </Text>
          {commissionEntry.is_comm_received == "Y" ? null : (
            <Pressable
              style={styles.commStatusBtn}
              onPress={() => handleStatusPress(commissionEntry.product_id)}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
                Change to 'Yes'
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "gray" }}>Type:&nbsp;</Text>
          <Text>{commissionEntry.fk_type_id}&nbsp;&nbsp;</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "gray" }}>Dest:&nbsp;</Text>
          <Text>&nbsp;{commissionEntry.fk_destination_id}&nbsp;&nbsp;</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "gray" }}>Vendor:&nbsp;</Text>
          <Text>&nbsp;{commissionEntry.vendor_name}</Text>
        </View>
      </View>
      <View style={styles.hairline} />
    </Pressable>
  );
}

let styles = StyleSheet.create({
  entry: {
    flexDirection: "column",
    paddingTop: 5,
    //paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    //marginBottom: 5,
    //marginBottom: 5,
    //backgroundColor: "#90D5FF",
    //borderRadius: 5,
  },
  mainRow: {
    height: 30,
    flexDirection: "row",
    //backgroundColor: "red",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subRow: {
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  commStatusBtn: {
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 3,
    marginLeft: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12, //4,
    backgroundColor: "red", //"#368cbf",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hairline: {
    display: "flex",
    backgroundColor: "rgb(240, 240, 240)",
    width: "100%",
    height: 1,
  },
  numericValue: {
    color: "green",
    fontWeight: "600",
  },
});
