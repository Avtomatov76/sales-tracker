import { View, Text, StyleSheet, ScrollView } from "react-native";
import TabHeader from "./TabHeader";

export default function Dashboard(props: any) {
  return (
    <View style={{ display: "flex" }}>
      <TabHeader name="Dashboard" />
    </View>
  );
}
