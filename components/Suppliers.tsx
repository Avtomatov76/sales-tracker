import { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import TabHeader from "./TabHeader";
import GetConfiguration from "../constants/Config";
import ErrorScreen from "./ErrorScreen";
import { suppliersAPI } from "../api/endPoints";
import SubHeader from "./SubHeader";
import ListEntry from "./ListEntry";

export default function Suppliers(props: any) {
  const [suppliers, setSuppliers] = useState<any>();

  const { height, width } = useWindowDimensions();

  const baseURL = GetConfiguration().baseUrl;

  useEffect(() => {
    async function getCommissions() {
      let endpoints = [baseURL + suppliersAPI];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([{ data: suppliers }]) => {
          setSuppliers(suppliers);
        }
      );
    }

    getCommissions();
  }, []);

  if (!suppliers)
    return (
      <ErrorScreen
        error="No supplier information found in the database!"
        type="server"
      />
    );

  return (
    <View style={{ display: "flex" }}>
      <TabHeader name="Suppliers" />
      <SubHeader
        flag="vendors"
        selected={props.selected}
        numEntries={suppliers.length}
        //sortProducts={props.sortProducts}
        //submitForm={() => displayTransactionModal("add")}
      />

      {!suppliers ? (
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Text style={{ fontSize: 20, color: "red" }}>
            No suppliers found!
          </Text>
        </View>
      ) : suppliers.length > 0 ? (
        <ScrollView
          style={[styles.scrollView, { width: width > 1000 ? "50%" : "100%" }]}
        >
          {suppliers.map((s: any, index: any) => (
            <ListEntry
              flag="suppliers"
              //selected={selected}
              key={index}
              supplier={s}
              index={index}
              //displayTransactionCard={displayTransactionCard}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Text style={{ fontSize: 20, color: "red" }}>
            No suppliers found!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    display: "flex",
    maxHeight: 550,
    width: "50%",
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
