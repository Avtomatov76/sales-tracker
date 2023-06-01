import { View, Text } from "react-native";

export default function ErrorScreen(props: any) {
  console.log(props.error);
  return (
    <View
      style={{ height: "50%", justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 24, color: "red", marginBottom: 10 }}>
        An error has occurred while fetching {props.type}.
      </Text>
      <View style={{ flexDirection: "row" }}>
        {/* <Text style={{ fontSize: 16 }}>Details: </Text> */}
        <Text style={{ color: "grey" }}>{props.error.message}</Text>
      </View>
    </View>
  );
}
