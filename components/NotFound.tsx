import { View, Text } from "react-native";

export default function NotFound(props: any) {
  return (
    <View style={{ display: "flex", alignSelf: "center", marginTop: 20 }}>
      <Text style={{ fontSize: 24, color: "red" }}>{props.message}</Text>
    </View>
  );
}
