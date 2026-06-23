import { View, StyleSheet } from "react-native";
import Customers from "./Customers";
import CSVUploader from "./CSVUploader";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Commissions from "./Commissions";
import Vendors from "./Vendors";
import Suppliers from "./Suppliers";
import Destinations from "./Destinations";

export default function Main(props: any) {
  function displayScreen() {
    if (props.screen === "transactions") return <Transactions />;
    if (props.screen === "commissions") return <Commissions />;
    if (props.screen === "customers") return <Customers />;
    if (props.screen === "vendors") return <Vendors />;
    if (props.screen === "suppliers") return <Suppliers />;
    if (props.screen === "destinations") return <Destinations />;
    if (props.screen === "uploader") return <CSVUploader />;

    return <Dashboard />;
  }

  return <View style={styles.container}>{displayScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
    flexDirection: "column",
    backgroundColor: "#F6F8FB",
  },
});
