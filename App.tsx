import { QueryClient, QueryClientProvider } from "react-query";
import { MyContext } from "./MyContext";
import { Provider } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import { fetchData } from "./utilities/dbDataFetch";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

const queryClient = new QueryClient({});

export default function App() {
  const [dbData, setDbData] = useState<any>();

  useEffect(() => {
    try {
      const fetchDBData = async () => {
        const fetchedData = await fetchData();
        setDbData(fetchedData);
      };
      fetchDBData();
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }, []);

  if (!dbData)
    return (
      <View>
        <Text>GETTING DATA STILL....</Text>
      </View>
    );

  return (
    <QueryClientProvider client={queryClient}>
      <MyContext.Provider value={dbData}>
        <Provider>
          <HomeScreen />
        </Provider>
      </MyContext.Provider>
    </QueryClientProvider>
  );
}
