import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

export default function Footer(props: any) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Created by Ruslan Kalashnikov</Text>
      </View>
      <View>
        <Text style={styles.copyright}>
          Copyright, {moment().format("YYYY")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "10%",
    flexDirection: "column",
    justifyContent: "center",
    //alignItems: "flex-end",
    alignItems: "center",
    paddingLeft: "3rem",
    paddingRight: "3rem",
    backgroundColor: "#33363b",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: ".5rem",
  },
  copyright: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
