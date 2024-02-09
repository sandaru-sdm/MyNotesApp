import {Image,Keyboard,KeyboardAvoidingView,TextInput,TouchableOpacity,TouchableWithoutFeedback,View,} from "react-native";
import { Alert, StatusBar, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { HomeUi } from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

export function SignInUi({  }) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const data = {
    mobile: mobile,
    password: password,
  };

  const handleMobile = (text) => {
    setMobile(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  async function saveData(){
    await AsyncStorage.setItem("mobile", mobile);
    console.log("Assync Data Set : " + mobile);
  }

  const mobileObj = {"mobile": mobile};
  const navigation = useNavigation();

  const sendDataToServer = () => {
    fetch("http://172.20.10.6/MyNotesServer/SignIn.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((response) => {
        console.log(response);
        if (response === "success") {
          setMobile("");
          setPassword("");
          saveData();
          navigation.navigate("Home", mobileObj);

        } else {
          Alert.alert("Information", response);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  if (fontsLoaded) {
    const ui = (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar hidden={true} />
          <View style={styles.headingView}>
            <Text style={styles.title1}>My Notes</Text>
            <Text style={styles.title2}>Sign-In</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Mobile Number"
              inputMode="text"
              style={styles.input}
              value={mobile}
              onChangeText={handleMobile}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={handlePassword}
              inputMode="text"
              keyboardType="visible-password"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={sendDataToServer}>
              <Text style={styles.buttonText1}>Sign-In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.buttonText2}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );

    return ui;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B9B4C7",
    alignItems: "center",
    justifyContent: "center",
  },

  headingView: {
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  title1: {
    fontFamily: "Quicksand-Bold",
    fontWeight: 700,
    fontSize: 40,
  },

  title2: {
    fontFamily: "Quicksand-Bold",
    fontWeight: 700,
    fontSize: 30,
  },

  inputContainer: {
    width: "80%",
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },

  button1: {
    backgroundColor: "#3498db",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: "#3498db",
    borderWidth: 2,
  },

  button2: {
    backgroundColor: "#e74c3c",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: "#e74c3c",
    borderWidth: 2,
  },

  buttonText1: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },

  buttonText2: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
