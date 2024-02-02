import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import TabHeader from "./TabHeader";
import axios from "axios";
import { productsAPI, transactionsAPI } from "../api/endPoints";
import GetConfiguration from "../constants/Config";
import ErrorScreen from "./ErrorScreen";
import {
  getSumOfEntries,
  getYearToDateCommissions,
  getYearToDateSales,
} from "../functions/dashboardFunctions";
import { formatDollarEntry } from "../functions/customerFunctions";

export default function Dashboard(props: any) {
  const baseURL = GetConfiguration().baseUrl;
  const [allProducts, setAllProducts] = useState<any>();
  const [allTransactions, setAllTransactions] = useState<any>();
  //const [allCommissions, setAllCommissions] = useState<any>();

  //
  let allSales = 0;
  let ytdSales = 0;
  let allCommissions = 0;
  let ytdCommissions = 0;
  //
  useEffect(() => {
    async function getDashboardData() {
      let endpoints = [baseURL + productsAPI, baseURL + transactionsAPI];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([{ data: allProducts }, { data: allTransactions }]) => {
          setAllProducts(allProducts);
          setAllTransactions(allTransactions);
        }
      );
    }

    getDashboardData();
  }, []);

  if (allProducts && allTransactions) {
    allSales = getSumOfEntries(allProducts, "product_cost");
    ytdSales = getYearToDateSales(allTransactions);
    allCommissions = getSumOfEntries(allProducts, "product_comm");
    ytdCommissions = getYearToDateCommissions(allProducts, allTransactions);
  }

  console.log("ALL PRODUCT DATA: ", allProducts);
  //console.log("ALL TRANSACTIONS DATA: ", allTransactions);

  if (!allProducts && !allTransactions)
    return (
      <ErrorScreen
        error="No product information found in the database!"
        type="server"
      />
    );

  return (
    <View style={{ display: "flex" }}>
      <TabHeader name="Dashboard" />

      <View style={styles.summary}>
        <View>
          <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Sales</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Total sales:&nbsp;</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {formatDollarEntry(allSales)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Year-to-date sales:&nbsp;</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {formatDollarEntry(ytdSales)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>All Commissions:&nbsp;</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {formatDollarEntry(allCommissions)}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Year-to-date commissions:&nbsp;</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {formatDollarEntry(ytdCommissions)}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Metrics</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Year-to-date revenue margin:&nbsp;</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {((ytdCommissions * 100) / ytdSales).toFixed(3)}&#37;
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Historic revenue margin:&nbsp;</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {((allCommissions * 100) / allSales).toFixed(3)}&#37;
            </Text>
          </View>

          <Text>Best month in sales and commissions</Text>
          <Text>Best week in sales and commissions</Text>
          <Text>Best day in sales and commissions</Text>
          <Text>3 most popular destinations</Text>
          <Text>5 largest sales details and commissions</Text>
          <Text>Highest grossing customer(s)</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Analysis</Text>
          <Text>
            Sales/commissions % increase/decrease comparison - per year and
            year-to-date
          </Text>
          <Text>5% increase of revenue projection</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
