import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function TransactionDetailsCard(props: any) {
  const [transDetails, setTransDetails] = useState(props.data);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setTransDetails(props.data);
    setRefresh(false);
  }, [refresh]);

  const displayPhone = (phone: string) => {
    let phoneStr = "";

    phoneStr =
      "(" +
      phone.substring(0, 3) +
      ") " +
      phone.substring(3, 6) +
      "-" +
      phone.substring(6);

    return phoneStr;
  };

  console.log(" ----------------  REFRESH  --------------- :", refresh);

  const changeReceived = (id: string) => {
    props.updateProductField("is_comm_received", "Y", id);
    props.refreshTEST();
  };

  return (
    <Card style={styles.card}>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Ionicons name="card" size={52} color="#FF5F15" />

          <Text
            style={{
              fontSize: 20,
              marginRight: 10,
              fontWeight: "100",
            }}
          >
            {moment(transDetails.date).format("MMM DD, YYYY")}
          </Text>
        </View>

        <Text style={styles.custName}>
          {transDetails.first_name == "na"
            ? transDetails.last_name
            : transDetails.first_name + " " + transDetails.last_name}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 20,
          }}
        >
          {!transDetails.phone || transDetails.phone == "na" ? null : (
            <Text
              style={{
                marginRight: 20,
                fontSize: 20,
                fontWeight: "100",
              }}
            >
              {displayPhone(transDetails.phone)}
            </Text>
          )}

          {!transDetails.email || transDetails.email == "na" ? null : (
            <Text
              style={{
                fontSize: 16,
                color: "#368cbf",
                textDecorationLine: "underline",
              }}
              onPress={() => Linking.openURL(`mailto:${transDetails.email}`)}
            >
              {transDetails.email}
            </Text>
          )}
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "grey" }}>Paid:</Text>
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "600",
            }}
          >
            {formatDollarEntry(transDetails.cost)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Commission:</Text>
            <Text style={{ marginLeft: 5, fontWeight: "600" }}>
              {formatDollarEntry(transDetails.commission)}
            </Text>
          </View>
          <Text style={{ marginLeft: 30, marginRight: 10, color: "grey" }}>
            Received:
          </Text>
          <Text
            style={{
              color: transDetails.is_comm_received == "Y" ? "blue" : "red",
              fontWeight: "600",
            }}
          >
            {transDetails.is_comm_received == "N" ? "NO" : "YES"}
          </Text>

          {transDetails.is_comm_received == "Y" ? null : (
            <View style={styles.commStatusBtn}>
              <Text
                style={{ color: "#FFFFFF", fontWeight: "600" }}
                onPress={() => changeReceived(transDetails.product_id)}
              >
                Change to 'Yes'
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Party Size: </Text>
            <Text style={{ fontWeight: "600" }}>{transDetails.party}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Trip start date: </Text>
            <Text style={{ fontWeight: "600" }}>
              {moment(transDetails.start).format("MMM DD, YYYY")}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Trip end date: </Text>
            <Text style={{ fontWeight: "600" }}>
              {moment(transDetails.end).format("MMM DD, YYYY")}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Travel Type: </Text>
            <Text style={{ fontWeight: "600" }}>
              {transDetails.travel_type}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Vendor: </Text>
            <Text style={{ fontWeight: "600" }}>{transDetails.vendor}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "grey" }}>Supplier: </Text>
            <Text style={{ fontWeight: "600" }}>
              {transDetails.supplier_name}
            </Text>
          </View>
        </View>
      </View>

      <Card.Actions>
        <Pressable onPress={props.hideCard}>
          <Text style={{ color: "grey", fontWeight: "700", marginRight: 30 }}>
            CLOSE
          </Text>
        </Pressable>
        <Pressable onPress={() => props.editTransaction(transDetails)}>
          <Text style={{ color: "#FF5F15", fontWeight: "700" }}>EDIT</Text>
        </Pressable>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    alignSelf: "center",
    width: 450,
    backgroundColor: "#f0f8ff", //"#F5EECE",
    margin: 8,
    padding: 20,
    borderRadius: 5,
  },
  custName: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 24,
    fontWeight: "700",
  },
  commStatusBtn: {
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
});
