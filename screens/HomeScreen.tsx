import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
    console.log("navigating...");
    setScreen(screen);
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
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "grey",
  },
});
