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
        <View key={index} style={{ marginBottom: index === 0 ? 50 : null }}>
          {active === tab.toLowerCase() ? (
            <Text
              onPress={() => handlePress(tab.toLowerCase())}
              style={styles.tabActive}
            >
              {tab}
            </Text>
          ) : (
            <Text
              onPress={() => handlePress(tab.toLowerCase())}
              style={styles.tabDefault}
            >
              {tab}
            </Text>
          )}
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
    //paddingLeft: "3rem", // change
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#f27d42",
  },
  tabActive: {
    flex: 1,
    width: "90%", // 90%
    height: 50,
    backgroundColor: "#DEECF9", //"#368cbf", // "#f27d42",
    color: "#000000", //"#FFFFFF",
    fontSize: 20,
    alignSelf: "center",
    //textAlign: "center",
    borderRadius: 4,
    paddingLeft: 50,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabDefault: {
    flex: 1,
    width: "90%", // 90%
    height: 50,
    color: "#808080", //"#000000",
    fontSize: 20,
    alignSelf: "center",
    //textAlign: "center",
    borderRadius: 10,
    paddingLeft: 50,
    paddingTop: 8,
    paddingBottom: 10,
  },
});
