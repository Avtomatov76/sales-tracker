import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import CustomerCard from "./cards/customers/CustomerCard";
import ListEntry from "./ListEntry";

export default function CustomerSectionRenderer(props: any) {
  const displayCard = (type: string) => {
    switch (type) {
      case "customer":
        return (
          <CustomerCard
            flag={props.flag}
            customer={props.entry}
            editCustomer={props.editEntry}
            deleteCustomer={props.deleteEntry}
          />
        );

        break;
      case "vendor":
        // code block
        break;
      default:
        console.log("Error: type received not matching any of the cases!!");
    }
  };

  return (
    <View>
      <View style={{ marginTop: 10, flexDirection: "row" }}>
        <Text style={{ fontSize: 18, marginRight: 15 }}>Show All</Text>
        <Pressable onPress={props.toggleShowAll}>
          <Image
            source={require("../assets/icons/plus-orange.png")}
            style={{ height: 24, width: 24 }}
          />
        </Pressable>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <View style={{ display: "flex", width: 400, marginRight: 30 }}>
          {!props.showAll ? null : (
            <ScrollView style={styles.scrollView}>
              {props.data.map((el: any, index: any) => (
                <ListEntry
                  key={index}
                  flag="customers"
                  el={el}
                  selected={props.selected} // ??
                  setSelection={props.setSelection} // ??
                  index={index}
                  type={props.type}
                  data={props.data}
                  entryIndex={props.entryIndex}
                  showMenu={props.showMenu}
                  showDetails={props.showDetails}
                  dismissMenu={props.dismissMenu}
                  displayName={props.displayName}
                  displayMenu={props.displayMenu}
                  editEntry={props.editEntry}
                  deleteEntry={props.deleteEntry}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={{ display: "flex", flex: 2 }}>
          {!props.entry ? null : displayCard(props.type)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    marginBottom: 10,
    backgroundColor: "#f27d42",
  },
  scrollView: {
    display: "flex",
    maxHeight: 600,
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
