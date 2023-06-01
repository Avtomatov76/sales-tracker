import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { Menu, Divider } from "react-native-paper";

export default function CustomerList(props: any) {
  return (
    <ScrollView>
      <View style={{ height: 400 }}>
        {!props.customers
          ? null
          : props.customers.map((customer: any, index: any) => (
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
                onPress={() => props.showCustomerDetails(customer.customer_id)}
              >
                <Text style={{ color: "blue" }}>
                  {props.displayName(customer, "default")}
                </Text>

                <Menu
                  visible={
                    index === props.customerIndex
                      ? props.showCustomerMenu
                      : null
                  }
                  onDismiss={props.dismiss}
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
                    onPress={() => props.editCustomer(customer.customer_id)}
                    title="Edit"
                    trailingIcon={require("../assets/icons/edit.png")}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => props.deleteCustomer(customer.customer_id)}
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
