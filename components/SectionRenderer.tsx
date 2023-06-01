import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Button } from "react-native-paper";
import GetConfiguration from "../constants/Config";
import CustomerModal from "../modals/CustomerModal";
import { displayName, findCustomerById } from "../functions/customerFunctions";
import Searchbar from "./Searchbar";
import CustomerCard from "./cards/CustomerCard";
import CustomerList from "./CustomerList";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import DisplayList from "./DisplayList";

export default function SectionRenderer(props: any) {
  const displayCard = (type: string) => {
    switch (type) {
      case "customer":
        return (
          <CustomerCard
            flag={props.flag}
            customer={props.entry}
            editCustomer={props.editEntry}
            deleteCustomer={props.deleteEntry}
          />
        );

        break;
      case "vendor":
        // code block
        break;
      default:
        console.log("Error: type received not matching any of the cases!!");
    }

    // if (type == "customer")
    //   return (
    //     <CustomerCard
    //       flag={props.flag}
    //       customer={props.entry}
    //       edit={props.edit}
    //       delete={props.delete}
    //     />
    //   );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 35 }}>{props.title}</Text>

        <Searchbar
          options={props.foundEntries}
          objects={props.entryObjects}
          onChange={(e: any) => props.showSearchResults(e)}
          handleSelection={props.handleSelection}
        />

        <View>
          <Button
            mode="contained"
            //color="#f27d42"
            //buttonColor="#f27d42"
            style={styles.addBtn}
            onPress={() => props.displayModal("add")}
          >
            Add
          </Button>
        </View>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text>
          Total {props.title}: {props.data ? props.data.length : 0}
        </Text>
      </View>
      <hr
        style={{
          width: "100%",
          backgroundColor: "grey",
          border: "none",
          height: 1,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        <View style={{}}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginBottom: 20, fontSize: 18, marginRight: 15 }}>
              Show All
            </Text>
            <Pressable onPress={props.toggleShowAll}>
              <Image
                source={require("../assets/icons/plus-orange.png")}
                style={{ height: 24, width: 24 }}
              />
            </Pressable>
          </View>
          {!props.showAll ? null : (
            <DisplayList
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
          )}
        </View>

        {/* {!showAllCustomers ? null : (
            <CustomerList
              customers={data}
              customerIndex={customerIndex}
              showCustomerMenu={showCustomerMenu}
              showCustomerDetails={showCustomerDetails}
              dismiss={() => setShowCustomerMenu(false)}
              displayName={displayName}
              displayMenu={displayMenu}
              editCustomer={editCustomer}
              deleteCustomer={deleteCustomer}
            />
          )} */}

        {!props.entry ? null : displayCard(props.type)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    marginBottom: 10,
    //width: 100,
    backgroundColor: "#f27d42",
  },
});
