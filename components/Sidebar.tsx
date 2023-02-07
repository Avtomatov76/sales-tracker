import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Sidebar(props: any) {
  const [active, setActive] = useState("dashboard");

  function handlePress(screen: any) {
    setActive(screen);
    props.navigate(screen);
  }

  const tabs = [
    "Dashboard",
    "Transactions",
    "Commissions",
    "Customers",
    "Vendors",
    "Suppliers",
    "Uploader",
  ];

  function displayTabs() {
    const tabsArray = [];

    tabs.map((tab: any, index: any) =>
      tabsArray.push(
        <View key={index} style={{ marginBottom: index === 0 ? 50 : 20 }}>
          <Text
            onPress={() => handlePress(tab.toLowerCase())}
            style={{ color: active === tab.toLowerCase() ? "red" : "grey" }}
          >
            {tab}
          </Text>
        </View>
      )
    );

    return tabsArray;
  }

  console.log("______________________restarted______________________");

  return <View style={styles.container}>{displayTabs()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "3rem", // change
    paddingLeft: "3rem", // change
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#f27d42",
  },
});
