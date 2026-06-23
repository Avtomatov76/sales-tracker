import { useQuery } from "react-query";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import TabHeader from "./TabHeader";
import ErrorMessage from "./ErrorMessage";
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

  if (error)
    return (
      <View>
        <Text style={{ fontSize: 18, color: "red" }}>
          Error fetching data from the server!
        </Text>
      </View>
    );

  if (isLoading) return <LoadingScreen />;

  if (!data)
    return (
      <ErrorMessage
        error="No product information found in the database!"
        type="server"
      />
    );

  let dashboardCards: any[] = [];
  let allSales = getSumOfEntries(data.products, "product_cost") ?? "0.00";
  let ytdSales = getYearToDateSales(data.transactions) ?? "0.00";
  let allCommissions = getSumOfEntries(data.products, "product_comm") ?? "0.00";
  let ytdCommissions = getYearToDateCommissions(
    data.products,
    data.transactions
  ) ?? "0.00";
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
  let productCount = data.products.length;
  let averageSale =
    productCount > 0 ? (parseFloat(allSales) / productCount).toFixed(2) : "0";
  let receivedCommissions = data.products.filter(
    (p: any) => p.is_comm_received
  ).length;
  let pendingCommissions = productCount - receivedCommissions;

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

  if (
    (!allSales &&
      !ytdSales &&
      !allCommissions &&
      !ytdCommissions &&
      !highestMonthCommEntry &&
      !highestCommission) ||
    isLoading
  )
    return (
      <ErrorMessage
        error="No product information found in the database!"
        type="server"
      />
    );

  return (
    <View style={{ display: "flex" }}>
      <TabHeader name="Dashboard" />

      <View style={styles.container}>
        <View style={styles.tabContainer}>
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
            //marginBottom: 20,
          }}
        >
          <View style={[styles.chart, { padding: 15 }]}>
            <Text style={styles.chartTitle}>Highest grossing customers</Text>
            <ScrollView
              style={styles.customerListScroll}
              contentContainerStyle={styles.customerListContent}
            >
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
            </ScrollView>
          </View>
          <View style={[styles.chart, { padding: 15 }]}>
            <Text style={styles.chartTitle}>5 most popular destinations</Text>
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

          <View style={[styles.chart, { padding: 15 }]}>
            <Text style={styles.chartTitle}>Products</Text>
            <View style={styles.productHero}>
              <View>
                <Text style={styles.productCount}>{productCount}</Text>
                <Text style={styles.productLabel}>total products sold</Text>
              </View>
              <View style={styles.productIcon}>
                <Ionicons name="briefcase" size={28} color="#1F6F9F" />
              </View>
            </View>
            <View style={styles.productMetric}>
              <Text style={styles.productMetricLabel}>Average sale</Text>
              <Text style={styles.productMetricValue}>
                ${averageSale.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={styles.productMetric}>
              <Text style={styles.productMetricLabel}>Commissions received</Text>
              <Text style={styles.productMetricValue}>{receivedCommissions}</Text>
            </View>
            <View style={styles.productMetric}>
              <Text style={styles.productMetricLabel}>Commissions pending</Text>
              <Text style={[styles.productMetricValue, { color: "#B64D20" }]}>
                {pendingCommissions}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    backgroundColor: "#EEF3F7",
    marginTop: 20,
    padding: 24,
    borderRadius: 8,
  },
  tabContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  chart: {
    flex: 1,
    minWidth: 350,
    height: 400,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E3EAF1",
    shadowColor: "#1F2933",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  chartTitle: {
    color: "#506171",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 20,
    letterSpacing: 0,
  },
  customerListScroll: {
    flex: 1,
    overflow: "hidden",
  },
  customerListContent: {
    paddingBottom: 8,
  },
  entryView: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 28,
  },
  productHero: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#EAF4FB",
    marginBottom: 18,
  },
  productCount: {
    fontSize: 42,
    fontWeight: "700",
    color: "#1F2933",
  },
  productLabel: {
    color: "#506171",
    fontSize: 13,
    textTransform: "uppercase",
  },
  productIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  productMetric: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E9EEF3",
  },
  productMetricLabel: {
    color: "#506171",
    fontSize: 15,
  },
  productMetricValue: {
    color: "#1F2933",
    fontSize: 18,
    fontWeight: "700",
  },
});
