import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import TabHeader from "./TabHeader";
import axios from "axios";
import GetConfiguration from "../constants/Config";
import { destinationsAPI } from "../api/endPoints";
import { Divider } from "react-native-paper";
import DestinationModal from "../modals/DestinationModal";

export default function Destinations(props: any) {
  const [destination, setDestination] = useState<any>();
  const [destinations, setDestinations] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [flag, setFlag] = useState("");
  const [update, setUpdate] = useState(false);

  const baseURL = GetConfiguration().baseUrl;

  useEffect(() => {
    async function getDestinations() {
      try {
        await axios.get(baseURL + destinationsAPI).then((res) => {
          res.data;
          setDestinations(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    }

    getDestinations();
  }, [update]);

  const displayDestinationModal = (flag: string) => {
    setFlag(flag);
    setShowModal(true);
  };

  const hideDestinationModal = async () => {
    setShowModal(false);
    setUpdate(true);
  };

  const handlePress = (dest: any) => {
    setFlag("edit");
    setDestination(dest);
    setShowModal(true);
  };

  return (
    <View>
      <TabHeader
        name="Destinations"
        displayModal={() => displayDestinationModal("add")}
      />
      <View style={styles.summary}>
        <ScrollView style={styles.chart}>
          {!destinations ? (
            <Text style={{ color: "red" }}>
              Found NO destinations in the Database!!!
            </Text>
          ) : (
            destinations.map((dest: any, index: any) => (
              <View key={index}>
                <Pressable
                  style={styles.entry}
                  onPress={() => handlePress(dest)}
                >
                  <Text style={styles.destName}>{dest.destination_name}</Text>
                  <View style={styles.codeView}>
                    <Text style={styles.code}>{dest.destination_id}</Text>
                  </View>
                </Pressable>
                <Divider style={{ marginLeft: 20, marginRight: 100 }} />
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <DestinationModal
        flag={flag}
        id={!destination ? null : destination.destination_id}
        destination={!destination ? null : destination}
        destinations={destinations}
        visible={showModal}
        hideModal={hideDestinationModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    backgroundColor: "#F0F0F0",
    marginTop: 20,
    paddingRight: 20,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 5,
  },
  chart: {
    minWidth: 350,
    maxWidth: 500,
    height: 600,
    marginRight: 20,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  entry: {
    height: 30,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  codeView: {
    display: "flex",
    justifyContent: "center",
    width: 50,
    height: 25,
    backgroundColor: "#CC0000",
    borderRadius: 20,
  },
  code: {
    textAlign: "center",
    fontWeight: "700",
    color: "#FFFFFF",
    fontSize: 12,
  },
  destName: {
    fontSize: 18,
    marginRight: 10,
    color: "grey",
    fontWeight: "600",
  },
});
