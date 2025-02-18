import moment from "moment";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function VendorEntry(props: any) {
  return (
    <Pressable style={styles.entry} onPress={props.handleOnPress}>
      <View style={styles.mainText}>
        <Text style={styles.name}>{props.vendor.vendor_name}</Text>
        {/* <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 16,
          }}
        >
          {moment(props.productDate).format("MMM DD, YYYY")}
        </Text> */}
      </View>
      <View style={styles.hairline} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  entry: {
    display: "flex",
    height: "100%",
    width: "90%",
    flexDirection: "column",
    paddingRight: 10,
    justifyContent: "space-between",
  },
  mainText: {
    display: "flex",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subText: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    alignSelf: "center",
    width: 350,
    fontSize: 16,
    fontWeight: "700",
  },
  hairline: {
    display: "flex",
    backgroundColor: "rgb(240, 240, 240)",
    width: "100%",
    height: 1,
  },
});
