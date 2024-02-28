import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getIcon } from "../../../functions/commissionsFunctions";

export default function DashboardTile(props: any) {
  const colors = [
    "blue",
    "red",
    "purple",
    "orange",
    "green",
    "brown",
    "#FFEE0D",
    "teal",
  ];

  const displayData = (data: any) => {
    let dataStr = <View></View>;

    data[0] == "$"
      ? (dataStr = (
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginTop: 3,
                fontSize: 20,
              }}
            >
              &#36;&nbsp;
            </Text>{" "}
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {data.substring(1)}
            </Text>
          </View>
        ))
      : data[data.length - 1] == "%"
      ? (dataStr = (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {data.substring(0, data.length - 1)}
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 20,
              }}
            >
              &nbsp;&#37;
            </Text>{" "}
          </View>
        ))
      : (dataStr = data);

    return dataStr;
  };

  const displayTile = (type: any) => {
    return (
      <View
        style={[
          styles.card,
          {
            flexDirection: "column",
            justifyContent: "space-between",
            marginRight: 20,
            borderBottomColor: colors[props.index],
          },
        ]}
      >
        <View>
          <Text style={{ color: "grey", fontWeight: "600" }}>
            {props.title.toUpperCase()}
          </Text>
        </View>

        <View style={{ flexDirection: "column" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              {displayData(props.data)}
            </View>
            <Ionicons
              name={getIcon(props.icon)}
              size={36}
              color={colors[props.index]}
              style={{ opacity: 0.7 }}
            />
          </View>

          {props.date ? (
            <Text
              style={{
                color: "blue",
                marginTop: -10,
                marginLeft: 10,
                fontSize: 12,
                paddingBottom: 3,
              }}
            >
              {props.date}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  return <>{displayTile(props.type)}</>;
}

const styles = StyleSheet.create({
  summary: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    backgroundColor: "#F0F0F0",
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
  },
  card: {
    display: "flex",
    flex: 1,
    height: 100,
    minWidth: 280,
    maxWidth: 280,
    marginBottom: 10,
    borderRadius: 5,
    padding: 15,
    borderBottomWidth: 5,
    backgroundColor: "#FFFFFF",
    //
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  percent: {
    alignSelf: "flex-end",
    color: "grey",
    marginBottom: 2,
    fontSize: 22,
  },
  chart: {
    flex: 2,
    height: 400,
    marginRight: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
