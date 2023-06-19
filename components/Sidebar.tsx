import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function Sidebar(props: any) {
  const [active, setActive] = useState(
    !props.screen ? "dashboard" : props.screen
  );

  function handlePress(screen: any) {
    setActive(screen);
    props.navigate(screen);
    if (props.screenSize === "small") props.hide();
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
        <View
          key={index}
          style={{
            marginBottom:
              index === 0 && props.screenSize === "large" ? 50 : null,
          }}
        >
          {active === tab.toLowerCase() ? (
            <Text
              onPress={() => handlePress(tab.toLowerCase())}
              style={
                props.screenSize === "large"
                  ? styles.tabActive
                  : [styles.tabActive, styles.tabSmall]
              }
            >
              {tab}
            </Text>
          ) : (
            <Text
              onPress={() => handlePress(tab.toLowerCase())}
              style={
                props.screenSize === "large"
                  ? styles.tabDefault
                  : [styles.tabDefault, styles.tabSmall]
              }
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

  return (
    <View
      style={
        props.screenSize === "large"
          ? styles.containerLarge
          : styles.containerSmall
      }
    >
      {displayTabs()}
    </View>
  );
}

const styles = StyleSheet.create({
  containerLarge: {
    display: "flex",
    width: 250,
    paddingTop: 45, // change
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#f27d42",
  },
  containerSmall: {
    flex: 1,
    width: 190,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 3,
    //borderRightWidth: 1,
    //borderBottomWidth: 1,
    borderLeftColor: "#f27d42",
    //borderRightColor: "#368cbf",
    //borderBottomColor: "#368cbf",
    marginTop: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tabActive: {
    flex: 1,
    width: "90%", // 90%
    height: 50,
    backgroundColor: "#DEECF9", //"#368cbf", // "#f27d42",
    color: "#000000", //"#FFFFFF",
    fontSize: 20,
    alignSelf: "center",
    borderRadius: 4,
    paddingLeft: 30,
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
    borderRadius: 10,
    paddingLeft: 30,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabSmall: {
    width: "90%",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
