import { useState } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";

export default function CustomersDropdown(props: any) {
  const [customers, setCustomers] = useState<any>(props.customers || []);

  const handleCustomerSelection = (customer: any) => {
    console.log("Selected: ", customer);
    props.selectCustomer(customer);
    props.hideDropdown();
  };

  const handleSearch = (e: any) => {
    let customers = [];

    props.customers.forEach((c: any) => {
      let lastName = c.last_name.toLowerCase();
      if (lastName.includes(e.target.value.toLowerCase())) customers.push(c);
    });

    setCustomers(customers);
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
        {customers.length == 0 ? (
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
          customers.map((customer: any, index: any) => (
            <Text
              key={index}
              style={styles.customerField}
              onPress={() => handleCustomerSelection(customer)}
            >
              {customer.last_name}&nbsp;
              {customer.first_name == "na" ? "" : customer.first_name}
            </Text>
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
    borderColor: "#CCC",
    fontWeight: "100",
  },
  customerField: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    fontWeight: "100",
  },
});
