import { useState, useEffect } from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";
import OutsideClickHandler from "react-outside-click-handler";
import axios from "axios";
import CommissionsPieCard from "./cards/commissions/CommissionsPieCard";
import CommissionsSummaryCard from "./cards/commissions/CommissionsSummaryCard";
import {
  getCommForYearSelected,
  getCommissionCards,
  getEndpoints,
  getSeriesForPie,
} from "../functions/commissionsFunctions";
import CommissionsLineChart from "./cards/commissions/CommissionsLineChart";
import ErrorScreen from "./ErrorScreen";
import CommissionsPieChart from "./cards/commissions/CommissionsPieChart";
import CommissionsChartYear from "./cards/commissions/CommissionsChartYear";

const widthAndHeight = 150;

export default function CommissionsDetails(props: any) {
  const [totalCommissions, setTotalCommissions] = useState<any>();
  const [currMonthComm, setCurrMonthComm] = useState<any>();
  const [yearToDateComm, setYearToDateComm] = useState<any>();
  const [totalSupplierComm, setTotalSupplierComm] = useState<any>();
  const [ytdSupplierComm, setYtdSupplierComm] = useState<any>();
  const [yearsProductSales, setYearsProductSales] = useState<any>();
  const [lastYearComm, setLastYearComm] = useState<any>();
  const [allYearsComm, setAllYearsComm] = useState<any>();
  const [lastYearToDateComm, setLastYearToDate] = useState<any>();
  const [lastYearCurrMonth, setLastYearCurrMonth] = useState<any>();
  const [unpaidCommissions, setUnpaidCommissions] = useState<any>();
  const [currYearMonthlyComm, setCurrYearMonthlyComm] = useState<any>();
  const [lastYearMonthlyComm, setLastYearMonthlyComm] = useState<any>();
  const [chartOptionsDisplay, setChartOptionsDisplay] = useState(false);
  const [allYearsNumeric, setAllYearsNumeric] = useState<any>();
  const [chartForYear, setChartForYear] = useState<any>("default");
  const [allCommEntries, setAllCommEntries] = useState<any>();
  const [commForYearSelected, setCommForYearSelected] = useState<any>();

  const commissionCards = getCommissionCards(
    totalCommissions,
    yearToDateComm,
    lastYearToDateComm,
    currMonthComm,
    lastYearCurrMonth,
    unpaidCommissions
  );

  // const getComponentWidth = (event: any) => {
  //   let width = event.nativeEvent.layout.width;
  //   if (width >= 450) setChartWidth(width);
  //   if (width < 450) setChartWidth(450);
  // };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  useEffect(() => {
    async function getCommissions() {
      const endpoints = getEndpoints();

      try {
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
          ([
            { data: totalCommissions },
            { data: yearToDateComm },
            { data: currMonthComm },
            { data: totalSupplierComm },
            { data: ytdSupplierComm },
            { data: lastYearComm },
            { data: lastYearToDateComm },
            { data: lastYearCurrMonth },
            { data: unpaidCommissions },
            { data: currYearMonthlyComm },
            { data: lastYearMonthlyComm },
            { data: allYearsComm },
            { data: yearsProductSales },
            { data: allYearsNumeric },
            { data: allCommEntries },
          ]) => {
            setTotalCommissions(totalCommissions);
            setYearToDateComm(yearToDateComm);
            setCurrMonthComm(currMonthComm);
            setTotalSupplierComm(totalSupplierComm);
            setYtdSupplierComm(ytdSupplierComm);
            setLastYearComm(lastYearComm);
            setLastYearToDate(lastYearToDateComm);
            setLastYearCurrMonth(lastYearCurrMonth);
            setUnpaidCommissions(unpaidCommissions);
            setCurrYearMonthlyComm(currYearMonthlyComm);
            setLastYearMonthlyComm(lastYearMonthlyComm);
            setAllYearsComm(allYearsComm);
            setYearsProductSales(yearsProductSales);
            setAllYearsNumeric(allYearsNumeric);
            setAllCommEntries(allCommEntries);
          }
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getCommissions();
  }, []);

  const getChartDisplayOptions = () => {
    setChartOptionsDisplay(!chartOptionsDisplay);
  };

  const handleSelection = (year: any) => {
    setChartOptionsDisplay(false);
    setChartForYear(year);

    let commArray = getCommForYearSelected(year, allCommEntries);
    setCommForYearSelected(commArray);
  };

  if (!totalCommissions)
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
          currYear={currYearMonthlyComm || null}
          lastYear={lastYearMonthlyComm || null}
        />

        {chartOptionsDisplay == true ? (
          <View style={styles.dropdown}>
            <OutsideClickHandler
              onOutsideClick={() => setChartOptionsDisplay(false)}
            >
              <CommissionsChartYear handleSelection={handleSelection} />
              {allYearsNumeric.map((year: any, index: any) => (
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
          height={300}
          allYearsComm={allYearsComm}
          currYear={yearToDateComm || null}
          lastYear={lastYearComm || null}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {!yearsProductSales ? null : (
          <CommissionsPieCard
            type="sales"
            data={yearsProductSales || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(yearsProductSales) || []}
            numColors={yearsProductSales.length}
            title="Total Sales"
            titleDetails="per year"
          />
        )}
        {!totalSupplierComm ? null : (
          <CommissionsPieCard
            type="suppliers"
            data={totalSupplierComm || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(totalSupplierComm) || []}
            numColors={totalSupplierComm.length}
            title="Top Suppliers"
            titleDetails="historic data"
          />
        )}

        {!ytdSupplierComm ? null : (
          <CommissionsPieCard
            type="suppliers"
            data={ytdSupplierComm || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(ytdSupplierComm) || []}
            numColors={ytdSupplierComm.length}
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
    backgroundColor: "#f27d42", //"red",
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
