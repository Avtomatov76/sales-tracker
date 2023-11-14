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
import moment from "moment";

let chartConfig = {
  backgroundColor: "#4CBB17", //"#1F2F98",
  backgroundGradientFrom: "#ADD8E6", //"#FFFDE7", //"#15AAFF",
  backgroundGradientTo: "#FFF9C4", //"#ADF7F2",

  decimalPlaces: 0, // optional, defaults to 2dp
  //color: (opacity = 1) => `rgba(98,109,182, ${opacity})`,
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, //(opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#000000", //"#1F2F98", //"#ffa726",
  },
  useShadowColorFromDataSet: true,
};

let year = moment().year();

export default function CommissionsLineChart(props: any) {
  let numMonths = props.currYear.length || 0;
  let monthsToShow = MONTHS.slice(0, numMonths);

  let currYear = props.currYear;
  let lastYear = props.lastYear.slice(0, numMonths);

  let currYearArr = flattenArray(currYear) || [];
  let lastYearArr = flattenArray(lastYear) || [];

  let data = {
    labels: monthsToShow,
    datasets: [
      {
        data: lastYearArr,
        //colors: [(opacity = 1) => `#78A9FF`],
        color: (opacity = 0.5) => "#A782EC",
      },
      {
        data: currYearArr,
        //colors: [(opacity = 1) => `#BE95FF`],
        color: (opacity = 1) => "#4CBB17",
      },
    ],
    legend: [`${year - 1}`, `${year}`], //[`Year-to-date Comparison (${year - 1} - ${year})`],
    useShadowColorFromDataset: true,
  };

  function flattenArray(array: any) {
    if (array.length == 0) return;

    let flatArr = [];

    array.forEach((m: any) => {
      flatArr.push(m.commissions);
    });

    return flatArr;
  }

  console.log("Current YTD: ", currYearArr);
  console.log("Previous YTD: ", lastYearArr);

  return (
    <View
      style={{
        display: "flex",
        minWidth: 400,
        marginTop: 10,
        marginRight: 15,
      }}
    >
      <LineChart
        bezier
        data={data}
        width={props.width}
        height={props.height}
        yAxisLabel="$"
        //yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        style={{
          borderRadius: 5,
        }}
        chartConfig={chartConfig}
        fromZero={true}
        //withShadow={true}
        //withOuterLines
      />
    </View>
  );
}
