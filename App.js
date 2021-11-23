import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import FirstPage from "./components/firstPage";
import Main from "./components/main";
import NewSignIn from "./components/newSignIn";
import NewSignUp from "./components/newSignUp";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="firstPage" component={FirstPage} />
          <Stack.Screen name="signIn" component={NewSignIn} />
          <Stack.Screen name="signUp" component={NewSignUp} />
          <Stack.Screen name="main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
