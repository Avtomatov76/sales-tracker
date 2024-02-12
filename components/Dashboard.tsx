import { useContext } from "react";
import { MyContext } from "../MyContext";
import { View, Text, StyleSheet } from "react-native";
import TabHeader from "./TabHeader";
import ErrorScreen from "./ErrorScreen";
import {
  getHighestMonthComm,
  getMonth,
  getSumOfEntries,
  getYearToDateCommissions,
  getYearToDateSales,
} from "../functions/dashboardFunctions";
import { formatDollarEntry } from "../functions/customerFunctions";

export default function Dashboard(props: any) {
  const dbData = useContext(MyContext);

  // let allSales = 0;
  // let ytdSales = 0;
  // let allCommissions = 0;
  // let ytdCommissions = 0;
  // let highestMonthComm = ""

  let allSales = getSumOfEntries(dbData.products, "product_cost");
  let ytdSales = getYearToDateSales(dbData.transactions);
  let allCommissions = getSumOfEntries(dbData.products, "product_comm");
  let ytdCommissions = getYearToDateCommissions(
    dbData.products,
    dbData.transactions
  );
  let highestMonthCommEntry = getHighestMonthComm(dbData.commissionEntries);

  //console.log(dbData.commissionEntries);
  console.log(highestMonthCommEntry);

  if (!allSales && !allCommissions)
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
              {((parseInt(ytdCommissions) * 100) / parseInt(ytdSales)).toFixed(
                3
              )}
              &#37;
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text>Historic revenue margin:&nbsp;</Text>
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {((parseInt(allCommissions) * 100) / parseInt(allSales)).toFixed(
                3
              )}
              &#37;
            </Text>
          </View>

          <Text>
            Best month in sales and commissions:&nbsp;
            <Text>{getMonth(highestMonthCommEntry)}</Text>&nbsp;
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {formatDollarEntry(
                parseInt(highestMonthCommEntry["monthly_sum"].toFixed(2))
              )}
            </Text>
          </Text>
          <Text>
            Best week in sales and commissions -- RUSLAN AGE --
            {/* {personOBJ.age} */}
          </Text>
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
