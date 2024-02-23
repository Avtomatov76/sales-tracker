import { useQuery } from "react-query";
import { View, Text, StyleSheet } from "react-native";
import TabHeader from "./TabHeader";
import ErrorScreen from "./ErrorScreen";
import {
  getDashboardCards,
  getHighestComm,
  getSumOfEntries,
  getYearToDateCommissions,
  getYearToDateSales,
} from "../functions/dashboardFunctions";
import DashboardList from "./cards/dashboard/DashboardList";
import SummaryCard from "./cards/SummaryCard";
import LoadingScreen from "./LoadingScreen";
import { fetchDashboardData } from "../utilities/dbDataFetch";

export default function Dashboard(props: any) {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["dashboard-details"],
    () => fetchDashboardData()
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="commissions" />;

  let dashboardCards: any[] = [];
  let salesCards: any[] = [];
  let metricsCards: any[] = [];
  let allSales = getSumOfEntries(data.products, "product_cost");
  let ytdSales = getYearToDateSales(data.transactions);
  let allCommissions = getSumOfEntries(data.products, "product_comm");
  let ytdCommissions = getYearToDateCommissions(
    data.products,
    data.transactions
  );
  let highestMonthCommEntry = getHighestComm(
    data.commissionEntries,
    "monthly_sum"
  );
  let highestCommission = getHighestComm(
    data.everyCommissionEntry,
    "commission"
  );
  let commissionsList = data.commissionsPerCustomer.slice(0, 11);
  let salesPerDestination = data.salesPerDestination.slice(1, 6);

  if (allSales && ytdSales && allCommissions && ytdCommissions) {
    dashboardCards = getDashboardCards(
      allSales,
      ytdSales,
      allCommissions,
      ytdCommissions,
      highestMonthCommEntry,
      highestCommission
    );

    salesCards = dashboardCards.slice(0, 4);
    metricsCards = dashboardCards.slice(4);
  }

  if ((!allSales && !allCommissions) || isLoading)
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
        {/* <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Sales</Text> */}
        <View
          style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        >
          {salesCards.map((e: any, index: any) => (
            <SummaryCard
              key={index}
              title={e.title}
              color="#DEF3FD"
              data={e.data}
              icon={e.icon}
              iconColor={e.iconColor}
              tab="dashboard"
              date={e.date || null}
            />
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          {/* <Text style={{ marginBottom: 10, fontWeight: "bold" }}>Metrics</Text> */}
          <View
            style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
          >
            {metricsCards.map((e: any, index: any) => (
              <SummaryCard
                key={index}
                title={e.title}
                color="#DEF3FD"
                data={e.data}
                icon={e.icon}
                iconColor={e.iconColor}
                tab="dashboard"
                date={e.date || null}
              />
            ))}
          </View>

          <Text style={{ marginTop: 10 }}>Day with most commissions: </Text>
          <Text style={{ marginBottom: 10 }}>5 most popular destinations</Text>
          {!salesPerDestination
            ? null
            : salesPerDestination.map((d: any, index: any) => (
                <DashboardList
                  key={index}
                  destination={d}
                  type="destinations"
                />
              ))}
          <Text style={{ marginTop: 10 }}>
            5 largest sales details and commissions
          </Text>
          <Text style={{ marginBottom: 10 }}>Highest grossing customer(s)</Text>
          {!commissionsList
            ? null
            : commissionsList.map((c: any, index: any) => (
                <DashboardList key={index} customer={c} type="customers" />
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
