import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

export default function Footer(props: any) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.title}>Created by </Text>
        <Text style={[styles.title]}>Ruslan Kalashnikov</Text>
      </View>
      <View>
        <Text style={styles.copyright}>
          &copy; {moment().format("YYYY")} Copyright. All rights reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "10%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    backgroundColor: "#33363b",
    marginTop: "auto",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 12,
    marginBottom: ".5rem",
  },
  copyright: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
