import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { Divider } from "react-native-paper";
import PieChart from "react-native-pie-chart";
import { formatDollarEntry } from "../../functions/customerFunctions";
import axios from "axios";
import moment from "moment";
import GetConfiguration from "../../constants/Config";
import { useQuery, useQueryClient } from "react-query";
import { Avatar, Button, Card, Text as Txt } from "react-native-paper";
import {
  getCommissionsCurrMonth,
  getCommissionsYearToDate,
  getAllCommTopSuppliers,
  getYearToDateCommTopSuppliers,
} from "../../api/endPoints";

//
const widthAndHeight = 150;
const series = [123, 321, 123];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100"];
//

export default function TestCommPage(props: any) {
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
        baseURL + getCommissionsYearToDate,
        baseURL + getCommissionsCurrMonth,
        baseURL + getAllCommTopSuppliers,
        baseURL + getYearToDateCommTopSuppliers,
      ];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([
          { data: yearToDateComm },
          { data: currMonthComm },
          { data: totalSupplierComm },
          { data: ytdSupplierComm },
        ]) => {
          setYearToDateComm(yearToDateComm);
          setCurrMonthComm(currMonthComm);
          setTotalSupplierComm(totalSupplierComm);
          setYtdSupplierComm(ytdSupplierComm);
        }
      );
    }

    getCommissions();
  }, []);

  const displaySupplierDetails = (supplier: any, index: any) => {
    return (
      <View
        key={index}
        style={{ display: "flex", marginLeft: 20, flexDirection: "row" }}
      >
        <Text style={{ color: "grey" }}>{supplier.name + " - "}</Text>
        <Text style={{ color: "green" }}>
          {formatDollarEntry(supplier.total)}
        </Text>
      </View>
    );
  };

  const displayPieDetails = (supplier: any, index: any) => {
    return (
      <View
        key={index}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <View
          style={{
            display: "flex",
            height: 15,
            width: 40,
            backgroundColor: sliceColor[index],
            marginRight: 20,
          }}
        ></View>
        <Text style={{ fontSize: 14 }}>{supplier.name + " - "}</Text>
        <Text style={{ color: "green", fontSize: 14 }}>
          {formatDollarEntry(supplier.total)}
        </Text>
      </View>
    );
  };
  //   const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <Card
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
      }}
    >
      <Card
        style={{
          height: 350,
          margin: 5,
        }}
      >
        <Text style={[styles.catTitle, { marginTop: 20 }]}>Big Card</Text>
        <Card.Content
          style={{
            //flex: 1,
            //display: "flex",
            flexDirection: "row",
            //marginTop: "auto",
            //alignSelf: "flex-end",
          }}
        >
          <Card style={{ height: 200, width: 200 }}>Small Card 1</Card>
          <Card style={{ height: 200, width: 200 }}>Small Card 2</Card>
          <Card style={{ height: 200, width: 200 }}>Small Card 3</Card>
        </Card.Content>
      </Card>

      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        <Card
          style={[
            styles.card,
            {
              flex: 1,
              alignItems: "flex-start",
              // paddingLeft: 40,
              // paddingRight: 40,
            },
          ]}
        >
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.catTitle}>Summary</Text>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  //alignItems: "center",
                  //justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text style={styles.pieTitle}>
                  Year-to-date &#40;{moment().format("YYYY")}&#41;:{" "}
                </Text>
                <Text style={{ fontSize: 18, color: "green" }}>
                  {!yearToDateComm || yearToDateComm[0].commissions == null
                    ? 0
                    : formatDollarEntry(yearToDateComm[0].commissions)}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",

                  marginBottom: 10,
                }}
              >
                <Text style={styles.pieTitle}>
                  Current month &#40;{moment().format("MMMM")}&#41;:{" "}
                </Text>
                <Text style={{ fontSize: 18, color: "green" }}>
                  {!currMonthComm || currMonthComm[0].commissions == null
                    ? 0
                    : formatDollarEntry(currMonthComm[0].commissions)}
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                marginBottom: 30,
              }}
            >
              {props.commissions != 0 ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    //alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ flexDirection: "row" }}>
                    <Text style={styles.pieTitle}>Earnings from&nbsp;</Text>
                    <Text style={{ fontSize: 18, color: "blue" }}>
                      {props.startDate}
                    </Text>{" "}
                    <Text style={styles.pieTitle}>and </Text>
                    <Text style={{ fontSize: 18, color: "blue" }}>
                      {props.endDate}:&nbsp;
                    </Text>
                    <Text style={{ fontSize: 18, color: "green" }}>
                      {formatDollarEntry(props.commissions)}
                    </Text>
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.catTitle}>
              Top Suppliers{" "}
              <Text
                style={{ color: "#000000", fontSize: 16, fontWeight: "100" }}
              >
                &#40;historic data&#41;
              </Text>
            </Text>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              style={{ alignSelf: "center" }}
            />
          </View>

          <View style={{ alignSelf: "center" }}>
            {!totalSupplierComm || totalSupplierComm.length == 0
              ? 0
              : totalSupplierComm.map((supplier: any, index: any) =>
                  displayPieDetails(supplier, index)
                )}
          </View>
        </Card>

        <Card style={styles.card}>
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.catTitle}>
              Top Suppliers{" "}
              <Text
                style={{ color: "#000000", fontSize: 16, fontWeight: "100" }}
              >
                &#40;year-to-date&#41;
              </Text>
            </Text>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              style={{ alignSelf: "center" }}
            />
          </View>

          <View style={{ alignSelf: "center" }}>
            {!ytdSupplierComm || ytdSupplierComm.length == 0
              ? 0
              : ytdSupplierComm.map((supplier: any, index: any) =>
                  displayPieDetails(supplier, index)
                )}
          </View>
        </Card>
      </View>
    </Card>
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
    fontSize: 20,
    marginBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
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

// #E8E9EB
