import { useContext } from "react";
import { MyContext } from "../MyContext";
import { View, Text, StyleSheet } from "react-native";
import TabHeader from "./TabHeader";
import ErrorScreen from "./ErrorScreen";
import {
  getHighestComm,
  getMonth,
  getSumOfEntries,
  getYearToDateCommissions,
  getYearToDateSales,
} from "../functions/dashboardFunctions";
import { formatDollarEntry } from "../functions/customerFunctions";
import DashboardCommList from "./cards/dashboard/DashboardCommList";
import CommissionsSummaryCard from "./cards/commissions/CommissionsSummaryCard";

export default function Dashboard(props: any) {
  const dbData = useContext(MyContext);

  console.log("--- DATABASE OBJECT --- : ", dbData);

  let allSales = getSumOfEntries(dbData.products, "product_cost");
  let ytdSales = getYearToDateSales(dbData.transactions);
  let allCommissions = getSumOfEntries(dbData.products, "product_comm");
  let ytdCommissions = getYearToDateCommissions(
    dbData.products,
    dbData.transactions
  );
  let highestMonthCommEntry = getHighestComm(
    dbData.commissionEntries,
    "monthly_sum"
  );
  let highestDayCommEntry = getHighestComm(
    dbData.everyCommissionEntry,
    "commission"
  );
  let commissionsList = dbData.commissionsPerCustomer.slice(0, 11);

  //console.log(dbData.commissionEntries);
  //console.log("HIGHEST MONTH COMMISSION: ", highestMonthCommEntry);

  //console.log("HIGHEST DAY COMMISSION: ", highestDayCommEntry);
  console.log(Date.now());

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

        <CommissionsSummaryCard
          // key={index}
          // data={card.data}
          // type={card.type}
          // color={card.color}
          // iconColor={card.iconColor}
          // icon={card.icon}
          title="Summary"
          icon="total"
          color="#FDE0E0"
          iconColor="#FF0000"
          startDate={props.startDate}
          endDate={props.endDate}
          commissions={props.commissions}
        />

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
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              {getMonth(highestMonthCommEntry)},&nbsp;
              {highestMonthCommEntry["year"]}&nbsp;-&nbsp;
            </Text>
            &nbsp;
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {formatDollarEntry(
                parseInt(highestMonthCommEntry["monthly_sum"].toFixed(2))
              )}
            </Text>
          </Text>
          <Text>
            Best day in sales and commissions:&nbsp;
            <Text style={{ color: "blue", fontWeight: "bold" }}>
              {highestDayCommEntry["date"]}&nbsp;-&nbsp;
            </Text>
            &nbsp;
            <Text style={{ color: "green", fontWeight: "bold" }}>
              {formatDollarEntry(
                parseInt(highestDayCommEntry["commission"].toFixed(2))
              )}
            </Text>
          </Text>
          <Text>3 most popular destinations</Text>
          <Text>5 largest sales details and commissions</Text>
          <Text style={{ marginBottom: 10 }}>Highest grossing customer(s)</Text>
          {!commissionsList
            ? null
            : commissionsList.map((c: any, index: any) => (
                <DashboardCommList key={index} customer={c} />
              ))}
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
