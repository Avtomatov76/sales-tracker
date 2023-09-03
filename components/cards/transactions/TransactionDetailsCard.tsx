import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
import moment from "moment";
import { Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function TransactionDetailsCard(props: any) {
  const [transDetails, setTransDetails] = useState(props.data);
  const [refresh, setRefresh] = useState(false);

  console.log("CHECKING PROPS----------------: ", props.data);

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
    console.log("CHANGING RECEIVED TO 'YES'");

    console.log("---  Product ID  --- : ", id);
    props.updateProductField("is_comm_received", "Y", id);
    props.refreshTEST();
    //setRefresh(true);
  };

  return (
    // <View>
    //   <Text>TEST TEST TEST</Text>
    // </View>

    <Card style={styles.card}>
      <View>
        <Ionicons name="card" size={42} color="#FF5F15" />

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
                fontSize: 22,
                fontWeight: "600",
                color: "green",
              }}
            >
              {displayPhone(transDetails.phone)}
            </Text>
          )}

          {!transDetails.email || transDetails.email == "na" ? null : (
            <Text
              style={{ fontSize: 16, color: "blue" }}
              onPress={() => Linking.openURL(`mailto:${transDetails.email}`)}
            >
              {transDetails.email}
            </Text>
          )}

          {/* <Text style={{ fontSize: 16, color: "grey" }}>|</Text> */}
        </View>

        <Text style={{ fontSize: 16 }}>
          {moment(transDetails.date).format("MMM DD, YYYY")}
        </Text>

        <Text>Paid: {formatDollarEntry(transDetails.cost)}</Text>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
          }}
        >
          <Text>Commission: {formatDollarEntry(transDetails.commission)}</Text>
          <Text style={{ marginLeft: 20 }}>Received: </Text>
          <Text style={{ color: "blue", fontWeight: "600" }}>
            {transDetails.is_comm_received == "N" ? "No" : "Yes"}
          </Text>

          {transDetails.is_comm_received == "Y" ? null : (
            <View
              style={{
                paddingTop: 3,
                paddingBottom: 3,
                marginLeft: 20,
                paddingLeft: 10,
                paddingRight: 10,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "grey",
              }}
            >
              <Text
                style={{ color: "green" }}
                onPress={() => changeReceived(transDetails.product_id)}
              >
                Change to 'Yes'
              </Text>
            </View>
          )}
        </View>
      </View>

      <Card.Actions>
        <Pressable onPress={() => props.editTransaction(transDetails)}>
          <Text style={{ color: "grey", fontWeight: "700", marginRight: 20 }}>
            EDIT
          </Text>
        </Pressable>
        <Pressable onPress={props.hideCard}>
          <Text style={{ color: "red", fontWeight: "700" }}>CLOSE</Text>
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
    backgroundColor: "#FFEED2",
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
});
