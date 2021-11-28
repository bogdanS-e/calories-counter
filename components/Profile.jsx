import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Dimensions } from "react-native";

import { useContext } from "../context/globalContext";

import NavBar from "./NavBar";

const ScreenWidth = Dimensions.get("window").width;

const Profile = ({ navigation, route }) => {
  const { user } = useContext();

  const [weight, setWeight] = useState(String(user.weight) || "");
  const [height, setHeight] = useState(String(user.height) || "");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
      enabled={false}
    >
      <View style={styles.container}>
        <Text style={styles.text1}>Profile</Text>
        <View>
          <LinearGradient
            colors={["#9acf02", "#6e9762"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}
          >
            <Text style={styles.text2}>Enter Weight</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                placeholder="68"
                onChangeText={(weight) => setWeight(weight)}
                value={weight}
              />
              <TextInput
                style={styles.disableInput}
                placeholder="Kg"
                value="Kg"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#9acf02", "#6e9762"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}
          >
            <Text style={styles.text2}>Enter height</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.numberInput}
                keyboardType="numeric"
                placeholder="160"
                onChangeText={(height) => setHeight(height)}
                value={height}
              />
              <TextInput
                style={styles.disableInput}
                placeholder="Cm"
                value="Cm"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </LinearGradient>

          <LinearGradient
            colors={["#9acf02", "#6e9762"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linearGradient}
          >
            <Text style={styles.text2}>Enter Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.numberInput}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.disableInput}
                placeholder="*"
                value="*"
                underlineColorAndroid="transparent"
                editable={false}
                selectTextOnFocus={false}
              />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.controllerContainer}>
          <Pressable style={styles.button}>
            <Text style={styles.textButton}>Proceed</Text>
          </Pressable>
        </View>
      </View>
      <NavBar navigation={navigation} route={route} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    position: "relative",
    backgroundColor: "#F4F4F4",
  },
  titles: {
    flexDirection: "row",
    maxHeight: 25,
    alignItems: "center",
    marginLeft: 30,
    marginVertical: 10,
  },
  controllerContainer: {
    marginTop: -10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#3A4320",
  },
  button: {
    marginBottom: 20,
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
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  step: {
    fontWeight: "bold",
    color: "#393939",
    textAlign: "center",
    fontSize: 32,
    marginTop: 100,
    marginBottom: 20,
  },
  text1: {
    alignSelf: "flex-start",
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 24,
  },
  text2: {
    fontWeight: "bold",
    color: "#393939",
    fontSize: 18,
    marginBottom: 10,
  },
  text3: {
    color: "#9b9b9b",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 20,
    padding: 10,
  },
  linearGradient: {
    width: 300,
    marginBottom: 20,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  numberInput: {
    backgroundColor: "#fff",
    width: 170,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  numberInputAge: {
    backgroundColor: "#fff",
    width: 240,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  disableInput: {
    backgroundColor: "#fff",
    textAlign: "center",
    width: 50,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  disableDate: {
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    width: 250,
    height: 40,
    borderRadius: 14,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});

export default Profile;
