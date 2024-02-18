import { View, Text, StyleSheet } from "react-native";

export default function SupplierEntry(props: any) {
  return (
    <View style={styles.entry}>
      <View style={styles.mainText}>
        <Text style={styles.name}>{props.supplier.supplier_name}</Text>
        <Text
          style={{
            alignSelf: "flex-end",
            fontSize: 16,
          }}
        >
          {props.supplier.supplier_phone == "000-000-0000"
            ? "n/a"
            : props.supplier.supplier_phone}
        </Text>
      </View>
      <View style={styles.hairline} />
    </View>
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
  name: {
    alignSelf: "flex-end",
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
