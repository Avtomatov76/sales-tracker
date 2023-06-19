import { useState } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";
import { MONTHS } from "../../../constants/Months";

export default function CommissionsLineChart(props: any) {
  const [chartWidth, setChartWidth] = useState<any>();

  // get info for this year-to-date commissions
  // get info for previous year date range (same time period)
  // display comparion continuously

  // write a func that determines range of labels <-- ex.: always start with Jan and get the curr month
  // then do a substr of 'labels' array including the current month

  // get dollar data per month and pass that into the dataset

  const getComponentWidth = (event: any) => {
    let width = event.nativeEvent.layout.width;
    if (width >= 450) setChartWidth(width);
    if (width < 450) setChartWidth(450);
  };

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        // height: 300,
        minWidth: 400,
        // maxWidth: 600,
        //flexWrap: "wrap",
        borderRadius: 12,
        //backgroundColor: "grey",
      }}
      onLayout={(event) => getComponentWidth(event)}
    >
      {/* <Text>Bezier Line Chart</Text> */}
      <LineChart
        data={{
          labels: MONTHS,
          datasets: [
            {
              data: [
                55, //Math.random() * 100,
                25, // Math.random() * 100,
                100, // Math.random() * 100,
                65, // Math.random() * 100,
                12, // Math.random() * 100,
                50, // Math.random() * 100,
                55, //Math.random() * 100,
                25, // Math.random() * 100,
                100, // Math.random() * 100,
                65, // Math.random() * 100,
                12, // Math.random() * 100,
                50, // Math.random() * 100,
              ],
            },
            {
              data: [
                42, //Math.random() * 100,
                38, // Math.random() * 100,
                91, // Math.random() * 100,
                27, // Math.random() * 100,
                5, // Math.random() * 100,
                78, // Math.random() * 100,
                42, //Math.random() * 100,
                38, // Math.random() * 100,
                91, // Math.random() * 100,
                27, // Math.random() * 100,
                5, // Math.random() * 100,
                78, // Math.random() * 100,
              ],
            },
          ],
        }}
        //width={Dimensions.get("window").width - 800} // from react-native
        width={chartWidth}
        //width={600}
        height={props.height}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 12,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          //marginVertical: 8,
          borderRadius: 12,
        }}
      />
    </View>
  );
}
