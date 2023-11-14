import { StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";
import { View, Text } from "react-native";
import { getColors } from "../../../constants/Colors";
import { formatDollarEntry } from "../../../functions/customerFunctions";

export default function CommissionsPieChart(props: any) {
  let colors = getColors(props.allYearsComm.length);
  let commissions = [];

  if (props.allYearsComm.length > 0) {
    props.allYearsComm.forEach((e) => {
      commissions.push(e.commissions);
    });
  }

  const showYears = (yearsObj: any) => {
    let yearsStr = "";

    if (yearsObj.length > 1) yearsStr = yearsObj[0].year;

    yearsStr = yearsObj[0].year + " - " + yearsObj[yearsObj.length - 1].year;

    return yearsStr;
  };

  const showLegends = () => {
    let legends = [];

    props.allYearsComm.forEach((entry: any, index: any) => {
      legends.push(
        <View
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
            marginRight: 30,
          }}
        >
          <View
            style={{
              display: "flex",
              height: 15,
              width: 40,
              backgroundColor: colors[index],
              opacity: 0.8,
              marginRight: 20,
            }}
          ></View>
          <Text style={{ fontSize: 14 }}>{entry.year + " - "}</Text>
          <Text style={{ color: "green", fontSize: 14 }}>
            {formatDollarEntry(entry.commissions)}
          </Text>
        </View>
      );
    });

    return legends;
  };

  return (
    <View style={styles.card}>
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Text style={styles.catTitle}>
          Commissions&nbsp;
          <Text style={{ color: "#000000", fontSize: 16, fontWeight: "100" }}>
            &#40;{showYears(props.allYearsComm)}&#41;
          </Text>
        </Text>
        <PieChart
          widthAndHeight={220}
          series={commissions}
          sliceColor={colors}
          style={{ alignSelf: "center", opacity: 0.8 }}
        />
      </View>

      <View
        style={{
          flexDirection: "column",
          alignSelf: "center",
          paddingRight: 10,
        }}
      >
        {showLegends()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  catTitle: {
    fontSize: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    fontWeight: "600",
    color: "#368cbf",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    minWidth: 400,
    backgroundColor: "#FFF9C4", //"#F0F0F0",
    marginTop: 10,
    marginRight: 15,
    borderRadius: 5,
  },
});
