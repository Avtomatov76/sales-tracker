import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  legend: ["L1", "L2", "L3", "L4", "L5", "L6"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      colors: [
        (opacity = 1) => `#BE95FF`,
        (opacity = 1) => "#1FF438", //`#FDE0E0`,
        (opacity = 1) => `#ECFADC`,
        (opacity = 1) => `#78A9FF`,
        (opacity = 1) => `#ECE6FF`,
        (opacity = 1) => `#FEC9C3`,
      ],
    },
  ],
};

export default function CommissionsBarChart(props: any) {
  let chartConfig = {
    backgroundColor: "#1F2F98",
    backgroundGradientFrom: "#15AAFF",
    backgroundGradientTo: "#ADF7F2",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
    barPercentage: 1.2,
    //barRadius: 12,
    //showLegend: true,
    //useShadowColorFromDataset: true,
  };

  return (
    <View
      style={{
        display: "flex",
        minWidth: 400,
        marginTop: 10,
      }}
    >
      <BarChart
        data={data}
        width={props.width}
        height={345}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={chartConfig}
        style={{
          borderRadius: 5,
        }}
        fromZero={true}
        showValuesOnTopOfBars // added for testing
        withCustomBarColorFromData={true}
        //flatColor={true}
      />
    </View>
  );
}
