import { QueryClient, QueryClientProvider } from "react-query";
import { MyContext } from "./MyContext";
import { Provider } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import { fetchData } from "./utilities/dbDataFetch";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import LoginScreen from "./screens/LoginScreen";

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

  function getUserData(user: any) {
    if (user.auth_id) {
      user.auth = "ok";
      setDbData({
        ...dbData,
        user: user,
      });
    } else
      setDbData({
        ...dbData,
        user: { auth: "failed" },
      });
  }

  console.log(dbData);

  if (!dbData)
    return (
      <View>
        <Text>GETTING DATA STILL....</Text>
      </View>
    );

  if (!dbData.user || !dbData.user.auth_id || dbData.auth)
    return <LoginScreen getUserData={getUserData} user={dbData.user} />;

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
