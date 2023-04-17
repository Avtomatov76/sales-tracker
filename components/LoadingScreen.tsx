import { View, Text, ActivityIndicator } from "react-native";

export default function LoadingScreen(props: any) {
  let details = props.details;

  const displayLoading = () => {
    console.log(details);
    if (details == "db") return " Loading the DATA, foool!";

    return " Loading...";
  };

  return (
    <View
      style={{
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, color: "grey", marginBottom: 20 }}>
        {displayLoading()}
      </Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
