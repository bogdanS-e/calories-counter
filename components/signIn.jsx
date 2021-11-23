import React from "react";
import { Button } from "react-native-elements";

const SingIn = ({ navigation }) => {
  return (
    <Button title="SingIn" onPress={() => navigation.navigate("signUp")} />
  );
};

export default SingIn;
