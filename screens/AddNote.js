import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { SwipeListView } from "react-native-swipe-list-view";
import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export function AddNoteUi({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [mobileNumber, setMobileNumber] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Study", value: "study" },
    { label: "Work", value: "work" },
    { label: "Travel", value: "travel" },
  ]);

  const handleTitle = (text) => {
    setTitle(text);
  };
  const handleDescription = (text) => {
    setDescription(text);
  };
  const handleCategory = (text) => {
    setValue(value);
  };

  // Remove Async Storage

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All AsyncStorage data cleared successfully');
    } catch (error) {
      console.error('Error clearing AsyncStorage data:', error);
    }
  };

  // Remove Async Storage

  // async function viewData(){
  //   const getMobile = await AsyncStorage.getItem("mobile");
  //   setMobileNumber(getMobile);
  // }

  const navigation1 = useNavigation();

  const sendDataToServer = () => {

    // viewData();
    const mobile = route.params.mobile;
    // alert(mobile);
    const data = {
      "title": title,
      "description": description,
      "category": value,
      "mobile": mobile,
    };

    const mobileObj = {"mobile": mobile};

    fetch("http://172.20.10.6/MyNotesServer/AddNotes.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data == "success") {
          setTitle("");
          setDescription("");
          setValue("");
          Alert.alert("Success", "Note Added");
          navigation1.navigate("Home",mobileObj);
        } else {
          Alert.alert("Information", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (fontsLoaded) {
    const ui = (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <KeyboardAvoidingView style={styles.container} behavior="height">
          <StatusBar hidden={true} />
          <View style={styles.headingView}>
            <Text style={styles.title1}>Add Notes</Text>
          </View>
          <View style={styles.inputContainer}>
          <TextInput placeholder="Title" inputMode="text" style={styles.input} value={title} onChangeText={handleTitle} />
            <TextInput placeholder="Description" inputMode="text" style={styles.input} keyboardType="default" value={description} onChangeText={handleDescription} />
            
            <DropDownPicker
              style={styles.dropDown}
              placeholder="Category"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onOpen={() => Keyboard.dismiss()}
              containerStyle={{
                borderWidth: 0,
                borderColor: "white",
              }}
              onChangeValue={handleCategory}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button1}
              // onPress={clearAllData}
              onPress={sendDataToServer}
            >
              <Text style={styles.buttonText1}>Add</Text>
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
    marginTop: -100,
  },

  dropDown: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 0,
  },

  title1: {
    fontFamily: "Quicksand-Bold",
    fontWeight: 700,
    fontSize: 50,
  },

  title2: {
    fontFamily: "Quicksand-Bold",
    fontWeight: 700,
    fontSize: 30,
  },

  inputContainer: {
    width: "80%",
    // marginTop:-50,
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
    marginTop: 150,
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
