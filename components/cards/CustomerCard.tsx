import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import { Divider } from "react-native-paper";
import {
  displayAddress,
  displayName,
  displayPhone,
  formatDollarEntry,
} from "../../functions/customerFunctions";
import axios from "axios";
import moment from "moment";
import GetConfiguration from "../../constants/Config";
import { useQuery, useQueryClient } from "react-query";
import { Avatar, Button, Card, Text as Txt } from "react-native-paper";
import { getCustomerSales, getCustomerLatestSale } from "../../api/endPoints";

export default function CustomerCard(props: any) {
  const [sales, setSales] = useState<any>();
  const [latestSale, setLatetSale] = useState<any>();

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  console.log(
    "----------------   rendering customer card   -------------------"
  );

  let customer = props.customer;
  let flag = "";
  const baseURL = GetConfiguration().baseUrl;

  const queryClient = useQueryClient();
  // const { isLoading, isError, data, error, refetch } = useQuery(
  //   ["customer-sales"],
  //   () =>
  //     axios
  //       .get(baseURL + getCustomerSales + customer.customer_id)
  //       .then((res) => {
  //         res.data;
  //         console.log(res.data);
  //         //setSales(res.data[0].grand_total);
  //       }), // HCANGE BACK TO CORRECT VALUE!!
  // );

  // if (error)
  //   return (
  //     <View>
  //       <Text>An error has occurred: </Text>
  //       <Text>{error as any}</Text>
  //     </View>
  //   );

  useEffect(() => {
    async function getCustomerData() {
      let endpoints = [
        baseURL + getCustomerSales + customer.customer_id,
        baseURL + getCustomerLatestSale + customer.customer_id,
      ];
      Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
        ([{ data: sales }, { data: latestSale }]) => {
          setSales(sales);
          setLatetSale(latestSale);
        }
      );
    }

    getCustomerData();
  }, [props.customer]);

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  const handleEdit = async () => {
    props.editCustomer(customer.customer_id);
    await queryClient.invalidateQueries(["customers"]);
  };

  const handleDelete = async () => {
    props.deleteCustomer(customer.customer_id);
    //await queryClient.invalidateQueries(["customers"]);
  };

  // console.log("Sales: ", sales);
  // console.log("Latest sale: ", latestSale);

  if (!customer) return null;

  return (
    <Card style={{ width: "70%" }}>
      {/* <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ margin: 10, height: 200 }}
      /> */}

      <Image
        style={{ margin: 10, height: 200 }}
        source={{ uri: "https://picsum.photos/700" }}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
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
        {/* <Text style={{ fontSize: 24, marginBottom: 10 }}>
          Customer Snapshot
        </Text> */}
        <Text>
          Number of Sales:{" "}
          {!sales || sales.num_sales == null ? 0 : sales.num_sales}
        </Text>
        <Text>
          Total dollar value:{" "}
          {!sales || sales.all_sales == null
            ? 0
            : formatDollarEntry(sales.all_sales)}
        </Text>
        <Text>
          Total commissions:{" "}
          {!sales || sales.all_commissions == null
            ? 0
            : formatDollarEntry(sales.all_commissions)}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>
            Most recent sale:{" "}
          </Text>

          {!latestSale || latestSale.length == 0 ? (
            <Text>n/a</Text>
          ) : (
            <View>
              <Text>
                Date: {moment(latestSale[0].date).format("MMMM DD, YYYY")}
              </Text>
              <Text>
                Amount: {formatDollarEntry(latestSale[0].product_cost)}
              </Text>
              <Text>
                Commission: {formatDollarEntry(latestSale[0].product_comm)}
              </Text>
              <Text>Commission received: {latestSale[0].is_comm_received}</Text>
              <Text>Travel Type: {latestSale[0].fk_type_id}</Text>
              <Text>Vendor: {latestSale[0].vendor_name}</Text>
              <Text>Supplier: {latestSale[0].supplier_name}</Text>
              <Text>Party size: {latestSale[0].size_of_party}</Text>
            </View>
          )}
        </View>
      </Card.Content>

      <Card.Actions style={{ marginTop: 10, marginBottom: 5 }}>
        <Button onPress={handleEdit}>Edit</Button>
        <Button onPress={handleDelete} buttonColor="red">
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
}
