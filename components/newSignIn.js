import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
console.log(ScreenHeight);

const NewSignIn = ({ navigation }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Continue your challenge</Text>
      <Text style={styles.textTitles}>
        <Icon name="user" size={14} color="black" />
        Name
      </Text>
      <TextInput style={styles.input} onChangeText={setLogin} value={login} />
      <Text style={styles.textTitles}>
        <Icon name="user" size={14} color="black" />
        Password
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      <Text style={styles.helper}>
        Thank you for using our app! Don't stop and continue reach new goals
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("main")}
      >
        <Text style={styles.textButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    position: "relative",
    backgroundColor: "#F4F4F4",
  },
  top: {
    backgroundColor: "#97C059",
    borderBottomLeftRadius: ScreenWidth / 2,
    borderBottomRightRadius: ScreenWidth / 2,
  },
  text1: {
    fontWeight: "bold",
    color: "#393939",
    fontSize: 22,
    marginLeft: 30,
    marginTop: 100,
    marginBottom: 100,
  },
  textTitles: {
    fontWeight: "bold",
    color: "#393939",
    fontSize: 14,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    height: 50,
    marginHorizontal: 30,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3A4320",
  },
  button: {
    marginLeft: (ScreenWidth - ScreenWidth / 1.5) / 2,
    width: ScreenWidth / 1.5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#B1D430",
  },
  helper: {
    textAlign: "center",
    color: "#3A4320",
    fontSize: 14,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 120,
    marginBottom: 80,
  },
});

export default NewSignIn;
