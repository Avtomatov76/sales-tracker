import { View, Text } from "react-native";
import { Divider } from "react-native-paper";
import {
  displayAddress,
  displayName,
  displayPhone,
} from "../../functions/customerFunctions";
import { Avatar, Button, Card, Text as Txt } from "react-native-paper";

export default function CustomerCard(props: any) {
  let customer = props.customer;
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  console.log(customer);

  if (!customer) return null;

  return (
    <Card style={{ width: "70%" }}>
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ margin: 10, height: 200 }}
      />
      {/* <Card.Title title="Details" left={LeftContent} /> */}
      <Card.Content>
        {/* <Txt variant="titleLarge">Card title</Txt> */}
        {/* <Txt variant="bodyMedium">Card content</Txt> */}

        <View style={{ alignSelf: "flex-start" }}>
          <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20 }}>
            {displayName(customer, "details")}
          </Text>
          {/* <Text style={{ marginBottom: 5 }}>Name&#40;s&#41;:</Text> */}
          <Text style={{ fontSize: 20, marginBottom: 5, color: "#368cbf" }}>
            {displayPhone(customer)}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            {!customer.email || customer.email === "na" ? null : customer.email}
          </Text>
          <Text>
            {customer.street_address === "na" ? null : displayAddress(customer)}
          </Text>
        </View>
        <Divider style={{ marginTop: 10, marginBottom: 20 }} />
        <Text>Number of Sales for this customer</Text>
        <Text>Total dollar value per customer</Text>
        <Text>Total commissions per customer</Text>
        <Text>Latest sale info with commission</Text>
      </Card.Content>

      <Card.Actions style={{ marginTop: 10, marginBottom: 5 }}>
        <Button>Edit</Button>
        <Button buttonColor="red">Delete</Button>
      </Card.Actions>
    </Card>
  );
}
