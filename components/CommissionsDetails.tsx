import { useState } from "react";
import { useQuery } from "react-query";
import { StyleSheet, View, Image, Pressable } from "react-native";
import OutsideClickHandler from "react-outside-click-handler";
import CommissionsPieCard from "./cards/commissions/CommissionsPieCard";
import {
  getCommForYearSelected,
  getCommissionCards,
  getSeriesForPie,
} from "../functions/commissionsFunctions";
import CommissionsLineChart from "./cards/commissions/CommissionsLineChart";
import ErrorScreen from "./ErrorScreen";
import CommissionsPieChart from "./cards/commissions/CommissionsPieChart";
import CommissionsChartYear from "./cards/commissions/CommissionsChartYear";
import { fetchCommissionData } from "../utilities/dbDataFetch";
import LoadingScreen from "./LoadingScreen";
import DashboardTile from "./cards/dashboard/DashboardTile";

const widthAndHeight = 150;

export default function CommissionsDetails(props: any) {
  const [chartOptionsDisplay, setChartOptionsDisplay] = useState(false);
  const [chartForYear, setChartForYear] = useState<any>("default");
  const [commForYearSelected, setCommForYearSelected] = useState<any>();

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["commissions-details"],
    () => fetchCommissionData()
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="commissions" />;

  const commissionCards = getCommissionCards(
    data.commissions,
    data.ytdCommissions,
    data.prevYtdCommissions,
    data.currMonthCommission,
    data.prevYearCurrMonthCommissions,
    data.commissionsDue
  );

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const getChartDisplayOptions = () => {
    setChartOptionsDisplay(!chartOptionsDisplay);
  };

  const handleSelection = (year: any) => {
    setChartOptionsDisplay(false);
    setChartForYear(year);

    let commArray = getCommForYearSelected(year, data.commissionEntries);
    setCommForYearSelected(commArray);
  };

  if (!data.commissions || isLoading)
    return (
      <ErrorScreen
        error="No commission information found in the database!"
        type="server"
      />
    );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {commissionCards.map((card: any, index: any) => (
          <DashboardTile
            key={index}
            index={index}
            type={card.type}
            title={card.title}
            color="#DEF3FD"
            data={card.data ? card.data[0].commissions : null}
            compare={card.compare ? card.compare[0].commissions : null}
            icon={card.icon}
            iconColor={card.iconColor}
            tab="commissions"
            date={card.date || null}
            startDate={props.startDate}
            endDate={props.endDate}
            commissions={props.commissions}
          />
        ))}
      </View>

      <View style={styles.tabContainer}>
        {!data.yearlySales ? null : (
          <CommissionsPieCard
            type="sales"
            widthAndHeight={widthAndHeight}
            data={data.yearlySales || []}
            series={getSeriesForPie(data.yearlySales) || []}
            numColors={data.yearlySales.length}
            title="Total Sales"
            titleDetails="per year"
          />
        )}

        {!data.suppliersCommissions ? null : (
          <CommissionsPieCard
            type="suppliers"
            widthAndHeight={widthAndHeight}
            data={data.suppliersCommissions || []}
            series={getSeriesForPie(data.suppliersCommissions) || []}
            numColors={data.suppliersCommissions.length}
            title="Top Suppliers"
            titleDetails="historic data"
          />
        )}

        {!data.ytdSuppliersCommissions ? null : (
          <CommissionsPieCard
            type="suppliers"
            widthAndHeight={widthAndHeight}
            data={data.ytdSuppliersCommissions || []}
            series={getSeriesForPie(data.ytdSuppliersCommissions) || []}
            numColors={data.ytdSuppliersCommissions.length}
            title="Top Suppliers"
            titleDetails="year-to-date"
          />
        )}
      </View>

      <View style={styles.tabContainer}>
        <CommissionsLineChart
          width={600}
          minWidth={300}
          height={300}
          chartForYear={chartForYear}
          monthlyCommYear={commForYearSelected || []}
          currYear={data.currYearMonthlyCommissions || null}
          lastYear={data.prevYearMonthlyCommissions || null}
        />

        {chartOptionsDisplay == true ? (
          <View style={styles.dropdown}>
            <OutsideClickHandler
              onOutsideClick={() => setChartOptionsDisplay(false)}
            >
              <CommissionsChartYear handleSelection={handleSelection} />
              {data.numericValuesAllYears.map((year: any, index: any) => (
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
          allYearsComm={data.yearlyCommissions}
          currYear={data.ytdCommissions || null}
          lastYear={data.prevYearCommissions || null}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    backgroundColor: "#F0F0F0",
    marginTop: 20,
    padding: 20,
  },
  tabContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  hamburger: {
    height: 30,
    width: 30,
    position: "absolute",
    marginTop: 10,
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
