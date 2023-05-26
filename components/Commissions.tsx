import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { Divider } from "react-native-paper";
import { Avatar, Button, Card, Text as Txt } from "react-native-paper";
import { useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import GetConfiguration from "../constants/Config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import CustomButton from "./CustomButton";
import ErrorModal from "../modals/ErrorModal";
import CommissionsCard from "./cards/CommissionsCard";
import { formatDollarEntry } from "../functions/customerFunctions";

// Commissions total to get:
// Year to date
// current month
// by supplier - historic/year-to-date
// by vendor - historic/year-to-date
// -- maybe --
// percentage of supplier vs overall - pie chart? -- historic/year-to-date
// vendor commissions comparison - pie chart? -- historic/year-to-date

export default function Commissions(props: any) {
  const [commissions, setCommissions] = useState<any>();
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [stage, setStage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const baseURL = GetConfiguration().baseUrl;

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["commissions"],
    () => axios.get(baseURL + "/api/commissions").then((res) => res.data) // HCANGE BACK TO CORRECT VALUE!!
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="commissions" />;
  if (data) console.log("Commissions data: ", data);
  //data.sort((a: any, b: any) => a.last_name.localeCompare(b.last_name));

  const handleOnClick = (stage: any) => {
    console.log("Stage:", stage);
    setStage(stage);
    setShowCalendar(true);
  };

  const handleOnChange = (value: any, stage: any) => {
    onChange(value);

    console.log("A");
    console.log("Stage: ", stage);
    console.log("PRINTING DATE: ", value);
    console.log("PRINTING STAGE: ", stage);

    let dateStr = moment(value).format("YYYY-MM-DD");
    if (stage == "start") setStartDate(dateStr);
    if (stage == "end") setEndDate(dateStr);
    setShowCalendar(false);
  };

  const handleSearch = async () => {
    console.log("SEARCHING...............");

    if (!startDate && !endDate) {
      setShowErrorModal(true);
      return;
    }

    // if (!startDate && endDate) setStartDate(endDate);
    // if (startDate && !endDate) setEndDate(startDate);

    const params = {
      start: !startDate && endDate ? endDate : startDate,
      end: !endDate && startDate ? startDate : endDate,
    };

    console.log("PARAMS: ", params);

    await axios
      .get(baseURL + "/api/commissions-range", { params })
      .then((res) => setCommissions(res.data[0]));

    //setShowCalendar(false);
  };

  // console.log("Selected start day: ", startDate);
  // console.log("Selected end day: ", endDate);
  console.log("Commissions for a date range: ", commissions);

  //

  return (
    <>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 35 }}>Commissions</Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ display: "flex", marginRight: 20 }}>
              <TextField
                size="small"
                value={startDate}
                onClick={() => handleOnClick("start")}
                //onClick={() => console.log("start date clicked!!")}
                variant="outlined"
                label="Select start date"
                style={{ width: 160 }}
              />
            </View>
            <View style={{ display: "flex", marginRight: 30 }}>
              <TextField
                size="small"
                value={endDate}
                onClick={() => handleOnClick("end")}
                variant="outlined"
                label="Select end date"
                style={{ width: 160 }}
              />
            </View>
            <CustomButton
              title="Search"
              submitForm={handleSearch}
              flag="add"
              btnStyles={{ height: "auto" }}
            />
          </View>
        </View>
        <View>
          <Text style={{ marginBottom: 10 }}>
            Total commissions earned:&nbsp;
            <Text style={{ color: "green" }}>
              {!data ? "n/a" : formatDollarEntry(data[0].sum)}
            </Text>
          </Text>
        </View>
        <hr
          style={{
            width: "100%",
            backgroundColor: "grey",
            border: "none",
            height: 1,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          {/* {
            commissions && commissions.commissions != null ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 20,
                  width: "80%",
                  //marginLeft: 30,
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={{ fontSize: 16 }}>
                    Commissions for the period between
                  </Text>
                  <Text style={{ marginBottom: 20, fontSize: 16 }}>
                    <Text style={{ fontSize: 16, color: "blue" }}>
                      {startDate}
                    </Text>{" "}
                    and{" "}
                    <Text style={{ fontSize: 16, color: "blue" }}>
                      {endDate}
                    </Text>{" "}
                    is:
                  </Text>

                  <Text style={{ fontSize: 24, color: "green" }}>
                    ${commissions.commissions}
                  </Text>
                </View>
              </View>
            ) : null
          } */}

          <CommissionsCard
            commissions={
              commissions && commissions.commissions
                ? commissions.commissions
                : 0
            }
            startDate={startDate}
            endDate={endDate}
          />
        </View>
      </View>
      {showCalendar ? (
        <View
          style={{
            display: "flex",
            position: "absolute",
            alignSelf: "flex-end",
            marginTop: 50,
            marginRight: stage == "start" ? 100 : 0,
          }}
        >
          <Calendar
            onChange={(value) => handleOnChange(value, stage)}
            value={value}
          />
        </View>
      ) : null}
      {/* <ErrorModal
        visible={showErrorModal}
        hideModal={() => setShowErrorModal(false)}
        recordType="dateMissing"
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  smallBoxStyle: {
    display: "flex",
    backgroundColor: "orange",
    width: "50%",
    height: "20%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bigBoxStyle: {
    display: "flex",
    backgroundColor: "blue",
    width: "50%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  twoBoxesStyle: {
    display: "flex",
    height: "80%",
    width: "100%",
    alignItems: "center",
  },
});
