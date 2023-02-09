import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import Customers from "./components/Customers";
import { Header } from "react-native/Libraries/NewAppScreen";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Main from "./components/Main";

export default function App() {
  return (
    <View>
      <Provider>
        <HomeScreen />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    height: "100vh",
    backgroundColor: "grey",
  },
});
