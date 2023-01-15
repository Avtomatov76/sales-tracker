import { View, Text, StyleSheet } from "react-native";

export default function Sidebar(props: any) {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: "3rem" }}>
        <Text>Dashboard</Text>
      </View>

      <View style={{ marginBottom: "1rem" }}>
        <Text>Transactions</Text>
      </View>
      <View style={{ marginBottom: "1rem" }}>
        <Text>Commissions</Text>
      </View>
      <View style={{ marginBottom: "1rem" }}>
        <Text>customers</Text>
      </View>
      <View style={{ marginBottom: "1rem" }}>
        <Text>Vendors</Text>
      </View>
      <View style={{ marginBottom: "1rem" }}>
        <Text>Suppliers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3rem",
    paddingLeft: "3rem",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#f27d42",
  },
});
