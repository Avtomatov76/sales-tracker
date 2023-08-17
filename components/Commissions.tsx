import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import GetConfiguration from "../constants/Config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import CustomButton from "./CustomButton";
import ErrorModal from "../modals/ErrorModal";
import { getTotalCommissions, getCommissionsForRange } from "../api/endPoints";
import CommissionsDetails from "./CommissionsDetails";

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
    () => axios.get(baseURL + getTotalCommissions).then((res) => res.data)
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="commissions" />;

  const handleOnClick = (stage: any) => {
    setStage(stage);
    setShowCalendar(true);
  };

  const handleOnChange = (value: any, stage: any) => {
    onChange(value);

    let dateStr = moment(value).format("YYYY-MM-DD");
    if (stage == "start") setStartDate(dateStr);
    if (stage == "end") setEndDate(dateStr);
    setShowCalendar(false);
  };

  const handleSearch = async () => {
    if (!startDate && !endDate) {
      setShowErrorModal(true);
      return;
    }

    const params = {
      start: !startDate && endDate ? endDate : startDate,
      end: !endDate && startDate ? startDate : endDate,
    };

    await axios
      .get(baseURL + getCommissionsForRange, { params })
      .then((res) => setCommissions(res.data[0]));
  };

  if (!data[0].commissions)
    return (
      <View>
        <Text>No Commissions</Text>
      </View>
    );

  return (
    <>
      <View style={{ display: "flex" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 36,
              fontWeight: "600",
              paddingRight: 20,
              marginRight: "auto",
              marginBottom: 10,
            }}
          >
            Commissions
          </Text>

          <View
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={{ display: "flex", marginRight: 20 }}>
              <TextField
                size="small"
                value={startDate}
                onClick={() => handleOnClick("start")}
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
          </View>
          <View
            style={{
              display: "flex",
              height: "auto",
              marginBottom: 10,
            }}
          >
            <CustomButton
              title="Search"
              submitForm={handleSearch}
              flag="search"
            />
          </View>
        </View>

        <hr
          style={{
            width: "100%",
            backgroundColor: "grey",
            border: "none",
            height: 1,
          }}
        />

        <CommissionsDetails
          commissions={
            commissions && commissions.commissions ? commissions.commissions : 0
          }
          startDate={startDate || ""}
          endDate={endDate || ""}
        />
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
