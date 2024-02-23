import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import axios from "axios";
import TransactionModal from "../modals/TransactionModal";
import TransactionDetailsCard from "../components/cards/transactions/TransactionDetailsCard";
import { productsAPI, updateProductFieldAPI } from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import NotFound from "./NotFound";
import ListEntry from "./ListEntry";
import OutsideClickHandler from "react-outside-click-handler";
import Draggable from "react-native-draggable";
import SubHeader from "./SubHeader";
import { useQueryClient } from "react-query";

export default function TransactionsList(props: any) {
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [action, setAction] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [transaction, setTransaction] = useState<any>();
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<any>();

  const { height, width } = useWindowDimensions();
  const baseURL = GetConfiguration().baseUrl;

  const queryClient = useQueryClient();

  const displayTransactionModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const removeTransaction = (flag: any, product: any) => {
    setProduct(product);
    setFlag("delete");
    setShowModal(true);
  };

  const deleteProduct = async (id: any) => {
    try {
      const res = await axios.post(baseURL + productsAPI + `/${id}`);
      console.log(res.data.result);
      if (res.data) setMessage("Could not delete customer ");
    } catch (err) {
      console.log(err);
    }

    setShowModal(false);
    handleRefresh();
  };

  const displayTransactionCard = (data: any, index: any) => {
    handleSelection(index);
    setTransaction(data);
    setShowCard(true);
  };

  const handleRefresh = () => {
    console.log("Refreshing.........................");
    props.refreshTEST();
  };

  const editTransaction = (transaction: any) => {
    setFlag("edit");
    handleSelection(null);
    setShowCard(false);
    setShowModal(true);
  };

  const updateProductField = async (field: any, value: string, id: string) => {
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

    handleRefresh();
    setShowCard(true);
  };

  const handleSelection = (index: any) => {
    setSelected(index);
  };

  const handleHideCard = () => {
    handleSelection(null);
    setShowCard(false);
  };

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
      <SubHeader
        flag="transactions"
        selected={props.selected}
        numEntries={props.numProducts}
        sortProducts={props.sortProducts}
        submitForm={() => displayTransactionModal("add")}
      />

      {!props.allProducts ? (
        <ScrollView
          style={[styles.scrollView, { width: width > 1000 ? "50%" : "100%" }]}
        >
          {props.data.map((p: any, index: any) => (
            <ListEntry
              flag="transactions"
              selected={selected}
              key={index}
              product={p}
              index={index}
              displayTransactionCard={displayTransactionCard}
              removeTransaction={removeTransaction}
            />
          ))}
        </ScrollView>
      ) : props.allProducts.length > 0 ? (
        <ScrollView
          style={[styles.scrollView, { width: width > 1000 ? "50%" : "100%" }]}
        >
          {props.allProducts.map((p: any, index: any) => (
            <ListEntry
              flag="transactions"
              selected={selected}
              key={index}
              product={p}
              index={index}
              displayTransactionCard={displayTransactionCard}
              removeTransaction={removeTransaction}
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

      {/* <View style={{ width: 150, marginTop: 20 }}>
        <CustomButton
          title="Export..."
          flag="add"
          type="button"
          //submitForm={() => displayTransactionModal("add")}
        />
      </View> */}

      <TransactionModal
        flag={flag}
        action={action}
        refresh={handleRefresh}
        message={message}
        product={product}
        products={props.data}
        customers={props.customers}
        vendors={props.vendors}
        suppliers={props.suppliers}
        travelTypes={props.travelTypes}
        transactions={props.transactions}
        transaction={transaction || {}}
        destinations={props.destinations}
        deleteProduct={deleteProduct}
        visible={showModal}
        hideModal={() => setShowModal(false)}
      />

      {showCard && (
        <OutsideClickHandler onOutsideClick={() => handleHideCard()}>
          <Draggable
            x={Dimensions.get("window").width / 2}
            y={Dimensions.get("window").height / 6}
          >
            <TransactionDetailsCard
              data={transaction}
              refreshTEST={props.refreshTEST}
              updateProductField={updateProductField}
              editTransaction={editTransaction}
              hideCard={() => handleHideCard()}
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
    maxHeight: 550,
    width: "50%",
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  summary: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    backgroundColor: "#F0F0F0",
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
