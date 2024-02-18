import { View, Text, StyleSheet, Picker } from "react-native";
import TransactionsByDate from "../../TransactionsByDate";
import TransactionsByName from "../../TransactionsByName";

export default function TransactionsTab(props: any) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {props.selected == "date" || props.selected == "name" ? null : (
        <Picker
          style={styles.textInputSelect}
          onValueChange={(itemValue) =>
            props.handleSelection(itemValue, "search")
          }
        >
          <Picker.Item label="- Search by -" value="" />

          <Picker.Item label={"Date"} value="date" />
          <Picker.Item label={"Name"} value="name" />
        </Picker>
      )}

      {props.selected == "name" ? (
        <TransactionsByName
          handleUndoIconPress={props.handleUndoIconPress}
          handleSelection={props.handleSelection}
          sortedCustomers={props.sortedCustomers}
        />
      ) : null}

      {props.selected == "date" ? (
        <TransactionsByDate
          startDate={props.startDate}
          endDate={props.endDate}
          handleUndoIconPress={props.handleUndoIconPress}
          handleOnClick={props.handleOnClick}
          handleSearch={props.handleSearch}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  textInputSelect: {
    height: 35,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#F27D42",
    fontWeight: "400",
  },
});
