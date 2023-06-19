import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { Divider } from "react-native-paper";
import PieChart from "react-native-pie-chart";
import { formatDollarEntry } from "../functions/customerFunctions";
import axios from "axios";
import moment from "moment";
import GetConfiguration from "../constants/Config";
import { useQuery, useQueryClient } from "react-query";
import { Avatar, Button, Card, Text as Txt } from "react-native-paper";
import {
  getTotalCommissions,
  getCommissionsCurrMonth,
  getCommissionsYearToDate,
  getAllCommTopSuppliers,
  getYearToDateCommTopSuppliers,
} from "../api/endPoints";
import CommissionsPieCard from "./cards/commissions/CommissionsPieCard";
import CommissionsSummaryCard from "./cards/commissions/CommissionsSummaryCard";
import { getSeriesForPie } from "../functions/commissionsFunctions";
import CommissionsLineChart from "./cards/commissions/CommissionsLineChart";

//
const widthAndHeight = 150;
const series = [300, 150, 400];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100"];
//

export default function CommissionsDetails(props: any) {
  const [totalCommissions, setTotalCommissions] = useState<any>();
  const [currMonthComm, setCurrMonthComm] = useState<any>();
  const [yearToDateComm, setYearToDateComm] = useState<any>();
  const [totalSupplierComm, setTotalSupplierComm] = useState<any>();
  const [ytdSupplierComm, setYtdSupplierComm] = useState<any>();

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
      ];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([
          { data: totalCommissions },
          { data: yearToDateComm },
          { data: currMonthComm },
          { data: totalSupplierComm },
          { data: ytdSupplierComm },
        ]) => {
          setTotalCommissions(totalCommissions);
          setYearToDateComm(yearToDateComm);
          setCurrMonthComm(currMonthComm);
          setTotalSupplierComm(totalSupplierComm);
          setYtdSupplierComm(ytdSupplierComm);
        }
      );
    }

    getCommissions();
  }, []);

  if (!props.commissions) return null;

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          //flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <View
          style={{
            display: "flex",
            height: 300,
            //flex: 1,
            //flexWrap: "wrap",
            flexDirection: "column",
            backgroundColor: "#F0F0F0",
            borderRadius: 12,
            marginRight: 10,
            marginBottom: 10,
            paddingLeft: 30,
            paddingRight: 10,
          }}
        >
          <Text style={[styles.catTitle, { marginTop: 20, marginBottom: 30 }]}>
            Commissions Summary
          </Text>

          <View
            style={{
              display: "flex",
              //flex: 2,
              flexWrap: "wrap",
              flexDirection: "row",
              //marginLeft: 20,
              //marginRight: 20,
              //justifyContent: "space-between",
            }}
          >
            <CommissionsSummaryCard
              title="Total commissions"
              data={totalCommissions || null}
              color="#FDE0E0"
              iconColor="#FF0000"
              icon="total"
            />

            <CommissionsSummaryCard
              title="Year-to-date"
              data={yearToDateComm || null}
              type="YYYY"
              color="#ECFADC"
              iconColor="#1FF438"
              icon="year"
            />

            <CommissionsSummaryCard
              title="Current month"
              data={currMonthComm || null}
              type="MMMM"
              color="#FFEED2"
              iconColor="#FF5F15"
              icon="month"
            />

            <CommissionsSummaryCard
              title="Current month"
              type="MMMM"
              color="#ECE6FF"
              iconColor="#791f87"
              icon="search"
              startDate={props.startDate}
              endDate={props.endDate}
              commissions={props.commissions}
            />
          </View>
        </View>

        {/* <View
          style={{
            display: "flex",
            flex: 1,
            height: 300,
            minWidth: 400,
            maxWidth: 600,
            //flexWrap: "wrap",
            borderRadius: 12,
            backgroundColor: "grey",
          }}
        > */}
        {/* <CommissionsSummaryCard
            title="Comparison with 2020" // <-- define programmatically
            type="YYYY"
            color="#FFFFFF"
            iconColor="#FF0000"
            icon="chart"
            flex={2}
          /> */}
        <CommissionsLineChart height={300} />
        {/* </View> */}
      </View>

      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {!totalSupplierComm ? null : (
          <CommissionsPieCard
            data={totalSupplierComm || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(totalSupplierComm)}
            sliceColor={sliceColor}
            title="Top Suppliers"
            titleDetails="historic data"
          />
        )}

        {!ytdSupplierComm ? null : (
          <CommissionsPieCard
            data={ytdSupplierComm || []}
            widthAndHeight={widthAndHeight}
            series={getSeriesForPie(ytdSupplierComm)}
            sliceColor={sliceColor}
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
    //alignSelf: "center",
    //marginBottom: 20,
  },
  catTitle: {
    fontSize: 24,
    marginBottom: 20,
    //paddingLeft: 20,
    //paddingRight: 40,
    fontWeight: "600",
    color: "#368cbf",
  },
  card: {
    display: "flex",
    flexDirection: "column", //
    alignItems: "center",
    //flex: 1, // <-- change this if adding one more!!
    paddingTop: 20,
    height: 350,
    minWidth: 350,
    backgroundColor: "#F0F0F0",
    margin: 5,
  },
});
