import { View, StyleSheet } from "react-native";
import Customers from "./Customers";
import CSVUploader from "./CSVUploader";
import Dashboard from "./Dashboard";
import Transactions from "./Transactions";
import Commissions from "./Commissions";
import Vendors from "./Vendors";
import Suppliers from "./Suppliers";

export default function Main(props: any) {
  function displayScreen() {
    if (props.screen === "transactions") return <Transactions />;
    if (props.screen === "commissions") return <Commissions />;
    if (props.screen === "customers") return <Customers />;
    if (props.screen === "vendors") return <Vendors />;
    if (props.screen === "suppliers") return <Suppliers />;
    if (props.screen === "uploader") return <CSVUploader />;

    return <Dashboard />;
  }

  return <View style={styles.container}>{displayScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: "column",
    backgroundColor: "#FFFFFF", //"#F0F0F0",
    //backgroundColor: "#E8E9EB", // <-- Added a shade of grey
  },
});
