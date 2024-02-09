import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignInUi } from "./screens/SignIn";
import { SignUpUi } from "./screens/SignUp";
import { HomeUi } from "./screens/Home";
import { AddNoteUi } from "./screens/AddNote";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function App() {
  const [hasSignedIn, setHasSignedIn] = useState(false);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const userHasSignedIn = await AsyncStorage.getItem("mobile");

        if (userHasSignedIn !== null) {
          setHasSignedIn(true);
        }
      } catch (error) {
        console.error("Error checking sign-in status: ", error);
      }
    };
console.log(hasSignedIn);
    checkSignInStatus();

    
  });

  if (hasSignedIn) {
    const ui = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeUi}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddNote"
            component={AddNoteUi}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignIn"
            component={SignInUi}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUpUi}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
    return ui;
  } else {
    const ui = (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignIn"
            component={SignInUi}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="SignUp"
            component={SignUpUi}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeUi}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="AddNote"
            component={AddNoteUi}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
    // return ui;
  }

}

export default App;
