import { View, Pressable, Image, Picker, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";
import TextField from "@material-ui/core/TextField";

export default function TransactionsByDate(props: any) {
  return (
    <>
      <Pressable onPress={props.handleUndoIconPress}>
        <Image
          style={styles.undoIcon}
          source={require("../assets/icons/undo-icon.png")}
        />
      </Pressable>
      <View style={styles.dateSearch}>
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
          submitForm={() => props.handleSearch("date")}
          flag="search"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateSearch: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  undoIcon: {
    height: 24,
    width: 24,
    marginRight: 15,
    alignSelf: "center",
    marginBottom: 10,
  },
});
