import React from "react";
import { Button } from "react-native-elements";

const Main = ({ navigation }) => {
  return (
    <Button
      title="Main"
      onPress={() => navigation.navigate("signIn")}
    />
  );
};

export default Main;
