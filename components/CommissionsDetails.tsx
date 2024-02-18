import { useState, useContext } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import OutsideClickHandler from "react-outside-click-handler";
import CommissionsPieCard from "./cards/commissions/CommissionsPieCard";
import CommissionsSummaryCard from "./cards/commissions/CommissionsSummaryCard";
import {
  getCommForYearSelected,
  getCommissionCards,
  getSeriesForPie,
} from "../functions/commissionsFunctions";
import CommissionsLineChart from "./cards/commissions/CommissionsLineChart";
import ErrorScreen from "./ErrorScreen";
import CommissionsPieChart from "./cards/commissions/CommissionsPieChart";
import CommissionsChartYear from "./cards/commissions/CommissionsChartYear";
import { MyContext } from "../MyContext";

const widthAndHeight = 150;

export default function CommissionsDetails(props: any) {
  const [chartOptionsDisplay, setChartOptionsDisplay] = useState(false);
  const [chartForYear, setChartForYear] = useState<any>("default");
  const [commForYearSelected, setCommForYearSelected] = useState<any>();

  const dbData = useContext(MyContext);

  const commissionCards = getCommissionCards(
    dbData.commissions,
    dbData.ytdCommissions,
    dbData.prevYtdCommissions,
    dbData.currMonthCommission,
    dbData.prevYearCurrMonthCommissions,
    dbData.commissionsDue
  );

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const getChartDisplayOptions = () => {
    setChartOptionsDisplay(!chartOptionsDisplay);
  };

  const handleSelection = (year: any) => {
    setChartOptionsDisplay(false);
    setChartForYear(year);

    let commArray = getCommForYearSelected(year, dbData.commissionEntries);
    setCommForYearSelected(commArray);
  };

  if (!dbData.commissions)
    return (
      <ErrorScreen
        error="No commission information found in the database!"
        type="server"
      />
    );

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          backgroundColor: "#F0F0F0",
          marginTop: 20,
          paddingRight: 20,
          paddingLeft: 20,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {commissionCards.map((card: any, index: any) => (
            <CommissionsSummaryCard
              key={index}
              title={card.title}
              data={card.data}
              type={card.type}
              color={card.color}
              iconColor={card.iconColor}
              icon={card.icon}
              compare={card.compare}
              startDate={props.startDate}
              endDate={props.endDate}
              commissions={props.commissions}
            />
          ))}
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 5,
        }}
      >
        <CommissionsLineChart
          width={600}
          minWidth={300}
          height={300}
          chartForYear={chartForYear}
          monthlyCommYear={commForYearSelected || []}
          currYear={dbData.currYearMonthlyCommissions || null}
          lastYear={dbData.prevYearMonthlyCommissions || null}
        />

        {chartOptionsDisplay == true ? (
          <View style={styles.dropdown}>
            <OutsideClickHandler
              onOutsideClick={() => setChartOptionsDisplay(false)}
            >
              <CommissionsChartYear handleSelection={handleSelection} />
              {dbData.numericValuesAllYears.map((year: any, index: any) => (
                <CommissionsChartYear
                  key={index}
                  year={year}
                  index={index}
                  handleSelection={handleSelection}
                />
              ))}
            </OutsideClickHandler>
          </View>
        ) : (
          <Pressable style={styles.hamburger} onPress={getChartDisplayOptions}>
            <Image
              source={require("../assets/icons/hamburger-menu.png")}
              style={{ height: 18, width: 18 }}
            />
          </Pressable>
        )}

        <CommissionsPieChart
          type="years"
          width={600}
          minWidth={300}
          //height={300}
          allYearsComm={dbData.yearlyCommissions}
          currYear={dbData.ytdCommissions || null}
          lastYear={dbData.prevYearCommissions || null}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {!dbData.yearlySales ? null : (
          <CommissionsPieCard
            type="sales"
            widthAndHeight={widthAndHeight}
            data={dbData.yearlySales || []}
            series={getSeriesForPie(dbData.yearlySales) || []}
            numColors={dbData.yearlySales.length}
            title="Total Sales"
            titleDetails="per year"
          />
        )}

        {!dbData.suppliersCommissions ? null : (
          <CommissionsPieCard
            type="suppliers"
            widthAndHeight={widthAndHeight}
            data={dbData.suppliersCommissions || []}
            series={getSeriesForPie(dbData.suppliersCommissions) || []}
            numColors={dbData.suppliersCommissions.length}
            title="Top Suppliers"
            titleDetails="historic data"
          />
        )}

        {!dbData.ytdSuppliersCommissions ? null : (
          <CommissionsPieCard
            type="suppliers"
            widthAndHeight={widthAndHeight}
            data={dbData.ytdSuppliersCommissions || []}
            series={getSeriesForPie(dbData.ytdSuppliersCommissions) || []}
            numColors={dbData.ytdSuppliersCommissions.length}
            title="Top Suppliers"
            titleDetails="year-to-date"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hamburger: {
    height: 30,
    width: 30,
    position: "absolute",
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: "#f27d42",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdown: {
    position: "absolute",
    marginTop: 20,
    marginLeft: 10,
    flexDirection: "column",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    padding: 5,
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
