import { useState, useContext } from "react";
import moment from "moment";
import { MyContext } from "../MyContext";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Chip } from "react-native-paper";

export default function Header(props: any) {
  const context = {
    //  REMOVE THAT AFTER TESTING !!!!!!!!!!!!!!!!!!!
    user: {
      auth: "ok",
      auth_id: 1,
      first_name: "Ruslan",
      last_name: "Kalashnikov",
      login_timestamp: "1708396150110",
      user_email: "rjandson1@hotmail.com",
      user_name: "rjandson1",
      user_pwd: "Ruslank@1976",
    },
  }; //useContext(MyContext);

  const handleShowMenu = () => {
    props.showMenu();
  };

  const showUser = (user: any) => {
    return user.first_name + " " + user.last_name;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginRight: "auto",
          padding: 5,
          paddingRight: 30,
        }}
      >
        {props.screenSize ? (
          <Pressable onPress={handleShowMenu}>
            <Image
              source={require("../assets/icons/hamburger-menu.png")}
              style={styles.menu}
            />
          </Pressable>
        ) : null}

        <Text style={styles.title}>Sales Tracker</Text>
      </View>

      <View
        style={{
          display: "flex",
          marginRight: "2rem",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Text style={styles.navEl}>
          Last Sign-in:{" "}
          <Chip
            mode="flat"
            textStyle={{
              fontSize: 14,
              color: "#FFFFFF",
            }}
            style={{
              backgroundColor: "#f27d42",
              borderRadius: 5,
              marginLeft: 10,
            }}
          >
            {moment().format("DD MMMM, hh:mm A")}
          </Chip>
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: 5,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            color: "#ffffff",
            marginTop: -5,
          }}
        >
          {showUser(context.user)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "auto",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: "#368cbf",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  navEl: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  menu: {
    marginTop: 3,
    marginRight: 20,
    height: 24,
    width: 24,
  },
});
