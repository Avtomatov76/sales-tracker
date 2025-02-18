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
import ErrorMessage from "./ErrorMessage";
import { suppliersAPI } from "../api/endPoints";
import SubHeader from "./SubHeader";
import ListEntry from "./ListEntry";
import SupplierModal from "../modals/SupplierModal";
import ConfirmDelete from "../modals/ConfirmDelete";

export default function Suppliers(props: any) {
  const [suppliers, setSuppliers] = useState<any>();
  const [supplier, setSupplier] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [update, setUpdate] = useState(false);
  const [message, setMessage] = useState("");

  const baseURL = GetConfiguration().baseUrl;

  useEffect(() => {
    async function getCommissions() {
      let endpoints = [baseURL + suppliersAPI];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([{ data: suppliers }]) => {
          setSuppliers(suppliers);
        }
      );
    }

    getCommissions();
  }, []);

  const displaySupplierModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const hideSupplierModal = async () => {
    setShowModal(false);
    setUpdate(true);
  };

  const handleOnPress = (supplier: any) => {
    console.log("PRESSIT BOYYYYYY!!!! -> from suppliers", supplier, flag);
    setSupplier(supplier);
    setFlag("edit");
    setShowModal(true);
  };

  //

  const displayDeleteModal = (supplier: any) => {
    console.log("Showing COnfirm Delete Modal: ", supplier);
    setSupplier(supplier);
    setFlag("delete");
    //setShowDeleteModal(true);
  };

  const deleteSupplier = async (id: any) => {
    try {
      const res = await axios.post(baseURL + suppliersAPI + `/${id}`);
      console.log(res.data.result);
      if (res.data) setMessage("Could not delete customer ");
    } catch (err) {
      console.log(err);
    }

    setShowDeleteModal(false);
    //handleRefresh();
  };
  //

  if (!suppliers)
    return (
      <ErrorMessage
        error="No supplier information found in the database!"
        type="server"
      />
    );

  return (
    <View style={{ display: "flex" }}>
      <TabHeader name="Suppliers" />
      <SubHeader
        flag="suppliers"
        selected={props.selected}
        numEntries={suppliers.length}
        submitForm={() => displaySupplierModal("add")}
      />

      {!suppliers ? (
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Text style={{ fontSize: 20, color: "red" }}>
            No suppliers found!
          </Text>
        </View>
      ) : suppliers.length > 0 ? (
        <ScrollView
          // style={[styles.scrollView, { width: width > 1500 ? "40%" : "100%" }]}
          style={styles.scrollView}
        >
          {suppliers.map((s: any, index: any) => (
            <ListEntry
              flag="suppliers"
              //selected={selected}
              key={index}
              supplier={s}
              index={index}
              handleOnPress={() => handleOnPress(s)}
              displayDeleteModal={() => displayDeleteModal(s)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{ alignSelf: "center", marginTop: 30 }}>
          <Text style={{ fontSize: 20, color: "red" }}>
            No suppliers found!
          </Text>
        </View>
      )}

      <SupplierModal
        flag={flag}
        id={!supplier ? null : supplier.supplier_id}
        supplier={!supplier ? null : supplier}
        suppliers={suppliers}
        visible={showModal}
        hideModal={hideSupplierModal}
      />

      {flag === "delete" ? (
        <ConfirmDelete
          flag="supplier"
          message={props.message}
          hideModal={props.hideModal}
          //recordId={props.formValues.code}
          record={!supplier ? null : supplier}
          // deleteRecord={props.deleteCustomer}
          // handleOKpress={props.handleOKpress}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    display: "flex",
    maxHeight: 550,
    width: "40%",
    marginTop: 30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
