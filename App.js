import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {GlobalContextProvider} from "./context/globalContext";

import FlashMessage from "react-native-flash-message";
import FirstPage from "./components/startPage";
import PostRegistration from "./components/PostRegistration";
import Profile from "./components/Profile";
import Statistic from "./components/Statistic";
import Nutrition from "./components/Nutrition";
import Hydration from "./components/Hydration";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import Food from "./components/Food";
import ChooseFood from "./components/ChooseFood";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <GlobalContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="firstPage" component={FirstPage} />
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="postRegistration" component={PostRegistration} />
          <Stack.Screen name="statistic" component={Statistic} />
          <Stack.Screen name="nutrition" component={Nutrition} />
          <Stack.Screen name="hydration" component={Hydration} />
          <Stack.Screen name="profile" component={Profile} />
          <Stack.Screen name="food" component={Food} />
          <Stack.Screen name="chooseFood" component={ChooseFood} />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" /> 
      </GlobalContextProvider>
    </SafeAreaProvider>
  );
}
