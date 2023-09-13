import { View, Text, Pressable } from "react-native";

export default function ModalHeader(props: any) {
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: 18,
          fontWeight: "600",
          marginLeft: 5,
        }}
      >
        {props.flag == "delete"
          ? "Confirm Delete"
          : props.flag == "add"
          ? `New ${props.title}`
          : `Update ${props.title}`}{" "}
      </Text>
      <Pressable
        style={{
          alignSelf: "flex-end",
          marginBottom: 20,
          marginRight: -20,
          paddingRight: 15,
        }}
        onPress={props.onPress}
      >
        <Text>&#10005;</Text>
      </Pressable>
    </View>
  );
}
