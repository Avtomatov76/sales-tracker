import { Pressable, Image, Picker, StyleSheet } from "react-native";

export default function TransactionsByName(props: any) {
  return (
    <>
      <Pressable onPress={props.handleUndoIconPress}>
        <Image
          style={styles.undoIcon}
          source={require("../assets/icons/undo-icon.png")}
        />
      </Pressable>
      <Picker
        style={styles.textInputCustomer}
        onValueChange={(itemValue) =>
          props.handleSelection(itemValue, "customer")
        }
      >
        <Picker.Item label="- Select or enter name -" value="" />
        {!props.sortedCustomers
          ? null
          : props.sortedCustomers.map((c: any, index: any) => (
              <Picker.Item
                label={
                  c.first_name == "na"
                    ? c.last_name
                    : c.last_name + " " + c.first_name
                }
                value={c.customer_id}
                key={index}
              />
            ))}
      </Picker>
    </>
  );
}

const styles = StyleSheet.create({
  textInputCustomer: {
    height: 35,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    fontWeight: "400",
  },
  undoIcon: {
    height: 24,
    width: 24,
    marginRight: 15,
    alignSelf: "center",
    marginBottom: 10,
  },
});
