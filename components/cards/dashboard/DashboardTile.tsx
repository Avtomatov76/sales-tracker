import { View, Text, Image, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getIcon } from "../../../functions/commissionsFunctions";
import { formatDollarEntry } from "../../../functions/customerFunctions";
import moment from "moment";

export default function DashboardTile(props: any) {
  const colors = [
    "blue",
    "red",
    "purple",
    "#ff7400",
    "green",
    "brown",
    "#FFB52F", //"#FFEE0D","#ffc100",
    "teal",
  ];

  const getComparisonData = () => {
    let currYear = props.data || null;
    let prevYear = props.compare || null;

    let diff = (Math.round((currYear - prevYear) * 100) / 100).toFixed(2);

    return (
      <View style={{ display: "flex", flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: parseFloat(diff) < 0 ? "red" : "green",
              fontSize: 12,
            }}
          >
            {formatDollarEntry(diff)}
          </Text>
          <Text style={{ fontSize: 12, color: "grey", fontWeight: "600" }}>
            {parseFloat(diff) < 0
              ? " less than last year"
              : " more than last year"}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 12,
            color: "grey",
            fontWeight: "600",
          }}
        >
          Previous year-to-date:{" "}
          <Text style={{ color: "blue" }}>
            {formatDollarEntry(props.compare)}
          </Text>
        </Text>
      </View>
    );
  };

  const displayData = (data: any) => {
    if (!data) return;

    let numericData = "";

    props.tab == "commissions"
      ? (numericData = formatDollarEntry(data))
      : (numericData = data);

    if (props.tab == "commissions" && numericData[0] == "$")
      return (
        <>
          <Text
            style={{
              marginTop: 3,
              fontSize: 20,
            }}
          >
            &#36;
          </Text>{" "}
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {" "}
            {numericData.substring(1)}
          </Text>
        </>
      );
    else if (numericData[0] == "$")
      return (
        <>
          <Text
            style={{
              marginTop: 3,
              fontSize: 20,
            }}
          >
            &#36;&nbsp;
          </Text>{" "}
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {numericData.substring(1)}
          </Text>
        </>
      );
    else if (numericData[numericData.length - 1] == "%")
      return (
        <>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {numericData.substring(0, numericData.length - 1)}
          </Text>
          <Text
            style={{
              marginTop: 3,
              fontSize: 20,
            }}
          >
            &nbsp;&#37;
          </Text>{" "}
        </>
      );
    else
      return (
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>{numericData}</Text>
      );
  };

  const displayContent = (type: any) => {
    return (
      <View
        style={[
          styles.card,
          {
            height: props.tab == "commissions" ? 150 : 100,
            flexDirection: "column",
            justifyContent: "space-between",
            marginRight: 20,
            borderBottomColor: colors[props.index],
          },
        ]}
      >
        <View>
          {props.type ? (
            <Text style={{ color: "grey", fontWeight: "700" }}>
              {props.title.toUpperCase()} &#40;
              <Text style={{ color: "blue" }}>
                {moment().format(props.type)}
              </Text>
              &#41;
            </Text>
          ) : (
            <Text style={{ color: "grey", fontWeight: "700" }}>
              {props.title.toUpperCase()}
            </Text>
          )}
        </View>

        {props.compare ? getComparisonData() : null}
        {props.icon == "search" && props.commissions ? (
          <>
            {" "}
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontSize: 14, color: "blue" }}>
                {moment(props.startDate).format("MM/DD/YYYY")}
              </Text>{" "}
              -{" "}
              <Text style={{ fontSize: 14, color: "blue" }}>
                {" "}
                {moment(props.endDate).format("MM/DD/YYYY")}
              </Text>
            </Text>
          </>
        ) : null}

        <View style={{ flexDirection: "column" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              {props.icon == "search"
                ? displayData(props.commissions)
                : displayData(props.data)}
            </View>
            <Ionicons
              name={getIcon(props.icon)}
              size={36}
              color={colors[props.index]}
              style={{ opacity: 0.7 }}
            />
          </View>

          {props.date ? <Text style={styles.date}>{props.date}</Text> : null}
        </View>
      </View>
    );
  };

  return <>{displayContent(props.type)}</>;
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
    marginBottom: 20,
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
  date: {
    color: "blue",
    marginTop: -10,
    marginLeft: 10,
    fontSize: 12,
    paddingBottom: 3,
  },
});
