import { useState, useEffect } from "react";
import { View } from "react-native";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import GetConfiguration from "../constants/Config";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import {
  getProductsData,
  getProductsForRange,
  getProductsById,
} from "../api/endPoints";
import TransactionsList from "./TransactionsList";
import { sortArray } from "../functions/transactionsFunctions";
import TabHeader from "./TabHeader";
import NotFound from "./NotFound";
import { TRANSACTION_END_POINTS } from "../constants/transactionsEndPoints";

export default function Transactions(props: any) {
  const [customers, setCustomers] = useState<any>([]);
  const [allProducts, setAllProducts] = useState<any>();
  const [products, setProducts] = useState<any>();
  const [vendors, setVendors] = useState<any>();
  const [suppliers, setSuppliers] = useState<any>();
  const [travelTypes, setTravelTypes] = useState<any>();
  const [destinations, setDestinations] = useState<any>();
  const [transactions, setTransactions] = useState<any>();

  const [value, onChange] = useState(new Date());
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [stage, setStage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selected, setSelected] = useState("default");
  const [listUpdate, setListUpdate] = useState(false);

  const baseURL = GetConfiguration().baseUrl;

  //
  useEffect(() => {
    //if (Object.keys(products).length != 0) return;
    //console.log("A products.....   : ", products);

    async function getData() {
      Promise.all(
        TRANSACTION_END_POINTS.map((endpoint) => axios.get(endpoint))
      ).then(
        ([
          { data: customers },
          { data: vendors },
          { data: suppliers },
          { data: travelTypes },
          { data: transactions },
          { data: products },
          { data: destinations },
          { data: productData },
        ]) => {
          setCustomers(customers), setVendors(vendors);
          setSuppliers(suppliers);
          setTravelTypes(travelTypes);
          setTransactions(transactions);
          setAllProducts(products);
          setDestinations(destinations);
          setProducts(productData);
        }
      );
    }

    getData();
    setListUpdate(false);
  }, [listUpdate]);

  let sortedCustomers = [];
  if (customers && customers.length > 0) {
    sortedCustomers = sortArray(customers, "last_name") || [];
  }

  // test for sorting products
  const sortProducts = (flag: any) => {
    let sorted = [];
    if (flag == "status") sorted = sortArray(products, "is_comm_received");
    if (flag == "date") sorted = sortArray(products, "date");

    setProducts(sorted);
    //setAllProducts(sorted);
    setListUpdate(true);
  };
  //

  if (!products) return <LoadingScreen />;

  const handleOnClick = (stage: any) => {
    setStage(stage);
    setShowCalendar(true);
  };

  const handleSelection = (option: any, flag: any) => {
    if (flag == "search") setSelected(option);
    handleSearch("customer", option);
  };

  const handleUndoIconPress = async () => {
    setSelected("default");
    await axios
      .get(baseURL + getProductsData)
      .then((res) => setProducts(res.data));
  };

  const handleOnChange = (value: any, stage: any) => {
    onChange(value);

    let dateStr = moment(value).format("YYYY-MM-DD");
    if (stage == "start") setStartDate(dateStr);
    if (stage == "end") setEndDate(dateStr);
    setShowCalendar(false);
  };

  const handleSearch = async (flag: any, id = "") => {
    if (flag == "date") {
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
    }

    if (flag == "customer") {
      const params = {
        id: id,
      };

      await axios
        .get(baseURL + getProductsById, { params })
        .then((res) => setProducts(res.data));
    }

    // Testing
    //setTransSelected(false);
  };

  if (!products) return <NotFound message="No transactions found!" />;

  return (
    <>
      <View style={{ display: "flex" }}>
        <TabHeader
          name="Transactions"
          selected={selected}
          endDate={endDate}
          startDate={startDate}
          handleSelection={handleSelection}
          handleUndoIconPress={handleUndoIconPress}
          sortedCustomers={sortedCustomers}
          handleOnClick={handleOnClick}
          handleSearch={handleSearch}
        />

        <TransactionsList
          refreshTEST={() => setListUpdate(true)}
          //transSelected={transSelected}
          data={products ? products : null}
          products={allProducts ? allProducts : null}
          customers={customers ? customers : null}
          vendors={vendors ? vendors : null}
          suppliers={suppliers ? suppliers : null}
          travelTypes={travelTypes ? travelTypes : null}
          transactions={transactions ? transactions : null}
          destinations={destinations ? destinations : null}
          startDate={startDate || ""}
          endDate={endDate || ""}
          numProducts={products.length}
          sortProducts={sortProducts}
          //updateList={updateList}
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
    </>
  );
}
