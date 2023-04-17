import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { Avatar, Button, Card, Text as Txt } from "react-native-paper";
import LoadingScreen from "./LoadingScreen";

const dummyData = {
  name: "Zitty Balls",
  commissions: 2000,
  sales: 40000,
  phone: "800-999-0000",
};

const dummyDataArr = ["Zitty Balls", 2000, 40000, "800-999-0000"];

export default function Commissions(props: any) {
  const handleEdit = () => {
    console.log("Editing....");
  };

  const handleDelete = () => {
    console.log("Deleting....");
  };

  return (
    // <Card
    //   style={{
    //     display: "flex",
    //     width: "80%",
    //     height: "80%",
    //   }}
    // >
    //   <Card.Cover
    //     source={{ uri: "https://picsum.photos/700" }}
    //     style={{ display: "flex", margin: 10, height: 200 }}
    //   />
    //   {/* <Card.Title title="Details" left={LeftContent} /> */}
    //   <Card.Content style={{ display: "flex" }}>
    //     {/* <Txt variant="titleLarge">Card title</Txt> */}
    //     {/* <Txt variant="bodyMedium">Card content</Txt> */}

    //     <View style={{ alignSelf: "flex-start" }}>
    //       <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20 }}>
    //         Commissions
    //       </Text>
    //     </View>
    //     <Divider style={{ marginTop: 10, marginBottom: 20 }} />
    //     <Text>DIsplay some ocmmiccions bullcrap: </Text>
    //   </Card.Content>

    //   <Card.Actions
    //     style={{
    //       display: "flex",
    //       //marginTop: "auto",
    //       //bottom: 0,
    //     }}
    //   >
    //     <Button onPress={handleEdit}>Edit</Button>
    //     <Button onPress={handleDelete} buttonColor="red">
    //       Delete
    //     </Button>
    //   </Card.Actions>
    // </Card>

    <View
      style={{
        display: "flex",
        width: "80%",
        height: "80%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.twoBoxesStyle}>
        <View
          style={[
            styles.smallBoxStyle,
            { backgroundColor: "green", marginBottom: 20 },
          ]}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 24 }}>
            Name: {!dummyData ? null : dummyData.name}
          </Text>
        </View>
        <View style={styles.smallBoxStyle}>
          <Text style={{ color: "#FFFFFF", fontSize: 24 }}>
            Sales and Commissions: {!dummyData ? null : dummyData.sales} +{" "}
            {!dummyData ? null : dummyData.commissions}
          </Text>
        </View>
      </View>
      <View style={styles.bigBoxStyle}>
        <Text style={{ color: "#FFFFFF", fontSize: 24 }}>
          Phone: {!dummyData ? null : dummyData.phone}
        </Text>
        {dummyDataArr.map((el: any, index: any) => (
          <Text
            key={index}
            style={{ marginBottom: 10, color: "#FFFFFF", fontSize: 18 }}
          >
            {el}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  smallBoxStyle: {
    display: "flex",
    backgroundColor: "orange",
    width: "50%",
    height: "20%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bigBoxStyle: {
    display: "flex",
    backgroundColor: "blue",
    width: "50%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  twoBoxesStyle: {
    display: "flex",
    height: "80%",
    width: "100%",
    alignItems: "center",
  },
});
