import { useState, useEffect } from "react";
import { View } from "react-native";
import axios from "axios";
import { useQuery } from "react-query";
import LoadingScreen from "./LoadingScreen";
import ErrorMessage from "./ErrorMessage";
import GetConfiguration from "../constants/Config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import ErrorModal from "../modals/ErrorModal";
import { getTotalCommissions, getCommissionsForRange } from "../api/endPoints";
import CommissionsDetails from "./CommissionsDetails";
import TabHeader from "./TabHeader";

export default function Commissions(props: any) {
  const [commissions, setCommissions] = useState<any>();
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [stage, setStage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showUnpaidCommModal, setShowUnpaidCommModal] = useState(false);
  //const [listUpdate, setListUpdate] = useState(false);

  const baseURL = GetConfiguration().baseUrl;

  //
  console.log("------------------ COMMISSIONS LOADED ---------------------");
  //console.log("LIST UPDATE VALUE: ", listUpdate);
  //
  // useEffect(() => {
  //   refetch();
  //   setListUpdate(false);
  // }, [listUpdate]);
  //

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["commissions"],
    () => axios.get(baseURL + getTotalCommissions).then((res) => res.data)
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorMessage error={error} type="commissions" />;

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

  //
  const updateProductField = async (field: any, value: string, id: string) => {
    const params = {
      field: field,
      value: value,
      id: id,
    };

    console.log("C");

    console.log(
      "SHOW ME inside commissions: ",
      "field: " + field + " " + "value: " + value + " " + "id: " + id
    );

    // try {
    //   await axios.post(baseURL + updateProductFieldAPI, { params });
    // } catch (err) {
    //   console.log(err);
    // }

    //setShowModal(false);
    //
    //refetch();
  };
  //

  if (!data[0].commissions || isLoading)
    return (
      <ErrorMessage
        error="No commission information found in the database!"
        type="server"
      />
    );

  return (
    <View style={{ display: "flex" }}>
      <TabHeader
        name="Commissions"
        startDate={startDate}
        endDate={endDate}
        handleSearch={handleSearch}
        handleOnClick={handleOnClick}
      />

      <CommissionsDetails
        commissions={
          commissions && commissions.commissions ? commissions.commissions : 0
        }
        startDate={startDate || ""}
        endDate={endDate || ""}
        updateProductField={updateProductField}
        // unpaidCommModalState={showUnpaidCommModal}
        //setUnpaidCommModalState={setShowUnpaidCommModal}
        //setListUpdate={setListUpdate}
        //modalState={modalState}
      />

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
    </View>
  );
}
