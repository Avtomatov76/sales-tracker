import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

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
    "Commissions",
    "Transactions",
    "Customers",
    "Vendors",
    "Suppliers",
    "Uploader",
  ];

  const icons = {
    commissions: require("../assets/icons/money.png"),
    customers: require("../assets/icons/customer.png"),
    transactions: require("../assets/icons/transaction.png"),
    vendors: require("../assets/icons/vendor.png"),
    suppliers: require("../assets/icons/supplier.png"),
    uploader: require("../assets/icons/upload.png"),
  };

  function displayTabs() {
    const tabsArray = [];

    tabs.map((tab: any, index: any) =>
      tabsArray.push(
        <View
          key={index}
          style={{
            marginBottom:
              index == 0 && props.screenSize === "large" ? 50 : null,
          }}
        >
          <Pressable
            style={
              props.screenSize == "large"
                ? active == tab.toLowerCase()
                  ? styles.tabActive
                  : styles.tabDefault
                : active == tab.toLowerCase()
                ? [styles.tabActive, styles.tabSmall]
                : [styles.tabDefault, styles.tabSmall]
            }
            onPress={() => handlePress(tab.toLowerCase())}
          >
            <Image
              style={{
                alignSelf: "center",
                marginRight: 20,
                width: 20,
                height: 20,
              }}
              source={icons[tab.toLowerCase()]}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: active != tab.toLowerCase() ? "100" : "400",
              }}
            >
              {tab}
            </Text>
          </Pressable>
        </View>
      )
    );

    return tabsArray;
  }

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
    width: 250,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 3,
    borderLeftColor: "#f27d42",
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
    flexDirection: "row",
    width: "90%",
    height: 50,
    backgroundColor: "#DEECF9",
    color: "#000000",
    fontSize: 20,
    alignSelf: "center",
    borderRadius: 4,
    borderRightWidth: 5,
    borderRightColor: "purple",
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabDefault: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 50,
    color: "#808080",
    fontSize: 20,
    alignSelf: "center",
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 10,
  },
  tabSmall: {
    width: "90%",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
