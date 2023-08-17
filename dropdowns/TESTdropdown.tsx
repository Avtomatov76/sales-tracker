import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";

export default function TESTdropdown(props: any) {
  const [data, setData] = useState<any>(props.dropdownList || []);

  const handleSelection = (customer: any) => {
    console.log("Selected: ", customer);
    props.selectCustomer(customer);
    props.hideDropdown();
  };

  const handleSearch = (e: any) => {
    let list = [];

    props.dropdownList.forEach((entry: any) => {
      let lastName = entry.last_name.toLowerCase(); // <-- make generic
      if (lastName.includes(entry.target.value.toLowerCase())) list.push(entry);
    });

    setData(list);
  };

  //
  //console.log("TYPED STUFF: ", customers);
  //

  return (
    <View
      style={{
        display: "flex",
        position: "absolute",
        maxHeight: 300,
        backgroundColor: "#FFFFFF",
        zIndex: 999,
        padding: 10,
        borderWidth: 1,
        borderColor: "#F27D42", //"rgb(240, 240, 240)",
        borderRadius: 3,
      }}
    >
      <TextInput
        placeholder="Search"
        placeholderTextColor="grey"
        style={styles.textInput}
        onChange={(e) => handleSearch(e)}
      />
      <ScrollView style={{ marginTop: 10 }}>
        {data.length == 0 ? (
          <Text
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 5,
            }}
          >
            -- n/a --
          </Text>
        ) : (
          data.map((entry: any, index: any) => (
            <Text
              key={index}
              style={styles.entryField}
              onPress={() => handleSelection(entry)}
            >
              {entry.last_name}
            </Text> // <-- make more generic
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "rgb(240, 240, 240)",
    fontWeight: "100",
  },
  entryField: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontWeight: "100",
  },
});
