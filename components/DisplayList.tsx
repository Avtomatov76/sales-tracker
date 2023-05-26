import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { Menu, Divider } from "react-native-paper";

export default function DisplayList(props: any) {
  //
  //console.log(props.data);
  //console.log("ENTRY INDEX: ", props.entryIndex);
  //
  return (
    <ScrollView>
      <View style={{ height: 400 }}>
        {!props.data
          ? null
          : props.data.map((el: any, index: any) => (
              <Pressable
                key={index}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderColor: "grey",
                  marginRight: 10,
                  paddingRight: 5,
                  paddingBottom: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => props.showDetails(el[props.type + "_id"])}
              >
                <Text style={{ color: "blue" }}>
                  {props.displayName(el, "default")}
                </Text>
                <Menu
                  visible={index === props.entryIndex ? props.showMenu : null}
                  onDismiss={props.dismissMenu}
                  anchor={
                    <Pressable
                      onPress={() => props.displayMenu(index)}
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
                    onPress={() => props.editEntry(el[props.type + "_id"])}
                    title="Edit"
                    trailingIcon={require("../assets/icons/edit.png")}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => props.deleteEntry(el[props.type + "_id"])}
                    title="Delete"
                    trailingIcon={require("../assets/icons/trash.png")}
                  />
                </Menu>
              </Pressable>
            ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  more: {
    width: 20,
    height: 20,
  },
});
