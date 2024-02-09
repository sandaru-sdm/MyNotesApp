import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

import { useFonts } from "expo-font";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export function SignUpUi({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
  });

  const [mobile, setMobile] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [password, setPassword] = useState('');

  const handleMobile = (text) => {
    setMobile(text);
  };
  const handleFname = (text) => {
    setfname(text);
  };
  const handleLname = (text) => {
    setlname(text);
  };
  const handleUtype = (text) => {
    setValue(text);
  };
  const handlePassword = (text) => {
    setPassword(text);
  };

  const [open, setOpen] = useState(false);
  const [Uvalue, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Employee", value: "employee" },
    { label: "Student", value: "student" },
  ]);

  const sendDataToServer = () => {

    const data = {
      "mobile": mobile,
      "fname": fname,
      "lname": lname,
      "utype": Uvalue,
      "password": password,
    };

    fetch('http://172.20.10.6/MyNotesServer/SignUp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data); 
        if(data == "success"){
          setMobile('');
          setfname('');
          setlname('');
          setValue('');
          setPassword('');
          Alert.alert("Success", "Registration Success");
          navigation.navigate("SignIn");
        } else {
          Alert.alert("Information", data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
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
            <Text style={styles.title1}>My Notes</Text>
            <Text style={styles.title2}>Sign-Up</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Mobile Number" inputMode="text" style={styles.input} value={mobile} onChangeText={handleMobile} />
            <TextInput placeholder="First Name" inputMode="text" style={styles.input} keyboardType="default" value={fname} onChangeText={handleFname} />
            <TextInput placeholder="Last Name" inputMode="text" style={styles.input} keyboardType="default" value={lname} onChangeText={handleLname} />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={handlePassword}
              inputMode="text"
              keyboardType="visible-password"
            />
            <DropDownPicker
              style={styles.dropDown}
              placeholder="User Type"
              open={open}
              value={Uvalue}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onOpen={() => Keyboard.dismiss()}
              containerStyle={{
                borderWidth: 0,
                borderColor: "white",
              }}
              onChangeText={handleUtype}
            />
            
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={sendDataToServer}>
              <Text style={styles.buttonText1}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={styles.buttonText2}>Sign-In</Text>
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
    marginTop: -100,
    marginBottom: 50,
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
    marginBottom :50,
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },

  dropDown: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 0,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom : -70,
  },

  button1: {
    backgroundColor: "#e74c3c",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: "#e74c3c",
    borderWidth: 2,
  },

  button2: {
    backgroundColor: "#3498db",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderColor: "#3498db",
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
