import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, Pressable } from "react-native";
import axios from "axios";
import moment from "moment";
import CustomButton from "./CustomButton";
import TransactionModal from "../modals/TransactionModal";

//
const widthAndHeight = 150;
const series = [300, 150, 400];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100"];
//

export default function TransactionsDetails(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");

  const displayTransactionModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const displayEntry = (e: any, index: any) => {
    return (
      <Pressable
        style={styles.transaction}
        key={index}
        onPress={() => console.log(e.date)}
      >
        <Text>{moment(e.date).format("MMM DD, YYYY")} -</Text>
        <Text> Total: {e.cost} - </Text>
        <Text> Commission: {e.commission}</Text>
        <Text> Received: {e.is_comm_received}</Text>
        <Text>
          {" "}
          Name: {e.first_name} {e.last_name}
        </Text>
        <Text> Party Size: {e.party}</Text>
        <Text> Phone: {e.phone}</Text>
        <Text> Email: {e.email}</Text>
        <Text> Travel Type: {e.travel_type}</Text>
        <Text> Vendor: {e.vendor}</Text>
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

      <ScrollView style={styles.scrollView}>
        {!props.products
          ? props.data.map((p: any, index: any) => displayEntry(p, index))
          : props.products.map((p: any, index: any) => displayEntry(p, index))}
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
  },
  pieTitle: {
    fontSize: 20,
    paddingLeft: 40,
    paddingRight: 40,
    //alignSelf: "center",
    //marginBottom: 20,
  },
  catTitle: {
    fontSize: 24,
    marginBottom: 20,
    //paddingLeft: 20,
    //paddingRight: 40,
    fontWeight: "600",
    color: "#368cbf",
  },
  card: {
    display: "flex",
    flexDirection: "column", //
    alignItems: "center",
    //flex: 1, // <-- change this if adding one more!!
    paddingTop: 20,
    height: 350,
    minWidth: 350,
    backgroundColor: "#F0F0F0",
    margin: 5,
  },
  transaction: {
    height: 30,
    marginTop: 2,
    marginBottom: 2,
    flexDirection: "row",
    backgroundColor: "#CCC",
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
