import { useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Button as Btn, TextInput } from "react-native-paper";
import GetConfiguration from "../constants/Config";
import { authAPI } from "../api/endPoints";
import ErrorScreen from "../components/ErrorScreen";

export default function LoginModal(props: any) {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>();

  const baseURL = GetConfiguration().baseUrl;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e: any, name: any) => {
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const handleKeyPress = (event: any) => {
    if (event.nativeEvent.key === "Enter") {
      handlePress();
    }
  };

  const handlePress = () => {
    if (formValues.username == "" || formValues.password == "") {
      if (formValues.username == "") setUserError("Please enter username!");
      if (formValues.password == "") setPasswordError("Please enter password!");

      return;
    }

    submitForAuth();

    setFormValues({
      ...formValues,
      username: "",
      password: "",
    });

    setUserError("");
    setPasswordError("");
  };

  async function submitForAuth() {
    let authObj = {
      username: formValues.username,
      password: formValues.password,
    };

    try {
      let result = await axios.post(baseURL + authAPI, authObj);

      if (Object.keys(result.data).length !== 0) {
        setUser(result.data);
        props.getUserData(result.data);
      } else setUser("na");
    } catch (err) {
      console.log(err);
      props.getUserData({});
    }
  }

  if (user == "na")
    return (
      <ErrorScreen
        error="No commission information found in the database!"
        type="server"
      />
    );

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={props.visible}>
        <View style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", height: "100%" }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.modalTitle}>Login</Text>
              </View>

              <TextInput
                placeholder={usernameError == "" ? "Username" : usernameError}
                placeholderTextColor={
                  usernameError != "" ? "red" : "rgba(0, 0, 0, 0.3)"
                }
                underlineColor="rgba(0, 0, 0, 0.3)"
                activeUnderlineColor="purple"
                left={<TextInput.Icon icon="account" />}
                value={formValues.username}
                textColor="#000000"
                style={{
                  height: 45,
                  marginBottom: 10,
                }}
                onChange={(e) => handleOnChange(e, "username")}
                //
              />

              <TextInput
                placeholder={passwordError == "" ? "Password" : passwordError}
                placeholderTextColor={
                  passwordError != "" ? "red" : "rgba(0, 0, 0, 0.3)"
                }
                underlineColor="rgba(0, 0, 0, 0.3)"
                activeUnderlineColor="purple"
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon icon="eye" onPress={toggleShowPassword} />
                }
                value={formValues.password}
                secureTextEntry={!showPassword}
                textColor="#000000"
                style={{
                  height: 45,
                  marginBottom: 10,
                }}
                onChange={(e) => handleOnChange(e, "password")}
                onKeyPress={handleKeyPress}
              />

              <Btn
                mode="elevated"
                textColor="#FFFFFF"
                labelStyle={{ fontSize: 12, fontWeight: "bold" }}
                style={{
                  display: "flex",
                  height: 45,
                  justifyContent: "center",
                  fontSize: 10,
                  backgroundImage:
                    "linear-gradient(to right, #0052ff, #b968ff)",
                  marginTop: 30,
                  marginBottom: 10,
                  borderRadius: 20,
                }}
                onPress={handlePress}
              >
                LOGIN
              </Btn>
              <View
                style={{
                  position: "absolute",
                  marginTop: -25,
                  marginLeft: -20,
                }}
              >
                {props.user ? (
                  <Text style={{ color: "red", fontSize: 12 }}>
                    * Authorization {props.user.auth}! Please try again.
                  </Text>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "linear-gradient(to right, #b968ff, #0052ff)", //
  },
  modalView: {
    width: 350,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 40,
    fontSize: 26,
    fontWeight: "bold",
  },
});
