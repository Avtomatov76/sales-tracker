import { View, Text, StyleSheet, Picker } from "react-native";
import TransactionsTab from "./cards/transactions/TransactionsTab";
import CommissionsTab from "./cards/commissions/CommissionsTab";
import CustomersTab from "./cards/customers/CustomersTab";
import VendorsTab from "./cards/vendors/VendorsTab";

export default function TabHeader(props: any) {
  const displayTab = (name: any) => {
    if (name.toLowerCase() == "transactions")
      return (
        <TransactionsTab
          selected={props.selected}
          handleSelection={props.handleSelection}
          handleUndoIconPress={props.handleUndoIconPress}
          sortedCustomers={props.sortedCustomers}
          startDate={props.startDate}
          endDate={props.endDate}
          handleOnClick={props.handleOnClick}
          handleSearch={props.handleSearch}
        />
      );

    if (name.toLowerCase() == "commissions")
      return (
        <CommissionsTab
          startDate={props.startDate}
          endDate={props.endDate}
          handleSearch={props.handleSearch}
          handleOnClick={props.handleOnClick}
        />
      );

    if (name.toLowerCase() == "customers")
      return (
        <CustomersTab
          foundEntries={props.foundEntries}
          entryObjects={props.entryObjects}
          showSearchResults={props.showSearchResults}
          handleSelection={props.handleSelection}
          displayModal={props.displayModal}
        />
      );

    if (name.toLowerCase() == "vendors")
      return (
        <VendorsTab
          foundEntries={props.foundEntries}
          entryObjects={props.entryObjects}
          showSearchResults={props.showSearchResults}
          handleSelection={props.handleSelection}
          displayModal={props.displayModal}
        />
      );
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.textField}>{props.name}</Text>
        {displayTab(props.name)}
      </View>

      <hr style={styles.hr} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
  },
  textField: {
    fontSize: 36,
    fontWeight: "600",
    paddingRight: 20,
    marginRight: "auto",
    marginBottom: 10,
  },
  hr: {
    width: "100%",
    backgroundColor: "grey",
    border: "none",
    height: 1,
  },
});
