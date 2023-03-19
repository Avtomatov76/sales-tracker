import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import Customers from "../components/Customers";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

export default function HomeScreen(props: any) {
  const [screen, setScreen] = useState("");
  const [screenWidth, setScreenWidth] = useState<any>(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
  }, []);

  function navigateTo(screen: any) {
    // console.log(screen);
    //if (screen === "customers") {
    console.log("navigating...");
    setScreen(screen);
    //}
    //alert("about to navigate somewhere...");
  }

  console.log("Screen", screen);

  return (
    <View style={styles.container}>
      <Header
        screenSize={screenWidth < 1300 ? true : false}
        showMenu={() => setShowMenu(!showMenu)}
      />
      <View style={{ height: "100%" }}>
        <View style={{ flexDirection: "row", height: "100%" }}>
          {screenWidth < 1300 ? null : (
            <Sidebar navigate={navigateTo} screenSize="large" screen={screen} />
          )}
          {/* <Sidebar navigate={navigateTo} screen="large" /> */}

          <Main
            screen={screen}
            screenSize={screenWidth < 1300 ? true : false}
            navigate={navigateTo}
          />
        </View>
      </View>
      <Footer />

      {showMenu && screenWidth < 1300 ? (
        <View
          style={{
            flexDirection: "column",
            position: "absolute",
            top: 120,
            left: 50,
          }}
        >
          <Sidebar
            navigate={navigateTo}
            screenSize="small"
            screen={screen}
            hide={() => setShowMenu(false)}
          />
        </View>
      ) : null}
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
