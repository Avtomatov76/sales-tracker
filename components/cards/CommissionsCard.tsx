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
const widthAndHeight = 250;
const series = [123, 321, 123];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100"];
//

export default function CommissionsCard(props: any) {
  const [currMonthComm, setCurrMonthComm] = useState<any>();
  const [yearToDateComm, setYearToDateComm] = useState<any>();
  const [totalSupplierComm, setTotalSupplierComm] = useState<any>();
  const [ytdSupplierComm, setYtdSupplierComm] = useState<any>();

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  console.log(
    "----------------   rendering commissions card   -------------------"
  );

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

  //   console.log("YTD: ", yearToDateComm);
  //   console.log("CURR MONTH: ", currMonthComm);
  //   console.log("TOTAL SUPPLIER COMM: ", totalSupplierComm);
  //   console.log("YTD SUPPLIER COMM: ", ytdSupplierComm);

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
            height: 20,
            width: 50,
            backgroundColor: sliceColor[index],
            marginRight: 20,
          }}
        ></View>
        <Text style={{ color: "grey", fontSize: 14 }}>
          {supplier.name + " - "}
        </Text>
        <Text style={{ color: "green", fontSize: 14 }}>
          {formatDollarEntry(supplier.total)}
        </Text>
      </View>
    );
  };
  //   const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <Card style={{ width: "100%" }}>
      {/* <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ margin: 10, height: 200 }}
      /> */}

      <Image
        style={{ margin: 10, height: 200 }}
        source={{ uri: "https://picsum.photos/700" }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
      {/* <Card.Title title="Details" left={LeftContent} /> */}
      <Card.Content style={{ marginLeft: 30, marginRight: 30 }}>
        {/* <Txt variant="titleLarge">Card title</Txt> */}
        {/* <Txt variant="bodyMedium">Card content</Txt> */}

        <View style={{ alignSelf: "flex-start" }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            Summary
          </Text>
        </View>
        <Divider style={{ marginTop: 10, marginBottom: 20 }} />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 30,
          }}
        >
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
              <Text style={styles.pieTitle}>Year-to-date: </Text>
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
              <Text style={styles.pieTitle}>Current month: </Text>
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
            {
              props.commissions != null ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.pieTitle}>
                    Commissions for the period between&nbsp;
                  </Text>
                  <Text>
                    <Text style={{ fontSize: 18, color: "blue" }}>
                      {props.startDate}
                    </Text>{" "}
                    <Text style={styles.pieTitle}>and </Text>
                    <Text style={{ fontSize: 18, color: "blue" }}>
                      {props.endDate}
                    </Text>{" "}
                    <Text style={styles.pieTitle}>is: </Text>
                    <Text style={{ fontSize: 18, color: "green" }}>
                      {formatDollarEntry(props.commissions)}
                    </Text>
                  </Text>
                </View>
              ) : null
              // <View>
              //   <Text>No commissions</Text>
              // </View>
            }
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 30,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 100,
            }}
          >
            <View style={{ marginBottom: 30 }}>
              <Text
                style={[
                  styles.pieTitle,
                  {
                    alignSelf: "center",
                    marginBottom: 20,
                    color: "#368cbf",
                    fontWeight: "600",
                  },
                ]}
              >
                Historic Totals by Supplier
              </Text>
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
              />
            </View>

            <View style={{ alignSelf: "center" }}>
              {!totalSupplierComm || totalSupplierComm.length == 0
                ? 0
                : totalSupplierComm.map((supplier: any, index: any) =>
                    displayPieDetails(supplier, index)
                  )}
            </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View style={{ marginBottom: 30 }}>
              <Text
                style={[
                  styles.pieTitle,
                  {
                    alignSelf: "center",
                    marginBottom: 20,
                    color: "#368cbf",
                    fontWeight: "600",
                  },
                ]}
              >
                Year-To-Date by Supplier
              </Text>
              <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
              />
            </View>

            <View style={{ alignSelf: "center" }}>
              {!ytdSupplierComm || ytdSupplierComm.length == 0
                ? 0
                : ytdSupplierComm.map((supplier: any, index: any) =>
                    displayPieDetails(supplier, index)
                  )}
            </View>
          </View>
        </View>
      </Card.Content>

      {/* <Card.Actions style={{ marginTop: 10, marginBottom: 5 }}>
        <Button onPress={handleEdit}>Edit</Button>
        <Button onPress={handleDelete} buttonColor="red">
          Delete
        </Button>
      </Card.Actions> */}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  pieTitle: {
    fontSize: 18,
    //alignSelf: "center",
    //marginBottom: 20,
  },
});
