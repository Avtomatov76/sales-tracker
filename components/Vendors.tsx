import { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import TabHeader from "./TabHeader";
import GetConfiguration from "../constants/Config";
import { vendorsAPI } from "../api/endPoints";
import SubHeader from "./SubHeader";
import ErrorMessage from "./ErrorMessage";
import ListEntry from "./ListEntry";
import VendorModal from "../modals/VendorModal";

export default function Vendors(props: any) {
  const [vendors, setVendors] = useState<any>();
  const [vendor, setVendor] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [update, setUpdate] = useState(false);

  const { height, width } = useWindowDimensions();

  const baseURL = GetConfiguration().baseUrl;

  useEffect(() => {
    async function getCommissions() {
      let endpoints = [baseURL + vendorsAPI];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([{ data: vendors }]) => {
          setVendors(vendors);
        }
      );
    }

    getCommissions();
  }, []);

  const displayVendorModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const hideVendorModal = async () => {
    setShowModal(false);
    setUpdate(true);
  };

  const handleOnPress = (vendor: any) => {
    console.log("PRESSIT BOYYYYYY!!!! -> from Vendors", vendor, flag);
    setVendor(vendor);
    setFlag("edit");
    setShowModal(true);
  };

  //
  //console.log("ALL VENDORS: ", vendors);
  //

  if (!vendors)
    return (
      <ErrorMessage
        error="No vendor information found in the database!"
        type="server"
      />
    );

  return (
    <View>
      <View style={{ display: "flex" }}>
        <TabHeader
          name="Vendors"
          displayModal={() => displayVendorModal("add")}
        />
        <SubHeader
          flag="vendors"
          selected={props.selected}
          numEntries={vendors.length}
          sortProducts={props.sortProducts}
          //submitForm={() => displayTransactionModal("add")}
        />

        {!vendors ? (
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            <Text style={{ fontSize: 20, color: "red" }}>
              No vendors found!
            </Text>
          </View>
        ) : vendors.length > 0 ? (
          <ScrollView
            style={[
              styles.scrollView,
              //{ width: width > 1000 ? "40%" : "100%" },
            ]}
          >
            {vendors.map((v: any, index: any) => (
              <ListEntry
                flag="vendors"
                //selected={selected}
                key={index}
                vendor={v}
                index={index}
                handleOnPress={() => handleOnPress(v)}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={{ alignSelf: "center", marginTop: 30 }}>
            <Text style={{ fontSize: 20, color: "red" }}>
              No vendors found!
            </Text>
          </View>
        )}
      </View>
      <VendorModal
        flag={flag}
        id={!vendor ? null : vendor.vendor_id}
        vendor={!vendor ? null : vendor}
        vendors={vendors}
        visible={showModal}
        hideModal={hideVendorModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    display: "flex",
    maxHeight: 550,
    width: 500, //"50%",
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
