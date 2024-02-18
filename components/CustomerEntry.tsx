import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { Menu, Divider } from "react-native-paper";

export default function CustomerEntry(props: any) {
  return (
    <View style={styles.entry}>
      <View style={styles.mainText}>
        <Text style={styles.lastName}>
          {props.displayName(props.el, "default")}
        </Text>
        <Menu
          visible={props.index === props.entryIndex ? props.showMenu : null}
          onDismiss={props.dismissMenu}
          anchor={
            <Pressable
              onPress={() => props.displayMenu(props.index)}
              style={{ padding: 0, margin: 0 }}
            >
              <Image
                style={styles.more}
                source={require("../assets/icons/more.png")}
              />
            </Pressable>
          }
        >
          <Menu.Item
            onPress={() => props.editEntry(props.el[props.type + "_id"])}
            title="Edit"
            trailingIcon={require("../assets/icons/edit.png")}
          />
          <Divider />
          <Menu.Item
            onPress={() => props.deleteEntry(props.el[props.type + "_id"])}
            title="Delete"
            trailingIcon={require("../assets/icons/trash.png")}
          />
        </Menu>
      </View>
      <View style={styles.hairline} />
    </View>
  );
}

const styles = StyleSheet.create({
  entry: {
    display: "flex",
    height: "100%",
    width: 350,
    flexDirection: "column",
    paddingRight: 10,
  },
  mainText: {
    display: "flex",
    width: "85%",
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastName: {
    fontSize: 16,
    fontWeight: "700",
  },
  hairline: {
    display: "flex",

    backgroundColor: "rgb(240, 240, 240)",
    width: "85%",
    height: 1,
  },
  more: {
    width: 25,
    height: 25,
    color: "blue",
  },
});
