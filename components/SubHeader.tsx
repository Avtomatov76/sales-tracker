import { StyleSheet, Text, View, Picker } from "react-native";

import CustomButton from "./CustomButton";

export default function SubHeader(props: any) {
  console.log("FLAGGGGGGG : ", props.flag);
  //

  //   const displayNumEntries = (flag: string) => {
  //     switch (flag) {
  //       case "transactions":
  //         return props.numProducts;
  //       case "vendors":
  //         return "19999";
  //       default:
  //         console.log("Error: type received not matching any of the cases!!");
  //     }
  //   };

  return (
    <View style={styles.summary}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "600",
              paddingRight: 20,
            }}
          >
            {props.numEntries}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {props.selected == "date" || props.selected == "name" ? null : (
            <Picker
              onValueChange={(itemValue) => props.sortProducts(itemValue)}
            >
              <Picker.Item label="- Sort by -" value="" />

              <Picker.Item label={"Date"} value="date" />
              <Picker.Item label={"Status"} value="status" />
            </Picker>
          )}
          <View style={{ marginLeft: 20 }}>
            <CustomButton
              title="Add"
              flag="add"
              type="button"
              submitForm={() => props.submitForm()}
            />
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
});
