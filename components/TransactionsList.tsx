import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, Pressable } from "react-native";
import axios from "axios";
import moment from "moment";
import CustomButton from "./CustomButton";
import TransactionModal from "../modals/TransactionModal";
import TransactionDetailsCard from "../components/cards/transactions/TransactionDetailsCard";

//
const widthAndHeight = 150;
const series = [300, 150, 400];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100"];
//

export default function TransactionsList(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [transaction, setTransaction] = useState<any>();

  const displayTransactionModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const displayTransactionCard = (data: any) => {
    setTransaction(data);
    setShowCard(true);
  };

  const displayEntry = (e: any, index: any) => {
    return (
      <Pressable
        style={styles.transaction}
        key={index}
        onPress={() => displayTransactionCard(e)}
        //onPress={() => console.log(e.date)}
      >
        <Text>{moment(e.date).format("MMM DD, YYYY")} -</Text>
        <Text>
          {" "}
          {e.first_name == "na" ? "" : e.first_name} {e.last_name}
        </Text>
        <Text> Total: {e.cost} - </Text>
        <Text> Commission: {e.commission}</Text>
        <Text> Received: {e.is_comm_received}</Text>

        {/* <Text> Party Size: {e.party}</Text>
        <Text> Phone: {e.phone}</Text>
        <Text> Email: {e.email}</Text>
        <Text> Travel Type: {e.travel_type}</Text>
        <Text> Vendor: {e.vendor}</Text> */}
      </Pressable>
    );
  };

  //if (props.data) props.data.sort((a, b) => b.commission - a.commission);

  console.log("DETAILS: ", props.data);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      //onLayout={(event) => getComponentWidth(event)}
    >
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          backgroundColor: "#F0F0F0",
          marginTop: 20,
          paddingRight: 20,
          paddingLeft: 20,
          paddingBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              styles.catTitle,
              {
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 8,
              },
            ]}
          >
            Summary
          </Text>

          <Text
            style={{
              fontSize: 20,
              marginLeft: 20,
              alignSelf: "center",
            }}
          >
            {props.numProducts}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              alignSelf: "center",
            }}
          >
            transactions
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          <CustomButton
            title="Add"
            flag="add"
            type="button"
            submitForm={() => displayTransactionModal("add")}
          />
        </View>
      </View>

      {!props.products ? (
        <ScrollView style={styles.scrollView}>
          {props.data.map((p: any, index: any) => displayEntry(p, index))}
        </ScrollView>
      ) : props.products.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {props.products.map((p: any, index: any) => displayEntry(p, index))}
        </ScrollView>
      ) : (
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Text style={{ fontSize: 20, color: "red" }}>
            No transactions found!
          </Text>
        </View>
      )}

      <TransactionModal
        flag={flag}
        //customerId={customerId}
        //index={customerIndex}
        //customers={data}
        //customer={!customer ? null : customer}
        //visible={true}
        visible={showModal}
        hideModal={() => setShowModal(false)}
      />

      {showCard && (
        <TransactionDetailsCard
          data={transaction}
          hideCard={() => setShowCard(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  catTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "600",
    color: "#368cbf",
  },
  transaction: {
    height: 30,
    marginTop: 2,
    paddingLeft: 10,
    marginBottom: 2,
    flexDirection: "row",
    backgroundColor: "rgb(240, 240, 240)",
    alignItems: "center",
  },
  scrollView: {
    display: "flex",
    maxHeight: 350,
    width: "auto",
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
  },
});
