import { View, Text, ActivityIndicator } from "react-native";

export default function LoadingScreen(props: any) {
  return (
    <View
      style={{
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, color: "grey", marginBottom: 20 }}>
        Loading...
      </Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
