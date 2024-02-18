import { View, Text, StyleSheet, Picker } from "react-native";
import CustomButton from "../../CustomButton";
import Searchbar from "../../Searchbar";

export default function CustomersTab(props: any) {
  return (
    <>
      <View style={styles.tabStyle}>
        <View style={{ display: "flex", marginRight: 20 }}>
          <Searchbar
            options={props.foundEntries}
            objects={props.entryObjects}
            onChange={(e: any) => props.showSearchResults(e)}
            handleSelection={props.handleSelection}
          />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          height: "auto",
          marginBottom: 10,
        }}
      >
        <CustomButton
          title="Add"
          flag="add"
          type="button"
          submitForm={() => props.displayModal("add")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
