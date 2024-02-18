import { View, Text, Pressable, StyleSheet } from "react-native";
import TransactionEntry from "./TransactionEntry";
import CustomerEntry from "./CustomerEntry";
import React from "react";
import VendorEntry from "./VendorEntry";
import SupplierEntry from "./SupplierEntry";
import { getAvatarColor } from "../constants/Colors";

export default function ListEntry(props: any) {
  let flag = props.flag.toLowerCase();

  const displayName = (product: any) => {
    let nameStr = "";

    if (product.first_name == "na") nameStr = product.last_name;
    if (product.first_name != "na")
      nameStr = product.first_name + " " + product.last_name;

    return nameStr.length > 20 ? nameStr.substring(0, 20) + "..." : nameStr;
  };

  const handleOnPress = () => {
    /**
     * If transactions handle on transaction press
     * otherwise handle on customer press
     */
    if (flag == "transactions")
      props.displayTransactionCard(props.product, props.index);
    if (flag == "customers") {
      props.setSelection(props.index);
      props.showDetails(props.el[props.type + "_id"]);
    }
  };

  const displayListEntry = (flag: any) => {
    if (flag == "vendors")
      return (
        <VendorEntry
          vendor={props.vendor}
          // displayName={displayName(props.product)}
          // productDate={props.product.date}
          // productCost={props.product.cost}
          // productCommission={props.product.commission}
          // isCommReceived={props.product.is_comm_received}
        />
      );

    if (flag == "suppliers")
      return (
        <SupplierEntry
          supplier={props.supplier}
          // displayName={displayName(props.product)}
          // productDate={props.product.date}
          // productCost={props.product.cost}
          // productCommission={props.product.commission}
          // isCommReceived={props.product.is_comm_received}
        />
      );

    if (flag == "transactions")
      return (
        <TransactionEntry
          displayName={displayName(props.product)}
          removeTransaction={props.removeTransaction}
          product={props.product}
          productDate={props.product.date}
          productCost={props.product.cost}
          productCommission={props.product.commission}
          isCommReceived={props.product.is_comm_received}
        />
      );

    if (flag == "customers")
      return (
        <CustomerEntry
          el={props.el}
          index={props.index}
          selected={props.selected}
          type={props.type}
          data={props.data}
          entryIndex={props.entryIndex}
          showMenu={props.showMenu}
          showDetails={props.showDetails}
          dismissMenu={props.dismissMenu}
          displayName={props.displayName}
          displayMenu={props.displayMenu}
          editEntry={props.editEntry}
          deleteEntry={props.deleteEntry}
        />
      );
  };

  const displayInitials = (flag: string) => {
    switch (flag) {
      case "customers":
        return props.el.last_name.substring(0, 2);
      case "transactions":
        return props.product.last_name.substring(0, 2);
      case "vendors":
        return props.vendor.vendor_id.substring(0, 2);
      case "suppliers":
        return props.supplier.supplier_name.substring(0, 2);
      default:
        console.log("Error: type received not matching any of the cases!!");
    }
  };

  return (
    <Pressable
      style={
        props.index == props.selected
          ? [styles.transaction, { backgroundColor: "rgb(255, 249, 196)" }]
          : styles.transaction
      }
      onPress={() => handleOnPress()}
    >
      <View style={[styles.avatar, { backgroundColor: getAvatarColor() }]}>
        <Text
          style={{
            fontSize: 24,
            //color: "grey",
          }}
        >
          {displayInitials(props.flag)}
        </Text>
      </View>

      {displayListEntry(flag)}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  transaction: {
    height: 65,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 50,
    opacity: 0.7,
    // backgroundColor: getAvatarColor(), //"rgb(222, 236, 249)",
    marginRight: 15,
  },
});
