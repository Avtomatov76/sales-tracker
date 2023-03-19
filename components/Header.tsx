import { useState } from "react";
import moment from "moment";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Chip } from "react-native-paper";

export default function Header(props: any) {
  const [inputStyle, setInputStyle] = useState();

  const handleShowMenu = () => {
    props.showMenu();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      <View style={{ flexDirection: "row" }}>
        {/* <View style={styles.searchContainer}>
          <Image
            source={require("../assets/icons/search.png")}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.navSearch} />
        </View> */}
        <View
          style={{
            marginRight: "2rem",
            justifyContent: "center",
            alignItems: "center",
            //alignSelf: "center",
          }}
        >
          <Text style={styles.navEl}>
            Last Sign-in:{" "}
            {/* <Text style={{ fontSize: 14, color: "orange", marginLeft: 10 }}>
              {moment().format("DD MMMM, HH:MM")}
            </Text> */}
            <Chip
              mode="flat"
              textStyle={{
                fontSize: 14,
                color: "#FFFFFF", //"#368cbf", //"orange",
                //fontWeight: "bold",
                //backgroundColor: "#FFFFFF",
              }}
              style={{
                backgroundColor: "#f27d42", //"#FFFFFF",
                borderRadius: 20,
                marginLeft: 10,
              }}
            >
              {moment().format("DD MMMM, hh:mm A")}
            </Chip>
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignContent: "center" }}>
          <Text
            style={{
              fontSize: 24,
              //fontWeight: "bold",
              color: "#ffffff",
              marginTop: -5,
            }}
          >
            Ruslan Kalashnikov
          </Text>
        </View>
      </View>
    </View>
  );
}

// {showSidebar ? (
//   <View style={{ position: "absolute", top: 100, left: 100 }}>
//     <Sidebar
//       navigate={props.navigate}
//       screen="small"
//       hide={() => setShowSidebar(false)}
//     />
//   </View>
// ) : null}

// const testMenu = () => {
//   return (
//     <View>
//       <Button
//         mode="contained"
//         style={{ width: 150 }}
//         onPress={() => setShowSidebar(!showSidebar)}
//       >
//         TEST MENU!!
//       </Button>
//     </View>
//   );
// };

//const [showSidebar, setShowSidebar] = useState(false);

const styles = StyleSheet.create({
  container: {
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "3rem",
    paddingRight: "3rem",
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
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginRight: "2rem",
    paddingLeft: ".75rem",
    paddingRight: ".75rem",
    borderRadius: 30,
  },
  navSearch: {
    fontSize: 14,
    color: "#000000",
    padding: ".5rem",
    marginLeft: ".5rem",
  },
  searchIcon: {
    alignSelf: "center",
    height: 18,
    width: 18,
  },
  menu: {
    marginTop: 3,
    marginRight: 20,
    height: 24,
    width: 24,
  },
});
