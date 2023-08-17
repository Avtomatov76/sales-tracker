import { StyleSheet, Text, View } from "react-native";
import PieChart from "react-native-pie-chart";
import { Card } from "react-native-paper";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function CommissionsPieCard(props: any) {
  let pieChartData = props.data;

  const displayPieDetails = (entry: any, index: any) => {
    return (
      <View
        key={index}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            height: 15,
            width: 40,
            backgroundColor: props.sliceColor[index],
            marginRight: 20,
          }}
        ></View>
        <Text style={{ fontSize: 14 }}>{entry.name + " - "}</Text>
        <Text style={{ color: "green", fontSize: 14 }}>
          {formatDollarEntry(entry.total)}
        </Text>
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.catTitle}>
          {props.title}{" "}
          <Text style={{ color: "#000000", fontSize: 16, fontWeight: "100" }}>
            &#40;{props.titleDetails}&#41;
          </Text>
        </Text>
        <PieChart
          widthAndHeight={props.widthAndHeight}
          series={props.series}
          sliceColor={props.sliceColor}
          style={{ alignSelf: "center" }} // Possibly customize this as well!!
        />
      </View>

      <View style={{ alignSelf: "center" }}>
        {!pieChartData || pieChartData.length == 0
          ? 0
          : pieChartData.map((entry: any, index: any) =>
              displayPieDetails(entry, index)
            )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  catTitle: {
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    fontWeight: "600",
    color: "#368cbf",
  },
  card: {
    display: "flex",
    flexDirection: "column", //
    alignItems: "center",
    paddingTop: 20,
    height: 350,
    minWidth: 350,
    backgroundColor: "#F0F0F0",
    marginTop: 15,
    marginRight: 15,
    borderRadius: 5,
  },
});
