import { useState } from "react";
import { Text, Pressable } from "react-native";

export default function CommissionsChartYear(props: any) {
  const [entryColor, setEntryColor] = useState<any>("#FFFFFF");

  return (
    <Pressable
      onHoverIn={() => setEntryColor("rgb(240, 240, 240)")}
      onHoverOut={() => setEntryColor("#FFFFFF")}
      onPress={() => props.handleSelection(props.year || "default")}
      style={{ backgroundColor: entryColor }}
    >
      <Text
        style={{
          width: 60,
          paddingLeft: 5,
          paddingBottom: 2,
          paddingRight: 5,
        }}
      >
        {props.year || "default"}
      </Text>
    </Pressable>
  );
}
