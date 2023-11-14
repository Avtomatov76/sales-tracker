import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import GetConfiguration from "../constants/Config";
import {
  getTotalCommissions,
  getCommissionsCurrMonth,
  getCommissionsYearToDate,
  getAllCommTopSuppliers,
  getYearToDateCommTopSuppliers,
  getLastYearCommissions,
  getAllYearsCommissions,
  getLastYearToDate,
  getLastYearCurrentMonth,
  getUnpaidCommissions,
  getYearToDatePerMonth,
  getLastYearToDatePerMonth,
  getYearsProductSales,
} from "../api/endPoints";
import CommissionsPieCard from "./cards/commissions/CommissionsPieCard";
import CommissionsSummaryCard from "./cards/commissions/CommissionsSummaryCard";
import { getSeriesForPie } from "../functions/commissionsFunctions";
import CommissionsLineChart from "./cards/commissions/CommissionsLineChart";
import ErrorScreen from "./ErrorScreen";
import CommissionsPieChart from "./cards/commissions/CommissionsPieChart";

const widthAndHeight = 150;

export default function CommissionsDetails(props: any) {
  const [totalCommissions, setTotalCommissions] = useState<any>();
  const [currMonthComm, setCurrMonthComm] = useState<any>();
  const [yearToDateComm, setYearToDateComm] = useState<any>();
  const [totalSupplierComm, setTotalSupplierComm] = useState<any>();
  const [ytdSupplierComm, setYtdSupplierComm] = useState<any>();
  const [lastYearComm, setLastYearComm] = useState<any>();
  const [allYearsComm, setAllYearsComm] = useState<any>();
  const [lastYearToDateComm, setLastYearToDate] = useState<any>();
  const [lastYearCurrMonth, setLastYearCurrMonth] = useState<any>();
  const [unpaidCommissions, setUnpaidCommissions] = useState<any>();
  const [currYearMonthlyComm, setCurrYearMonthlyComm] = useState<any>();
  const [lastYearMonthlyComm, setLastYearMonthlyComm] = useState<any>();
  const [yearsProductSales, setYearsProductSales] = useState<any>();

  const commissionCards = [
    {
      title: "Total commissions",
      data: totalCommissions || null,
      type: "",
      color: "#FDE0E0",
      icon: "total",
      iconColor: "#FF0000",
    },
    {
      title: "Year-to-date",
      data: yearToDateComm || null,
      compare: lastYearToDateComm || null,
      type: "YYYY",
      color: "#ECFADC",
      icon: "year",
      iconColor: "#1FF438",
    },
    {
      title: "Current month",
      data: currMonthComm || null,
      compare: lastYearCurrMonth || null,
      type: "MMMM",
      color: "#FFEED2",
      icon: "month",
      iconColor: "#FF5F15",
    },
    {
      title: "Unpaid Commissions",
      data: unpaidCommissions || null,
      type: "MMMM",
      color: "#FEC9C3",
      iconColor: "#8B0000",
      icon: "unpaid",
    },
    {
      title: "",
      type: "MMMM",
      color: "#ECE6FF",
      iconColor: "#791f87",
      icon: "search",
    },
    {
      title: "", // <-- Change to valid box
      type: "MMMM",
      color: "#ECE6FF",
      iconColor: "#791f87",
      icon: "search",
    },
  ];

  // const getComponentWidth = (event: any) => {
  //   let width = event.nativeEvent.layout.width;
  //   if (width >= 450) setChartWidth(width);
  //   if (width < 450) setChartWidth(450);
  // };

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const baseURL = GetConfiguration().baseUrl;

  useEffect(() => {
    async function getCommissions() {
      let endpoints = [
        baseURL + getTotalCommissions,
        baseURL + getCommissionsYearToDate,
        baseURL + getCommissionsCurrMonth,
        baseURL + getAllCommTopSuppliers,
        baseURL + getYearToDateCommTopSuppliers,
        baseURL + getLastYearCommissions,
        baseURL + getLastYearToDate,
        baseURL + getLastYearCurrentMonth,
        baseURL + getUnpaidCommissions,
        baseURL + getYearToDatePerMonth,
        baseURL + getLastYearToDatePerMonth,
        baseURL + getAllYearsCommissions,
        baseURL + getYearsProductSales,
      ];
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
        }
      );
    }

    getCommissions();
  }, []);

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
      //onLayout={(event) => getComponentWidth(event)}
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
          paddingBottom: 20,
        }}
      >
        <Text
          style={[
            styles.catTitle,
            {
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 8,
            },
          ]}
        >
          Summary
        </Text>

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

      <View>
        <Text style={[styles.catTitle, { marginTop: 20, marginBottom: 10 }]}>
          Data
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <CommissionsLineChart
          width={600}
          minWidth={300}
          height={300}
          currYear={currYearMonthlyComm || null}
          lastYear={lastYearMonthlyComm || null}
        />
        <CommissionsPieChart
          width={600}
          minWidth={300}
          height={300}
          allYearsComm={allYearsComm}
          currYear={yearToDateComm}
          lastYear={lastYearComm}
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
            data={yearsProductSales || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(yearsProductSales)}
            numColors={yearsProductSales.length}
            title="Total Sales"
            titleDetails="per year"
          />
        )}
        {!totalSupplierComm ? null : (
          <CommissionsPieCard
            data={totalSupplierComm || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(totalSupplierComm)}
            numColors={totalSupplierComm.length}
            title="Top Suppliers"
            titleDetails="historic data"
          />
        )}

        {!ytdSupplierComm ? null : (
          <CommissionsPieCard
            data={ytdSupplierComm || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(ytdSupplierComm)}
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
  container: {
    display: "flex",
    alignItems: "center",
  },
  pieTitle: {
    fontSize: 20,
    paddingLeft: 40,
    paddingRight: 40,
  },
  catTitle: {
    fontSize: 24,
    marginBottom: 20,
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
    margin: 5,
  },
});
