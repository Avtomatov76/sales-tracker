import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useQuery, useQueries } from "react-query";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import GetConfiguration from "../constants/Config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import CustomButton from "./CustomButton";
import ErrorModal from "../modals/ErrorModal";
import { getProductsData, getProductsForRange } from "../api/endPoints";
import TransactionsList from "./TransactionsList";

export default function Transactions(props: any) {
  const [products, setProducts] = useState<any>();
  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [stage, setStage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const baseURL = GetConfiguration().baseUrl;

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["products"],
    () => axios.get(baseURL + getProductsData).then((res) => res.data)
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} type="products" />;

  const handleOnClick = (stage: any) => {
    //console.log("Stage:", stage);
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
    console.log("SEARCHING...............");

    if (!startDate && !endDate) {
      setShowErrorModal(true);
      return;
    }

    const params = {
      start: !startDate && endDate ? endDate : startDate,
      end: !endDate && startDate ? startDate : endDate,
    };

    await axios
      .get(baseURL + getProductsForRange, { params })
      .then((res) => setProducts(res.data));
  };

  if (!data)
    return (
      <View>
        <Text>No Transactions</Text>
      </View>
    );
  console.log("products products: ", products);
  return (
    <>
      <View style={{ display: "flex" }}>
        <View style={styles.header}>
          <Text style={styles.textField}>Transactions</Text>

          <View style={styles.dateSearch}>
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

        <hr style={styles.hr} />

        <TransactionsList
          products={products ? products : null}
          data={data ? data : null}
          startDate={startDate || ""}
          endDate={endDate || ""}
          numProducts={!products ? data.length : products.length}
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

const styles = StyleSheet.create({
  hr: {
    width: "100%",
    backgroundColor: "grey",
    border: "none",
    height: 1,
  },
  dateSearch: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textField: {
    fontSize: 36,
    fontWeight: "600",
    paddingRight: 20,
    marginRight: "auto",
    marginBottom: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
  },
});
