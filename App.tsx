import { createContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./screens/HomeScreen";
import Customers from "./components/Customers.1";
import { Header } from "react-native/Libraries/NewAppScreen";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Main from "./components/Main";

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchOnMount: "always",
  //   },
  // },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <HomeScreen />
      </Provider>
    </QueryClientProvider>
    // <HomeScreen />
  );
}
