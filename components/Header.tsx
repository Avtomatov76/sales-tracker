import { useState } from "react";
import moment from "moment";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";

export default function Header(props: any) {
  const [inputStyle, setInputStyle] = useState();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sales Tracker</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Image
            source={require("../assets/icons/search.png")}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.navSearch} />
        </View>
        <View
          style={{
            marginRight: "2rem",
            justifyContent: "center",
            alignItems: "center",
            //alignSelf: "center",
          }}
        >
          <Text style={styles.navEl}>
            Last Sign-in:{" "}
            <Text style={{ fontSize: 14, color: "orange", marginLeft: 10 }}>
              {moment().format("DD MMMM, HH:MM")}
            </Text>
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignContent: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#ffffff",
              marginTop: -5,
            }}
          >
            Ruslan Kalashnikov
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    backgroundColor: "#368cbf",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  navEl: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginRight: "2rem",
    paddingLeft: ".75rem",
    paddingRight: ".75rem",
    borderRadius: 30,
  },
  navSearch: {
    fontSize: 14,
    color: "#000000",
    padding: ".5rem",
    marginLeft: ".5rem",
  },
  searchIcon: {
    alignSelf: "center",
    height: 18,
    width: 18,
  },
});
