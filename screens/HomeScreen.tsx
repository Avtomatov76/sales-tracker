import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Customers from "../components/Customers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

export default function HomeScreen(props: any) {
  const [screen, setScreen] = useState("");

  function navigateTo(screen: any) {
    // console.log(screen);
    //if (screen === "customers") {
    console.log("navigating...");
    setScreen(screen);
    //}
    //alert("about to navigate somewhere...");
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", height: "100%" }}>
          <Sidebar navigate={navigateTo} />
          <Main screen={screen} />
        </View>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100vh",
    //flex: 1,
    backgroundColor: "grey",
    //alignItems: "center",
    //justifyContent: "center",
  },
});
