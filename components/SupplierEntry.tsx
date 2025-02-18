import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import ConfirmDelete from "../modals/ConfirmDelete";

export default function SupplierEntry(props: any) {
  function handlePress(supplier: any) {
    console.log("Supplier entry: ", supplier);
    props.displayDeleteModal(supplier);
  }

  return (
    <Pressable style={styles.entry} onPress={props.handleOnPress}>
      <View style={styles.mainText}>
        <Text style={styles.name}>{props.supplier.supplier_name}</Text>
        <Text
          style={{
            justifyContent: "center",
            alignSelf: "flex-end",
            fontSize: 16,
            fontWeight: "400",
            color:
              props.supplier.supplier_phone === "000-000-0000"
                ? "red"
                : "#000000",
          }}
        >
          {props.supplier.supplier_phone == "000-000-0000"
            ? "n/a"
            : props.supplier.supplier_phone}
        </Text>

        <Pressable
          style={{
            padding: 5,
            height: 35,
            width: 35,
            alignItems: "center",
          }}
          onPress={() => handlePress(props.supplier)}
        >
          <Image
            style={styles.closeLogo}
            source={require("../assets/icons/close-icon.png")}
          />
        </Pressable>
      </View>
      <View style={styles.hairline} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  entry: {
    display: "flex",
    height: "100%",
    width: "90%",
    flexDirection: "column",
    paddingRight: 10,
    justifyContent: "space-between",
  },
  mainText: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    alignSelf: "center",
    width: 350,
    fontSize: 16,
    fontWeight: "700",
  },
  hairline: {
    display: "flex",
    backgroundColor: "rgb(240, 240, 240)",
    width: "100%",
    height: 1,
  },
  closeLogo: {
    height: 12,
    width: 12,
  },
});
