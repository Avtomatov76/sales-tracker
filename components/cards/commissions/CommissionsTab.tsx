import { View, Text, StyleSheet, Picker } from "react-native";
import TextField from "@material-ui/core/TextField";
import CustomButton from "../../CustomButton";

export default function CommissionsTab(props: any) {
  return (
    <>
      <View style={styles.tabStyle}>
        <View style={{ display: "flex", marginRight: 20 }}>
          <TextField
            size="small"
            value={props.startDate}
            onClick={() => props.handleOnClick("start")}
            variant="outlined"
            label="Select start date"
            style={{ width: 160 }}
          />
        </View>
        <View style={{ display: "flex", marginRight: 30 }}>
          <TextField
            size="small"
            value={props.endDate}
            onClick={() => props.handleOnClick("end")}
            variant="outlined"
            label="Select end date"
            style={{ width: 160 }}
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
          title="Search"
          submitForm={props.handleSearch}
          flag="search"
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
