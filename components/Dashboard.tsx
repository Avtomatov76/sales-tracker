import { useQuery } from "react-query";
import { View, Text, StyleSheet, Dimensions } from "react-native";
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
import LoadingScreen from "./LoadingScreen";
import { fetchDashboardData } from "../utilities/dbDataFetch";
import DashboardTile from "./cards/dashboard/DashboardTile";

const windowWidth = Dimensions.get("window").width;

export default function Dashboard(props: any) {
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["dashboard-details"],
    () => fetchDashboardData()
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="commissions" />;

  let dashboardCards: any[] = [];
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

      <View style={[styles.summary, { padding: 20 }]}>
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {dashboardCards.map((e: any, index: any) => (
            <DashboardTile
              key={index}
              index={index}
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

        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <View style={[styles.chart, { padding: 15 }]}>
            <Text
              style={{
                color: "grey",
                fontWeight: "600",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              Highest grossing customers
            </Text>
            {!commissionsList
              ? null
              : commissionsList.map((c: any, index: any) => (
                  <DashboardList
                    key={index}
                    index={index}
                    customer={c}
                    type="customers"
                  />
                ))}
          </View>
          <View
            style={[
              styles.chart,
              { flex: 1, marginLeft: 20, padding: 15, minWidth: 200 },
            ]}
          >
            <Text
              style={{
                color: "grey",
                fontWeight: "600",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              5 most popular destinations
            </Text>
            {!salesPerDestination
              ? null
              : salesPerDestination.map((d: any, index: any) => (
                  <DashboardList
                    key={index}
                    index={index}
                    destination={d}
                    type="destinations"
                  />
                ))}
          </View>
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
  card: {
    display: "flex",
    flex: 1,
    height: 100,
    minWidth: 280,
    maxWidth: 280,
    marginBottom: 10,
    borderRadius: 5,
    padding: 15,
    borderBottomWidth: 5,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  percent: {
    alignSelf: "flex-end",
    color: "grey",
    marginBottom: 2,
    fontSize: 22,
  },
  chart: {
    flex: 2,
    minWidth: 350,
    height: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
