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
import { vendorsAPI } from "../api/endPoints";
import SubHeader from "./SubHeader";
import ErrorScreen from "./ErrorScreen";
import ListEntry from "./ListEntry";

export default function Vendors(props: any) {
  const [vendors, setVendors] = useState<any>();

  const { height, width } = useWindowDimensions();

  const baseURL = GetConfiguration().baseUrl;

  useEffect(() => {
    async function getCommissions() {
      let endpoints = [baseURL + vendorsAPI];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([{ data: vendors }]) => {
          setVendors(vendors);
        }
      );
    }

    getCommissions();
  }, []);

  //
  console.log("ALL VENDORS: ", vendors);
  //

  if (!vendors)
    return (
      <ErrorScreen
        error="No vendor information found in the database!"
        type="server"
      />
    );

  return (
    <>
      <View style={{ display: "flex" }}>
        <TabHeader name="Vendors" />
        <SubHeader
          flag="vendors"
          selected={props.selected}
          numEntries={vendors.length}
          sortProducts={props.sortProducts}
          //submitForm={() => displayTransactionModal("add")}
        />

        {!vendors ? (
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            <Text style={{ fontSize: 20, color: "red" }}>
              No transactions found!
            </Text>
          </View>
        ) : vendors.length > 0 ? (
          <ScrollView
            style={[
              styles.scrollView,
              { width: width > 1000 ? "50%" : "100%" },
            ]}
          >
            {vendors.map((v: any, index: any) => (
              <ListEntry
                flag="vendors"
                //selected={selected}
                key={index}
                vendor={v}
                index={index}
                //displayTransactionCard={displayTransactionCard}
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
      </View>
    </>
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
