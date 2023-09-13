import { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  Picker,
  SafeAreaView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import moment from "moment";
import CustomButton from "./CustomButton";
import TransactionModal from "../modals/TransactionModal";
import TransactionDetailsCard from "../components/cards/transactions/TransactionDetailsCard";
import { formatDollarEntry } from "../functions/customerFunctions";
import { updateProductFieldAPI } from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import NotFound from "./NotFound";
import TransactionEntry from "./TransactionEntry";
import OutsideClickHandler from "react-outside-click-handler";
//
import Draggable from "react-native-draggable";

//

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
  const [refresh, setRefresh] = useState(false);

  const [data, setData] = useState<any>(props.data);
  const [allProducts, setAllProducts] = useState<any>(props.allProducts);

  const baseURL = GetConfiguration().baseUrl;

  //const

  const displayTransactionModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const displayTransactionCard = (data: any) => {
    setTransaction(data);
    setShowCard(true);
  };

  const handleRefresh = () => {
    console.log("Refreshing.........................");
    //setRefresh(!refresh);
    props.refreshTEST();
  };

  const editTransaction = (transaction: any) => {
    // console.log("--- EDITING TRANSACTION --- : ", transaction);

    setFlag("edit");
    setShowCard(false);
    setShowModal(true);

    // Show Transaction Modal

    // Display a Modal with transaction format
    // Populate current transaction data in form
    // if cancel --> clear the form and clode Edit Modal
    // If 'Save' is clicked --> validate the form (display errors if needed)
    // Submit form to the DB updating product, transaction tables, destination, etc tables
  };

  const updateProductField = async (field: any, value: string, id: string) => {
    console.log(field + " " + value + " " + id);

    const params = {
      field: field,
      value: value,
      id: id,
    };

    try {
      await axios.post(baseURL + updateProductFieldAPI, { params });
    } catch (err) {
      console.log(err);
    }

    //props.updateList();
    handleRefresh();
    setShowCard(true);
  };

  // const displayEntry = (e: any, index: any) => {
  //   return (
  //     <Pressable
  //       style={styles.transaction}
  //       key={index}
  //       onPress={() => displayTransactionCard(e)}
  //     >
  //       <Text>{moment(e.date).format("MMM DD, YYYY")} -</Text>
  //       <Text>
  //         {" "}
  //         {e.first_name == "na" ? "" : e.first_name} {e.last_name}
  //       </Text>
  //       <Text> Total: {formatDollarEntry(e.cost)} - </Text>
  //       <Text> Commission: {formatDollarEntry(e.commission)}</Text>
  //       <Text> Received: {e.is_comm_received}</Text>

  //       {/* <Text> Party Size: {e.party}</Text>
  //       <Text> Phone: {e.phone}</Text>
  //       <Text> Email: {e.email}</Text>
  //       <Text> Travel Type: {e.travel_type}</Text>
  //       <Text> Vendor: {e.vendor}</Text> */}
  //     </Pressable>
  //   );
  // };

  if (props.data.length == 0)
    return <NotFound message="No transactions found!" />;

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      //onLayout={(event) => getComponentWidth(event)}
    >
      <View style={styles.summary}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 10 }}
          >
            <Text
              style={{
                fontSize: 20,
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
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {props.selected == "date" || props.selected == "name" ? null : (
              <Picker
                //style={styles.textInputSelect}
                onValueChange={(itemValue) => props.sortProducts(itemValue)}
              >
                <Picker.Item label="- Sort by -" value="" />

                <Picker.Item label={"Date"} value="date" />
                <Picker.Item label={"Status"} value="status" />
              </Picker>
            )}
          </View>
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

      {!props.allProducts ? (
        <ScrollView style={styles.scrollView}>
          {props.data.map((p: any, index: any) => (
            <TransactionEntry
              key={index}
              product={p}
              index={index}
              displayTransactionCard={displayTransactionCard}
            />
          ))}
        </ScrollView>
      ) : props.allProducts.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {props.allProducts.map((p: any, index: any) => (
            <TransactionEntry
              key={index}
              product={p}
              index={index}
              displayTransactionCard={displayTransactionCard}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Text style={{ fontSize: 20, color: "red" }}>
            No transactions found!
          </Text>
        </View>
      )}

      <View style={{ width: 150, marginTop: 20 }}>
        <CustomButton
          title="Export..."
          flag="add"
          type="button"
          //submitForm={() => displayTransactionModal("add")}
        />
      </View>

      <TransactionModal
        flag={flag}
        refresh={handleRefresh}
        //allProducts={props.allProducts}
        products={props.data}
        customers={props.customers}
        vendors={props.vendors}
        suppliers={props.suppliers}
        travelTypes={props.travelTypes}
        transactions={props.transactions}
        transaction={transaction || {}}
        destinations={props.destinations}
        visible={showModal}
        hideModal={() => setShowModal(false)}
      />

      {showCard && (
        <OutsideClickHandler onOutsideClick={() => setShowCard(false)}>
          <Draggable
            x={Dimensions.get("window").width / 2}
            y={Dimensions.get("window").height / 6}
          >
            <TransactionDetailsCard
              data={transaction}
              refreshTEST={props.refreshTEST}
              updateProductField={updateProductField}
              editTransaction={editTransaction}
              hideCard={() => setShowCard(false)}
            />
          </Draggable>
        </OutsideClickHandler>
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
    borderColor: "grey",
    borderRadius: 5,
  },
  summary: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    backgroundColor: "#F0F0F0",
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
