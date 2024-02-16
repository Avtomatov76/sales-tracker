import { LineChart } from "react-native-chart-kit";
import { MONTHS } from "../../../constants/Months";
import moment from "moment";
import { Card } from "react-native-paper";
import ErrorScreen from "../../ErrorScreen";

let chartConfig = {
  backgroundColor: "#4CBB17", //"#1F2F98",
  backgroundGradientFrom: "#ADD8E6", //"#FFFDE7", //"#15AAFF",
  backgroundGradientTo: "#FFF9C4", //"#ADF7F2",

  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#000000", //"#1F2F98", //"#ffa726",
  },
  useShadowColorFromDataSet: true,
};

let year = moment().year();

export default function CommissionsLineChart(props: any) {
  let numMonths =
    props.chartForYear == "default" || props.chartForYear == year
      ? props.currYear.length
      : 12;
  let monthsToShow = MONTHS.slice(0, numMonths);

  let currYear = props.currYear;
  let lastYear = props.lastYear.slice(0, numMonths);

  let currYearArr = flattenArray(currYear) || [];
  let lastYearArr = flattenArray(lastYear) || [];

  let data = {
    labels: monthsToShow,
    datasets:
      props.chartForYear == "default"
        ? [
            {
              data: lastYearArr,
              color: (opacity = 0.5) => "#A782EC",
            },
            {
              data: currYearArr,
              color: (opacity = 1) => "#4CBB17",
            },
          ]
        : [
            {
              data: props.monthlyCommYear,
              color: (opacity = 0.5) => "#A782EC",
            },
          ],
    legend:
      props.chartForYear == "default"
        ? [`${year - 1}`, `${year}`]
        : [`${props.chartForYear}`],
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

  const displayChart = () => {
    if (props.chartForYear != "default" && props.monthlyCommYear.length == 0)
      return (
        <ErrorScreen
          error="No commission information was found for this chart!"
          type="server"
        />
      );

    return (
      <LineChart
        bezier
        data={data}
        width={props.width}
        height={props.height}
        yAxisLabel="$"
        yAxisInterval={1} // optional, defaults to 1
        style={{
          borderRadius: 5,
        }}
        chartConfig={chartConfig}
        fromZero={true}
      />
    );
  };

  return (
    <Card
      style={{
        display: "flex",
        height: 340,
        minWidth: 400,
        marginTop: 10,
        marginRight: 15,
        borderRadius: 5,
      }}
    >
      {displayChart()}
    </Card>
  );
}
