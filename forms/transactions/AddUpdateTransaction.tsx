import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Picker,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { sortArray } from "../../functions/transactionsFunctions";
import AddUpdateCustomer from "../customers/AddUpdateCustomer";
import OutsideClickHandler from "react-outside-click-handler";
import Calendar from "react-calendar";
import moment from "moment";
import TESTdropdown from "../../dropdowns/TESTdropdown";

// Left code to create a UNIVERSAL dropdown
// {
//   <TESTdropdown
//     flag="destination"
//     customers={props.customers}
//     selectCustomer={selectCustomer}
//     hideDropdown={() => setCustomerOptions(false)}
//   />;
// }

const showCustomerForm = (props: any) => {
  return (
    <AddUpdateCustomer
      formValues={props.formValues}
      flag="add"
      error={props.error}
      errors={props.errors}
      handleBlur={props.handleBlur}
      handleOnChange={props.handleOnChange}
    />
  );
};

const showTransactionForm = (props: any) => {
  const [date, setDate] = useState(new Date());
  const [calendar, showCalendar] = useState(false);
  const [calType, setCalType] = useState("");
  const [showDestinations, setShowDestination] = useState(false);

  let sortedVendors = sortArray(props.vendors, "vendor_name") || [];
  let sortedSuppliers = sortArray(props.suppliers, "supplier_name") || [];
  let sortedTypes = sortArray(props.travelTypes, "type_id") || [];

  const displayLegendStyle = (name: any) => {
    return props.error && !props.formValues[name]
      ? [styles.legend, { color: "red" }]
      : styles.legend;
  };

  const displayTextInputStyle = (name: any) => {
    return [
      styles.textInput,
      {
        borderColor: props.error && !props.formValues[name] ? "red" : "#CCC",
      },
    ];
  };

  const displayPickerStyle = (name: any) => {
    return [
      styles.textInput,
      {
        fontSize: 14,
        paddingLeft: 5,
        backgroundColor: "#FFFFFF",
        borderColor: props.error && !props.formValues[name] ? "red" : "#CCC",
      },
    ];
  };

  const displayCalendar = (type: any) => {
    setCalType(type);
    showCalendar(true);
  };

  const handleCalendarChange = (value: any, calType: any) => {
    showCalendar(false);

    let dateStr = moment(value).format("YYYY-MM-DD");

    props.handleOnChange(dateStr, calType);
  };

  const handleDestinationToggle = () => {
    if (showDestinations == true) setShowDestination(false);
    else setShowDestination(!showDestinations);
  };

  const handleOutsideClick = () => {
    setShowDestination(false);
  };

  const handleCodeSelection = (code: any) => {
    setShowDestination(false);
    // check if due code is entered
    props.handleOnChange(code.destination_id, "destination", "selected");
  };

  const countPeriod = (str: any) => {
    if (!str || str == "") return;

    let count = str.split(".").length - 1;
    return count;
  };

  const checkIfNumber = (input: any) => {
    if (!input) return;

    let priodCount = countPeriod(input);
    let char = input[input.length - 1];

    if ((char == "." && priodCount == 1) || char == "0") return true;

    if (!parseFloat(char) || !parseInt(char)) {
      return false;
    }

    return true;
  };

  const handleChange = (e: any, name: any, flag = "") => {
    let names = ["total", "commission", "partySize"];
    let isNumber = false;

    if (names.includes(name)) {
      isNumber = checkIfNumber(e.target.value);

      if (!isNumber && e.target.value != "") {
        alert(`Please enter data as numbers!`);
        return;
      }
    }

    props.handleOnChange(e, name, flag);
  };

  const showDestinationDropdown = (codes: any) => {
    return (
      <ScrollView style={styles.destDropdown}>
        {!codes
          ? null
          : codes.map((code, index) => (
              <Text
                key={index}
                style={{ paddingBottom: index == codes.length - 1 ? 0 : 5 }}
                onPress={() => handleCodeSelection(code)}
              >
                {code.destination_id} - {code.destination_name}
              </Text>
            ))}
      </ScrollView>
    );
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
        zIndex: 1,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <Text style={displayLegendStyle("total")}>Total</Text>
          <TextInput
            placeholderTextColor="grey"
            style={displayTextInputStyle("total")}
            value={!props.formValues.total ? "" : props.formValues.total}
            onChange={(e) => handleChange(e, "total")}
          />
        </View>

        <View style={{ width: "50%" }}>
          <Text style={displayLegendStyle("commission")}>Commission</Text>
          <TextInput
            placeholderTextColor="grey"
            style={displayTextInputStyle("commission")}
            value={
              !props.formValues.commission ? "" : props.formValues.commission
            }
            onChange={(e) => handleChange(e, "commission")}
          />
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "35%" }}>
          <Text style={displayLegendStyle("start")}>Start Date</Text>
          <TextInput
            placeholderTextColor="grey"
            style={displayTextInputStyle("start")}
            value={!props.formValues.start ? "" : props.formValues.start}
            onFocus={() => displayCalendar("start")}
          />
        </View>

        <View style={{ width: "35%" }}>
          <Text style={styles.legend}>End Date</Text>
          <TextInput
            placeholderTextColor="grey"
            style={styles.textInput}
            value={!props.formValues.end ? "" : props.formValues.end}
            onFocus={() => displayCalendar("end")}
          />
        </View>

        <View style={{ width: "30%" }}>
          <Text style={displayLegendStyle("saleDate")}>Sale Date</Text>
          <TextInput
            placeholderTextColor="grey"
            style={displayTextInputStyle("saleDate")}
            value={!props.formValues.saleDate ? "" : props.formValues.saleDate}
            onFocus={() => displayCalendar("saleDate")}
          />
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View style={{ width: "35%" }}>
          <Text style={displayLegendStyle("status")}>Comm Status</Text>

          <Picker
            style={displayPickerStyle("status")}
            onValueChange={(itemValue, itemIndex) =>
              handleChange(itemValue, "status", "selected")
            }
          >
            <Picker.Item label="- select -" value="" />
            <Picker.Item label="Not received" value="N" />
            <Picker.Item label="Received" value="Y" />
          </Picker>
        </View>

        <View style={{ width: "30%" }}>
          <Text style={displayLegendStyle("partySize")}>Party Size</Text>

          <TextInput
            placeholderTextColor="grey"
            style={displayTextInputStyle("partySize")}
            value={
              !props.formValues.partySize ? "" : props.formValues.partySize
            }
            onChange={(e) => handleChange(e, "partySize")}
          />
        </View>

        <View style={{ width: "35%" }}>
          <Text style={displayLegendStyle("payment")}>Payment Type</Text>

          <Picker
            style={displayPickerStyle("payment")}
            onValueChange={(itemValue, itemIndex) =>
              handleChange(itemValue, "payment", "selected")
            }
          >
            <Picker.Item label="- select -" value="" />
            <Picker.Item label="Card" value="CC" />
            <Picker.Item label="Cash" value="CH" />
            <Picker.Item label="Bank" value="BK" />
          </Picker>
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row", zIndex: 1000 }}>
        <View style={{ width: "50%" }}>
          <Text style={[displayLegendStyle("destination"), { zIndex: 1000 }]}>
            Airport Code
          </Text>

          {/* {!showDestinations ? ( */}
          <View style={{ flexDirection: "row" }}>
            <TextInput
              maxLength={3}
              //placeholder="enter code or click to select"
              placeholderTextColor="grey"
              style={[
                displayTextInputStyle("destination"),
                {
                  width: "90%",
                  marginRight: 0,
                  borderTopRightRadius: 0,
                  borderBottomEndRadius: 0,
                },
              ]}
              value={
                !props.formValues.destination
                  ? ""
                  : props.formValues.destination
              }
              onChange={(e) => handleChange(e, "destination")}
            />
            <Pressable
              style={[
                styles.codeDownArrow,
                {
                  borderColor:
                    props.error && !props.formValues["destination"]
                      ? "red"
                      : "#CCC",
                },
              ]}
              onPress={handleDestinationToggle}
            >
              <Image
                source={require("../../assets/chevron-down.png")}
                style={{ alignSelf: "center", width: 10, height: 10 }}
              />
            </Pressable>
          </View>

          {showDestinations && (
            <OutsideClickHandler onOutsideClick={handleOutsideClick}>
              {showDestinationDropdown(props.destinations)}
            </OutsideClickHandler>
          )}
        </View>

        <View style={{ width: "50%" }}>
          <Text style={displayLegendStyle("travelType")}>Type</Text>

          <Picker
            style={displayPickerStyle("travelType")}
            onValueChange={(itemValue, itemIndex) =>
              handleChange(itemValue, "travelType", "selected")
            }
          >
            <Picker.Item label="- select -" value="" />
            {!sortedTypes
              ? null
              : sortedTypes.map((t: any, index: any) => (
                  <Picker.Item
                    label={t.type_id}
                    value={t.type_id}
                    key={index}
                  />
                ))}
          </Picker>
        </View>
      </View>

      <View style={{ display: "flex", flexDirection: "row" }}>
        <View style={{ width: "50%" }}>
          <Text style={displayLegendStyle("vendor")}>Vendor</Text>
          <Picker
            style={displayPickerStyle("vendor")}
            onValueChange={(itemValue, itemIndex) =>
              handleChange(itemValue, "vendor", "selected")
            }
          >
            <Picker.Item label="- select -" value="" />
            {!sortedVendors
              ? null
              : sortedVendors.map((v: any, index: any) => (
                  <Picker.Item
                    label={v.vendor_name}
                    value={v.vendor_id}
                    key={index}
                  />
                ))}
          </Picker>
        </View>

        <View style={{ width: "50%" }}>
          <Text style={displayLegendStyle("supplier")}>Supplier</Text>

          <Picker
            style={displayPickerStyle("supplier")}
            onValueChange={(itemValue, itemIndex) =>
              handleChange(itemValue, "supplier", "selected")
            }
          >
            <Picker.Item label="- select -" value="" />
            {!sortedSuppliers
              ? null
              : sortedSuppliers.map((s: any, index: any) => (
                  <Picker.Item
                    label={s.supplier_name}
                    value={s.supplier_id}
                    key={index}
                  />
                ))}
          </Picker>
        </View>
      </View>

      <View style={{ display: "flex", marginTop: 10 }}>
        <View style={{}}>
          <Text style={[styles.legend]}>Notes</Text>
          <TextInput
            placeholderTextColor="grey"
            multiline
            style={[styles.textInput, { height: 75 }]}
            value={!props.formValues.notes ? "" : props.formValues.notes}
            onChange={(e) => handleChange(e, "notes")}
          />
        </View>
      </View>
      {calendar ? (
        <View
          style={{
            display: "flex",
            position: "absolute",
            alignSelf: "center",
            marginTop: 50,
            zIndex: 1000,
          }}
        >
          <OutsideClickHandler
            onOutsideClick={() => {
              props.hideDropdown;
            }}
          >
            <Calendar
              onChange={(value) => handleCalendarChange(value, calType)}
              value={date}
            />
          </OutsideClickHandler>
        </View>
      ) : null}
    </View>
  );
};

export default function AddUpdateTransaction(props: any) {
  return (
    <View style={{ width: "100%", marginTop: 10 }}>
      {showCustomerForm(props)}

      {showTransactionForm(props)}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    margin: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#CCC",
    fontWeight: "400",
  },
  legend: {
    display: "flex",
    width: "fit-content",
    position: "relative",
    fontSize: 10,
    marginBottom: -13,
    marginLeft: 12,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#368cbf",
    backgroundColor: "#FFFFFF",
  },
  destDropdown: {
    position: "absolute",
    width: "85%",
    maxHeight: 150,
    marginTop: -5,
    marginLeft: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    zIndex: 1000,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCC",
  },
  codeDownArrow: {
    justifyContent: "center",
    width: "10%",
    borderWidth: 1,
    marginLeft: 1,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    borderTopRightRadius: 4,
    borderBottomEndRadius: 4,
  },
});
